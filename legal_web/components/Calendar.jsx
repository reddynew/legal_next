"use client";
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Clock, Edit2, Trash2, X, Plus, Calendar, ClipboardIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@/context/LoginContext";
import { calendarService, authService } from "@/lib/api";

const CustomCalendar = ({ value: sidebarOpen }) => {
  const [events, setEvents] = useState([]);
  const [calOpen, setCalOpen] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    category: "Work",
    allDay: false,
  });
  const [selectInfo, setSelectInfo] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStart, setEditedStart] = useState("");
  const [editedEnd, setEditedEnd] = useState("");
  const [token, setToken] = useState(null);
  const [connected, setConnected] = useState(false);
  const [durationMode, setDurationMode] = useState("30"); // "30", "60", or "custom"


  const calendarRef = useRef(null);
  const popupRef = useRef(null);

  const { login, id: userId } = useAuth();


  const toLocalISOString = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };


  const fromLocalISOString = (str) => {
    if (!str) return new Date();
    const [datePart, timePart] = str.split('T');
    const [y, m, d] = datePart.split('-').map(Number);
    const [h, min] = timePart.split(':').map(Number);
    return new Date(y, m - 1, d, h, min);
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  // Fetch events from custom API
  const fetchEvents = async () => {
    try {
      const data = await calendarService.getEvents();
      console.log('calendar events fetched', data);

      if (Array.isArray(data)) {
        const mappedEvents = data.map(item => ({
          id: String(item.id),
          title: item.data?.title || "No Title",
          start: item.data?.start,
          end: item.data?.end,
          allDay: item.data?.allDay || false,
          extendedProps: {
            ...item.data,
            category: item.data?.category || "Work",
            backendId: item.id,
            email: item.email
          }
        }));
        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };





  // Date selection handler
  const handleDateSelect = (info) => {
    setSelectInfo(info);
    console.log('info from the date select', info)
    const isAllDay = false;

    // Use the selected start time or default to now if not available
    const now = new Date();
    const startTime = new Date(info.start || now);
    console.log('start time from date select', startTime)

    // If selecting from month view or all-day slot, default the time to "now"
    // to avoid starting at 00:00 (start of day)
    if (isAllDay) {
      startTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
    }

    const startTimeStr = toLocalISOString(startTime);


    // Force end time to be exactly 30 mins from the start
    const endTime = new Date(startTime.getTime() + 30 * 60000);
    const endTimeStr = toLocalISOString(endTime);

    setNewEvent({
      title: "",
      start: startTimeStr,
      end: endTimeStr,
      category: "Work",
      allDay: isAllDay,
    });
    setDurationMode("30");
    setShowEventModal(true);
  };

  // Helper to calculate end time based on duration
  const handleDurationChange = (minutes) => {
    if (!newEvent.start) return;
    // Parse existing start as local time before adding duration
    const startTime = fromLocalISOString(newEvent.start);
    const endTime = new Date(startTime.getTime() + minutes * 60000);
    console.log('end time is ', endTime)
    const endTimeStr = toLocalISOString(endTime);
    setNewEvent({ ...newEvent, end: endTimeStr });
  };

  const handleSaveEvent = async () => {
    if (!newEvent.title || !newEvent.start) return;

    // Normalize dates
    let start = newEvent.start;
    let end = newEvent.end;

    if (newEvent.allDay) {
      start = start.split("T")[0];
      end = end ? end.split("T")[0] : start;
    }

    // Create TEMP event (UI first)
    const tempId = `temp-${Date.now()}`;

    const optimisticEvent = {
      id: tempId,
      title: newEvent.title,
      start,
      end,
      allDay: newEvent.allDay,
      extendedProps: {
        category: newEvent.category,
        optimistic: true,
      },
    };

    // ✅ ADD TO CALENDAR IMMEDIATELY
    setEvents((prev) => [...prev, optimisticEvent]);

    // Close modal instantly
    setShowEventModal(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      category: "Work",
      allDay: false,
    });

    // 🔄 TRY saving to backend (non-blocking UI)
    try {
      const saved = await calendarService.createEvent({
        title: optimisticEvent.title,
        start,
        end,
        allDay: optimisticEvent.allDay,
        category: optimisticEvent.extendedProps.category,
      });

      // 🔁 Replace temp event with real DB event
      setEvents((prev) =>
        prev.map((e) =>
          e.id === tempId
            ? {
              ...e,
              id: saved.id ? String(saved.id) : tempId,
              extendedProps: {
                ...e.extendedProps,
                optimistic: false,
              },
            }
            : e
        )
      );
    } catch (err) {
      console.error("Backend save failed, keeping local event");

      // OPTIONAL: mark event as unsynced
      setEvents((prev) =>
        prev.map((e) =>
          e.id === tempId
            ? {
              ...e,
              extendedProps: {
                ...e.extendedProps,
                syncError: true,
              },
            }
            : e
        )
      );
    }
  };


  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent(event);
    setEditedTitle(event.title);
    setEditedStart(toLocalISOString(event.start));
    setEditedEnd(toLocalISOString(event.end));
    setIsEditing(false);
    setShowEventPopup(true);
  };

  const handleUpdateEvent = async () => {
    if (!editedTitle || !selectedEvent) return;
    try {
      const eventData = {
        title: editedTitle,
        start: fromLocalISOString(editedStart).toISOString(), // Convert to UTC
        end: fromLocalISOString(editedEnd).toISOString(),     // Convert to UTC
        allDay: selectedEvent.allDay,
        category: selectedEvent.extendedProps?.category || "Work"
      };

      const updated = await calendarService.updateEvent(selectedEvent.id, eventData);

      // Fail-safe: Use backend title if available, otherwise keep local edit
      const finalTitle = (updated && updated.title) ? updated.title : editedTitle;

      selectedEvent.setProp("title", finalTitle);
      selectedEvent.setProp("start", fromLocalISOString(editedStart));
      selectedEvent.setProp("end", fromLocalISOString(editedEnd));

      setIsEditing(false);
      setShowEventPopup(false);

      if (connected && token && selectedEvent.extendedProps.googleeventid) {
        await calendarService.updateGoogleEvent(selectedEvent.extendedProps.googleeventid, updated.title);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      const googleId = selectedEvent.extendedProps.googleeventid;

      console.log('selected event is', selectedEvent.id)

      await calendarService.deleteEvent(selectedEvent.id);
      selectedEvent.remove();
      // Use String comparison for IDs (removes parseInt to support UUIDs)
      setEvents((prev) => prev.filter((e) => String(e.id) !== String(selectedEvent.id)));
      setShowEventPopup(false);

      if (googleId && token) {
        await calendarService.deleteGoogleEvent(googleId);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col  justify-center py-1">
      {!calOpen && (
        <Button
          onClick={() => setCalOpen(true)}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-blue-700 transition-all"
        >
          {sidebarOpen ? <Calendar className="w-6 h-6" /> : ''}
          {sidebarOpen ? 'Calendar' : <Calendar className="w-6 h-6" />}
        </Button>
      )}

      {calOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-7xl h-[90vh] flex flex-col">
            <button
              onClick={() => { setCalOpen(false), setShowEventPopup(false) }}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
            </button>
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
                timeZone="local"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                onClick={() => { setCalOpen(false), setShowEventPopup(false) }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2"
              >
                <X className="w-4 h-4 mr-2" /> Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 w-full max-w-lg transition-all animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">New Event</h3>
                <p className="text-sm text-gray-500">Add a new entry to your calendar</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEventModal(false)}
                className="h-10 w-10 p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="event-title" className="text-sm font-semibold text-gray-700 ml-1">
                  What's the occasion?
                </Label>
                <div className="relative group">
                  <Input
                    id="event-title"
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event title"
                    className="w-full h-12 bg-gray-50/50 border-gray-200 text-gray-900 rounded-xl placeholder:text-gray-400 focus:bg-white transition-all duration-200 focus:ring-4 focus:ring-gray-100 focus:border-gray-300"
                    autoFocus
                  />
                </div>
              </div>

              {!newEvent.allDay && (
                <div className="grid grid-cols-1 gap-6">
                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label htmlFor="event-start" className="text-sm font-semibold text-gray-700 ml-1">
                      Start Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="event-start"
                        type="datetime-local"
                        value={newEvent.start}
                        onChange={(e) => {
                          setNewEvent({ ...newEvent, start: e.target.value });
                          if (durationMode !== "custom") {
                            const minutes = durationMode === "30" ? 30 : 60;
                            const startTime = fromLocalISOString(e.target.value);
                            const endTime = new Date(startTime.getTime() + minutes * 60000);
                            setNewEvent(prev => ({ ...prev, end: toLocalISOString(endTime) }));
                          }
                        }}
                        className="w-full h-12 bg-gray-50/50 border-gray-200 text-gray-900 rounded-xl focus:bg-white transition-all focus:ring-4 focus:ring-gray-100"
                      />
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 ml-1">
                      Duration
                    </Label>
                    <div className="flex p-1 bg-gray-100/80 rounded-2xl gap-1">
                      {["30", "60", "custom"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => {
                            setDurationMode(mode);
                            if (mode !== "custom") handleDurationChange(parseInt(mode));
                          }}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${durationMode === mode
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                          {mode === "30" ? "30m" : mode === "60" ? "1h" : "Custom"}
                        </button>
                      ))}
                    </div>

                    {/* Custom End Time */}
                    {durationMode === "custom" && (
                      <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                        <Label htmlFor="event-end" className="text-sm font-semibold text-gray-700 ml-1 mb-2 block">
                          End Time
                        </Label>
                        <Input
                          id="event-end"
                          type="datetime-local"
                          value={newEvent.end}
                          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                          className="w-full h-12 bg-gray-50/50 border-gray-200 text-gray-900 rounded-xl focus:bg-white transition-all focus:ring-4 focus:ring-gray-100"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="event-category" className="text-sm font-semibold text-gray-700 ml-1">
                    Category
                  </Label>
                  <select
                    id="event-category"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full h-12 px-4 bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl appearance-none focus:bg-white transition-all focus:ring-4 focus:ring-gray-100 focus:border-gray-300 outline-none cursor-pointer font-medium"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* All-day */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 ml-1">
                    Duration
                  </Label>
                  <label className="flex items-center gap-3 h-12 px-4 bg-gray-50/50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100/50 transition-colors group">
                    <input
                      type="checkbox"
                      id="allday"
                      checked={newEvent.allDay}
                      onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">All-day</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-10">
              <Button
                variant="outline"
                onClick={() => setShowEventModal(false)}
                className="flex-1 h-12 rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                Discard
              </Button>
              <Button
                onClick={handleSaveEvent}
                className="flex-1 h-12 rounded-xl bg-gray-900 text-white font-bold hover:bg-black shadow-lg shadow-gray-200 transition-all active:scale-[0.98]"
                disabled={!newEvent.title}
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
      )}

      {showEventPopup && selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div
            ref={popupRef}
            className="relative bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] rounded-[2.5rem] border border-gray-100 z-[70] w-full max-w-md overflow-hidden animate-in zoom-in duration-300"
          >
            <div className="p-8 pb-0">
              <div className="flex justify-end absolute top-5 right-5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowEventPopup(false);
                    setIsEditing(false);
                  }}
                  className="h-10 w-10 p-0 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="pr-10 mt-2">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Event Name</Label>
                      <h3 className="text-2xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        {selectedEvent.title}
                      </h3>
                    </div>
                    {selectedEvent.extendedProps?.category && (
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${selectedEvent.extendedProps.category === 'Work' ? 'bg-blue-500' :
                          selectedEvent.extendedProps.category === 'Personal' ? 'bg-emerald-500' :
                            selectedEvent.extendedProps.category === 'Meeting' ? 'bg-violet-500' :
                              'bg-gray-400'
                          }`} />
                        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                          {selectedEvent.extendedProps.category}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Event Name</Label>
                      <Input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        autoFocus
                        className="h-12 text-xl font-bold border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col gap-4">
                {/* Event Time Info */}
                {!isEditing ? (
                  <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100/50">
                    <div className="h-12 w-12 flex items-center justify-center bg-white rounded-2xl shadow-sm text-gray-900">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1.5">
                        {selectedEvent.allDay
                          ? "Full Day"
                          : `${selectedEvent.start?.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })} — ${selectedEvent.end?.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }) || ""
                          }`}
                      </p>
                      <p className="text-xs font-semibold text-gray-500">
                        {selectedEvent.start?.toLocaleDateString([], {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Start Time</Label>
                      <Input
                        type="datetime-local"
                        value={editedStart}
                        onChange={(e) => setEditedStart(e.target.value)}
                        className="h-12 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-100 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">End Time</Label>
                      <Input
                        type="datetime-local"
                        value={editedEnd}
                        onChange={(e) => setEditedEnd(e.target.value)}
                        className="h-12 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-100 transition-all font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-gray-900 hover:bg-black text-white h-14 rounded-2xl shadow-lg shadow-gray-200 font-bold transition-all active:scale-[0.98]"
                    >
                      <Edit2 className="h-4 w-4 mr-2" /> Modify
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateEvent}
                      className="flex-1 bg-gray-900 hover:bg-black text-white h-14 rounded-2xl shadow-lg shadow-gray-200 font-bold transition-all active:scale-[0.98]"
                    >
                      Confirm Changes
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={handleDeleteEvent}
                    className="h-14 w-14 p-0 rounded-2xl border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-[0.98]"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;