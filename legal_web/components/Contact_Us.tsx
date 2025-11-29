"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Send,PersonStanding } from "lucide-react";
import axios from "axios";

const formFields = [
  {
    label: "Name",
    name: "clientName",
    required: true,
    type: "text",
    icon: PersonStanding
  },
  {
    label: "Phone Number",
    name: "clientPhone",
    required: true,
    type: "text",
    icon: Phone
  },
  {
    label: "Email",
    name: "clientEmail",
    type: "email",
    icon: Mail
  },
  {
    label: "Case Category",
    name: "caseCategory",
    type: "select",
    options: [
      "Domestic Violence",
      "Sexual Assault",
      "Harassment",
      "Discrimination",
      "Corporate Law",
      "Family Law",
      "Criminal Law",
      "Civil Rights",
      "Other"
    ]
  },
  {
    label: "Court / Jurisdiction",
    name: "jurisdiction",
    type: "select",
    options: [
      "None",
      "High Court of Telangana",
      "City Civil Court, Hyderabad",
      "Nampally Criminal Court",
      "Ranga Reddy District Court",
      "Cyberabad Court",
      "Secunderabad Court",
      "LB Nagar Court"
    ],
    note: "if case filed"
  },
  {
    label: "Address",
    name: "clientAddress",
    type: "textarea",
    icon: MapPin
  },
  {
    label: "Case Description",
    name: "caseDescription",
    type: "textarea",
    required: true
  }
];

const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EasyForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateField = (name, value) => {
    if (!value && formFields.find(f => f.name === name)?.required) {
      return `${formFields.find(f => f.name === name)?.label} is required`;
    }

    if (name === "clientPhone" && value && !phoneRegex.test(value.replace(/\s/g, ''))) {
      return "Enter valid 10-digit phone number";
    }

    if (name === "clientEmail" && value && !emailRegex.test(value)) {
      return "Enter valid email address";
    }

    return "";
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (name === "clientPhone" || name === "clientEmail") {
      const error = validateField(name, value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    formFields.forEach(field => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    setSubmitError("");
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitError("Please fix the errors above and try again.");
      return;
    }

    const saved = localStorage.getItem("jp-contact-form");
    const existingData = saved ? JSON.parse(saved) : [];

    const newEntry = {
      id: Date.now(),
      ...formData,
      createdDate: new Date().toISOString()
    };

    // localStorage.setItem("jp-contact-form", JSON.stringify([...existingData, newEntry]));
   try {
  const res = await axios.post("http://localhost:3001/api/webClients", {newEntry:newEntry});
  console.log("Server Response:", res.data);
  if(res.data.success == true)
   {
     alert("Case saved successfully!");
    setFormData({});
    setErrors({});
   }
   else{
    alert("Sorry Case is not submitted!")
   }


} catch (error) {
  console.error("Error while saving case:", error);

  if (error.response) {
    // Server returned an error response
    console.error("Server Error:", error.response.data);
     alert("Sorry Case is not submitted!")
  } else if (error.request) {
    // No response from server
    console.error("Network Error: No response from server");
     alert("Sorry Case is not submitted!")
  } else {
    // Other errors
    console.error("Request Error:", error.message);
     alert("Sorry Case is not submitted!")
  }
}
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    setSubmitError("");
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Header Section */}
          <div className="pt-10 pb-4 sm:pt-20 sm:pb-16 text-center text-white mt-0 sm:mt-70">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-black bg-orange-400 bg-clip-text text-transparent mb-4 leading-tight">
                Get Legal Help Today
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Connect with verified advocates for your legal needs. Fast, secure, and confidential.
              </p>
              <div className="">
                <h3 className="text-xl font-bold text-orange-400">Available 24/7</h3>
                <div className="flex items-center gap-3 text-orange-400">
                  {/* <Send className="w-6 h-6 animate-bounce" /> */}
                  {/* <span className="text-lg font-semibold">Response within 2 hours</span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Form */} 
          <div className="sm:mt-20 ">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                <h2 className="text-3xl font-black mb-2">Submit Your Issue</h2>
                <p className="text-orange-100 opacity-90">Fill out the form below and our team will contact you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {formFields.map((field) => {
                  const fieldValue = formData[field.name] || "";
                  const hasError = errors[field.name];
                  const Icon = field.icon;

                  return (
                    <div key={field.name} className="flex flex-col">
                      <label className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-orange-500" />}
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                        {field.note && (
                          <div className="text-gray-500 text-sm font-normal ml-auto">
                            ({field.note})
                          </div>
                        )}
                      </label>

                      {field.type === "text" && (
                        <div className={`relative group `}>
                          <input
                            type="text"
                            className={`w-full border-2 rounded-2xl p-5 pr-12 bg-white/50 backdrop-blur-sm text-gray-900 font-semibold transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-orange-400/50 hover:border-gray-300 ${hasError
                                ? "border-red-400 bg-red-50/50"
                                : "border-gray-200 hover:border-gray-300"
                              }`}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={fieldValue}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        </div>
                      )}

                      {field.type === "email" && (
                        <div className={`relative group `}>
                          <input
                            type="email"
                            className={`w-full border-2 rounded-2xl p-5 pr-12 bg-white/50 backdrop-blur-sm text-gray-900 font-semibold transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-orange-400/50 hover:border-gray-300 ${hasError
                                ? "border-red-400 bg-red-50/50"
                                : "border-gray-200 hover:border-gray-300"
                              }`}
                            placeholder="Enter your email address"
                            value={fieldValue}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        </div>
                      )}

                      {field.type === "textarea" && (
                        <div className={`relative group`}>
                          <textarea
                            className={`w-full border-2 rounded-2xl p-5 pr-12 min-h-[120px] bg-white/50 backdrop-blur-sm text-gray-900 font-semibold resize-vertical transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-orange-400/50 hover:border-gray-300 ${hasError
                                ? "border-red-400 bg-red-50/50"
                                : "border-gray-200 hover:border-gray-300"
                              }`}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={fieldValue}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        </div>
                      )}

                      {field.type === "select" && (
                        <div className={`relative group`}>
                          <select
                            className={`w-full border-2 rounded-2xl p-5 pr-12 bg-white/50 backdrop-blur-sm text-gray-900 font-semibold appearance-none transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-orange-400/50 hover:border-gray-300 ${hasError
                                ? "border-red-400 bg-red-50/50"
                                : "border-gray-200 hover:border-gray-300"
                              }`}
                            value={fieldValue}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {hasError && (
                        <p className="text-red-600 text-sm mt-2 font-semibold flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                })}

                {submitError && (
                  <div className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <p className="text-red-800 font-semibold">{submitError}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-5 px-8 rounded-2xl border-2 border-gray-300 text-gray-800 bg-white font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleReset}
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-5 px-8 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-6 h-6" />
                    Save Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
