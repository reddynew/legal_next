"use client";
import { useState } from "react";

const formFields = [
  {
    label: "Name",
    name: "clientName",
    required: true,
    type: "text"
  },
  {
    label: "Phone Number",
    name: "clientPhone",
    required: true,
    type: "text"
  },
  {
    label: "Email",
    name: "clientEmail",
    type: "email"
  },
  {
    label: "Case Category",
    name: "caseCategory",
    type: "select",
    required: true,
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
    ]
  },
  {
    label: "Case Source (Other)",
    name: "otherCaseSource",
    type: "text",
    showIf: { field: "caseSource", value: "Other" }
  },
  {
    label: "Address",
    name: "clientAddress",
    type: "textarea"
  },
  {
    label: "Case Description",
    name: "caseDescription",
    type: "textarea"
  }
];

const phonePattern = "^(\+?\\d{1,3}[- ]?)?\\d{10}$";

export default function EasyForm() {
  const [formData, setFormData] = useState({});
  const [caseSource, setCaseSource] = useState("");

  // Reset function for full clear
  const handleReset = () => {
    setFormData({});
    setCaseSource("");
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "caseSource") setCaseSource(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem("jp-contact-form");
    const existingData = saved ? JSON.parse(saved) : [];
    
    const newEntry = {
      id: Date.now(),
      ...formData,
      createdDate:new Date().toISOString()
    };
    localStorage.setItem(
      "jp-contact-form",
      JSON.stringify([...existingData, newEntry]) // this can be replaced with api call to backend db
    );
    alert("Case saved successfully!");
    // Reset form
    handleReset();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 py-12">
      <div className="w-full max-w-3xl bg-white border border-black rounded-2xl shadow-lg p-8">
        <div className="text-center font-bold text-4xl font-sans text-black mb-10 tracking-tight">
          Contact Us
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-0 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {formFields.map((field) => {
            if (field.showIf && formData[field.showIf.field] !== field.showIf.value) return null;
            const fieldValue = formData[field.name] || "";

            return (
              <div key={field.name} className="flex flex-col mb-2">
                <label className="font-semibold mb-1 text-black tracking-wide">
                  {field.label}
                  {field.required && (
                    <span className="text-red-600 ml-1">*</span>
                  )}
                </label>

                {/* Text & Email Inputs */}
                {(field.type === "text" || field.type === "email") && (
                  <input
                    type={field.type}
                    required={field.required}
                    className="border border-gray-400 rounded-md p-3 text-black focus:border-black focus:ring-1 focus:ring-black bg-white placeholder-gray-400 transition duration-150"
                    value={fieldValue}
                    pattern={field.name === "clientPhone" ? phonePattern : undefined}
                    title={
                      field.name === "clientPhone"
                        ? "Enter a valid phone number (10 digits, optional country code)"
                        : ""
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    onChange={e =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                )}

                {/* Textarea */}
                {field.type === "textarea" && (
                  <textarea
                    className="border border-gray-400 rounded-md p-3 min-h-[70px] text-black focus:border-black focus:ring-1 focus:ring-black bg-white placeholder-gray-400 transition duration-150"
                    value={fieldValue}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    onChange={e =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                )}

                {/* Select */}
                {field.type === "select" && (
                  <select
                    required={field.required}
                    className="border border-gray-400 rounded-md p-3 text-black bg-white focus:border-black focus:ring-1 focus:ring-black transition duration-150"
                    value={fieldValue}
                    onChange={e =>
                      handleChange(field.name, e.target.value)
                    }
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}

          {/* Action Buttons (span both columns) */}
          <div className="col-span-1 md:col-span-2 flex justify-end items-center gap-4 mt-8">
            <button
              type="button"
              className="px-5 py-2 rounded-md border border-black text-black bg-white font-semibold hover:bg-black hover:text-white transition"
              onClick={handleReset}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md font-bold bg-black text-white border-2 border-black hover:bg-white hover:text-black transition"
            >
              Save Case
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
