"use client";

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Clock, Edit2, Trash2, X, Plus, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@/context/LoginContext";

const CustomCalendar = ({ id: userId, name: userName,value:sidebarOpen }) => {
  const [events, setEvents] = useState([]);
  const [calOpen, setCalOpen] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    category: "Work",
    allday: false,
  });
  const [selectInfo, setSelectInfo] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [token, setToken] = useState(null);
  const [connected, setConnected] = useState(false);

  const calendarRef = useRef(null);
  const popupRef = useRef(null);

  const { login } = useAuth();

  // Fetch events from custom API
  const fetchEvents = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:3001/custom/events/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  // Check Google Sync status
  useEffect(() => {
    if (!login || !userId) return;

    const checkGoogleSync = async () => {
      try {
        const res = await fetch(`http://localhost:3000/auth/google/status/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.synced) {
          setConnected(true);
          await init();
        } else {
          setConnected(false);
        }
      } catch (err) {
        console.error("Error checking sync:", err);
      }
    };
    checkGoogleSync();
  }, [login, userId]);

  const init = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data?.accessToken) {
        setToken(data.accessToken);
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", data.accessToken);
        }
        setConnected(true);
      }
    } catch (err) {
      console.error("Failed to initialize:", err);
    }
  };

  // Adjust popup position safely in browser
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues
    if (showEventPopup && popupRef.current && calendarRef.current) {
      const popupRect = popupRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.el?.getBoundingClientRect?.();
      if (!calendarRect) return;

      let newX = anchorPoint.x;
      let newY = anchorPoint.y;

      if (newX + popupRect.width > window.innerWidth) {
        newX = window.innerWidth - popupRect.width - 20;
      }
      if (newX < calendarRect.left) newX = calendarRect.left + 10;
      if (newY + popupRect.height > window.innerHeight) {
        newY = window.innerHeight - popupRect.height - 20;
      }
      if (newY < calendarRect.top) newY = calendarRect.top + 10;

      setAnchorPoint({ x: newX, y: newY });
    }
  }, [showEventPopup, anchorPoint]);

  // Date selection handler
  const handleDateSelect = (info) => {
    setSelectInfo(info);
    const isAllDay = info.allDay;
    const start = info.startStr.slice(0, 16);
    const end = info.endStr.slice(0, 16);

    setNewEvent({
      title: "",
      start: start,
      end: end,
      category: "Work",
      allday: isAllDay,
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = async () => {
    if (!newEvent.title) return;
    try {
      const eventToSave = { userId, ...newEvent };
      const res = await fetch("http://localhost:3000/custom/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventToSave),
      });

      if (!res.ok) throw new Error("Failed to save event");
      const savedEvent = await res.json();
      setEvents((prev) => [...prev, savedEvent]);
      fetchEvents();
      setShowEventModal(false);

      // Add to Google Calendar if connected
      if (connected && token) {
        const googleRes = await fetch("http://localhost:3000/calendar/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            summary: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            allday: newEvent.allday,
          }),
        });
        const googleData = await googleRes.json();

        if (googleData?.id) {
          await fetch(`http://localhost:3000/custom/events/${savedEvent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ googleEventId: googleData.id }),
          });
        }
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setEditedTitle(clickInfo.event.title);
    setIsEditing(false);
    setAnchorPoint({
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });
    setShowEventPopup(true);
  };

  const handleUpdateEventTitle = async () => {
    if (!editedTitle || !selectedEvent) return;
    try {
      const res = await fetch(`http://localhost:3000/custom/event/${selectedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });

      if (!res.ok) throw new Error("Failed to update event");
      const updated = await res.json();
      selectedEvent.setProp("title", updated.title);
      setIsEditing(false);
      setShowEventPopup(false);
      fetchEvents();

      if (connected && token && selectedEvent.extendedProps.googleeventid) {
        await fetch(`http://localhost:3000/calendar/events/${selectedEvent.extendedProps.googleeventid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ summary: updated.title }),
        });
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      const googleId = selectedEvent.extendedProps.googleeventid;

      await fetch(`http://localhost:3000/custom/event/${selectedEvent.id}`, {
        method: "DELETE",
      });
      selectedEvent.remove();
      setEvents((prev) => prev.filter((e) => e.id !== parseInt(selectedEvent.id)));
      setShowEventPopup(false);

      if (googleId && token) {
        await fetch(`http://localhost:3000/calendar/events/${googleId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {!calOpen && (
        <Button
          onClick={() => setCalOpen(true)}
          className="-ml-1 px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-blue-700 transition-all"
        >
          
          {sidebarOpen ?<Calendar className="w-6 h-6" />:'' }{ sidebarOpen ?'Calendar':<Calendar className="w-6 h-6"/>}
        </Button>
      )}

      {calOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-7xl h-[90vh] flex flex-col">
            <div className="flex-grow overflow-hidden">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable
                select={handleDateSelect}
                events={events}
                eventClick={handleEventClick}
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                eventColor="#41444a"
                height="100%"
                dayMaxEventRows={3}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              {!connected && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2">
                  <a href={`http://localhost:3001/auth/google?userid=${userId}`}>
                    Sync Google
                  </a>
                </Button>
              )}
              <Button
                onClick={() => setCalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2"
              >
                <X className="w-4 h-4 mr-2" /> Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Event Popup */}
      {showEventPopup && selectedEvent && (
        <div
          ref={popupRef}
          className="absolute bg-white shadow-2xl rounded-3xl border border-gray-100 z-50 w-[400px] overflow-hidden animate-fadeIn"
          style={{ top: `${anchorPoint.y}px`, left: `${anchorPoint.x}px` }}
        >
          <div className="relative p-6 border-b border-gray-100 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowEventPopup(false);
                setIsEditing(false);
              }}
              className="absolute top-3 right-3 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>

            {!isEditing ? (
              <h3 className="text-xl font-bold text-gray-900 pr-10 leading-tight">
                {selectedEvent.title}
              </h3>
            ) : (
              <Input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                autoFocus
                className="mt-2 text-xl font-bold"
              />
            )}

            {selectedEvent.extendedProps?.category && (
              <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {selectedEvent.extendedProps.category}
              </span>
            )}
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {selectedEvent.allDay
                    ? "All-day event"
                    : `${selectedEvent.start?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })} - ${
                        selectedEvent.end?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }) || ""
                      }`}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedEvent.start?.toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <div className="flex gap-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Event
                </Button>
              ) : (
                <Button onClick={handleUpdateEventTitle} className="flex-1">
                  Save Changes
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleDeleteEvent}
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
