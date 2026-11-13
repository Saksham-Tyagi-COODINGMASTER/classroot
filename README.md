# 🌌 CLASSROOT — College Scheduling Portal

<p align="center">
  <img src="screenshots/classroot-banner.png" alt="CLASSROOT Banner" width="100%" />
</p>

<h3 align="center">
  A smarter way to manage classrooms, schedules, faculty, and campus events.
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
</p>

---

## 📖 About The Project

**CLASSROOT** is a college scheduling and classroom management platform designed to simplify academic coordination.

Managing classrooms, faculty schedules, and campus events can become complicated when information is scattered across different systems. CLASSROOT brings these essential operations together in one centralized, intuitive interface.

The platform provides role-oriented experiences for professors and students, helping make academic scheduling more organized, accessible, and efficient.

Built with a focus on usability, visual clarity, and practical campus workflows, CLASSROOT aims to make everyday academic management simpler.

## ✨ Key Features

### 📅 Smart Scheduling
- Organized professor timetables.
- Student-oriented academic agendas.
- Centralized room scheduling.
- Clear visibility into classroom availability.

### 🏫 Interactive Campus Map
- Visual representation of campus floor plans.
- Separate ground-floor and upper-floor layouts.
- Interactive room selection.
- Room names and capacity information.
- Visual indication of room availability and booking status.

### 👨‍🏫 Faculty Directory
- Centralized faculty information.
- Faculty availability indicators.
- Quick access to faculty details.

### 🎉 Campus Events
- Dedicated events dashboard.
- Upcoming and past event categorization.
- Event creation and management.
- Organized campus event information.

### 🔐 Authentication & Access Control
- Google Sign-In integration.
- Institution-specific email restrictions.
- Role-oriented student and professor experiences.
- Session inactivity handling.

### 🎨 Modern User Interface
- Deep Space & Neon-inspired visual theme.
- Clean dashboard layout.
- Responsive interface.
- Interactive navigation and UI elements.
- Consistent visual language across modules.

---

## 🖼️ Project Showcase

> Replace the image paths below with your actual screenshots. Keep the filenames consistent or update the paths accordingly.

### 1. Dashboard

<p align="center">
  <img src="screenshots/dashboard.png" alt="CLASSROOT Dashboard" width="100%" />
</p>

*The central dashboard for navigating the CLASSROOT platform.*

### 2. Interactive Campus Map

<p align="center">
  <img src="screenshots/campus-map.png" alt="Interactive Campus Map" width="100%" />
</p>

*Explore classroom layouts, room information, and availability through an interactive campus map.*

### 3. Professor Timetable

<p align="center">
  <img src="screenshots/professor-schedule.png" alt="Professor Timetable" width="100%" />
</p>

*An organized view of professor schedules and classroom arrangements.*

### 4. Student Agenda

<p align="center">
  <img src="screenshots/student-agenda.png" alt="Student Agenda" width="100%" />
</p>

*Students can view their academic schedules in a structured format.*

### 5. Campus Events

<p align="center">
  <img src="screenshots/events.png" alt="Campus Events" width="100%" />
</p>

*Stay informed about upcoming and past campus events.*

### 6. Faculty Directory

<p align="center">
  <img src="screenshots/faculty-directory.png" alt="Faculty Directory" width="100%" />
</p>

*Find faculty information and check availability.*

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Frontend functionality |
| Vite | Development server and build tooling |
| Node.js | JavaScript runtime |
| Express.js | Backend server |
| Google Identity Services | Authentication |
| Git & GitHub | Version control |
| GitHub Actions | Automated deployment |
| GitHub Pages | Frontend hosting |

---

## 🚀 Getting Started

Follow these instructions to run CLASSROOT locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (20.19+ or 22.12+)
- npm (included with Node.js)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Saksham-Tyagi-COODINGMASTER/classroot.git
```

### 2. Navigate to the Project

```bash
cd classroot
```

### 3. Install Dependencies

```bash
npm install
```

For a clean, lockfile-based installation, you can alternatively use:

```bash
npm ci
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ALLOWED_DOMAIN=iitdh.ac.in
VITE_PROFESSOR_EMAILS=professor1@iitdh.ac.in,professor2@iitdh.ac.in
```

**Configuration:**

| Variable | Description |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `VITE_ALLOWED_DOMAIN` | Permitted institutional email domain |
| `VITE_PROFESSOR_EMAILS` | Comma-separated professor email addresses |

Never commit private credentials or secrets to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal (typically `http://localhost:5173`).

---

## 🏗️ Production Build

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The generated production files are available inside the `dist/` directory.

---

## 🌐 Deployment

CLASSROOT uses **GitHub Actions** for automated frontend deployment to GitHub Pages.

The deployment workflow:

1. Checks out the repository.
2. Sets up Node.js 22.
3. Installs project dependencies.
4. Builds the Vite application.
5. Uploads the `dist/` directory.
6. Deploys the generated artifact to GitHub Pages.

### GitHub Repository Configuration

Configure the following repository secrets or variables for the deployment workflow:

- `VITE_GOOGLE_CLIENT_ID`
- `VITE_ALLOWED_DOMAIN`
- `VITE_PROFESSOR_EMAILS`

The Express backend requires separate hosting because GitHub Pages supports static frontend hosting, not a continuously running Node.js server.

---

## 📂 Project Structure

A simplified overview of the main project files:

```text
classroot/
│
├── .github/
│   └── workflows/          # GitHub Actions deployment
│
├── public/
│   └── assets/             # Static assets and resources
│
├── src/                    # Frontend application source
│
├── screenshots/            # Project screenshots
│
├── server.js               # Express backend entry point
├── googleToken.js          # Google token-related logic
│
├── index.html              # Main HTML entry
├── style.css               # Application styles
├── app.js                  # Application functionality
│
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependency lockfile
│
└── README.md               # Project documentation
```

*Note: The structure above is a simplified overview. Folder names may vary depending on the current implementation.*

---

## 🔮 Future Improvements

Some areas that could be expanded in future versions:

- [ ] Real-time classroom availability updates.
- [ ] Advanced timetable conflict detection.
- [ ] Automated room allocation.
- [ ] Calendar synchronization.
- [ ] Improved mobile experience.
- [ ] Administrative analytics dashboard.
- [ ] Enhanced notification system.
- [ ] More detailed campus navigation.

---

## 🔒 Security

CLASSROOT uses institution-oriented authentication and access controls.

- Google Sign-In for authentication.
- Institutional email domain validation.
- Role-based access to application features.
- Session inactivity management.

Sensitive credentials and environment-specific configuration should never be committed to the repository.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

If you would like to contribute:

1. Fork this repository.
2. Create a new branch.

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes.

```bash
git commit -m "Add: YourFeature"
```

4. Push your branch.

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request.

---

## 👨‍💻 Developer

**Saksham Tyagi**

GitHub: [@Saksham-Tyagi-COODINGMASTER](https://github.com/Saksham-Tyagi-COODINGMASTER)

---

<p align="center">
  <b>CLASSROOT</b>
  <br />
  Making campus scheduling simpler, smarter, and more connected.
  <br /><br />
  ⭐ If you find this project interesting, consider giving the repository a star!
</p>
