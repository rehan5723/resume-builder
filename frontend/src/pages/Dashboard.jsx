import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/ResumeForm";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Skills from "../components/Skills";
import { FiHome, FiBook, FiAward, FiStar, FiMenu, FiLogOut, FiX } from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [selectedTemplate, setSelectedTemplate] = useState("Modern");

  // Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const navItems = [
    { name: "My Resume", icon: <FiHome />, tab: "resume" },
    { name: "Projects", icon: <FiBook />, tab: "projects" },
    { name: "Certifications", icon: <FiAward />, tab: "certifications" },
    { name: "Skills", icon: <FiStar />, tab: "skills" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "resume":
        return <ResumeForm template={selectedTemplate} />;
      case "projects":
        return <Projects />;
      case "certifications":
        return <Certifications />;
      case "skills":
        return <Skills />;
      default:
        return <ResumeForm template={selectedTemplate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-900">
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-blue-200 text-blue-900 shadow-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"}`}>
        
        {/* Header / Toggle */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-blue-300">
          {!isSidebarOpen && <h1 className="text-3xl font-extrabold text-blue-900 ml-1">R</h1>}
          {isSidebarOpen && <h1 className="text-2xl font-bold text-blue-900">Resume Builder</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-900 hover:text-blue-700 text-2xl p-1 rounded-full transition-colors">
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.tab} className="relative group">
              <button
                onClick={() => setActiveTab(item.tab)}
                className={`flex items-center gap-4 px-4 py-3 w-full transition-all duration-200 rounded-xl ${
                  activeTab === item.tab
                    ? "bg-blue-400 text-white shadow-lg border-l-4 border-blue-600"
                    : "hover:bg-blue-300/80 text-blue-900 hover:text-blue-800"
                } ${!isSidebarOpen && 'justify-center'}`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </button>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="relative group p-4 border-t border-blue-300 mt-auto">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full transition-all text-white font-semibold shadow-md ${!isSidebarOpen && 'justify-center'}`}
          >
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 p-6 ${isSidebarOpen ? "ml-64" : "ml-20"} overflow-auto`}>
        {renderContent()}
      </div>
    </div>
  );
}
