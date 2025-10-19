import React, { useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState(() => {
    return JSON.parse(localStorage.getItem("skills")) || [];
  });
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return alert("Skill cannot be empty!");
    const updated = [...skills, newSkill];
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
    setNewSkill("");
  };

  const deleteSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Skills</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a skill"
          className="p-2 border rounded flex-1"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => deleteSkill(idx)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
