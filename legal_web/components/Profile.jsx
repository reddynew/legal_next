"use client";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { ArrowLeft, Pencil, X } from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";

// --- Colors (you can tweak these or keep original) ---
const COLORS = {
  black: "#16161a",
  gold: "#ffd600",
  accent: "#228be6",
  gray: "#f6f7fb",
};

const PhotoUpdateModal = ({ onClose, onImageSelect }) => {
  const [preview, setPreview] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setShowWebcam(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-white/90">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative border-t-8" style={{ borderTopColor: COLORS.gold }}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close photo modal"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold mb-4 text-gray-900">Update Profile Photo</h2>

        {!showWebcam ? (
          <>
           <label className="flex items-center gap-2 cursor-pointer">
  <span className="bg-blue-600 text-white px-3 py-1 rounded mb-4">Upload Image</span>
  <span className="text-gray-500 text-sm mb-4">No file chosen</span>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    className="hidden"
    onChange={handleFileChange}
  />
</label>
            <button
              type="button"
              className="bg-[#228be6] text-white px-4 py-2 rounded-full w-full mb-3 font-bold"
              onClick={() => setShowWebcam(true)}
            >
              Use Webcam
            </button>
            <p className="text-sm text-gray-400 mb-2">
              <b>Mobile:</b> Tap to use the camera.<br />
              <b>Laptop:</b> Use webcam or pick a file.
            </p>
            {preview && (
              <img src={preview} alt="Preview" className="mb-3 w-32 h-32 object-cover rounded-full mx-auto border-4" style={{ borderColor: COLORS.gold }} />
            )}
            <button
              className="bg-[#228be6] text-white px-5 py-2 rounded-full w-full mt-2 disabled:bg-gray-400 font-bold"
              onClick={() => { if (preview) { onImageSelect(preview); onClose(); } }}
              disabled={!preview}
            >
              Save Photo
            </button>
          </>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="mb-3 w-full rounded"
              videoConstraints={{ facingMode: "user" }}
            />
            <div className="flex justify-between">
              <button
                className="bg-[#ffd600] text-[#16161a] px-4 py-2 rounded-full font-bold"
                onClick={handleCapture}
              >
                Capture
              </button>
              <button
                className="bg-[#228be6] text-white px-4 py-2 rounded-full font-bold"
                onClick={() => setShowWebcam(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Adv. Jagath Reddy vemula',
    email: 'jagath.vemula@example.com',
    photo: 'https://via.placeholder.com/120',
    phone: '',
    address: '',
    state: '',
    zipcode: '',
    barCouncilId: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('advocate_profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // For API integration (after localStorage, see comment)
  const handleSave = async () => {
    localStorage.setItem('advocate_profile', JSON.stringify(profile));
    setEditMode(false);

    // API integration example:
    // try {
    //   const resp = await fetch("/api/profile", {
    //     method: "PUT",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(profile),
    //   });
    //   if (!resp.ok) throw new Error('Failed to save profile!');
    // } catch (error) { console.error(error); }
  };

  const handleImageUpdate = (imageData) => {
    const updatedProfile = { ...profile, photo: imageData };
    setProfile(updatedProfile);
    localStorage.setItem("advocate_profile", JSON.stringify(updatedProfile));
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ background: COLORS.gray, minHeight: "100vh" }}>
      {/* Header */}
      <div className="bg-black shadow-sm border-b border-gray-200" style={{ background: COLORS.black }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href='/PersonalDashboard' replace className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <>
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform text-white" />
                <span className="font-medium text-white">Back to Dashboard</span>
              </></Link>
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-14 h-14 bg-white flex items-center rounded-lg justify-center">
                <img src="/jpicon4.png" alt="img" className="w-14 h-14 rounded-lg" />
              </div>
              <span className="text-xl font-semibold text-white font-serif">JP Law Suvidha</span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto ">
          <div className="bg-white shadow-xl rounded-2xl p-8 bg-gradient-to-br from-gray-200 via-gold to-black">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6 relative">
              <div className="relative group w-28 h-28 mb-4">
                <img
                  src={profile.photo}
                  alt="Advocate"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-200"
                />
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md cursor-pointer"
                  title="Edit photo"
                >
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
                {showModal && (
                  <PhotoUpdateModal
                    onClose={() => setShowModal(false)}
                    onImageSelect={handleImageUpdate}
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <div className="space-y-7">
              {/* 1. Personal Details */}
              <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div className="text-gray-800 border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-sm">
                      {profile.name || '-'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <div className="text-gray-800 border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-sm">
                      {profile.email || '-'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Bar Council ID</label>
                    <div className="text-gray-800 border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-sm">
                      {profile.barCouncilId || '-'}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* 2. Demographic Details */}
              <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-200">
                <div className='flex  gap-4'>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Demographic Details</h3>
                  <div className='mt-1'>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-gray-500 hover:text-gray-700 transition"
                      aria-label="Edit Demographic Details"
                    >
                      {!editMode && <Pencil size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    {editMode
                      ? <input type="text" value={profile.state} onChange={(e) => handleInputChange('state', e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                      : <p className="text-gray-800 border border-gray-300 rounded-lg p-4 shadow-sm bg-white">{profile.state || '-'}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    {editMode
                      ? <input type="text" value={profile.zipcode} onChange={(e) => handleInputChange('zipcode', e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                      : <p className="text-gray-800 border border-gray-300 rounded-lg p-4 shadow-sm bg-white">{profile.zipcode || '-'}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    {editMode
                      ? <textarea rows={3} value={profile.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                      : <p className="text-gray-800 whitespace-pre-line border border-gray-300 rounded-lg p-4 shadow-sm bg-white">{profile.address || '-'}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {editMode
                      ? <input type="text" value={profile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                      : <p className="text-gray-800 border border-gray-300 rounded-lg p-4 shadow-sm bg-white">{profile.phone || '-'}</p>}
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  {editMode && (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-[#228be6] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="text-gray-600 hover:text-gray-800 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
              <hr />
              {/* 3. Credentials */}
              <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Credentials</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <p className="text-gray-800">
                    ••••••••
                    <Link href="/reset_password" className="text-blue-600 hover:underline ml-2">Reset Password</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
