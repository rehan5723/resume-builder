import React, { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });
  const [newProject, setNewProject] = useState({ title: "", description: "", skills: "" });

  const saveProjects = (updated) => {
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const addProject = () => {
    if (!newProject.title) return alert("Project title is required!");
    const updated = [...projects, newProject];
    saveProjects(updated);
    setNewProject({ title: "", description: "", skills: "" });
  };

  const deleteProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    saveProjects(updated);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Projects</h2>

      <div className="grid gap-3 mb-4">
        <input
          type="text"
          placeholder="Project Title"
          className="p-2 border rounded"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-2 border rounded"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="p-2 border rounded"
          value={newProject.skills}
          onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
        />
        <button
          onClick={addProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>

      <ul className="space-y-3">
        {projects.map((p, idx) => (
          <li key={idx} className="p-3 border rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-blue-800">{p.title}</h3>
              <p className="text-gray-700">{p.description}</p>
              <p className="text-sm text-gray-500">
                Skills: {p.skills || "N/A"}
              </p>
            </div>
            <button
              onClick={() => deleteProject(idx)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
