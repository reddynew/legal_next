"use client";
import { useState } from "react";
import { Phone, Mail, Send, PersonStanding, ChevronDown } from "lucide-react";
import axios from "axios";

const formFields = [
  { label: "Name", name: "clientName", required: true, type: "text", icon: PersonStanding },
  { label: "Phone Number", name: "clientPhone", required: true, type: "text", icon: Phone },
  { label: "Email", name: "clientEmail", type: "email", icon: Mail },
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
      "N/A",
      "High Court of Telangana",
      "City Civil Court, Hyderabad",
      "Nampally Criminal Court",
      "Ranga Reddy District Court",
      "Cyberabad Court",
      "Secunderabad Court",
      "LB Nagar Court"
    ],
    note: "If a case is filed"
  },
  { label: "Tell us more about your issue", name: "caseDescription", type: "textarea", required: true },
];

const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

export default function EasyForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    caseCategory: "",
    otherCaseCategory: "",
    jurisdiction: "",
    caseDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateField = (name, value) => {
    const field = formFields.find(f => f.name === name);
    if (field?.required && !value) return `${field.label} is required`;

    if (name === "clientPhone" && value && !phoneRegex.test(value.replace(/\s/g, ''))) return "Enter valid 10-digit phone number";
    if (name === "clientEmail" && value && !emailRegex.test(value)) return "Enter valid email address";

    // Validate Other field
    if (name === "otherCaseCategory" && formData.caseCategory === "Other" && !value) {
      return "Please specify the case category";
    }

    return "";

  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    if (["clientPhone", "clientEmail", "otherCaseCategory"].includes(name)) {
      const error = validateField(name, value);
      if (error) setErrors(prev => ({ ...prev, [name]: error }));
    }

  };

  const validateForm = () => {
    const newErrors = {};
    formFields.forEach(field => {
      const error = validateField(field.name, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });
    // Validate Other field separately
    if (formData.caseCategory === "Other") {
      const error = validateField("otherCaseCategory", formData.otherCaseCategory);
      if (error) newErrors["otherCaseCategory"] = error;
    }


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

    const newEntry = { id: Date.now(), ...formData, createdDate: new Date().toISOString() };
    console.log(newEntry)
    try {
      const res = await axios.post("https://backend.com.jplawsuvidha.com/api/webClients", { newEntry });
      if (res.data.success) {
        alert("Case saved successfully!");
        setFormData({
          clientName: "",
          clientPhone: "",
          clientEmail: "",
          caseCategory: "",
          otherCaseCategory: "",
          jurisdiction: "",
          caseDescription: "",
        });
        setErrors({});
      } else {
        alert("Sorry, case is not submitted!");
      }
    } catch (error) {
      console.error(error);
      alert("Sorry, case is not submitted!");
    }

  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      caseCategory: "",
      otherCaseCategory: "",
      jurisdiction: "",
      caseDescription: "",
    });
    setErrors({});
    setSubmitError("");
  };

  return (<div className="min-h-screen bg-white relative"> <section className="px-4 border"> <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
    {/* Header */} <div className="sm:sticky top-30 sm:h-[700px] sm:flex justify-center items-center"> <div className="text-center px-4"> <h1 className="text-4xl md:text-5xl font-black bg-black bg-clip-text text-transparent mb-4 leading-tight">Get Legal Help</h1> <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
      Connect with verified advocates for your legal needs. Fast, secure, and confidential. </p> <h3 className="text-xl font-bold text-black mt-4">Available 24/7</h3> </div> </div>

    {/* Form */}
    <div className="sm:mt-10 mb-10">
      <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-black p-4 text-white h-[120px] sm:h-[100px]">
          <h2 className="text-2xl font-black mb-2">Submit Your Issue</h2>
          <p className="text-white opacity-90">Fill out the form below and our team will contact you shortly.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {formFields.map((field) => {
            const fieldValue = formData[field.name] || "";
            const hasError = errors[field.name];
            const Icon = field.icon;

            return (
              <div key={field.name} className="flex flex-col">
                <label className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5 text-black-500" />}
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                  {field.note && <div className="text-gray-500 text-sm font-normal ml-auto">({field.note})</div>}
                </label>

                {field.type === "text" && 
                <input type="text" placeholder={field.label} value={fieldValue} 
                onChange={e => handleChange(field.name, e.target.value)} 
                className="w-full h-[50px] border-2 rounded-2xl p-5 bg-white/50 text-gray-600 font-semibold mb-2" />}
                {field.type === "email" && <input type="email" placeholder={field.label} value={fieldValue} onChange={e => handleChange(field.name, e.target.value)} className="w-full h-[50px] border-2 rounded-2xl p-5 bg-white/50 text-gray-900 font-semibold mb-2" />}
                {field.type === "textarea" 
                && <textarea placeholder='Please write your issue here... ' value={fieldValue} 
                onChange={e => handleChange(field.name, e.target.value)} 
                className="w-full border-2 rounded-2xl p-5 min-h-[50px] bg-white/50 text-gray-600 font-semibold mb-2 appearance-none" />}
                {field.type === "select" && (
                  <>
                <div className="relative">
                    <select
                      value={fieldValue}
                      onChange={e => handleChange(field.name, e.target.value)}
                      className="w-full h-[50px] border-2 rounded-2xl p-2 bg-white/50 text-gray-600 font-semibold mb-2 appearance-none"
                    >
                      <option value="">Select Option</option>
                      {(field.options || []).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
    <ChevronDown></ChevronDown>
  </span>
  </div>
                    {formData.caseCategory === "Other" && field.name === 'caseCategory' && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        value={formData.otherCaseCategory}
                        onChange={e => handleChange("otherCaseCategory", e.target.value)}
                        className="mt-2 w-full h-[50px] border-2 rounded-2xl p-5 bg-white/50 text-gray-600 font-semibold mb-2"
                      />
                    )}
                  </>
                )}
        


                {hasError && <p className="text-red-600 text-sm mt-2">{errors[field.name]}</p>}
              </div>
            );
          })}

          {submitError && <div className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl"><p className="text-red-800 font-semibold">{submitError}</p></div>}

          <div className="flex flex-col  sm:flex-row gap-4 pt-4">
            <button type="button" onClick={handleReset} className="flex h-[50px] py-2 px-4 rounded-2xl border-2 border-gray-300 text-gray-800 bg-white font-bold text-lg gap-2 justify-center">Reset Form</button>
            <button type="submit" className="flex h-[50px] py-2 px-4 rounded-2xl font-black border-2 border-gray-300 text-black text-lg items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit Request
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
