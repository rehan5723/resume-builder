
# Resume Builder Web App (Frontend & UI/UX Prototype)

LINK TO THE LIVE PROJECT - https://resume-builder-eta-tan.vercel.app/



## Project Overview
This is a **Resume Builder Web Application** designed to help users create professional resumes quickly and efficiently.  
Currently, this project focuses **only on the frontend and UI/UX design** due to time constraints. The backend and database integration are yet to be implemented.

The application provides a clean and intuitive interface for:

- Selecting resume templates
- Adding personal information, education, projects, skills, certifications, and experience
- Previewing the resume in real-time
- Responsive design compatible with both desktop and mobile

This project is built using **React**, **Tailwind CSS**, and modern frontend practices.

---

## Features (Frontend/UI Only)

- **Responsive Sidebar Navigation** – Navigate between Resume, Projects, Skills, and Certifications sections.
- **Dynamic Form Sections** – Add, edit, and remove multiple entries (e.g., education, projects).
- **Real-time Resume Preview** – See changes instantly with different templates: Modern, Classic, Professional.
- **Template Selector** – Choose from multiple resume templates for different styles.
- **Light & Professional Color Theme** – Smooth UI/UX with a blue-white palette.
- **Login & Registration UI** – Fully designed forms with validation feedback (frontend only).

---

## Tech Stack

**Frontend:**

- React 18
- React Router DOM
- Tailwind CSS v4
- Vite (Build Tool)
- React Icons

**Dev Tools / Libraries:**

- html2pdf.js & jsPDF (planned for future PDF export)
- Axios (ready for future API integration)
- ESLint & Prettier for code quality

---

## Project Structure

```

frontend/
│
├─ src/
│  ├─ components/
│  │  ├─ ResumeForm.jsx
│  │  ├─ ResumePreview.jsx
│  │  ├─ Projects.jsx
│  │  ├─ Skills.jsx
│  │  └─ Certifications.jsx
│  │
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  │
│  ├─ App.jsx
│  └─ main.jsx
│
├─ public/
├─ package.json
└─ tailwind.config.js

---

## How to Run Locally

1. **Clone the repo:**

```bash
git clone <your-repo-url>
cd frontend
````

2. **Install dependencies:**

```bash
npm install
```

3. **Run the app in development mode:**

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

---

## Future Improvements

* **Backend Integration** – Store user data, projects, and resume information in a database.
* **PDF Export** – Generate downloadable PDF resumes using html2pdf.js or jsPDF.
* **Authentication** – Real login & registration with secure token-based auth.
* **Dynamic Templates** – Add more resume templates with customizable colors and fonts.
* **Cloud Deployment** – Connect frontend to a live backend API and deploy the full application.


## Author

**Rehan Maniyar**

* GitHub: [https://github.com/rehan5723]
* LinkedIn: [https://linkedln.com/rehan-maniyar]

---
