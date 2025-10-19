import React, { forwardRef } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaCertificate,
  FaGraduationCap,
  FaBriefcase,
  FaFlask
} from 'react-icons/fa';

// ForwardRef is necessary so ResumeForm can reference this for PDF download
const ResumePreview = forwardRef(({ resume, template }, ref) => {
  const { personalInfo, education, projects, skills, certifications, experience } = resume;

  // --- Template Style Definitions ---
  const templateStyles = {
    Modern: {
      container: "bg-white text-gray-800 p-8 space-y-7 font-sans border-t-4 border-blue-600",
      header: "border-b-2 border-blue-400 pb-4 mb-5 text-center",
      name: "text-4xl font-extrabold text-gray-900 mb-1",
      contact: "flex justify-center flex-wrap gap-x-4 text-gray-700 text-sm",
      sectionWrapper: "block",
      sectionTitle: "text-2xl font-bold text-blue-700 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2",
      itemContainer: "mb-4 pt-1 border-l-4 border-blue-200 pl-4",
      itemTitle: "font-bold text-gray-900 text-lg",
      itemSubtitle: "text-sm font-medium text-gray-600 italic",
      skillsDisplay: "flex flex-wrap gap-2 text-sm",
      skillTag: "bg-blue-200 text-blue-800 px-3 py-0.5 rounded-full font-medium shadow-sm"
    },
    Classic: {
      container: "bg-white text-gray-900 p-8 space-y-6 font-serif border border-gray-400",
      header: "border-b-4 border-gray-700 pb-3 mb-5 text-left",
      name: "text-3xl font-bold uppercase tracking-wider text-gray-900 mb-1",
      contact: "text-sm text-gray-700 space-y-1",
      sectionWrapper: "block",
      sectionTitle: "text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-500 pb-0.5 mt-4 mb-3",
      itemContainer: "mb-3 border-l-2 border-gray-400 pl-3",
      itemTitle: "font-extrabold text-gray-900",
      itemSubtitle: "text-sm text-gray-600 italic",
      skillsDisplay: "grid grid-cols-2 gap-x-4 gap-y-1 text-sm",
      skillTag: "list-disc ml-5"
    },
    Professional: {
      container: "bg-white text-gray-900 p-8 space-y-5 font-sans",
      header: "pb-4 mb-4 border-b-4 border-blue-600",
      name: "text-3xl font-bold text-blue-700",
      contact: "text-sm text-gray-700 space-y-1",
      sectionWrapper: "grid grid-cols-1 md:grid-cols-3 gap-x-6",
      sectionTitle: "text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2 mt-4",
      itemContainer: "mb-3",
      itemTitle: "font-semibold text-gray-900",
      itemSubtitle: "text-xs text-gray-500",
      skillsDisplay: "space-y-1 text-sm",
      skillTag: "flex items-center gap-1"
    }
  };

  const selectedStyle = templateStyles[template] || templateStyles.Modern;

  // Helper to render external links with icons
  const renderContactLink = (label, value) => {
    if (!value) return null;

    let IconComponent;
    if (label === 'LinkedIn') IconComponent = FaLinkedin;
    else if (label === 'GitHub') IconComponent = FaGithub;
    else if (label === 'LeetCode') IconComponent = FaCode;
    else return null;

    const isMono = template === 'Professional';
    const linkClasses = isMono
      ? 'font-mono text-xs text-blue-600 underline'
      : 'text-blue-600 hover:text-blue-800 underline break-words text-sm';
    const iconClasses = template === 'Modern' ? 'w-3 h-3 text-blue-600' : 'w-4 h-4 text-blue-500';

    return (
      <a
        href={value.startsWith('http') ? value : `http://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1 ${linkClasses}`}
      >
        <IconComponent className={iconClasses} />
        {isMono
          ? value.replace(/(https?:\/\/)?(www\.)?/, '')
          : <>
              <span className="font-medium text-gray-700">{label}:</span> {value}
            </>
        }
      </a>
    );
  };

  return (
    <div ref={ref} className={`${selectedStyle.container} min-h-full`}>

      {/* --- Header --- */}
      <div className={selectedStyle.header}>
        <h2 className={selectedStyle.name}>{personalInfo.name || "Your Name"}</h2>
        <div className={selectedStyle.contact}>
          <p className="flex items-center gap-1">
            <FaEnvelope className="w-3 h-3 text-gray-600" /> {personalInfo.email || "email@example.com"}
          </p>
          <p className="flex items-center gap-1">
            <FaPhone className="w-3 h-3 text-gray-600" /> {personalInfo.phone || "Phone"}
          </p>
          {renderContactLink("LinkedIn", personalInfo.linkedin)}
          {renderContactLink("GitHub", personalInfo.github)}
          {renderContactLink("LeetCode", personalInfo.leetcode)}
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className={selectedStyle.sectionWrapper}>

        {/* Sidebar for Professional template */}
        {template === 'Professional' && (
          <div className="col-span-1 border-r border-gray-300 pr-4">
            {/* Skills */}
            {skills?.length > 0 && (
              <section>
                <h3 className={selectedStyle.sectionTitle}>Skills</h3>
                <div className={selectedStyle.skillsDisplay}>
                  {skills.map((skill, i) => (
                    <span key={i} className={selectedStyle.skillTag}>
                      <FaFlask className="w-3 h-3 text-blue-500"/> {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            {/* Certifications */}
            {certifications?.length > 0 && (
              <section>
                <h3 className={selectedStyle.sectionTitle}>Certifications</h3>
                <ul className="list-none text-sm space-y-1">
                  {certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <FaCertificate className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                      <span>
                        <span className="font-semibold">{cert.name || "Certification"}</span>
                        <span className="text-gray-600 block text-xs">{cert.issuer || "Issuer"} ({cert.year || "Year"})</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* Main sections */}
        <div className={template === 'Professional' ? 'col-span-2 pl-4' : 'block'}>

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h3 className={selectedStyle.sectionTitle}>
                {template !== 'Professional' && <FaBriefcase />} Professional Experience
              </h3>
              {experience.map((exp, i) => (
                <div key={i} className={selectedStyle.itemContainer}>
                  <div className="flex justify-between items-start">
                    <p className={selectedStyle.itemTitle}>{exp.role || "Role"} @ {exp.company || "Company"}</p>
                    <p className={selectedStyle.itemSubtitle}>{exp.duration || "Duration"}</p>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{exp.description || "Description of responsibilities and achievements."}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h3 className={selectedStyle.sectionTitle}>
                {template !== 'Professional' && <FaCode />} Key Projects
              </h3>
              {projects.map((proj, i) => (
                <div key={i} className={selectedStyle.itemContainer}>
                  <p className={selectedStyle.itemTitle}>{proj.title || "Project Title"}</p>
                  {proj.skills && <p className={selectedStyle.itemSubtitle}>Tech Stack: {proj.skills}</p>}
                  <p className="text-gray-700 mt-1 text-sm">{proj.description || "Project Description"}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h3 className={selectedStyle.sectionTitle}>
                {template !== 'Professional' && <FaGraduationCap />} Education
              </h3>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className={selectedStyle.itemContainer}>
                    <div className="flex justify-between items-start">
                      <p className={selectedStyle.itemTitle}>{edu.degree || "Degree"}</p>
                      <p className={selectedStyle.itemSubtitle}>{edu.year || "Year"}</p>
                    </div>
                    <p className="text-sm text-gray-700">{edu.university || "University"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills for Modern/Classic */}
          {skills?.length > 0 && template !== 'Professional' && (
            <section>
              <h3 className={selectedStyle.sectionTitle}><FaFlask /> Skills</h3>
              <div className={selectedStyle.skillsDisplay}>
                {skills.map((skill, i) => (
                  <span key={i} className={selectedStyle.skillTag}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications for Modern/Classic */}
          {certifications?.length > 0 && template !== 'Professional' && (
            <section>
              <h3 className={selectedStyle.sectionTitle}><FaCertificate /> Certifications</h3>
              <ul className="list-disc list-inside text-gray-800 text-sm pl-4 space-y-1">
                {certifications.map((cert, i) => (
                  <li key={i}>
                    <span className="font-semibold">{cert.name || "Certification"}</span> from {cert.issuer || "Issuer"} (<span className="text-gray-600">{cert.year || "Year"}</span>)
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
