import React, { useState } from "react";

export default function Certifications() {
  const [certifications, setCertifications] = useState(() => {
    return JSON.parse(localStorage.getItem("certifications")) || [];
  });
  const [newCert, setNewCert] = useState("");

  const addCertification = () => {
    if (!newCert.trim()) return alert("Certification name required!");
    const updated = [...certifications, newCert];
    setCertifications(updated);
    localStorage.setItem("certifications", JSON.stringify(updated));
    setNewCert("");
  };

  const deleteCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    localStorage.setItem("certifications", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Certifications</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Certification Name"
          className="p-2 border rounded flex-1"
          value={newCert}
          onChange={(e) => setNewCert(e.target.value)}
        />
        <button
          onClick={addCertification}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {certifications.map((cert, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>{cert}</span>
            <button
              onClick={() => deleteCertification(idx)}
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
