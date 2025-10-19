import React, { useState, useRef } from "react";
import ResumePreview from "./ResumePreview";

// Simple icon placeholder
const Icon = ({ children }) => <span className="mr-2">{children}</span>;

export default function ResumeForm() {
  const savedResume = JSON.parse(localStorage.getItem("resume")) || {};
  const previewRef = useRef();

  const [resume, setResume] = useState({
    personalInfo: { name: "", email: "", phone: "", linkedin: "", github: "", leetcode: "" },
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    experience: [],
    ...savedResume,
  });

  const [template, setTemplate] = useState(savedResume.template || "Modern");
  const [newSkill, setNewSkill] = useState("");

  const templates = ["Modern", "Classic", "Professional"];

  // Save resume locally
  const saveResume = () => {
    localStorage.setItem("resume", JSON.stringify({ ...resume, template }));
    alert("Resume saved successfully! 💾");
  };

  // Handle changes for personal info and section items
  const handleChange = (section, key, value, index = null) => {
    setResume((prev) => {
      if (index !== null) {
        const updatedSection = [...prev[section]];
        updatedSection[index] = { ...updatedSection[index], [key]: value };
        return { ...prev, [section]: updatedSection };
      } else {
        return { ...prev, [section]: { ...prev[section], [key]: value } };
      }
    });
  };

  // Add/remove items in sections
  const addItem = (section, newItem) =>
    setResume((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));

  const removeItem = (section, index) => {
    setResume((prev) => {
      const updated = [...prev[section]];
      updated.splice(index, 1);
      return { ...prev, [section]: updated };
    });
  };

  // Add/remove skills
  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setResume((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill("");
  };

  const removeSkill = (index) => {
    setResume((prev) => {
      const updated = [...prev.skills];
      updated.splice(index, 1);
      return { ...prev, skills: updated };
    });
  };

  return (
    <div className="flex gap-6 h-screen p-4 bg-gray-50">
      {/* Left Panel: Form */}
      <div className="w-1/2 bg-white rounded-xl shadow-lg p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">Create Resume</h2>

        {/* Template Selector */}
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <label className="font-semibold text-blue-800 mb-2 block">Choose Template:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border-2 border-blue-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          >
            {templates.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Personal Info */}
        <div className="mb-8 space-y-4 p-4 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-bold text-blue-700 border-b pb-1">Personal Info</h3>
          <div className="grid grid-cols-2 gap-4">
            {["name", "email", "phone", "linkedin", "github", "leetcode"].map((field) => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={resume.personalInfo[field]}
                onChange={(e) => handleChange("personalInfo", field, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Sections */}
        <SectionEditor
          title="Education"
          items={resume.education}
          fields={["degree", "university", "year"]}
          handleChange={(i, key, value) => handleChange("education", key, value, i)}
          addItem={() => addItem("education", { degree: "", university: "", year: "" })}
          removeItem={(i) => removeItem("education", i)}
        />
        <SectionEditor
          title="Projects"
          items={resume.projects}
          fields={["title", "description", "skills"]}
          handleChange={(i, key, value) => handleChange("projects", key, value, i)}
          addItem={() => addItem("projects", { title: "", description: "", skills: [] })}
          removeItem={(i) => removeItem("projects", i)}
        />
        <SectionEditor
          title="Experience"
          items={resume.experience}
          fields={["role", "company", "duration", "description"]}
          handleChange={(i, key, value) => handleChange("experience", key, value, i)}
          addItem={() => addItem("experience", { role: "", company: "", duration: "", description: "" })}
          removeItem={(i) => removeItem("experience", i)}
        />
        <SectionEditor
          title="Certifications"
          items={resume.certifications}
          fields={["name", "issuer", "year"]}
          handleChange={(i, key, value) => handleChange("certifications", key, value, i)}
          addItem={() => addItem("certifications", { name: "", issuer: "", year: "" })}
          removeItem={(i) => removeItem("certifications", i)}
        />

        {/* Skills */}
        <div className="mb-8 bg-gray-100 rounded-lg shadow-inner p-4 border border-gray-300">
          <h3 className="text-xl font-bold text-blue-700 border-b pb-1 mb-3">Skills</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-150 flex items-center">
              <Icon>➕</Icon> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <span key={i} className="bg-blue-300 text-blue-900 text-sm font-medium px-3 py-1.5 rounded-full flex items-center shadow-sm">
                {skill}
                <button onClick={() => removeSkill(i)} className="ml-2 text-blue-700 hover:text-blue-900 font-bold">&times;</button>
              </span>
            ))}
          </div>
        </div>

        {/* Save Button Only */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button onClick={saveResume} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition duration-150">
            <Icon>💾</Icon> Save Resume
          </button>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-1/2 overflow-y-auto max-h-screen">
        <ResumePreview ref={previewRef} resume={resume} template={template} />
      </div>
    </div>
  );
}

// Section Editor Component
const SectionEditor = ({ title, items, fields, handleChange, addItem, removeItem }) => (
  <div className="mb-8 bg-gray-100 rounded-xl shadow-md p-4 border border-gray-300">
    <h3 className="text-xl font-bold text-blue-700 border-b pb-1 mb-3">{title}</h3>

    {items.map((item, i) => (
      <div key={i} className="flex flex-col md:flex-row items-end gap-2 mb-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
        {fields.map((f) => {
          const isTextArea = f === "description";
          const InputComponent = isTextArea ? "textarea" : "input";

          return (
            <InputComponent
              key={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={item[f]}
              onChange={(e) => handleChange(i, f, e.target.value)}
              className={`border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${isTextArea ? "h-20" : ""}`}
              rows={isTextArea ? 3 : undefined}
            />
          );
        })}
        <button
          onClick={() => removeItem(i)}
          className="bg-blue-400 text-blue-900 hover:bg-blue-500 px-3 py-2 rounded-lg mt-2 md:mt-0 font-semibold transition duration-150 flex-shrink-0"
        >
          Remove
        </button>
      </div>
    ))}

    <button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-2 font-semibold shadow-md transition duration-150 flex items-center">
      <Icon>➕</Icon> Add {title.replace("(Optional)", "").trim().slice(0, -1) || "Item"}
    </button>
  </div>
);
