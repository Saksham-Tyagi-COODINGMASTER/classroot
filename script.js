/* ======================================================================
   CLASSROOT — College Scheduling Portal
   Demo front end: bookings and sign-in are stored locally in this browser.
   Replace the clearly marked room, schedule and credential data below
   with official data before deployment.
   ====================================================================== */

// ======================================================================
// 1. ROOM DATA
// ======================================================================
// TODO: ADD ROOM NAMES AND CAPACITIES HERE.
// The blueprint map divides the circular building evenly between the rooms
// listed for each floor (keep an even number of rooms, 12 is the design size).
const ROOM_DATA = {
  "Lower Ground Floor": [
    { roomName: "LG-01", capacity: 60 },
    { roomName: "LG-02", capacity: 70 },
    { roomName: "LG-03", capacity: 60 },
    { roomName: "LG-04", capacity: 70 },
    { roomName: "LG-05", capacity: 60 },
    { roomName: "LG-06", capacity: 70 },
    { roomName: "LG-07", capacity: 60 },
    { roomName: "LG-08", capacity: 70 },
    { roomName: "LG-09", capacity: 60 },
    { roomName: "LG-10", capacity: 70 },
    { roomName: "LG-11", capacity: 60 },
    { roomName: "LG-12", capacity: 70 }
  ],

  "Ground Floor": [
    { roomName: "001", capacity: 120 },
    { roomName: "002", capacity: 150 },
    { roomName: "003", capacity: 150 },
    { roomName: "004", capacity: 150 },
    { roomName: "005", capacity: 150 },
    { roomName: "006", capacity: 150 },
    { roomName: "007", capacity: 150 },
    { roomName: "008", capacity: 150 },
    { roomName: "009", capacity: 150 },
    { roomName: "010", capacity: 150 },
    { roomName: "011", capacity: 150 },
    { roomName: "012", capacity: 35 }
  ],

  "1st Floor": [
    { roomName: "101", capacity: 135 },
    { roomName: "102", capacity: 135 },
    { roomName: "103", capacity: 135 },
    { roomName: "104", capacity: 135 },
    { roomName: "105", capacity: 135 },
    { roomName: "106", capacity: 300 },
    { roomName: "107", capacity: 158 },
    { roomName: "108", capacity: 158 },
    { roomName: "109", capacity: 158 },
    { roomName: "110", capacity: 158 },
    { roomName: "111", capacity: 158 },
    { roomName: "112", capacity: 158 }
  ],

  "2nd Floor": [
    { roomName: "201", capacity: 72 },
    { roomName: "202", capacity: 72 },
    { roomName: "203", capacity: 72 },
    { roomName: "204", capacity: 72 },
    { roomName: "205", capacity: 72 },
    { roomName: "206", capacity: 72 },
    { roomName: "207", capacity: 72 },
    { roomName: "208", capacity: 72 },
    { roomName: "209", capacity: 72 },
    { roomName: "210", capacity: 72 },
    { roomName: "211", capacity: 72 },
    { roomName: "212", capacity: 72 }
  ],

  "3rd Floor": [
    { roomName: "301", capacity: 84 },
    { roomName: "302", capacity: 84 },
    { roomName: "303", capacity: 84 },
    { roomName: "304", capacity: 84 },
    { roomName: "305", capacity: 84 },
    { roomName: "306", capacity: 84 },
    { roomName: "307", capacity: 84 },
    { roomName: "308", capacity: 84 },
    { roomName: "309", capacity: 84 },
    { roomName: "310", capacity: 84 },
    { roomName: "311", capacity: 84 },
    { roomName: "312", capacity: 84 }
  ]
};

// ======================================================================
// 1b. SLOTS TAB — SEARCH & FILTER CONFIGURATION
// ======================================================================
// ---------- SUBJECT FILTER ----------
// Subjects offered in the "Subject" dropdown on the Slots tab. A room matches a
// subject when (a) the subject appears in a timetable class or booking held in
// that room, or (b) the room is listed for it in ROOM_SUBJECTS below. Matching is
// case-insensitive and "contains", so "Data Structures" also finds "Data Structures Lab".
const SUBJECT_OPTIONS = [
    "Computer Programming",
    "Engineering Mechanics",
    "CS Programming / Engineering / Science Lab",
    "Linear Algebra",
    "Intro to Mechanical Engineering",
    "Intro to Mechanical Engineering Lab",
    "Design Thinking & Creativity",
    "Formal Communication",
    "Calculus",
    "Electrical Systems & Electronics",
    "Quantum Physics",
    "Chemistry",
    "Co-curricular Activities"
];

const AUTO_INCLUDE_SCHEDULE_SUBJECTS = false;

// Optional: permanently tie subjects to rooms (e.g. a lab that is always used for one subject),
// even when nothing is scheduled there yet.
const ROOM_SUBJECTS = {
  "UF-05": ["Programming"],
  "UF-06": ["Programming"]
  // TODO: ADD MANUALLY MANAGED SUBJECTS HERE (room → subject links), e.g. "LG-03": ["Digital Logic", "Electronics"],
};

// ---------- SEAT SIZE FILTER ----------
// Capacity ranges for the "Seat size" dropdown. min/max are inclusive seat counts
// (use Infinity for "no upper limit"). Keep ranges from overlapping.
const SEAT_CATEGORIES = [
  { label: "Up to 35 seats", min: 0,   max: 35 },
  { label: "36–60 seats",    min: 36,  max: 60 },
  { label: "61–119 seats",   min: 61,  max: 119 },
  { label: "120+ seats",     min: 120, max: Infinity }
  // ┌──────────────────────────────────────────────────────────────────────┐
  // │ TODO: ADD MANUALLY MANAGED SEAT SIZES HERE                           │
  // │ e.g. { label: "200+ seats", min: 200, max: Infinity }                │
  // │ (adjust the ranges above so they don't overlap)                      │
  // └──────────────────────────────────────────────────────────────────────┘
];

// ======================================================================
// 1c. OFFICE DIRECTORY (professor office locations + consultation hours)
// ======================================================================
// One entry per professor. `email` links an entry to a professor login so that
// professor can edit their own office from the Office tab (changes are saved in
// this browser and override the values below). Everyone can view the directory.
//   windows: [{ days: ["Mon","Wed"], start: "14:00", end: "16:00" }]   (24-hour times)
const OFFICE_DIRECTORY = [
  { email: "professor@clt.edu", name: "Professor", department: "Computer Science", location: "Block A, Room 302", windows: [{ days: ["Mon", "Wed"], start: "14:00", end: "16:00" }], notes: "Email ahead for project discussions." },
  { email: "a.rao@clt.edu",     name: "Dr. A. Rao",     department: "Mathematics",   location: "Block B, Room 114", windows: [{ days: ["Tue", "Thu"], start: "11:00", end: "12:30" }], notes: "" },
  { email: "s.mehta@clt.edu",   name: "Prof. S. Mehta", department: "Electronics",   location: "Block A, Room 210", windows: [{ days: ["Mon", "Fri"], start: "10:00", end: "11:00" }], notes: "Walk-ins welcome during consultation hours." },
  { email: "k.nair@clt.edu",    name: "Dr. K. Nair",    department: "Physics",       location: "Block C, Room 021", windows: [{ days: ["Wed"], start: "15:00", end: "17:00" }], notes: "" },
  { email: "l.iyer@clt.edu",    name: "Prof. L. Iyer",  department: "Computer Science", location: "Block A, Room 305", windows: [{ days: ["Tue", "Thu"], start: "14:00", end: "15:30" }], notes: "Lab queries at the Programming Lab (UF-06)." },
  { email: "r.das@clt.edu",     name: "Ms. R. Das",     department: "Communication", location: "Block D, Room 102", windows: [], notes: "By appointment only." },
  { email: "professor2@clt.edu", name: "Professor 2", department: "Mathematics", location: "Block B, Room 120", windows: [{ days: ["Tue", "Thu"], start: "15:00", end: "16:30" }], notes: "" },
  // TODO: CONFIGURE PROFESSOR OFFICE DETAILS HERE (add one { email, name, department, location, windows, notes } object per professor)
];

// ======================================================================
// 2. TIMETABLE STRUCTURE
// ======================================================================
// Days shown on the Schedule tab. These must match the data-day values on
// the day buttons in index.html. There are strictly no classes on Sunday.
const SCHEDULE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ASYMMETRIC TIME BLOCKS — each day pattern has its own slots.
// Every `slot` value in the schedule arrays below must be one of these exact
// labels for that day (note the en dash, 24-hour clock).
//   MON / WED / FRI : 8:30–9:25, 9:30–10:25, 10:30–11:25, 11:30–12:25, 2:00–5:00 PM
//   TUE / THU       : 8:30–9:55, 10:00–11:25, 11:30–12:30, 2:00–4:00 PM
//   SAT             : 10:30–12:30
const DAY_PATTERNS = [
  { id: "MWF", label: "Mon · Wed · Fri", days: ["Monday", "Wednesday", "Friday"],
    slots: ["08:30–09:25", "09:30–10:25", "10:30–11:25", "11:30–12:25", "14:00–17:00"],
    breakAfter: "11:30–12:25", breakLabel: "12:25–14:00" },
  { id: "TTH", label: "Tue · Thu", days: ["Tuesday", "Thursday"],
    slots: ["08:30–09:55", "10:00–11:25", "11:30–12:30", "14:00–16:00"],
    breakAfter: "11:30–12:30", breakLabel: "12:30–14:00" },
  { id: "SAT", label: "Saturday", days: ["Saturday"],
    slots: ["10:30–12:30"], breakAfter: "", breakLabel: "" }
];
function patternFor(day) { return DAY_PATTERNS.find(pattern => pattern.days.includes(day)) || null; }
function slotsFor(day) { const pattern = patternFor(day); return pattern ? pattern.slots : []; }
// Union of every distinct slot label (sorted by start time) — used where a day is not known yet.
const SCHEDULE_SLOTS = [...new Set(DAY_PATTERNS.flatMap(pattern => pattern.slots))]
  .sort((x, y) => x.localeCompare(y) || 0);
// Weekdays default to today; Sunday has no classes so the portal opens on Monday instead.
function defaultDay() { const t = todayName(); return SCHEDULE_DAYS.includes(t) ? t : "Monday"; }

// ======================================================================
// 3. CLASS TIMETABLES — one data array per login role.
// The Schedule tab shows professorScheduleData to Professors and
// studentScheduleData to Students (two completely different views).
// Each object is one scheduled class:
//   day      one of SCHEDULE_DAYS (Monday … Saturday — no Sunday classes)
//   slot     one of slotsFor(day) (e.g. "08:30–09:25" on Monday, "10:30–12:30" on Saturday)
//   room     a room name from ROOM_DATA above (e.g. "LG-01")
//   subject  class / subject title
//   batch    batch or cohort name
//   faculty  (student data) lecturer's name
//   type     "regular" or "extra"
//   owner    (optional) the login email this class belongs to, e.g. "student2@college.edu".
//            Use an array for a class shared by several accounts: ["student@clt.edu", "student2@college.edu"].
//            Leave it out and the class belongs to the first demo account of that role.
//   Every account sees only its own classes on the Schedule tab, but ALL classes feed the
//   Slots tab together, so a room shows Booked/Clash for everyone's classes.
// ======================================================================

// ---------- PROFESSOR TIMETABLE (teaching schedule) ----------
const professorScheduleData = [

    // ==========================================
    // PROFESSOR 1 — EE 101
    // ==========================================

    {
        day: "Monday",
        slot: "10:30–11:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        type: "regular",
        owner: "professor@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "11:30–12:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        type: "regular",
        owner: "professor@clt.edu"
    },
    {
        day: "Friday",
        slot: "08:30–09:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        type: "regular",
        owner: "professor@clt.edu"
    },


    // ==========================================
    // PROFESSOR 2 — MA 1XX
    // ==========================================

    {
        day: "Tuesday",
        slot: "11:30–12:30",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "professor2@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "08:30–09:25",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "professor2@clt.edu"
    },
    {
        day: "Friday",
        slot: "09:30–10:25",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "professor2@clt.edu"
    }

];

// ---------- STUDENT TIMETABLE (class slot view) ----------
const studentScheduleData = [

    // ==========================================
    // STUDENT 1
    // ==========================================

    // MONDAY
    {
        day: "Monday",
        slot: "09:30–10:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Monday",
        slot: "10:30–11:25",
        room: "106",
        subject: "Engineering Mechanics",
        batch: "ME 201",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Monday",
        slot: "14:00–17:00",
        room: "LAB",
        subject: "CS Programming / Engineering / Science Lab",
        batch: "LAB",
        type: "regular",
        owner: "student@clt.edu"
    },

    // TUESDAY
    {
        day: "Tuesday",
        slot: "11:30–12:30",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Tuesday",
        slot: "14:00–16:00",
        room: "LAB",
        subject: "Intro to Mechanical Engineering Lab",
        batch: "LAB",
        type: "regular",
        owner: "student@clt.edu"
    },

    // WEDNESDAY
    {
        day: "Wednesday",
        slot: "08:30–09:25",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "09:30–10:25",
        room: "LG 05",
        subject: "Intro to Mechanical Engineering",
        batch: "ME 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "10:30–11:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "11:30–12:25",
        room: "106",
        subject: "Engineering Mechanics",
        batch: "ME 201",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Wednesday",
        slot: "14:00–17:00",
        room: "LAB",
        subject: "CS Programming / Engineering / Science Lab",
        batch: "LAB",
        type: "regular",
        owner: "student@clt.edu"
    },

    // THURSDAY
    {
        day: "Thursday",
        slot: "10:00–11:25",
        room: "107",
        subject: "Design Thinking & Creativity",
        batch: "HS 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Thursday",
        slot: "14:00–16:00",
        room: "TBA",
        subject: "Formal Communication",
        batch: "SUB",
        type: "regular",
        owner: "student@clt.edu"
    },

    // FRIDAY
    {
        day: "Friday",
        slot: "08:30–09:25",
        room: "106",
        subject: "Engineering Mechanics",
        batch: "ME 201",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Friday",
        slot: "09:30–10:25",
        room: "003",
        subject: "Linear Algebra",
        batch: "MA 1XX",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Friday",
        slot: "10:30–11:25",
        room: "LG 05",
        subject: "Intro to Mechanical Engineering",
        batch: "ME 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Friday",
        slot: "11:30–12:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        type: "regular",
        owner: "student@clt.edu"
    },
    {
        day: "Friday",
        slot: "14:00–17:00",
        room: "LAB",
        subject: "CS Programming / Engineering / Science Lab",
        batch: "LAB",
        type: "regular",
        owner: "student@clt.edu"
    },

    // SATURDAY
    {
        day: "Saturday",
        slot: "10:30–12:30",
        room: "LG",
        subject: "Co-curricular Activities",
        batch: "FUN",
        faculty: "TBA",
        type: "extra"
    },


    // ==========================================
    // STUDENT 2
    // student2@college.edu
    // ==========================================

    // MONDAY
    {
        day: "Monday",
        slot: "08:30–09:25",
        room: "106",
        subject: "Quantum Physics",
        batch: "PH 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Monday",
        slot: "09:30–10:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Monday",
        slot: "10:30–11:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Monday",
        slot: "14:00–17:00",
        room: "LAB",
        subject: "CS Programming / Engineering / Science Lab",
        batch: "LAB",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },

    // TUESDAY
    {
        day: "Tuesday",
        slot: "08:30–09:55",
        room: "106",
        subject: "Calculus",
        batch: "MA 108",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Tuesday",
        slot: "10:00–11:25",
        room: "106",
        subject: "Chemistry",
        batch: "CH 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Tuesday",
        slot: "11:30–12:25",
        room: "106",
        subject: "Calculus",
        batch: "MA 108",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },

    // WEDNESDAY
    {
        day: "Wednesday",
        slot: "08:30–09:25",
        room: "106",
        subject: "Calculus",
        batch: "MA 108",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Wednesday",
        slot: "09:30–10:25",
        room: "106",
        subject: "Quantum Physics",
        batch: "PH 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Wednesday",
        slot: "10:30–11:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Wednesday",
        slot: "11:30–12:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Wednesday",
        slot: "14:00–17:00",
        room: "LAB",
        subject: "CS Programming / Engineering / Science Lab",
        batch: "LAB",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },

    // THURSDAY
    {
        day: "Thursday",
        slot: "08:30–09:55",
        room: "106",
        subject: "Chemistry",
        batch: "CH 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Thursday",
        slot: "10:00–11:25",
        room: "107",
        subject: "Design Thinking & Creativity",
        batch: "HS 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },

    // FRIDAY
    {
        day: "Friday",
        slot: "08:30–09:25",
        room: "006",
        subject: "Electrical Systems & Electronics",
        batch: "EE 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Friday",
        slot: "09:30–10:25",
        room: "106",
        subject: "Calculus",
        batch: "MA 108",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Friday",
        slot: "10:30–11:25",
        room: "106",
        subject: "Quantum Physics",
        batch: "PH 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },
    {
        day: "Friday",
        slot: "11:30–12:25",
        room: "107",
        subject: "Computer Programming",
        batch: "CS 101",
        faculty: "TBA",
        type: "regular",
        owner: "student2@college.edu"
    },

    // SATURDAY
    {
        day: "Saturday",
        slot: "10:30–12:30",
        room: "LG",
        subject: "Co-curricular Activities",
        batch: "FUN",
        faculty: "TBA",
        type: "extra",
        owner: "student2@college.edu"
    }

];

// ======================================================================
// 3b. EVENTS
// ======================================================================
// Starting events (dates are offsets in days from today so the demo always
// has upcoming items). Events added or edited in the portal are saved in this
// browser's localStorage and replace this list.
//   offset   days from today   start/end  24h "HH:MM"   category  Academic | Cultural | Sports | Notice
const defaultEventsData = [
  { offset: 1, start: "10:00", end: "12:00", title: "Tech Fest Orientation",       venue: "LG-03",     category: "Cultural", details: "Volunteer sign-up and schedule walkthrough for the annual tech fest." },
  { offset: 2, start: "14:00", end: "15:30", title: "Guest Lecture: Embedded AI",  venue: "UF-05",     category: "Academic", details: "Open to all branches. Bring your institute ID." },
  { offset: 4, start: "16:30", end: "18:00", title: "Inter-batch Football Trials", venue: "Main Lawn", category: "Sports",   details: "Report 15 minutes early with sports shoes." },
  { offset: 6, start: "09:00", end: "09:30", title: "Mid-sem Timetable Notice",    venue: "CLT Foyer", category: "Notice",   details: "Revised mid-semester exam timetable is on the notice board." },
  { offset: -2, start: "11:00", end: "12:00", title: "Library Orientation",       venue: "UF-02",     category: "Academic", details: "" }
];

// Passcode students must enter before they can add / announce / edit events.
// ⚠ Visible to anyone who opens the page source — use real server-side
// authorization before deploying.
const EVENT_PASSCODE = "event2026";

// ======================================================================
// 4. DEMO LOGIN CREDENTIALS (hardcoded for demonstration only).
// ⚠ Anything in client-side JavaScript is visible to every visitor. Replace
// this block with a real authentication service (e.g. Google Workspace /
// institutional SSO) before deploying.
// ======================================================================
const ALLOWED_EMAIL_DOMAINS = ["clt.edu", "college.edu"];
const DEMO_ACCOUNTS = [
  { email: "professor@clt.edu", password: "admin2026",   role: "Professor", name: "Professor" },
  { email: "student@clt.edu",   password: "student2026", role: "Student",   name: "Student"   },
  // Extra demo accounts. Each account sees only its own timetable (see "owner" in the timetable data).
  { email: "professor2@clt.edu",   password: "faculty2026", role: "Professor", name: "Professor 2" },
  { email: "student2@college.edu", password: "student2027", role: "Student",   name: "Student 2"   }
];
// TODO: ADD MORE DEMO ACCOUNTS HERE (same shape as the two above)

// ======================================================================
// 5. APP STATE & HELPERS
// ======================================================================
const STORAGE_KEY = "cltPortalBookings";
const SESSION_KEY = "cltSyncSession";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EVENTS_KEY = "cltPortalEvents";
const AUDIT_KEY = "cltAuditLog";
const PREFS_KEY = "cltPrefs";
const THEME_KEY = "cltTheme";
const ACCENT_KEY = "cltAccent";
const PW_KEY = "cltPwOverrides";
const PASSCODE_KEY = "cltEventPasscode";
const DEPT_COLORS = ["var(--accent)", "var(--violet)", "var(--free)", "var(--booked)", "var(--clash)", "#5b8def"];
const EVENT_UNLOCK_KEY = "cltEventsUnlocked";
const PAGES = ["Schedule", "Events", "Slots", "Office", "Report", "Settings"];
const OFFICE_KEY = "cltOfficeDirectory";
const INITIAL_ACTIVITY = "Portal initialized. Room directory is ready.";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let currentUser = null;          // authentication state: null = signed out
let activePage = "Schedule";
let activeDay = defaultDay();
let eventFilter = "upcoming";
let eventsUnlocked = false;      // students: true after a correct passcode
let editingEventId = null;
let roomFilter = { query: "", subject: "", seats: "" };   // Slots tab search & filters
let pendingAfterUnlock = null;   // action to resume once unlocked
let selectedRoom = null;
let activity = [INITIAL_ACTIVITY];
let pageSwapTimer = null;
let drawInTimer = null;

function todayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function safeStorage(kind) {
  try { return window[kind]; } catch { return null; }
}

// ---------- bookings (localStorage) ----------
function getBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveBookings(bookings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)); } catch { /* storage unavailable */ }
}
// ---------- events (localStorage) ----------
function isoDate(date) {
  const d = new Date(date); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
function seedEvents() {
  return defaultEventsData.map((item, index) => {
    const date = new Date(); date.setDate(date.getDate() + item.offset);
    return { id: `seed-${index}`, date: isoDate(date), start: item.start, end: item.end, title: item.title, venue: item.venue, category: item.category, details: item.details };
  });
}
function getEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) return parsed; }
  } catch { /* fall through to defaults */ }
  return seedEvents();
}
function saveEvents(events) {
  try { localStorage.setItem(EVENTS_KEY, JSON.stringify(events)); } catch { /* storage unavailable */ }
}
function eventSortKey(item) { return `${item.date}T${item.start}`; }
function canEditEvents() {
  return Boolean(currentUser) && (currentUser.role === "Professor" || eventsUnlocked);
}
// ---------- generic JSON storage ----------
function readJSON(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}
function effectivePassword(account) {
  const overrides = readJSON(PW_KEY, {});
  return typeof overrides[account.email] === "string" ? overrides[account.email] : account.password;
}
function getEventPasscode() {
  try { return localStorage.getItem(PASSCODE_KEY) || EVENT_PASSCODE; } catch { return EVENT_PASSCODE; }
}

// ---------- audit log (feeds the professor report + CSV export) ----------
function getAudit() { const log = readJSON(AUDIT_KEY, []); return Array.isArray(log) ? log : []; }
function addAudit(type, detail, room = "") {
  const log = getAudit();
  log.unshift({ t: new Date().toISOString(), type, detail, room, actor: currentUser ? currentUser.email : "" });
  writeJSON(AUDIT_KEY, log.slice(0, 200));
}
function clashesPrevented() { return getAudit().filter(item => item.type === "Clash prevented").length; }

// ---------- notification preferences ----------
const DEFAULT_PREFS = { instant: true, roomChange: true, reminder15: false };
function getPrefs() { return { ...DEFAULT_PREFS, ...readJSON(PREFS_KEY, {}) }; }

// ---------- theme ----------
function currentTheme() { return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"; }
function currentAccent() { return document.documentElement.getAttribute("data-accent") === "neon" ? "neon" : "cyan"; }
function applyTheme(theme, { persist = true } = {}) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) { try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ } }
  const light = theme === "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", light ? "#f4f7fc" : "#0b0f19");
  const scheme = document.querySelector('meta[name="color-scheme"]');
  if (scheme) scheme.setAttribute("content", light ? "light" : "dark");
  const quick = $("#themeQuick");
  if (quick) { quick.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode"); quick.querySelector(".tq-icon").textContent = light ? "☾" : "☀"; }
  const sw = $("#themeSwitch");
  if (sw) { sw.setAttribute("aria-checked", String(light)); }
  const hint = $("#themeHint");
  if (hint) hint.textContent = light ? "Drafting-paper light mode is active." : "Obsidian blueprint dark mode is active.";
}
function applyAccent(accent, { persist = true } = {}) {
  if (accent === "neon") document.documentElement.setAttribute("data-accent", "neon");
  else document.documentElement.removeAttribute("data-accent");
  if (persist) { try { localStorage.setItem(ACCENT_KEY, accent); } catch { /* ignore */ } }
  $$("#accentOptions .accent-chip").forEach(chip => {
    const on = chip.dataset.accent === accent;
    chip.classList.toggle("active", on);
    chip.setAttribute("aria-checked", String(on));
  });
}
function allRooms() {
  return Object.entries(ROOM_DATA).flatMap(([floor, rooms]) => rooms.map(room => ({ ...room, floor })));
}
// ----------------------------------------------------------------------
// UNIFIED ROOM OCCUPANCY (single source of truth for the Slots tab)
// Every class in professorScheduleData, every class in studentScheduleData and every
// published booking is merged per room. The same class listed in both timetables
// (same room, day, slot, subject and batch) counts once.
//   free   = nothing in that day/slot
//   booked = exactly one class/booking
//   clash  = two or more different classes in the same room, day and slot
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// PER-ACCOUNT TIMETABLES: each login sees only its own classes.
// ----------------------------------------------------------------------
function defaultOwner(role) {
  const account = DEMO_ACCOUNTS.find(item => item.role === role);
  return account ? account.email.toLowerCase() : "";
}
function classesFor(user) {
  if (!user) return [];
  const data = user.role === "Professor" ? professorScheduleData : studentScheduleData;
  const email = user.email.toLowerCase();
  return data.filter(item => {
    const owners = item.owner ? [].concat(item.owner) : [defaultOwner(user.role)];
    return owners.some(owner => String(owner).toLowerCase() === email);
  });
}
function myClasses() { return classesFor(currentUser); }
// Bookings a professor published (older bookings without an owner stay visible to every professor).
function myBookings() { return getBookings().filter(item => !item.owner || (currentUser && item.owner === currentUser.email)); }

// ----------------------------------------------------------------------
// PROFESSOR -> STUDENT SYNC: a booking a professor publishes on the Slots tab is an
// extra / makeup class. The professor picks the SUBJECT from the same dropdown list the
// Slots search uses; the class is sent ONLY to students who have that subject in their own
// timetable (case-insensitive match), and appears on their Schedule tab, Report, reminders
// and .ics export, flagged type "extra" (violet). Only upcoming bookings (today + 6 days) show.
// ----------------------------------------------------------------------
function studentExtraClasses(user) {
  if (!user || user.role !== "Student") return [];
  const subjects = new Set(classesFor(user).map(item => String(item.subject).trim().toLowerCase()));
  const from = isoDate(new Date());
  const limit = new Date(); limit.setDate(limit.getDate() + 6);
  const to = isoDate(limit);
  return getBookings()
    .filter(item => item.date >= from && item.date <= to && subjects.has(String(item.subject).trim().toLowerCase()))
    .map(item => {
      const owner = DEMO_ACCOUNTS.find(account => account.email.toLowerCase() === String(item.owner || "").toLowerCase());
      return { ...item, slot: item.slot || item.time, type: "extra", faculty: owner ? owner.name : "Faculty", published: true };
    });
}
// A student's full timetable = own classes + synced extra classes. Professors keep myClasses().
function studentClasses() { return [...myClasses(), ...studentExtraClasses(currentUser)]; }

function roomSessions(roomName) {
  const map = new Map();
  const add = (item, source) => {
    if (item.room !== roomName) return;
    const key = `${item.day}|${item.slot}`;
    const list = map.get(key) || [];
    const id = `${String(item.subject).trim().toLowerCase()}|${String(item.batch).trim().toLowerCase()}`;
    if (!list.some(entry => entry.id === id)) list.push({ id, subject: item.subject, batch: item.batch, source });
    map.set(key, list);
  };
  professorScheduleData.forEach(item => add(item, "Professor timetable"));
  studentScheduleData.forEach(item => add(item, "Student timetable"));
  getBookings().forEach(item => add({ ...item, slot: item.slot || item.time }, `Published booking · ${item.date}`));
  return map;
}
// The Slots map shows one day (and optionally one slot); "" means the whole week / all slots.
let viewContext = { day: defaultDay(), slot: "" };
let roomDay = "";
function viewLabel() { return `${viewContext.day || "Whole week"}${viewContext.slot ? " · " + viewContext.slot : ""}`; }
function statusFor(roomName, day = viewContext.day, slot = viewContext.slot) {
  let status = "free";
  for (const [key, list] of roomSessions(roomName)) {
    const [d, s] = key.split("|");
    if ((day && d !== day) || (slot && s !== slot)) continue;
    if (list.length > 1) return "clash";
    status = "booked";
  }
  return status;
}

// ---------- toast & activity ----------
function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function logActivity(message) {
  activity.unshift(message);
  activity = activity.slice(0, 5);
  renderActivity();
}
function renderActivity() {
  $("#activityFeed").innerHTML = activity.map(item => `<div class="activity-item"><i></i><span>${escapeHTML(item)}</span></div>`).join("");
}

// ======================================================================
// 6. AUTHENTICATION
// ======================================================================
function validateLogin(email, password) {
  if (!email || !password) {
    return { ok: false, title: "Missing details", message: "Enter both your institution email and your password to continue.", focus: email ? "#userPassword" : "#userEmail" };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, title: "Invalid email format", message: "That doesn't look like a valid email address. Use the form name@clt.edu.", focus: "#userEmail" };
  }
  const domain = email.split("@")[1];
  if (!ALLOWED_EMAIL_DOMAINS.includes(domain)) {
    return { ok: false, title: "Institution email required", message: `Only institutional accounts can sign in. Use an address ending in ${ALLOWED_EMAIL_DOMAINS.map(d => "@" + d).join(" or ")}.`, focus: "#userEmail" };
  }
  const account = DEMO_ACCOUNTS.find(item => item.email === email && effectivePassword(item) === password);
  if (!account) {
    return { ok: false, title: "Invalid credentials", message: "The email or password you entered is incorrect. Check your details and try again.", focus: "#userPassword" };
  }
  return { ok: true, account };
}

let dialogFocusTarget = "#userEmail";
function showAuthDialog({ title, message, focus }) {
  const dialog = $("#authDialog");
  dialogFocusTarget = focus || "#userEmail";
  $("#authDialogTitle").textContent = title;
  $("#authDialogMessage").textContent = message;
  $("#userEmail").setAttribute("aria-invalid", focus === "#userEmail" ? "true" : "false");
  $("#userPassword").setAttribute("aria-invalid", focus === "#userPassword" ? "true" : "false");
  const card = $(".login-card");
  card.classList.remove("shake");
  void card.offsetWidth; // restart the shake animation
  card.classList.add("shake");
  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}
function closeAuthDialog() {
  const dialog = $("#authDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}
function clearLoginErrors() {
  ["#userEmail", "#userPassword"].forEach(selector => $(selector).removeAttribute("aria-invalid"));
}

function persistSession(account) {
  const store = safeStorage("sessionStorage");
  try { store && store.setItem(SESSION_KEY, account.email); } catch { /* ignore */ }
}
function clearSession() {
  const store = safeStorage("sessionStorage");
  try { store && store.removeItem(SESSION_KEY); store && store.removeItem(EVENT_UNLOCK_KEY); } catch { /* ignore */ }
}
function restoreSession() {
  const store = safeStorage("sessionStorage");
  let email = null;
  try { email = store && store.getItem(SESSION_KEY); } catch { /* ignore */ }
  const account = DEMO_ACCOUNTS.find(item => item.email === email);
  if (account) enterPortal(account);
}

function enterPortal(account) {
  currentUser = { name: account.name, email: account.email, role: account.role };
  persistSession(account);
  eventsUnlocked = false;
  try { const store = safeStorage("sessionStorage"); eventsUnlocked = Boolean(store && store.getItem(EVENT_UNLOCK_KEY) === account.email); } catch { /* ignore */ }
  eventFilter = "upcoming";
  roomFilter = { query: "", subject: "", seats: "" };
  $("#roomSearch").value = ""; $("#subjectFilter").value = ""; $("#seatFilter").value = "";
  $$("#eventFilterTabs button").forEach(button => button.classList.toggle("active", button.dataset.filter === eventFilter));
  activity = [INITIAL_ACTIVITY];
  selectedRoom = null;
  activeDay = defaultDay();
  $("#loginView").classList.add("hidden");
  $("#appView").classList.remove("hidden");
  $("#userLabel").textContent = currentUser.name;
  $("#avatarInitial").textContent = currentUser.name.charAt(0).toUpperCase();
  $("#dropdownAvatar").textContent = currentUser.name.charAt(0).toUpperCase();
  $("#dropdownName").textContent = currentUser.name;
  $("#dropdownEmail").textContent = currentUser.email;
  $("#rolePill").textContent = currentUser.role;
  $("#settingsUser").textContent = currentUser.email;
  $("#settingsRole").textContent = currentUser.role;
  $$("#scheduleDayTabs button").forEach(button => button.classList.toggle("active", button.dataset.day === activeDay));
  buildNavigation();
  showPage("Schedule", { force: true });
  renderAll();
}

// Resets every authentication-related state and returns to the lockscreen.
function signOut() {
  closeUserMenu({ restoreFocus: false });
  clearTimeout(pageSwapTimer);
  clearTimeout(drawInTimer);
  currentUser = null;
  eventsUnlocked = false;
  pendingAfterUnlock = null;
  ["#passcodeDialog", "#eventDialog"].forEach(selector => { const d = $(selector); if (d.open) d.close(); });
  selectedRoom = null;
  activePage = "Schedule";
  activity = [INITIAL_ACTIVITY];
  clearSession();

  document.body.classList.remove("on-slots");
  $("#appView").classList.add("hidden");
  $("#mainNav").innerHTML = "";
  $$(".page-section").forEach(section => section.classList.add("hidden"));
  $$(".page-section").forEach(section => section.classList.remove("is-entering", "is-leaving"));
  $("#schedulePage").classList.remove("hidden");

  $("#loginForm").reset();
  $("#userPassword").type = "password";
  syncPasswordToggle();
  clearLoginErrors();
  closeAuthDialog();
  $("#loginView").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "auto" });
  $("#userEmail").focus();
  notify("You have been signed out securely.");
}

function syncPasswordToggle() {
  const visible = $("#userPassword").type === "text";
  const button = $("#togglePassword");
  button.setAttribute("aria-pressed", String(visible));
  button.setAttribute("aria-label", visible ? "Hide password" : "Show password");
}

// ---------- profile dropdown ----------
function openUserMenu() {
  $("#userDropdown").classList.add("open");
  $("#userMenu").setAttribute("aria-expanded", "true");
  $("#userMenu").classList.add("open");
}
function closeUserMenu({ restoreFocus = true } = {}) {
  const dropdown = $("#userDropdown");
  if (!dropdown.classList.contains("open")) return;
  dropdown.classList.remove("open");
  $("#userMenu").setAttribute("aria-expanded", "false");
  $("#userMenu").classList.remove("open");
  if (restoreFocus) $("#userMenu").focus();
}
function toggleUserMenu() {
  $("#userDropdown").classList.contains("open") ? closeUserMenu() : openUserMenu();
}

// ======================================================================
// 7. NAVIGATION & TAB MOTION
// ======================================================================
function buildNavigation() {
  const pages = currentUser.role === "Professor" ? PAGES : PAGES.filter(page => page !== "Slots");
  $("#mainNav").innerHTML = pages.map(page => `<button class="nav-button ${page === activePage ? "active" : ""}" type="button" data-page="${page}">${page}</button>`).join("");
  $$(".nav-button").forEach(button => button.addEventListener("click", () => showPage(button.dataset.page)));
}

const PAGE_COPY = {
  Professor: { Schedule: ["Professor timetable", "Your teaching schedule across the theatre, seven days a week."] },
  Student:   { Schedule: ["Student timetable", "Your class slots for the week, weekends included."] },
  Common: {
    Office: ["Faculty offices", "Find where professors sit and when they hold consultation hours."],
    Events: ["Campus events", "Announcements, lectures and activities happening around CLT."],
    Slots: ["Room availability", "Explore floors, check room capacity and publish a booking."],
    Report: ["Usage report", "Analytics on classes, room utilization and scheduling activity."],
    Settings: ["Control center", "Theme, notifications and account security for this device."]
  }
};

function showPage(page, { force = false } = {}) {
  if (!currentUser) return;
  if (page === "Slots" && currentUser.role !== "Professor") page = "Schedule";
  if (page === activePage && !force) return;
  closeUserMenu({ restoreFocus: false });
  activePage = page;

  const copy = (PAGE_COPY[currentUser.role] && PAGE_COPY[currentUser.role][page]) || PAGE_COPY.Common[page];
  $("#pageTitle").textContent = copy[0];
  $("#pageSubtitle").textContent = copy[1];
  $$(".nav-button").forEach(button => button.classList.toggle("active", button.dataset.page === page));

  swapSections(page);
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
}

// Fades/slides the outgoing section away, then fades/slides the new one in.
function swapSections(page) {
  clearTimeout(pageSwapTimer);
  const sections = $$(".page-section");
  const next = $(`#${page.toLowerCase()}Page`);
  const leaving = sections.find(section => section !== next && !section.classList.contains("hidden"));

  const reveal = () => {
    sections.forEach(section => {
      if (section !== next) section.classList.add("hidden");
      section.classList.remove("is-leaving", "is-entering");
    });
    document.body.classList.toggle("on-slots", page === "Slots");
    next.classList.remove("hidden");
    void next.offsetWidth; // restart the CSS entrance sequence
    next.classList.add("is-entering");
    if (page === "Slots") { renderSlots(); playDrawIn(); }
    if (page === "Report") renderReport();
    if (page === "Schedule") renderSchedule();
    if (page === "Events") renderEvents();
    if (page === "Settings") renderSettings();
    if (page === "Office") renderOffice();
  };

  if (leaving && !reducedMotion.matches) {
    leaving.classList.add("is-leaving");
    pageSwapTimer = setTimeout(reveal, 190);
  } else {
    reveal();
  }
}

// ======================================================================
// 8. SCHEDULE TAB (separate professor / student views)
// ======================================================================
function slotIsNow(slot) { return slotIsNowOn(activeDay, slot); }
function slotIsNowOn(day, slot) {
  if (day !== todayName()) return false;
  const [start, end] = slot.split("–");
  if (!start || !end) return false;
  const toMinutes = value => { const [h, m] = value.split(":").map(Number); return h * 60 + m; };
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= toMinutes(start) && minutes < toMinutes(end);
}

function renderSchedule() {
  if (!currentUser) return;
  const isProfessor = currentUser.role === "Professor";
  $("#professorView").classList.toggle("hidden", !isProfessor);
  $("#studentView").classList.toggle("hidden", isProfessor);
  const weekend = activeDay === "Saturday";
  $("#scheduleMeta").textContent = `${isProfessor ? "Teaching timetable" : "Weekly class slots"} · ${weekend ? "Saturday" : (patternFor(activeDay) || {}).label || "Weekday"} · CLT`;
  if (isProfessor) renderProfessorSchedule(); else renderStudentSchedule();
}

// ---------- PROFESSOR: rooms × time-slot teaching grid ----------
function renderProfessorSchedule() {
  // Classes published from the Slots tab are shown as extra classes.
  const published = myBookings().map(item => ({ ...item, type: "extra" }));
  const combined = [...myClasses(), ...published];
  const today = combined.filter(item => item.day === activeDay);
  const rooms = [...new Set(today.map(item => item.room))].sort();
  const batches = new Set(today.map(item => item.batch));

  $("#profStats").innerHTML = [
    ["Teaching today", today.length, today.length === 1 ? "class" : "classes"],
    ["Rooms in use", rooms.length, "today"],
    ["Batches", batches.size, "today"],
    ["Weekly load", combined.length, "classes / week"]
  ].map(([label, value, unit]) => `<div class="stat-chip"><span>${label}</span><strong>${value}</strong><small>${unit}</small></div>`).join("");

  const daySlots = slotsFor(activeDay);
  $("#scheduleHead").innerHTML = `<tr><th>ROOM</th>${daySlots.map(slot => `<th>${slot}</th>`).join("")}</tr>`;

  if (!rooms.length) {
    $("#scheduleBody").innerHTML = `<tr><td colspan="${daySlots.length + 1}" class="empty-cell"><div class="empty-state"><span>◌</span><b>No teaching scheduled for ${escapeHTML(activeDay)}</b><p>Add classes to <code>professorScheduleData</code> in script.js, or publish a booking from the Slots tab.</p></div></td></tr>`;
    return;
  }
  $("#scheduleBody").innerHTML = rooms.map((room, index) => {
    const cells = daySlots.map(slot => {
      const entry = today.find(item => item.slot === slot && item.room === room);
      const now = slotIsNow(slot) ? " is-now" : "";
      if (!entry) return `<td class="${now}"><span class="cell-empty">—</span></td>`;
      return `<td class="${now}"><div class="class-card ${entry.type === "extra" ? "extra" : ""}"><b>${escapeHTML(entry.subject)}</b><span>${escapeHTML(entry.batch)} · ${entry.type === "extra" ? "Extra" : "Regular"}</span></div></td>`;
    }).join("");
    return `<tr style="--i:${index}"><td class="room-cell">${escapeHTML(room)}</td>${cells}</tr>`;
  }).join("");
}

// ---------- STUDENT: slot-by-slot day agenda ----------
function renderStudentSchedule() {
  const today = studentClasses().filter(item => item.day === activeDay);
  $("#agendaHeading").textContent = activeDay + (activeDay === todayName() ? " · Today" : "");
  $("#agendaCount").textContent = `${today.length} ${today.length === 1 ? "class" : "classes"}`;

  const rows = [];
  const addRow = (className, inner) => rows.push(`<div class="agenda-row ${className}" style="--i:${rows.length}">${inner}</div>`);
  const stuPattern = patternFor(activeDay);
  slotsFor(activeDay).forEach(slot => {
    const entries = today.filter(item => item.slot === slot);
    const now = slotIsNow(slot);
    const [start, end] = slot.split("–");
    const time = `<div class="agenda-time"><b>${escapeHTML(start)}</b><span>${escapeHTML(end)}</span></div><i class="agenda-node"></i>`;
    if (entries.length) {
      addRow(now ? "is-now" : "", `${time}<div class="agenda-body">${entries.map(entry => `
        <article class="slot-card ${entry.type === "extra" ? "extra" : ""}">
          <div class="slot-card-top"><b>${escapeHTML(entry.subject)}</b>${now ? '<em class="now-badge">NOW</em>' : ""}<span class="type-tag">${entry.type === "extra" ? (entry.published ? "Extra · New" : "Extra") : "Regular"}</span></div>
          <div class="slot-meta"><span>◈ Room ${escapeHTML(entry.room)}</span><span>◷ ${escapeHTML(entry.batch)}</span>${entry.published ? `<span>▣ ${escapeHTML(entry.date)}</span>` : ""}${entry.faculty ? `<span>☺ ${escapeHTML(entry.faculty)}</span>` : ""}</div>
        </article>`).join("")}</div>`);
    } else if (today.length) {
      addRow("free-row", `${time}<div class="agenda-body"><div class="free-slot">Free period</div></div>`);
    }
    if (stuPattern && slot === stuPattern.breakAfter && today.length) {
      const [bStart, bEnd] = stuPattern.breakLabel.split("–");
      addRow("break-row", `<div class="agenda-time"><b>${bStart}</b><span>${bEnd}</span></div><i class="agenda-node"></i><div class="agenda-body"><div class="break-slot">Lunch break</div></div>`);
    }
  });

  $("#studentAgenda").innerHTML = rows.length
    ? rows.join("")
    : `<div class="empty-state"><span>◌</span><b>No classes on ${escapeHTML(activeDay)}</b><p>Nothing is scheduled. Add class slots to <code>studentScheduleData</code> in script.js.</p></div>`;

  const first = [...today].sort((a, b) => SCHEDULE_SLOTS.indexOf(a.slot) - SCHEDULE_SLOTS.indexOf(b.slot))[0];
  const venues = [...new Set(today.map(item => item.room))];
  const weekTotal = studentClasses().length;
  $("#studentSummary").innerHTML = `
    <p class="eyebrow">DAY SUMMARY</p>
    <h2>${escapeHTML(activeDay)}</h2>
    <div class="summary-grid">
      <div><span>CLASSES</span><strong>${today.length}</strong></div>
      <div><span>FREE SLOTS</span><strong>${slotsFor(activeDay).length - new Set(today.map(item => item.slot)).size}</strong></div>
    </div>
    <div class="summary-row"><span>First class</span><b>${first ? escapeHTML(first.slot.split("–")[0]) : "—"}</b></div>
    <div class="summary-row"><span>Rooms to visit</span><b>${venues.length ? venues.map(escapeHTML).join(", ") : "—"}</b></div>
    <div class="summary-row"><span>This week</span><b>${weekTotal} classes</b></div>
    <p class="muted small-text">Switch days above — Mon/Wed/Fri, Tue/Thu and Saturday each run on their own time blocks.</p>`;
}

// ======================================================================
// 8b. EVENTS TAB (timetable-style timeline)
// ======================================================================
function formatEventDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  const today = isoDate(new Date());
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const label = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  if (iso === today) return `${label} · Today`;
  if (iso === isoDate(tomorrow)) return `${label} · Tomorrow`;
  return label;
}
function eventIsNow(item) {
  if (item.date !== isoDate(new Date())) return false;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMinutes = value => { const [h, m] = value.split(":").map(Number); return h * 60 + m; };
  return minutes >= toMinutes(item.start) && minutes < toMinutes(item.end);
}

function renderEvents() {
  if (!currentUser) return;
  const today = isoDate(new Date());
  const everything = getEvents().sort((a, b) => eventSortKey(a).localeCompare(eventSortKey(b)));
  const upcoming = everything.filter(item => item.date >= today);
  const past = everything.filter(item => item.date < today).reverse();
  const shown = eventFilter === "upcoming" ? upcoming : eventFilter === "past" ? past : everything;
  const editable = canEditEvents();

  $("#eventsHeading").textContent = eventFilter === "upcoming" ? "Upcoming events" : eventFilter === "past" ? "Past events" : "All events";
  $("#eventsCount").textContent = `${shown.length} ${shown.length === 1 ? "event" : "events"}`;
  $("#eventsMeta").textContent = editable
    ? (currentUser.role === "Professor" ? "Full access · you can announce and edit" : "Editing unlocked · this session")
    : "View only";

  // Add button in the toolbar: students who haven't unlocked editing use it to open the passcode modal.
  $("#eventsAddBtn").classList.toggle("hidden", editable);
  $("#eventFab").classList.toggle("hidden", !editable);

  // Group by date, one timeline row per event (same row/card look as the student timetable).
  const rows = [];
  let lastDate = null;
  shown.forEach(item => {
    if (item.date !== lastDate) {
      rows.push(`<div class="agenda-date" style="--i:${rows.length}">${escapeHTML(formatEventDate(item.date))}</div>`);
      lastDate = item.date;
    }
    const now = eventIsNow(item);
    const cat = String(item.category || "Notice");
    const extra = cat === "Cultural" || cat === "Sports";
    rows.push(`<div class="agenda-row ${now ? "is-now" : ""}" style="--i:${rows.length}">
      <div class="agenda-time"><b>${escapeHTML(item.start)}</b><span>${escapeHTML(item.end)}</span></div><i class="agenda-node"></i>
      <div class="agenda-body"><article class="slot-card event-card ${extra ? "extra" : ""} cat-${escapeHTML(cat.toLowerCase())}">
        <div class="slot-card-top"><b>${escapeHTML(item.title)}</b>${now ? '<em class="now-badge">LIVE</em>' : ""}<span class="type-tag">${escapeHTML(cat)}</span>
          ${editable ? `<button class="event-edit" type="button" data-edit="${escapeHTML(item.id)}" aria-label="Edit ${escapeHTML(item.title)}">Edit</button>` : ""}</div>
        <div class="slot-meta"><span>◈ ${escapeHTML(item.venue)}</span><span>◷ ${escapeHTML(item.start)}–${escapeHTML(item.end)}</span></div>
        ${item.details ? `<p class="event-details">${escapeHTML(item.details)}</p>` : ""}
      </article></div></div>`);
  });
  $("#eventsAgenda").innerHTML = rows.length ? rows.join("") : `<div class="empty-state"><span>◌</span><b>No ${eventFilter === "all" ? "" : eventFilter + " "}events</b><p>${editable ? "Use the Add event button to announce one." : "Nothing has been announced yet. Check back soon."}</p></div>`;

  const next = upcoming[0];
  const thisWeek = upcoming.filter(item => (new Date(`${item.date}T12:00:00`) - new Date()) < 7 * 864e5).length;
  $("#eventsSummary").innerHTML = `
    <p class="eyebrow">AT A GLANCE</p>
    <h2>Events</h2>
    <div class="summary-grid">
      <div><span>UPCOMING</span><strong>${upcoming.length}</strong></div>
      <div><span>NEXT 7 DAYS</span><strong>${thisWeek}</strong></div>
    </div>
    <div class="summary-row"><span>Next event</span><b>${next ? escapeHTML(next.title) : "—"}</b></div>
    <div class="summary-row"><span>When</span><b>${next ? escapeHTML(next.date.slice(5).replace("-", "/")) + " · " + escapeHTML(next.start) : "—"}</b></div>
    <div class="summary-row"><span>Your access</span><b class="access-badge ${editable ? "on" : ""}">${editable ? "Can edit" : "View only"}</b></div>
    <p class="muted small-text">${currentUser.role === "Professor" ? "Professors can announce and edit events by default." : editable ? "Editing is unlocked until you sign out." : "Students can view events. Adding or editing needs the event passcode."}</p>`;
}

// ---- passcode modal ----
function openDialog(dialog) {
  if (typeof dialog.showModal === "function") { if (!dialog.open) dialog.showModal(); }
  else dialog.setAttribute("open", "");
}
function closeDialog(dialog) {
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}
function requestEventEdit(action) {
  if (canEditEvents()) { action(); return; }
  pendingAfterUnlock = action;
  $("#passcodeInput").value = "";
  $("#passcodeInput").removeAttribute("aria-invalid");
  $("#passcodeError").textContent = "";
  openDialog($("#passcodeDialog"));
  $("#passcodeInput").focus();
}
function submitPasscode(event) {
  event.preventDefault();
  const input = $("#passcodeInput");
  if (input.value === getEventPasscode()) {
    eventsUnlocked = true;
    try { const store = safeStorage("sessionStorage"); store && store.setItem(EVENT_UNLOCK_KEY, currentUser.email); } catch { /* ignore */ }
    const resume = pendingAfterUnlock; pendingAfterUnlock = null;
    closeDialog($("#passcodeDialog"));
    renderEvents();
    notify("Event editing unlocked.");
    if (resume) resume();
  } else {
    input.value = "";
    input.setAttribute("aria-invalid", "true");
    $("#passcodeError").textContent = "Incorrect passcode. You can still view events.";
    const inner = $(".passcode-inner");
    inner.classList.remove("shake"); void inner.offsetWidth; inner.classList.add("shake");
    input.focus();
  }
}

// ---- add / edit event modal ----
function openEventForm(id = null) {
  if (!canEditEvents()) return;
  editingEventId = id;
  const item = id ? getEvents().find(entry => entry.id === id) : null;
  if (id && !item) return;
  $("#eventDialogEyebrow").textContent = item ? "EDIT EVENT" : "ANNOUNCE AN EVENT";
  $("#eventDialogTitle").textContent = item ? "Edit event" : "New event";
  $("#eventSave").innerHTML = `${item ? "Save changes" : "Announce"} <span aria-hidden="true">↗</span>`;
  $("#eventDelete").classList.toggle("hidden", !item);
  $("#eventTitle").value = item ? item.title : "";
  $("#eventDate").value = item ? item.date : isoDate(new Date());
  $("#eventCategory").value = item ? item.category : "Academic";
  $("#eventStart").value = item ? item.start : "10:00";
  $("#eventEnd").value = item ? item.end : "11:00";
  $("#eventVenue").value = item ? item.venue : "";
  $("#eventDetails").value = item ? item.details || "" : "";
  $("#eventFormError").textContent = "";
  openDialog($("#eventDialog"));
  $("#eventTitle").focus();
}
function submitEventForm(event) {
  event.preventDefault();
  if (!canEditEvents()) { closeDialog($("#eventDialog")); return; }   // defensive re-check
  const record = {
    title: $("#eventTitle").value.trim(),
    date: $("#eventDate").value,
    category: $("#eventCategory").value,
    start: $("#eventStart").value,
    end: $("#eventEnd").value,
    venue: $("#eventVenue").value.trim(),
    details: $("#eventDetails").value.trim()
  };
  const error = !record.title ? "Give the event a title."
    : !record.date ? "Choose a date."
    : !record.start || !record.end ? "Set a start and end time."
    : record.end <= record.start ? "The end time must be after the start time."
    : !record.venue ? "Add a venue." : "";
  if (error) { $("#eventFormError").textContent = error; return; }
  const events = getEvents();
  if (editingEventId) {
    const index = events.findIndex(entry => entry.id === editingEventId);
    if (index >= 0) events[index] = { ...events[index], ...record };
  } else {
    events.push({ id: `evt-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, ...record });
  }
  saveEvents(events);
  addAudit(editingEventId ? "Event updated" : "Event announced", `${record.title} · ${record.date} ${record.start}`, record.venue);
  closeDialog($("#eventDialog"));
  notify(editingEventId ? "Event updated." : "Event announced.");
  editingEventId = null;
  if (record.date < isoDate(new Date()) && eventFilter === "upcoming") setEventFilter("all"); else renderEvents();
}
function deleteEvent() {
  if (!canEditEvents() || !editingEventId) return;
  const removed = getEvents().find(entry => entry.id === editingEventId);
  saveEvents(getEvents().filter(entry => entry.id !== editingEventId));
  if (removed) addAudit("Event deleted", removed.title, removed.venue);
  editingEventId = null;
  closeDialog($("#eventDialog"));
  notify("Event deleted.");
  renderEvents();
}
function setEventFilter(filter) {
  eventFilter = filter;
  $$("#eventFilterTabs button").forEach(button => button.classList.toggle("active", button.dataset.filter === filter));
  renderEvents();
}

// ======================================================================
// 9. BLUEPRINT FLOOR MAP (SVG generator)
// ======================================================================
// Drawing units: 1 unit = 0.1 m  →  outer radius 226 = 22.60 m.
const MAP = { w: 700, h: 660, cx: 350, cy: 310, core: 108, inner: 150, outer: 226, ring: 246 };
const f = number => Number(number.toFixed(2));

function polarPoint(radius, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return { x: MAP.cx + radius * Math.cos(radians), y: MAP.cy + radius * Math.sin(radians) };
}
function pt(radius, angle) { const p = polarPoint(radius, angle); return `${f(p.x)} ${f(p.y)}`; }
function arcPath(radius, a0, a1) {
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${pt(radius, a0)} A ${radius} ${radius} 0 ${large} 1 ${pt(radius, a1)}`;
}
function sectorPath(rIn, rOut, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${pt(rOut, a0)} A ${rOut} ${rOut} 0 ${large} 1 ${pt(rOut, a1)} L ${pt(rIn, a1)} A ${rIn} ${rIn} 0 ${large} 0 ${pt(rIn, a0)} Z`;
}
function circle(radius, attrs = "") {
  return `<circle cx="${MAP.cx}" cy="${MAP.cy}" r="${radius}" ${attrs}/>`;
}

// Architectural door symbol: leaf + quarter-circle swing, opening into the corridor.
function doorSymbol(angle) {
  const rad = (angle - 90) * Math.PI / 180;
  const u = { x: Math.cos(rad), y: Math.sin(rad) };      // outward
  const t = { x: -Math.sin(rad), y: Math.cos(rad) };     // tangent
  const base = polarPoint(MAP.inner, angle);
  const size = 11;
  const hinge = { x: base.x - t.x * size / 2, y: base.y - t.y * size / 2 };
  const closed = { x: hinge.x + t.x * size, y: hinge.y + t.y * size };
  const open = { x: hinge.x - u.x * size, y: hinge.y - u.y * size };
  const cross = t.x * (-u.y) - t.y * (-u.x);
  const sweep = cross > 0 ? 1 : 0;
  return `<path class="bp-door-gap" d="M ${f(hinge.x)} ${f(hinge.y)} L ${f(closed.x)} ${f(closed.y)}"/>
    <path class="bp-door" d="M ${f(hinge.x)} ${f(hinge.y)} L ${f(open.x)} ${f(open.y)}"/>
    <path class="bp-door-swing" d="M ${f(closed.x)} ${f(closed.y)} A ${size} ${size} 0 0 ${sweep} ${f(open.x)} ${f(open.y)}"/>`;
}

function mapDefs() {
  return `<defs>
    <pattern id="hatchFree" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="7" stroke="#3df5c8" stroke-width="1.1" stroke-opacity=".7"/></pattern>
    <pattern id="hatchBooked" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#ffb938" stroke-width="1.1" stroke-opacity=".85"/>
      <line x1="0" y1="0" x2="8" y2="0" stroke="#ffb938" stroke-width="1.1" stroke-opacity=".85"/></pattern>
    <pattern id="hatchClash" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="#ff3b5c" stroke-width="1.5" stroke-opacity=".95"/>
      <line x1="0" y1="0" x2="5" y2="0" stroke="#ff3b5c" stroke-width="1.5" stroke-opacity=".95"/></pattern>
    <marker id="dimArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 1.2 L10 5 L0 8.8 Z" fill="#9fd4ff"/></marker>
  </defs>`;
}

function blueprintFurniture(floor, rooms) {
  const { cx, cy, core, inner, outer, ring } = MAP;
  const step = 360 / rooms.length;

  // Bearing ring: ticks every 5°, longer at 15° and 30°.
  let ticks = "";
  for (let i = 0; i < 72; i++) {
    const angle = i * 5;
    const length = i % 6 === 0 ? 10 : i % 3 === 0 ? 7 : 4;
    ticks += `M ${pt(ring, angle)} L ${pt(ring - length, angle)} `;
  }
  const bearings = rooms.map((room, index) => {
    const angle = index * step + step / 2;
    const p = polarPoint(ring + 14, angle);
    return `<text class="bp-text bp-bearing" x="${f(p.x)}" y="${f(p.y + 2.5)}">${String(Math.round(angle)).padStart(3, "0")}°</text>`;
  }).join("");

  // Centre lines through the plan (dash-dot) and section cut A–A.
  const centreLines = `<line class="bp-centre" x1="${cx - 252}" y1="${cy}" x2="${cx + 252}" y2="${cy}"/>
    <line class="bp-centre" x1="${cx}" y1="${cy - 250}" x2="${cx}" y2="${cy + 250}"/>`;
  const section = [-1, 1].map(side => {
    const x = cx + side * 276;
    return `<line class="bp-section-cut" x1="${cx + side * (outer + 8)}" y1="${cy}" x2="${cx + side * 264}" y2="${cy}"/>
      <circle class="bp-bubble" cx="${x}" cy="${cy}" r="10"/><text class="bp-text bp-bubble-text" x="${x}" y="${cy + 3.5}">A</text>
      <path class="bp-arrow-fill" d="M ${x - 4} ${cy - 14} L ${x + 4} ${cy - 14} L ${x} ${cy - 22} Z"/>`;
  }).join("");

  // Tiered seating arcs + aisles inside the theatre core.
  const seating = [100, 91, 82, 73].map(r => circle(r, 'class="bp-seat"')).join("");
  let aisles = "";
  for (let i = 0; i < rooms.length; i++) {
    const angle = i * step;
    aisles += `M ${pt(60, angle)} L ${pt(core, angle)} `;
  }

  // Overall diameter dimension (left) and radial dimension.
  const dimX = cx - 306;
  const diameter = `<line class="bp-ext" x1="${cx - 30}" y1="${cy - outer}" x2="${dimX - 6}" y2="${cy - outer}"/>
    <line class="bp-ext" x1="${cx - 30}" y1="${cy + outer}" x2="${dimX - 6}" y2="${cy + outer}"/>
    <line class="bp-dim" x1="${dimX}" y1="${cy - outer}" x2="${dimX}" y2="${cy + outer}" marker-start="url(#dimArrow)" marker-end="url(#dimArrow)"/>
    <text class="bp-text bp-dim-text" transform="translate(${dimX - 7} ${cy - 120}) rotate(-90)">Ø ${(outer * 2 / 10).toFixed(2)} m</text>`;

  const radialAngle = step * Math.round(210 / step);
  const a = polarPoint(core + 3, radialAngle);
  const b = polarPoint(outer, radialAngle);
  const mid = polarPoint((inner + core) / 2, radialAngle);
  const radial = `<line class="bp-dim" x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" marker-end="url(#dimArrow)"/>
    <circle class="bp-dim-dot" cx="${f(a.x)}" cy="${f(a.y)}" r="2"/>
    <rect class="bp-plate" x="${f(mid.x - 25)}" y="${f(mid.y - 8)}" width="50" height="14" rx="2"/>
    <text class="bp-text bp-dim-text" x="${f(mid.x)}" y="${f(mid.y + 3)}">R ${(outer / 10).toFixed(2)} m</text>`;

  // Angular dimension spanning one room module.
  const aStart = step, aEnd = step * 2, aR = 284;
  const mAngle = (aStart + aEnd) / 2;
  const mp = polarPoint(aR + 13, mAngle);
  const ext = angle => {
    const p = polarPoint(ring + 4, angle), q = polarPoint(aR + 5, angle);
    return `<line class="bp-ext" x1="${f(p.x)}" y1="${f(p.y)}" x2="${f(q.x)}" y2="${f(q.y)}"/>`;
  };
  const angular = `${ext(aStart)}${ext(aEnd)}
    <path class="bp-dim" d="${arcPath(aR, aStart + 0.4, aEnd - 0.4)}" marker-start="url(#dimArrow)" marker-end="url(#dimArrow)"/>
    <text class="bp-text bp-dim-text" x="${f(mp.x)}" y="${f(mp.y + 3)}">${f(step)}°</text>`;

  // Main entrance vestibule (south).
  const ex = 11;
  const entrance = `<path class="bp-wall-strong" d="M ${cx - ex} ${cy + outer} L ${cx - ex} ${cy + outer + 20} M ${cx + ex} ${cy + outer} L ${cx + ex} ${cy + outer + 20}"/>
    <path class="bp-door-swing" d="M ${cx - ex} ${cy + outer + 2} A ${ex} ${ex} 0 0 1 ${cx} ${cy + outer + 13} M ${cx + ex} ${cy + outer + 2} A ${ex} ${ex} 0 0 0 ${cx} ${cy + outer + 13}"/>
    <line class="bp-arrow-line" x1="${cx}" y1="${cy + 296}" x2="${cx}" y2="${cy + outer + 26}" marker-end="url(#dimArrow)"/>
    <text class="bp-text bp-label" x="${cx}" y="${cy + 311}">MAIN ACCESS</text>`;

  // North arrow (top-right), scale bar (bottom-left).
  const north = `<g transform="translate(112 548)"><circle class="bp-bubble" r="24"/>
    <path class="bp-arrow-fill" d="M0 -20 L6.5 8 L0 3 L-6.5 8 Z"/><path class="bp-wall" d="M0 -20 L0 3"/>
    <text class="bp-text bp-label" x="0" y="-30">N</text></g>`;
  const scale = `<g transform="translate(44 ${MAP.h - 38})">
    <rect class="bp-scale-a" x="0" y="0" width="50" height="5"/><rect class="bp-scale-b" x="50" y="0" width="50" height="5"/>
    <path class="bp-wall" d="M0 -4 V9 M50 -4 V9 M100 -4 V9"/>
    <text class="bp-text bp-scale-text" x="0" y="20">0</text><text class="bp-text bp-scale-text" x="50" y="20">5</text><text class="bp-text bp-scale-text" x="100" y="20">10 m</text>
    <text class="bp-text bp-label bp-left" x="0" y="-12">SCALE 1 : 200</text></g>`;

  // Centre stage + labels.
  const stage = `${circle(62, 'class="bp-wall-strong bp-fill-soft"')}${circle(58, 'class="bp-wall"')}
    <text class="bp-text bp-core-title" x="${cx}" y="${cy - 9}">CENTRAL</text>
    <text class="bp-text bp-core-title" x="${cx}" y="${cy + 2}">LECTURE THEATRE</text>
    <text class="bp-text bp-core-sub" x="${cx}" y="${cy + 15}">${escapeHTML(floor.toUpperCase())}</text>`;

  return { ticks, bearings, centreLines, section, seating, aisles, diameter, radial, angular, entrance, north, scale, stage };
}

function renderVectorMap(floor, rooms) {
  const svg = $("#cltMapSVG");
  const { cx, cy, core, inner, outer, ring } = MAP;
  const step = 360 / rooms.length;
  const gap = Math.max(1.0, step * 0.045);
  const parts = blueprintFurniture(floor, rooms);
  const labelRadius = (inner + outer) / 2 + 2;

  const roomMarkup = rooms.map((room, index) => {
    const center = index * step + step / 2;
    const a0 = center - step / 2 + gap / 2;
    const a1 = center + step / 2 - gap / 2;
    const status = statusFor(room.roomName);
    const label = polarPoint(labelRadius, center);
    const win0 = center - Math.min(8, step / 2 - 3), win1 = center + Math.min(8, step / 2 - 3);
    const code = status === "free" ? "FREE" : status === "booked" ? "BOOKED" : "CLASH";
    const hatch = status === "free" ? "hatchFree" : status === "booked" ? "hatchBooked" : "hatchClash";
    const filterState = filtersActive() ? (roomMatches(room) ? "match" : "dim") : "";
    return `<g class="map-room-group ${status} ${filterState} ${selectedRoom === room.roomName ? "selected" : ""}" data-room="${escapeHTML(room.roomName)}" data-center="${center}" role="button" tabindex="0" aria-label="${escapeHTML(room.roomName)}, ${status}, capacity ${room.capacity} seats">
      <path class="room-fill" d="${sectorPath(inner, outer, a0, a1)}"/>
      <path class="room-hatch" d="${sectorPath(inner, outer, a0, a1)}" fill="url(#${hatch})"/>
      <path class="room-inset" d="${sectorPath(inner + 2.6, outer - 2.6, a0 + 1, a1 - 1)}"/>
      <path class="room-window" d="${arcPath(outer - 1.3, win0, win1)}"/>
      <path class="room-outline" d="${sectorPath(inner, outer, a0, a1)}"/>
      ${doorSymbol(center)}
      <text class="bp-text room-name" x="${f(label.x)}" y="${f(label.y - 3)}">${escapeHTML(room.roomName)}</text>
      <text class="bp-text room-cap" x="${f(label.x)}" y="${f(label.y + 8)}">${room.capacity} SEATS</text>
      <text class="bp-text room-status" x="${f(label.x)}" y="${f(label.y + 18)}">${code}</text>
    </g>`;
  }).join("");

  svg.innerHTML = `${mapDefs()}
    <g class="bp-layer bp-reference">
      ${parts.centreLines}
      ${circle(ring, 'class="bp-hair"')}
      <path class="bp-ticks" d="${parts.ticks}"/>
      ${parts.bearings}
    </g>
    <g class="bp-layer bp-structure">
      ${circle(outer + 3.4, 'class="bp-wall-strong draw" pathLength="1"')}
      ${circle(inner - 3.4, 'class="bp-wall draw" pathLength="1"')}
      ${circle(core + 3, 'class="bp-wall draw" pathLength="1"')}
      ${circle(core, 'class="bp-wall-strong draw" pathLength="1"')}
      ${circle((inner + core) / 2, 'class="bp-corridor"')}
      ${parts.seating}
      <path class="bp-aisle" d="${parts.aisles}"/>
      ${parts.stage}
    </g>
    <g class="bp-layer bp-rooms">${roomMarkup}</g>
    <g class="bp-layer bp-annotations">
      ${parts.section}${parts.diameter}${parts.radial}${parts.angular}${parts.entrance}${parts.north}${parts.scale}
    </g>
    <g id="mapTip" class="map-tip" pointer-events="none" aria-hidden="true">
      <rect x="-66" y="-46" width="132" height="42" rx="3"/><path d="M-5 -4 L0 3 L5 -4 Z"/>
      <text class="tip-name" x="0" y="-30"></text><text class="tip-cap" x="0" y="-15"></text>
    </g>`;

  const rooms$ = svg.querySelectorAll(".map-room-group");
  rooms$.forEach(group => {
    const activate = () => selectRoom(group.dataset.room);
    group.addEventListener("click", event => { event.stopPropagation(); activate(); });
    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); }
    });
    group.addEventListener("mouseenter", () => showMapTip(group, rooms));
    group.addEventListener("focus", () => showMapTip(group, rooms));
    group.addEventListener("mouseleave", hideMapTip);
    group.addEventListener("blur", hideMapTip);
  });
}

function showMapTip(group, rooms) {
  const tip = $("#mapTip");
  if (!tip) return;
  const room = rooms.find(item => item.roomName === group.dataset.room);
  if (!room) return;
  const angle = Number(group.dataset.center);
  const anchor = polarPoint(MAP.outer + 20, angle);
  const below = anchor.y > MAP.cy;
  const x = Math.min(MAP.w - 76, Math.max(76, anchor.x));
  const y = below ? anchor.y + 48 : anchor.y;
  const status = statusFor(room.roomName).toUpperCase();
  tip.querySelector(".tip-name").textContent = `${room.roomName} · ${status}`;
  tip.querySelector(".tip-cap").textContent = `CAPACITY ${room.capacity} SEATS`;
  tip.setAttribute("transform", `translate(${f(x)} ${f(y)})`);
  tip.classList.toggle("below", below);
  tip.classList.add("show");
}
function hideMapTip() {
  const tip = $("#mapTip");
  if (tip) tip.classList.remove("show");
}

// Replays the CSS "drafting" line-draw animation.
function playDrawIn() {
  const svg = $("#cltMapSVG");
  clearTimeout(drawInTimer);
  svg.classList.remove("draw-in");
  void svg.getBoundingClientRect();
  svg.classList.add("draw-in");
  drawInTimer = setTimeout(() => svg.classList.remove("draw-in"), 2200);
}

// ======================================================================
// 8c. OFFICE TAB (faculty directory + professor office editor)
// ======================================================================
const OFFICE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let officeDraft = { location: "", windows: [], notes: "" };
let officeNowOnly = false;

function to12h(value) {
  const [h, m] = String(value).split(":").map(Number);
  if (Number.isNaN(h)) return value;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
function formatWindow(win) {
  const days = win.days.length >= 6 ? "Mon–Sat" : win.days.join("/");
  return `${days} · ${to12h(win.start)} – ${to12h(win.end)}`;
}
function getOffices() {
  const saved = readJSON(OFFICE_KEY, {});
  const list = OFFICE_DIRECTORY.map(item => ({ ...item, ...(saved[item.email] || {}) }));
  // Professors who are not in OFFICE_DIRECTORY yet but saved their own office.
  Object.entries(saved).forEach(([email, record]) => {
    if (!list.some(item => item.email === email)) list.push({ email, name: record.name || email, department: record.department || "Faculty", ...record });
  });
  return list.map(item => ({ location: "", windows: [], notes: "", ...item })).sort((a, b) => a.name.localeCompare(b.name));
}
function officeAvailableNow(item) {
  const today = todayName().slice(0, 3);
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = value => { const [h, m] = value.split(":").map(Number); return h * 60 + m; };
  return item.windows.some(win => win.days.includes(today) && minutes >= toMin(win.start) && minutes < toMin(win.end));
}

function renderOffice() {
  if (!currentUser) return;
  const isProfessor = currentUser.role === "Professor";
  $("#officeEditor").classList.toggle("hidden", !isProfessor);
  $("#officeSummary").classList.toggle("hidden", isProfessor);
  const all = getOffices();
  const query = normalizeKey($("#officeSearch").value);
  const shown = all.filter(item => {
    if (officeNowOnly && !officeAvailableNow(item)) return false;
    if (!query) return true;
    return normalizeKey(`${item.name} ${item.department} ${item.location}`).includes(query);
  });
  const nowCount = all.filter(officeAvailableNow).length;
  $("#officeCount").textContent = `${shown.length} ${shown.length === 1 ? "faculty member" : "faculty"}`;
  $("#officeMeta").textContent = isProfessor ? "You can edit your own office" : "Directory · view only";

  $("#officeGrid").innerHTML = shown.length ? shown.map((item, index) => {
    const mine = item.email === currentUser.email;
    const now = officeAvailableNow(item);
    const windows = item.windows.length
      ? item.windows.map(win => `<span class="office-time">◷ ${escapeHTML(formatWindow(win))}</span>`).join("")
      : `<span class="office-time dim">◷ By appointment</span>`;
    return `<article class="slot-card office-card ${mine ? "mine" : ""}" style="--i:${index}">
      <div class="slot-card-top"><b>${escapeHTML(item.name)}</b>${now ? '<em class="now-badge">AVAILABLE</em>' : ""}${mine ? '<span class="type-tag">You</span>' : ""}</div>
      <div class="office-dept">${escapeHTML(item.department || "Faculty")}</div>
      <div class="slot-meta office-loc"><span>◈ ${item.location ? escapeHTML(item.location) : "Location not set"}</span></div>
      <div class="office-times">${windows}</div>
      ${item.notes ? `<p class="event-details">${escapeHTML(item.notes)}</p>` : ""}
      ${mine ? `<button class="event-edit office-edit" type="button" data-office-edit>Edit my office</button>` : ""}
    </article>`;
  }).join("") : `<div class="empty-state"><span>◌</span><b>${officeNowOnly ? "Nobody is holding consultation hours right now" : "No faculty match your search"}</b><p>${officeNowOnly ? "Switch off “Available now” to see everyone." : "Try a different name, department or room."}</p></div>`;

  if (isProfessor) {
    loadOfficeDraft();
    $("#officeLocation").value = officeDraft.location;
    $("#officeNotes").value = officeDraft.notes;
    $("#officeError").textContent = "";
    renderOfficeWindows();
  } else {
    const placed = all.filter(item => item.location).length;
    $("#officeSummary").innerHTML = `
      <p class="eyebrow">DIRECTORY SUMMARY</p>
      <h2>Faculty offices</h2>
      <div class="summary-grid"><div><span>FACULTY</span><strong>${all.length}</strong></div><div><span>AVAILABLE NOW</span><strong>${nowCount}</strong></div></div>
      <div class="summary-row"><span>Offices listed</span><b>${placed}</b></div>
      <div class="summary-row"><span>Today</span><b>${escapeHTML(todayName())}</b></div>
      <p class="muted small-text">Consultation hours are set by each professor. If a window isn't listed, email them to book a time.</p>`;
  }
}

// ---- professor editor ----
function loadOfficeDraft() {
  const mine = getOffices().find(item => item.email === currentUser.email);
  officeDraft = mine
    ? { location: mine.location, windows: JSON.parse(JSON.stringify(mine.windows)), notes: mine.notes }
    : { location: "", windows: [], notes: "" };
}
function renderOfficeWindows() {
  $("#officeWindows").innerHTML = officeDraft.windows.length ? officeDraft.windows.map((win, index) => `
    <div class="win-row" data-win="${index}">
      <div class="day-chips" role="group" aria-label="Days">${OFFICE_DAYS.map(day => `<button type="button" class="day-chip ${win.days.includes(day) ? "on" : ""}" data-day="${day}" aria-pressed="${win.days.includes(day)}">${day[0]}<span class="sr-only">${day}</span></button>`).join("")}</div>
      <div class="win-times">
        <input type="time" value="${escapeHTML(win.start)}" data-field="start" aria-label="Start time" />
        <span aria-hidden="true">–</span>
        <input type="time" value="${escapeHTML(win.end)}" data-field="end" aria-label="End time" />
        <button type="button" class="win-remove" data-remove aria-label="Remove time window">×</button>
      </div>
    </div>`).join("") : `<p class="muted small-text win-empty">No fixed hours — students will see “By appointment”.</p>`;
}
function saveOffice(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== "Professor") return;
  const location = $("#officeLocation").value.trim();
  const notes = $("#officeNotes").value.trim();
  const fail = text => setFormMessage("#officeError", text, false);
  if (!location) return fail("Add your office location (for example Block A, Room 302).");
  for (const win of officeDraft.windows) {
    if (!win.days.length) return fail("Pick at least one day for every time window.");
    if (!win.start || !win.end || win.end <= win.start) return fail("Each window's end time must be after its start time.");
  }
  const saved = readJSON(OFFICE_KEY, {});
  const base = OFFICE_DIRECTORY.find(item => item.email === currentUser.email) || {};
  saved[currentUser.email] = { name: base.name || currentUser.name, department: base.department || "Faculty", location, windows: officeDraft.windows, notes, updated: new Date().toISOString() };
  writeJSON(OFFICE_KEY, saved);
  addAudit("Office updated", `${location} · ${officeDraft.windows.length} window(s)`);
  renderOffice();
  setFormMessage("#officeError", "Saved. Students can now see your updated office.", true);
  notify("Office details saved.");
}

// ======================================================================
// 9b. SLOTS TAB — SEARCH & FILTERS
// ======================================================================
const normalizeKey = value => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");   // "LG-01" / "lg 01" / "lg01" all match

function subjectList() {
  const set = new Map();
  const add = name => { const key = String(name).trim().toLowerCase(); if (key && !set.has(key)) set.set(key, String(name).trim()); };
  SUBJECT_OPTIONS.forEach(add);
  Object.values(ROOM_SUBJECTS).flat().forEach(add);
  if (AUTO_INCLUDE_SCHEDULE_SUBJECTS) allSessions().forEach(item => add(item.subject));
  return [...set.values()].sort((a, b) => a.localeCompare(b));
}
function subjectsForRoom(roomName) {
  const subjects = (ROOM_SUBJECTS[roomName] || []).map(item => item.toLowerCase());
  allSessions().filter(item => item.room === roomName).forEach(item => subjects.push(String(item.subject).toLowerCase()));
  return subjects;
}
function filtersActive() {
  return Boolean(roomFilter.query.trim() || roomFilter.subject || roomFilter.seats !== "");
}
function roomMatches(room) {
  if (!filtersActive()) return true;
  const q = normalizeKey(roomFilter.query);
  if (q && !normalizeKey(room.roomName).includes(q)) return false;
  if (roomFilter.subject) {
    const wanted = roomFilter.subject.toLowerCase();
    if (!subjectsForRoom(room.roomName).some(item => item.includes(wanted))) return false;
  }
  if (roomFilter.seats !== "") {
    const category = SEAT_CATEGORIES[Number(roomFilter.seats)];
    if (category && (room.capacity < category.min || room.capacity > category.max)) return false;
  }
  return true;
}

function populateSeatOptions() {
  $("#seatFilter").innerHTML = `<option value="">All sizes</option>` + SEAT_CATEGORIES.map((item, index) => `<option value="${index}">${escapeHTML(item.label)}</option>`).join("");
  $("#seatFilter").value = roomFilter.seats;
}
function populateSubjectOptions() {
  const subjects = subjectList();
  const signature = subjects.join("|");
  const select = $("#subjectFilter");
  if (select.dataset.signature === signature) return;
  select.dataset.signature = signature;
  // The booking form's Subject dropdown uses the exact same list as the search filter.
  const bookingSubject = $("#subjectName");
  const chosen = bookingSubject.value;
  bookingSubject.innerHTML = `<option value="">Select subject</option>` + subjects.map(item => `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`).join("");
  bookingSubject.value = subjects.includes(chosen) ? chosen : "";
  select.innerHTML = `<option value="">All subjects</option>` + subjects.map(item => `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`).join("");
  if (roomFilter.subject && !subjects.some(item => item.toLowerCase() === roomFilter.subject.toLowerCase())) roomFilter.subject = "";
  select.value = roomFilter.subject;
}

// Status line + clickable list of matching rooms (searches both floors).
function renderFindResults() {
  const active = filtersActive();
  const everywhere = allRooms().filter(roomMatches);
  const floor = $("#floorSelect").value;
  const here = everywhere.filter(room => room.floor === floor).length;
  $("#findClear").classList.toggle("hidden", !active);
  $("#bpFind").classList.toggle("is-active", active);
  $("#findToggle").classList.toggle("has-filters", active);
  if (!active) {
    $("#findStatus").textContent = "";
    $("#findResults").innerHTML = "";
    return;
  }
  $("#findStatus").innerHTML = everywhere.length
    ? `<b>${everywhere.length}</b> ${everywhere.length === 1 ? "room" : "rooms"} match · <b>${here}</b> on this floor`
    : `<b>No rooms match.</b> Try a different search or <button type="button" class="link-btn" data-find="reset">clear filters</button>.`;
  $("#findResults").innerHTML = everywhere.map(room =>
    `<button type="button" class="find-chip ${room.roomName === selectedRoom ? "selected" : ""} ${room.floor === floor ? "" : "other-floor"}" data-room="${escapeHTML(room.roomName)}" title="${escapeHTML(room.floor)} · ${room.capacity} seats">${escapeHTML(room.roomName)}<small>${room.capacity}</small></button>`).join("");
}
// Re-draws the map + lists after any search/filter change (no draw-in replay).
function applyRoomFilters() {
  $("#cltMapSVG").classList.remove("draw-in");      // don't replay the drafting animation while typing
  if (activePage === "Slots") renderSlots();
}
function jumpToRoom(roomName) {
  const room = allRooms().find(item => item.roomName === roomName);
  if (!room) return;
  if ($("#floorSelect").value !== room.floor) {
    $("#floorSelect").value = room.floor;
    selectedRoom = roomName;
    renderSlots();
    playDrawIn();
  } else {
    selectRoom(roomName);
  }
  renderFindResults();
}
function resetRoomFilters() {
  roomFilter = { query: "", subject: "", seats: "" };
  $("#roomSearch").value = "";
  $("#subjectFilter").value = "";
  $("#seatFilter").value = "";
  applyRoomFilters();
}

// ======================================================================
// 10. SLOTS TAB
// ======================================================================
function renderSlots() {
  const floor = $("#floorSelect").value;
  const rooms = ROOM_DATA[floor] || [];
  populateSubjectOptions();
  renderVectorMap(floor, rooms);
  const counts = { free: 0, booked: 0, clash: 0 };
  rooms.forEach(room => { counts[statusFor(room.roomName)]++; });
  $("#countFree").textContent = counts.free;
  $("#countBooked").textContent = counts.booked;
  $("#countClash").textContent = counts.clash;
  $("#roomCount").textContent = `${rooms.length} rooms · ${viewLabel()}`;
  $("#alertCount").textContent = allRooms().filter(item => statusFor(item.roomName) !== "free").length;
  renderRoomOptions();
  renderFindResults();
  renderActivity();
  if (selectedRoom && !rooms.some(room => room.roomName === selectedRoom)) selectedRoom = null;
  $("#slotsPage").classList.toggle("has-selection", Boolean(selectedRoom));
  renderRoomDetails(allRooms().find(room => room.roomName === selectedRoom));
}
function bookingDayName() {
  const date = $("#bookingDate").value;
  return date ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" }) : defaultDay();
}
function renderTimeOptions() {
  const select = $("#bookingTime");
  const previous = select.value;
  const slots = slotsFor(bookingDayName());
  select.innerHTML = slots.length
    ? slots.map(slot => `<option>${slot}</option>`).join("")
    : `<option value="">No classes on Sunday</option>`;
  if (slots.includes(previous)) select.value = previous;
}
function renderRoomOptions() {
  const onFloor = ROOM_DATA[$("#floorSelect").value] || [];
  // When search/filters are active, the booking form only offers matching rooms on this floor.
  const matching = filtersActive() ? onFloor.filter(roomMatches) : onFloor;
  const floorRooms = matching.length ? matching : onFloor;
  const hint = $("#bookingFilterHint");
  const narrowed = filtersActive() && matching.length > 0 && matching.length < onFloor.length;
  hint.classList.toggle("hidden", !narrowed);
  if (narrowed) hint.textContent = `Room list narrowed by filters (${matching.length} of ${onFloor.length}).`;
  const previous = $("#bookingRoom").value;
  $("#bookingRoom").innerHTML = floorRooms.map(room => `<option value="${escapeHTML(room.roomName)}">${escapeHTML(room.roomName)} · ${room.capacity} seats</option>`).join("");
  const wanted = selectedRoom || previous;
  if (wanted && floorRooms.some(room => room.roomName === wanted)) $("#bookingRoom").value = wanted;
}
function selectRoom(roomName) {
  selectedRoom = roomName;
  $("#slotsPage").classList.add("has-selection");
  $$("#cltMapSVG .map-room-group").forEach(group => group.classList.toggle("selected", group.dataset.room === roomName));
  if ([...$("#bookingRoom").options].some(option => option.value === roomName)) $("#bookingRoom").value = roomName;
  renderRoomDetails(allRooms().find(room => room.roomName === roomName));
}
function clearRoomSelection() {
  if (!selectedRoom) return;
  selectedRoom = null;
  $("#slotsPage").classList.remove("has-selection");
  $$("#cltMapSVG .map-room-group").forEach(group => group.classList.remove("selected"));
  renderRoomDetails(null);
}
function renderRoomDetails(room) {
  if (!room) {
    $("#roomDetails").innerHTML = `<div class="empty-state compact"><span>⌖</span><b>No room selected</b><p>Select a room on the blueprint to see its full schedule: when it is free, booked or clashing.</p></div>`;
    return;
  }
  const sessions = roomSessions(room.roomName);
  const day = roomDay || viewContext.day || defaultDay();
  const stateOf = list => (list && list.length > 1 ? "clash" : list && list.length ? "booked" : "free");
  const status = statusFor(room.roomName);
  const chips = SCHEDULE_DAYS.map(d => `<button type="button" class="rs-day ${d === day ? "active" : ""}" data-room-day="${d}" aria-pressed="${d === day}" title="${d}">${d.slice(0, 3)}</button>`).join("");
  const daySlots = slotsFor(day);
  const pattern = patternFor(day);
  const rows = daySlots.map(slot => {
    const list = sessions.get(`${day}|${slot}`) || [];
    const st = stateOf(list);
    const what = list.length ? list.map(e => `${escapeHTML(e.subject)} · ${escapeHTML(e.batch)}<small>${escapeHTML(e.source)}</small>`).join("<br>") : "Available";
    return `<li class="rs-row ${st}"><span class="rs-time">${slot}</span><div class="rs-main"><span class="rs-chip ${st}">${st.toUpperCase()}</span><span class="rs-what">${what}</span></div></li>`;
  }).join("");
  // Week at a glance: one column per day, one row per period of that day (days have different period counts).
  const maxPeriods = Math.max(...SCHEDULE_DAYS.map(d => slotsFor(d).length));
  const week = Array.from({ length: maxPeriods }, (_, i) => `<div class="rs-weekrow">${SCHEDULE_DAYS.map(d => {
    const slot = slotsFor(d)[i];
    if (!slot) return `<i class="na" aria-hidden="true"></i>`;
    const st = stateOf(sessions.get(`${d}|${slot}`));
    return `<i class="${st}" data-room-day="${d}" title="${d} ${slot}: ${st}"></i>`;
  }).join("")}</div>`).join("");
  $("#roomDetails").innerHTML = `<div class="detail-top"><b>${escapeHTML(room.roomName)}</b><span class="rs-chip ${status}" title="Status for ${escapeHTML(viewLabel())}">${status.toUpperCase()}</span></div>
    <div class="detail-grid"><div class="detail-cell"><span>CAPACITY</span><b>${room.capacity} seats</b></div><div class="detail-cell"><span>FLOOR</span><b>${escapeHTML(room.floor)}</b></div></div>
    <p class="rs-label">DAILY SCHEDULE · ${escapeHTML(pattern ? pattern.label : "")}</p><div class="rs-days" role="group" aria-label="Choose a day">${chips}</div>
    <ul class="rs-list" aria-label="${escapeHTML(room.roomName)} schedule for ${day}">${rows}</ul>
    <p class="rs-label">WEEK AT A GLANCE · MON–SAT</p><div class="rs-week">${week}</div>`;
}

// Booking pill collapse / expand
function setBookingOpen(open) {
  const pill = $("#bookingForm");
  pill.classList.toggle("collapsed", !open);
  $("#bookingToggle").setAttribute("aria-expanded", String(open));
  $("#bookingFields").inert = !open;
  $("#slotsPage").classList.toggle("booking-open", open);
}

// ======================================================================
// 11. REPORT TAB
// ======================================================================
// Every session known to the portal (both timetables + published bookings), de-duplicated by day/slot/room.
function allSessions() {
  const seen = new Set();
  const list = [];
  const published = getBookings().map(item => ({ ...item, type: "extra" }));
  [...professorScheduleData, ...studentScheduleData, ...published].forEach(item => {
    const key = `${item.day}|${item.slot}|${item.room}`;
    if (seen.has(key)) return;
    seen.add(key);
    list.push(item);
  });
  return list;
}
function floorOf(roomName) {
  const room = allRooms().find(item => item.roomName === roomName);
  return room ? room.floor : "Unknown";
}
function metricCard(label, value, note, icon) {
  return `<article class="stat-card"><span class="stat-icon">${icon}</span><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
}
function barRow(label, value, total, { suffix = "", color = "", tag = "" } = {}) {
  const percent = total ? Math.round(value / total * 100) : 0;
  const style = `width:${percent}%${color ? `;background:${color};box-shadow:0 0 12px ${color}` : ""}`;
  return `<div class="bar-row"><span>${escapeHTML(label)}${tag ? ` <em class="bar-tag ${tag.toLowerCase()}">${tag}</em>` : ""}</span><div class="bar-track"><div class="bar-fill" style="${style}"></div></div><b>${value}${suffix}</b></div>`;
}

function renderReport() {
  if (!currentUser) return;
  const isProfessor = currentUser.role === "Professor";
  $("#reportProf").classList.toggle("hidden", !isProfessor);
  $("#reportStudent").classList.toggle("hidden", isProfessor);
  $("#exportCsvBtn").classList.toggle("hidden", !isProfessor);
  $("#reportMeta").textContent = isProfessor ? "Analytics · CLT complex" : "Analytics · your weekly schedule";
  if (isProfessor) renderProfessorReport(); else renderStudentReport();
}

// ---------- PROFESSOR REPORT ----------
function renderProfessorReport() {
  const rooms = allRooms();
  const engaged = rooms.filter(room => statusFor(room.roomName, "", "") !== "free").length;
  const sessions = allSessions();
  const prevented = clashesPrevented();
  $("#reportCards").innerHTML = [
    metricCard("Engaged rooms", engaged, "Rooms with a published booking", "◈"),
    metricCard("Free rooms", rooms.length - engaged, `Of ${rooms.length} across both floors`, "◇"),
    metricCard("Clashes prevented", prevented, "Double-bookings intercepted", "⛨"),
    metricCard("Weekly sessions", sessions.length, "Timetable + published bookings", "▦")
  ].join("");

  // Heatmap: one block per day pattern so MWF, Tue/Thu and Saturday each show their own time slots.
  const count = (day, slot) => sessions.filter(item => item.day === day && item.slot === slot).length;
  const max = Math.max(1, ...SCHEDULE_DAYS.flatMap(day => slotsFor(day).map(slot => count(day, slot))));
  const heatHTML = DAY_PATTERNS.map(pattern => {
    const head = `<div class="heat-corner" role="columnheader"></div>` + pattern.slots.map(slot => `<div class="heat-head" role="columnheader" title="${escapeHTML(slot)}">${escapeHTML(slot.split("–")[0])}</div>`).join("");
    const body = pattern.days.map(day => `<div class="heat-day" role="rowheader">${day.slice(0, 3)}</div>` + pattern.slots.map(slot => {
      const n = count(day, slot);
      return `<div class="heat-cell ${n === max && n > 0 ? "peak" : ""}" role="cell" style="--lvl:${(n / max).toFixed(2)}" title="${day} ${escapeHTML(slot)}: ${n} ${n === 1 ? "session" : "sessions"}" tabindex="0" aria-label="${day} ${escapeHTML(slot)}, ${n} sessions">${n || ""}</div>`;
    }).join("")).join("");
    return `<div class="heat-group"><p class="heat-group-label">${escapeHTML(pattern.label)} · ${pattern.slots.length} ${pattern.slots.length === 1 ? "period" : "periods"}</p><div class="heat-grid" style="--cols:${pattern.slots.length}">${head}${body}</div></div>`;
  }).join("");
  const heat = $("#heatmap");
  heat.innerHTML = heatHTML;
  $("#heatMeta").textContent = `${sessions.length} sessions · ${rooms.length} rooms`;

  // Peak vs idle hours: per slot, averaged per day of its pattern so Saturday (1 day) and Tue/Thu (2 days) compare fairly with MWF (3 days).
  const perSlot = DAY_PATTERNS.flatMap(pattern => pattern.slots.map(slot => {
    const total = pattern.days.reduce((sum, day) => sum + count(day, slot), 0);
    return { slot, label: `${pattern.id === "TTH" ? "T/Th" : pattern.id === "SAT" ? "Sat" : "MWF"} · ${slot}`, total, avg: Math.round(total / pattern.days.length * 10) / 10 };
  }));
  const hi = Math.max(...perSlot.map(item => item.avg));
  const lo = Math.min(...perSlot.map(item => item.avg));
  $("#hourBars").innerHTML = perSlot.map(item => barRow(item.label, item.avg, hi || 1, {
    suffix: ` / day · ${item.total} total`,
    tag: hi === lo ? "" : item.avg === hi ? "Peak" : item.avg === lo ? "Idle" : ""
  })).join("");

  // Departmental allocation by batch prefix (CSE-A → CSE).
  const byDept = {};
  sessions.forEach(item => { const dept = String(item.batch || "Other").split("-")[0].trim().toUpperCase() || "OTHER"; byDept[dept] = (byDept[dept] || 0) + 1; });
  const depts = Object.entries(byDept).sort((a, b) => b[1] - a[1]);
  const total = sessions.length || 1;
  let acc = 0;
  const stops = depts.map(([, count], i) => { const from = acc / total * 100; acc += count; return `${DEPT_COLORS[i % DEPT_COLORS.length]} ${from.toFixed(2)}% ${(acc / total * 100).toFixed(2)}%`; });
  $("#deptDonut").style.background = depts.length ? `conic-gradient(${stops.join(", ")})` : "var(--heat-0)";
  $("#deptTotal").textContent = sessions.length;
  $("#deptMeta").textContent = `${depts.length} ${depts.length === 1 ? "department" : "departments"}`;
  $("#deptBars").innerHTML = depts.map(([name, count], i) => barRow(name, count, total, { color: DEPT_COLORS[i % DEPT_COLORS.length], suffix: ` · ${Math.round(count / total * 100)}%` })).join("") || `<p class="muted small-text">No sessions yet.</p>`;

  // Audit preview.
  const audit = getAudit();
  $("#auditMeta").textContent = `${audit.length} ${audit.length === 1 ? "entry" : "entries"}`;
  $("#auditList").innerHTML = audit.length ? audit.slice(0, 6).map(item => `<div class="audit-item ${item.type === "Clash prevented" ? "warn" : ""}"><i></i><div><b>${escapeHTML(item.type)}</b><span>${escapeHTML(item.detail)}</span></div><time>${escapeHTML(new Date(item.t).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))}</time></div>`).join("")
    : `<div class="empty-state compact"><span>◌</span><b>No activity yet</b><p>Publish a booking or announce an event and it will be logged here.</p></div>`;
}

// ---------- STUDENT REPORT ----------
function renderStudentReport() {
  const classes = studentClasses();
  const regular = classes.filter(item => item.type !== "extra");
  const extra = classes.filter(item => item.type === "extra");
  const perDay = SCHEDULE_DAYS.map(day => ({ day, count: classes.filter(item => item.day === day).length }));
  const busiest = [...perDay].sort((a, b) => b.count - a.count)[0];
  $("#reportCards").innerHTML = [
    metricCard("Weekly hours", classes.length, "Total scheduled class hours", "◷"),
    metricCard("Regular lectures", regular.length, "Core timetable classes", "▦"),
    metricCard("Extra sessions", extra.length, "Makeup, labs and workshops", "＋"),
    metricCard("Busiest day", busiest && busiest.count ? busiest.day.slice(0, 3) : "—", busiest && busiest.count ? `${busiest.count} ${busiest.count === 1 ? "class" : "classes"}` : "No classes", "▲")
  ].join("");

  // Density gauge: weekly classes as a share of every teaching period in the Mon–Sat week.
  const capacity = SCHEDULE_DAYS.reduce((sum, day) => sum + slotsFor(day).length, 0);
  const pct = Math.min(100, Math.round(classes.length / capacity * 100));
  const label = pct < 25 ? "Light" : pct < 50 ? "Balanced" : pct < 75 ? "Busy" : "Heavy";
  $("#densityGauge").style.setProperty("--pct", pct);
  $("#gaugeValue").textContent = `${pct}%`;
  $("#gaugeLabel").textContent = label;
  $("#densityMeta").textContent = `${classes.length} of ${capacity} weekly periods`;
  $("#densityDays").innerHTML = perDay.map(item => {
    const level = item.count / (slotsFor(item.day).length || 1);
    return `<div class="density-day ${item.day === todayName() ? "today" : ""}"><div class="density-col"><i style="height:${Math.max(4, Math.round(level * 100))}%"></i></div><b>${item.day.slice(0, 3)}</b><span>${item.count}h</span></div>`;
  }).join("");

  // Regular vs extra split.
  const total = classes.length || 1;
  const rp = Math.round(regular.length / total * 100);
  $("#splitMeta").textContent = `${classes.length} classes this week`;
  $("#splitBar").innerHTML = classes.length
    ? `<span class="seg regular" style="width:${rp}%"><b>${rp}%</b></span><span class="seg extra" style="width:${100 - rp}%"><b>${100 - rp}%</b></span>`
    : `<span class="seg empty">No classes</span>`;
  $("#splitLegend").innerHTML = `
    <div class="split-item"><i class="regular"></i><div><b>Regular lectures</b><span>${regular.length} ${regular.length === 1 ? "hour" : "hours"} · core timetable</span></div></div>
    <div class="split-item"><i class="extra"></i><div><b>Makeup / extra sessions</b><span>${extra.length} ${extra.length === 1 ? "hour" : "hours"} · labs, tutorials, workshops</span></div></div>`;

  // Primary venues.
  const byFloor = {}, byRoom = {};
  classes.forEach(item => { const floor = floorOf(item.room); byFloor[floor] = (byFloor[floor] || 0) + 1; byRoom[item.room] = (byRoom[item.room] || 0) + 1; });
  const floors = Object.entries(byFloor).sort((a, b) => b[1] - a[1]);
  const topRooms = Object.entries(byRoom).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5);
  $("#venueMeta").textContent = topRooms.length ? `Most visited: ${topRooms[0][0]}` : "No venues yet";
  $("#floorBars").innerHTML = `<h3>By floor</h3>` + (floors.map(([floor, count], i) => barRow(floor, count, total, { color: DEPT_COLORS[i % 2 ? 1 : 0], suffix: ` · ${Math.round(count / total * 100)}%` })).join("") || `<p class="muted small-text">No classes yet.</p>`);
  $("#roomBars").innerHTML = `<h3>Top rooms</h3>` + (topRooms.map(([room, count]) => barRow(room, count, topRooms[0][1], { suffix: count === 1 ? " class" : " classes" })).join("") || `<p class="muted small-text">No classes yet.</p>`);
}

// ---------- CSV export (audit log + bookings) ----------
function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;           // neutralise spreadsheet formula injection
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
function exportCsv() {
  if (!currentUser || currentUser.role !== "Professor") return;
  const rows = [["CLASSROOT · BOOKING & AUDIT REPORT"], ["Generated", new Date().toISOString()], ["Exported by", currentUser.email], ["Clashes prevented", clashesPrevented()], [],
    ["AUDIT LOG"], ["Timestamp", "Type", "Detail", "Room", "Actor"],
    ...getAudit().map(item => [item.t, item.type, item.detail, item.room, item.actor]), [],
    ["BOOKINGS"], ["Date", "Day", "Time", "Room", "Floor", "Batch", "Subject"],
    ...getBookings().map(item => [item.date, item.day, item.time, item.room, item.floor, item.batch, item.subject])];
  const csv = "\ufeff" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `clt-sync-report-${isoDate(new Date())}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  notify("CSV report downloaded.");
}

// ======================================================================
// 11c. CALENDAR SYNC (.ics export)
// ======================================================================
const pad2 = number => String(number).padStart(2, "0");
const DAY_INDEX = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
function icsEscape(text) {
  return String(text || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}
function icsFold(line) {                      // RFC 5545: lines are limited to 75 octets
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  let out = "", chunk = "", bytes = 0, limit = 75;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > limit) { out += chunk + "\r\n "; chunk = ""; bytes = 0; limit = 74; }
    chunk += char; bytes += size;
  }
  return out + chunk;
}
function icsLocal(date, time) {                // floating local time → shows at the same wall-clock time everywhere
  const [h, m] = String(time).split(":");
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(h)}${pad2(m)}00`;
}
function icsUtcStamp() {
  const d = new Date();
  return `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}${pad2(d.getUTCSeconds())}Z`;
}
function nextWeekday(dayName) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  while (date.getDay() !== DAY_INDEX[dayName]) date.setDate(date.getDate() + 1);
  return date;
}
function icsEntries() {
  const entries = [];
  const professor = currentUser.role === "Professor";
  // Weekly timetable (recurring).
  myClasses().forEach(item => entries.push({ kind: "class", item }));
  // Students also get professor-published extra classes (one-off dates).
  if (!professor) studentExtraClasses(currentUser).forEach(item => entries.push({ kind: "booking", item }));
  // Professors also get the bookings they published (one-off dates).
  if (professor) myBookings().forEach(item => entries.push({ kind: "booking", item }));
  return entries;
}
function updateIcsHint() {
  if (!currentUser) return;
  const classes = icsEntries().length;
  const events = getEvents().filter(item => item.date >= isoDate(new Date())).length;
  $("#icsHint").textContent = `${classes} timetable ${classes === 1 ? "entry" : "entries"} · ${events} upcoming ${events === 1 ? "event" : "events"}`;
}
function downloadIcs() {
  if (!currentUser) return;
  const weeks = Number($("#icsWeeks").value) || 16;
  const withEvents = $("#icsEvents").getAttribute("aria-checked") === "true";
  const alarm = getPrefs().reminder15;
  const stamp = icsUtcStamp();
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//CLASSROOT//Scheduling Portal//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:CLASSROOT · ${currentUser.role}`];
  let count = 0;
  const addEvent = ({ uid, start, end, summary, location, description, category, recur }) => {
    lines.push("BEGIN:VEVENT", `UID:${uid}@classroot.local`, `DTSTAMP:${stamp}`, `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${icsEscape(summary)}`);
    if (location) lines.push(`LOCATION:${icsEscape(location)}`);
    if (description) lines.push(`DESCRIPTION:${icsEscape(description)}`);
    if (category) lines.push(`CATEGORIES:${icsEscape(category)}`);
    if (recur) lines.push(`RRULE:FREQ=WEEKLY;COUNT=${weeks}`);
    if (alarm) lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsEscape(summary)} starts in 15 minutes`, "TRIGGER:-PT15M", "END:VALARM");
    lines.push("END:VEVENT");
    count++;
  };
  icsEntries().forEach(({ kind, item }, index) => {
    const [from, to] = String(item.slot).split("–");
    const date = kind === "booking" ? new Date(`${item.date}T12:00:00`) : nextWeekday(item.day);
    const extra = item.type === "extra" || kind === "booking";
    addEvent({
      uid: `${kind}-${index}-${item.day}-${from}-${item.room}`.replace(/[^A-Za-z0-9-]/g, ""),
      start: icsLocal(date, from), end: icsLocal(date, to),
      summary: `${item.subject}${extra ? " (extra)" : ""}`,
      location: `Room ${item.room}, ${floorOf(item.room)}`,
      description: [item.batch && `Batch: ${item.batch}`, item.faculty && `Faculty: ${item.faculty}`].filter(Boolean).join("\n"),
      category: extra ? "Extra class" : "Class",
      recur: kind === "class"
    });
  });
  if (withEvents) {
    getEvents().filter(item => item.date >= isoDate(new Date())).forEach(item => {
      const date = new Date(`${item.date}T12:00:00`);
      addEvent({ uid: `event-${item.id}`, start: icsLocal(date, item.start), end: icsLocal(date, item.end), summary: item.title, location: item.venue, description: item.details, category: `Campus event · ${item.category}` });
    });
  }
  lines.push("END:VCALENDAR");
  const body = lines.map(icsFold).join("\r\n") + "\r\n";
  const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `classroot-calendar-${isoDate(new Date())}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  notify(`Calendar file downloaded · ${count} ${count === 1 ? "entry" : "entries"}.`);
}

// ======================================================================
// 11b. SETTINGS TAB
// ======================================================================
function renderSettings() {
  if (!currentUser) return;
  const prefs = getPrefs();
  $$("[data-pref]").forEach(sw => sw.setAttribute("aria-checked", String(Boolean(prefs[sw.dataset.pref]))));
  applyTheme(currentTheme(), { persist: false });
  applyAccent(currentAccent(), { persist: false });
  const isProfessor = currentUser.role === "Professor";
  updateIcsHint();
  $("#passcodeAdminForm").classList.toggle("hidden", !isProfessor);
  $("#passcodeStudentForm").classList.toggle("hidden", isProfessor);
  $("#passcodeUnlockBtn").classList.toggle("hidden", eventsUnlocked);
  $("#passcodeLockBtn").classList.toggle("hidden", !eventsUnlocked);
  $("#passcodeSettingsHint").textContent = isProfessor
    ? "Students must enter this passcode before they can add or edit events. You always have full access."
    : eventsUnlocked ? "Event editing is unlocked for this session." : "You can view events. Enter the passcode to add or edit them.";
  $("#pwMessage").textContent = "";
  $("#pwMessage").className = "form-msg";
}
function setFormMessage(selector, text, ok) {
  const el = $(selector);
  el.textContent = text;
  el.className = `form-msg ${ok ? "ok" : "err"}`;
}

// 15-minute reminders: checks today's classes for the signed-in role.
const remindersSent = new Set();
function checkReminders() {
  if (!currentUser || !getPrefs().reminder15) return;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = todayName();
  const source = currentUser.role === "Professor" ? [...myClasses(), ...myBookings()] : studentClasses().filter(item => !item.published || item.date === isoDate(now));
  source.filter(item => item.day === day).forEach(item => {
    const [h, m] = String(item.slot).split("–")[0].split(":").map(Number);
    const diff = h * 60 + m - minutes;
    const key = `${isoDate(now)}|${item.slot}|${item.room}`;
    if (diff > 0 && diff <= 15 && !remindersSent.has(key)) {
      remindersSent.add(key);
      notify(`Reminder: ${item.subject} starts in ${diff} min · ${item.room}`);
    }
  });
}
setInterval(checkReminders, 20000);

// Live alerts from another tab of this browser (e.g. a professor publishing while a student watches).
window.addEventListener("storage", event => {
  if (!currentUser) return;
  if (event.key === EVENTS_KEY && getPrefs().instant) {
    let before = [], after = [];
    try { before = JSON.parse(event.oldValue || "[]"); after = JSON.parse(event.newValue || "[]"); } catch { return; }
    const known = new Map(before.map(item => [item.id, JSON.stringify(item)]));
    const changed = after.find(item => !known.has(item.id) || known.get(item.id) !== JSON.stringify(item));
    if (changed) notify(`${known.has(changed.id) ? "Event updated" : "New event"}: ${changed.title} · ${changed.venue}`);
    if (activePage === "Events") renderEvents();
  }
  if (event.key === STORAGE_KEY) {
    let before = [], after = [];
    try { before = JSON.parse(event.oldValue || "[]"); after = JSON.parse(event.newValue || "[]"); } catch { return; }
    const known = new Set(before.map(item => JSON.stringify(item)));
    const added = after.find(item => !known.has(JSON.stringify(item)));
    if (added && getPrefs().roomChange) notify(`Room update: ${added.subject} · ${added.room} · ${added.time}`);
    renderAll();
  }
});

function renderAll() {
  renderSchedule();
  if (activePage === "Slots") renderSlots();
  if (activePage === "Report") renderReport();
  if (activePage === "Events") renderEvents();
}

// ======================================================================
// 12. EVENT WIRING
// ======================================================================
// ---- login ----
$("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = $("#userEmail").value.trim().toLowerCase();
  const password = $("#userPassword").value;
  const result = validateLogin(email, password);
  if (!result.ok) {
    $("#userPassword").value = "";
    showAuthDialog(result);
    return;
  }
  clearLoginErrors();
  $("#loginForm").reset();
  $("#userPassword").type = "password";
  syncPasswordToggle();
  enterPortal(result.account);
});
["#userEmail", "#userPassword"].forEach(selector => $(selector).addEventListener("input", clearLoginErrors));
$("#togglePassword").addEventListener("click", () => {
  const input = $("#userPassword");
  input.type = input.type === "password" ? "text" : "password";
  syncPasswordToggle();
  input.focus();
});

// ---- invalid-login dialog ----
$("#authDialogClose").addEventListener("click", closeAuthDialog);
$("#authDialog").addEventListener("click", event => { if (event.target === event.currentTarget) closeAuthDialog(); });
$("#authDialog").addEventListener("close", () => {
  const target = $(dialogFocusTarget);
  if (target) target.focus();
});

// ---- profile dropdown + sign out ----
$("#userMenu").addEventListener("click", event => { event.stopPropagation(); toggleUserMenu(); });
$("#signOutBtn").addEventListener("click", signOut);
document.addEventListener("click", event => {
  if (!$("#userMenuWrap").contains(event.target)) closeUserMenu({ restoreFocus: false });
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeUserMenu();
});
$("#userMenuWrap").addEventListener("keydown", event => {
  if (event.key === "ArrowDown" && !$("#userDropdown").classList.contains("open")) {
    event.preventDefault(); openUserMenu(); $("#signOutBtn").focus();
  }
});
$("#userMenu").addEventListener("keydown", event => {
  if (event.key === "ArrowDown") { event.preventDefault(); openUserMenu(); $("#signOutBtn").focus(); }
});
$("#brandLink").addEventListener("click", event => { event.preventDefault(); showPage("Schedule"); });

// ---- schedule day tabs ----
$("#scheduleDayTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-day]");
  if (!button) return;
  activeDay = button.dataset.day;
  $$("#scheduleDayTabs button").forEach(item => item.classList.toggle("active", item === button));
  renderSchedule();
  const view = currentUser && currentUser.role === "Professor" ? $("#professorView") : $("#studentView");
  view.classList.remove("day-swap");
  void view.offsetWidth;
  view.classList.add("day-swap");
});

// ---- report ----
$("#exportCsvBtn").addEventListener("click", exportCsv);

// ---- theme + accent ----
$("#themeQuick").addEventListener("click", () => applyTheme(currentTheme() === "light" ? "dark" : "light"));
$("#themeSwitch").addEventListener("click", () => applyTheme(currentTheme() === "light" ? "dark" : "light"));
$("#accentOptions").addEventListener("click", event => {
  const chip = event.target.closest("[data-accent]");
  if (chip) applyAccent(chip.dataset.accent);
});

// ---- notification toggles ----
$$("[data-pref]").forEach(sw => sw.addEventListener("click", () => {
  const prefs = getPrefs();
  prefs[sw.dataset.pref] = !prefs[sw.dataset.pref];
  writeJSON(PREFS_KEY, prefs);
  sw.setAttribute("aria-checked", String(prefs[sw.dataset.pref]));
  if (sw.dataset.pref === "reminder15" && prefs.reminder15) checkReminders();
  notify(`${sw.getAttribute("aria-label")} ${prefs[sw.dataset.pref] ? "on" : "off"}.`);
}));

// ---- calendar sync ----
$("#icsDownload").addEventListener("click", downloadIcs);
$("#icsEvents").addEventListener("click", event => {
  const on = event.currentTarget.getAttribute("aria-checked") !== "true";
  event.currentTarget.setAttribute("aria-checked", String(on));
});

// ---- account & security ----
$("#passwordForm").addEventListener("submit", event => {
  event.preventDefault();
  const account = DEMO_ACCOUNTS.find(item => item.email === currentUser.email);
  const current = $("#pwCurrent").value, next = $("#pwNew").value;
  if (!account || current !== effectivePassword(account)) return setFormMessage("#pwMessage", "Your current password is incorrect.", false);
  if (next.length < 8) return setFormMessage("#pwMessage", "Use at least 8 characters for the new password.", false);
  if (next === current) return setFormMessage("#pwMessage", "Choose a password different from the current one.", false);
  const overrides = readJSON(PW_KEY, {});
  overrides[account.email] = next;
  writeJSON(PW_KEY, overrides);
  $("#passwordForm").reset();
  setFormMessage("#pwMessage", "Password updated. Use it next time you sign in.", true);
});
$("#passcodeSave").addEventListener("click", () => {
  if (!currentUser || currentUser.role !== "Professor") return;
  const value = $("#passcodeNew").value.trim();
  if (value.length < 4) { notify("Event passcode must be at least 4 characters."); return; }
  try { localStorage.setItem(PASSCODE_KEY, value); } catch { /* ignore */ }
  $("#passcodeNew").value = "";
  notify("Event passcode updated.");
});
$("#passcodeUnlockBtn").addEventListener("click", () => requestEventEdit(() => renderSettings()));
$("#passcodeLockBtn").addEventListener("click", () => {
  eventsUnlocked = false;
  try { const store = safeStorage("sessionStorage"); store && store.removeItem(EVENT_UNLOCK_KEY); } catch { /* ignore */ }
  renderSettings();
  notify("Event editing locked.");
});
$("#clearCache").addEventListener("click", () => {
  if (!window.confirm("Clear bookings, events, office edits, the audit log and unlocked access saved in this browser?")) return;
  [STORAGE_KEY, EVENTS_KEY, AUDIT_KEY, OFFICE_KEY].forEach(key => { try { localStorage.removeItem(key); } catch { /* ignore */ } });
  try { const store = safeStorage("sessionStorage"); store && store.removeItem(EVENT_UNLOCK_KEY); } catch { /* ignore */ }
  if (currentUser && currentUser.role !== "Professor") eventsUnlocked = false;
  selectedRoom = null;
  remindersSent.clear();
  renderAll();
  renderSettings();
  notify("Local cache cleared.");
});

// ---- events tab ----
$("#eventFilterTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (button) setEventFilter(button.dataset.filter);
});
$("#eventsAddBtn").addEventListener("click", () => requestEventEdit(() => openEventForm()));
$("#eventFab").addEventListener("click", () => requestEventEdit(() => openEventForm()));
$("#eventsAgenda").addEventListener("click", event => {
  const button = event.target.closest("[data-edit]");
  if (button) requestEventEdit(() => openEventForm(button.dataset.edit));
});
$("#passcodeForm").addEventListener("submit", submitPasscode);
$("#passcodeInput").addEventListener("input", () => { $("#passcodeInput").removeAttribute("aria-invalid"); $("#passcodeError").textContent = ""; });
$("#passcodeCancel").addEventListener("click", () => { pendingAfterUnlock = null; closeDialog($("#passcodeDialog")); });
$("#passcodeDialog").addEventListener("close", () => { pendingAfterUnlock = null; });
$("#eventForm").addEventListener("submit", submitEventForm);
$("#eventCancel").addEventListener("click", () => closeDialog($("#eventDialog")));
$("#eventDelete").addEventListener("click", deleteEvent);
["#passcodeDialog", "#eventDialog"].forEach(selector => $(selector).addEventListener("click", event => { if (event.target === event.currentTarget) closeDialog(event.currentTarget); }));

// ---- office tab ----
$("#officeSearch").addEventListener("input", () => { if (activePage === "Office") renderOffice(); });
$("#officeNowToggle").addEventListener("click", () => {
  officeNowOnly = !officeNowOnly;
  $("#officeNowToggle").setAttribute("aria-pressed", String(officeNowOnly));
  renderOffice();
});
$("#officeForm").addEventListener("submit", saveOffice);
$("#officeLocation").addEventListener("input", event => { officeDraft.location = event.target.value; });
$("#officeNotes").addEventListener("input", event => { officeDraft.notes = event.target.value; });
$("#officeAddWindow").addEventListener("click", () => {
  officeDraft.windows.push({ days: [], start: "14:00", end: "16:00" });
  renderOfficeWindows();
});
$("#officeWindows").addEventListener("click", event => {
  const row = event.target.closest("[data-win]");
  if (!row) return;
  const index = Number(row.dataset.win);
  const chip = event.target.closest("[data-day]");
  if (chip) {
    const days = officeDraft.windows[index].days;
    const at = days.indexOf(chip.dataset.day);
    if (at >= 0) days.splice(at, 1); else days.push(chip.dataset.day);
    days.sort((a, b) => OFFICE_DAYS.indexOf(a) - OFFICE_DAYS.indexOf(b));
    renderOfficeWindows();
  } else if (event.target.closest("[data-remove]")) {
    officeDraft.windows.splice(index, 1);
    renderOfficeWindows();
  }
});
$("#officeWindows").addEventListener("input", event => {
  const row = event.target.closest("[data-win]");
  const field = event.target.dataset.field;
  if (row && field) officeDraft.windows[Number(row.dataset.win)][field] = event.target.value;
});
$("#officeGrid").addEventListener("click", event => {
  if (event.target.closest("[data-office-edit]")) { $("#officeLocation").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" }); $("#officeLocation").focus(); }
});

// ---- slots tab: search & filters ----
$("#roomSearch").addEventListener("input", event => { roomFilter.query = event.target.value; applyRoomFilters(); });
$("#roomSearch").addEventListener("keydown", event => {
  if (event.key === "Escape" && filtersActive()) { event.preventDefault(); event.stopPropagation(); resetRoomFilters(); }
  if (event.key === "Enter") {
    event.preventDefault();
    const floor = $("#floorSelect").value;
    const matches = allRooms().filter(roomMatches);
    const first = matches.find(room => room.floor === floor) || matches[0];
    if (first && filtersActive()) jumpToRoom(first.roomName);
  }
});
$("#subjectFilter").addEventListener("change", event => { roomFilter.subject = event.target.value; applyRoomFilters(); });
$("#seatFilter").addEventListener("change", event => { roomFilter.seats = event.target.value; applyRoomFilters(); });
$("#findClear").addEventListener("click", () => { resetRoomFilters(); $("#roomSearch").focus(); });
function setFindOpen(open) {
  $("#bpFind").classList.toggle("filters-open", open);
  $("#findToggle").setAttribute("aria-expanded", String(open));
}
$("#findToggle").addEventListener("click", () => setFindOpen(!$("#bpFind").classList.contains("filters-open")));
$("#findResults").addEventListener("click", event => {
  const chip = event.target.closest("[data-room]");
  if (chip) jumpToRoom(chip.dataset.room);
});
$("#findStatus").addEventListener("click", event => { if (event.target.closest('[data-find="reset"]')) resetRoomFilters(); });

// ---- slots tab ----
// Day / time view for the Slots map (the map recolours from the unified timetable).
$("#viewDay").innerHTML = `<option value="">Whole week</option>` + SCHEDULE_DAYS.map(d => `<option value="${d}">${d}</option>`).join("");
// The slot list follows the chosen day (Mon/Wed/Fri, Tue/Thu and Sat have different periods).
function populateViewSlots() {
  const list = viewContext.day ? slotsFor(viewContext.day) : SCHEDULE_SLOTS;
  $("#viewSlot").innerHTML = `<option value="">All slots</option>` + list.map(slot => `<option value="${slot}">${slot}</option>`).join("");
}
function syncViewControls() { populateViewSlots(); $("#viewDay").value = viewContext.day; $("#viewSlot").value = viewContext.slot; }
function setViewContext(day, slot) {
  if (day && slot && !slotsFor(day).includes(slot)) slot = "";   // that period does not exist on this day
  viewContext = { day, slot };
  roomDay = "";
  syncViewControls();
  renderSlots();
}
syncViewControls();
$("#viewSlot").addEventListener("change", () => setViewContext($("#viewDay").value, $("#viewSlot").value));
$("#viewDay").addEventListener("change", () => setViewContext($("#viewDay").value, ""));
$("#viewNow").addEventListener("click", () => { const d = defaultDay(); setViewContext(d, d === todayName() ? (slotsFor(d).find(slot => slotIsNowOn(d, slot)) || "") : ""); });
$("#roomDetails").addEventListener("click", event => {
  const target = event.target.closest("[data-room-day]");
  if (!target) return;
  roomDay = target.dataset.roomDay;
  renderRoomDetails(allRooms().find(room => room.roomName === selectedRoom));
});
$("#floorSelect").addEventListener("change", () => {
  selectedRoom = null;
  renderSlots();
  playDrawIn();
});
$("#mapFrame").addEventListener("click", event => {
  if (!event.target.closest(".map-room-group")) clearRoomSelection();
});
$("#bookingToggle").addEventListener("click", () => setBookingOpen($("#bookingForm").classList.contains("collapsed")));
$("#bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const room = $("#bookingRoom").value;
  const date = $("#bookingDate").value;
  if (!date) { notify("Choose a date for the booking."); return; }
  const bookingWeekday = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
  if (!slotsFor(bookingWeekday).length) { notify("There are no classes on Sunday — pick a Monday–Saturday date."); return; }
  if (!slotsFor(bookingWeekday).includes($("#bookingTime").value)) { notify("Choose a time slot that exists on that day."); return; }
  const bookings = getBookings();
  const booking = {
    date,
    batch: $("#batchName").value.trim(),
    subject: $("#subjectName").value.trim(),
    time: $("#bookingTime").value,
    slot: $("#bookingTime").value,
    room,
    day: new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" }),
    floor: $("#floorSelect").value,
    owner: currentUser.email
  };
  // Conflict prevention: refuse a booking that collides with another booking or a timetable class.
  const sameSlot = bookings.some(item => item.room === room && item.date === booking.date && item.time === booking.time)
    || [...professorScheduleData, ...studentScheduleData].some(item => item.room === room && item.day === booking.day && item.slot === booking.slot);
  if (sameSlot) {
    addAudit("Clash prevented", `${booking.subject} (${booking.batch}) blocked · ${booking.date} ${booking.time}`, room);
    logActivity(`Clash prevented: ${booking.subject} · ${room}`);
    selectedRoom = room;
    renderAll();
    notify("Clash prevented — that room is already taken for this slot.");
    return;
  }
  bookings.push(booking);
  saveBookings(bookings);
  addAudit("Booking published", `${booking.subject} (${booking.batch}) · ${booking.date} ${booking.time}`, room);
  logActivity(`Booking published: ${booking.subject} · ${room}`);
  selectedRoom = room;
  renderAll();
  notify("Booking confirmed and published.");
  $("#batchName").value = "";
  $("#subjectName").value = "";
});

// ---- settings ----
$("#resetBookings").addEventListener("click", () => {
  saveBookings([]);
  selectedRoom = null;
  addAudit("Bookings reset", "All demo bookings removed");
  logActivity("Demo bookings were reset.");
  renderAll();
  notify("Demo bookings reset.");
});
$("#seedBookings").addEventListener("click", () => {
  // Sample bookings use the real slots of the next teaching day (today, or Monday when today is Sunday).
  const when = new Date();
  if (when.getDay() === 0) when.setDate(when.getDate() + 1);
  const today = when.toISOString().slice(0, 10);
  const day = when.toLocaleDateString("en-US", { weekday: "long" });
  const slots = slotsFor(day);
  const at = i => slots[i % slots.length];
  const base = { date: today, day, floor: "Lower Ground Floor" };
  saveBookings([
    { ...base, room: "LG-02", time: at(0), slot: at(0), subject: "Signals & Systems", batch: "ECE-A" },
    { ...base, room: "LG-05", time: at(1), slot: at(1), subject: "Thermodynamics", batch: "ME-A" },
    { ...base, room: "LG-05", time: at(1), slot: at(1), subject: "Linear Algebra", batch: "CSE-B" },
    { ...base, room: "LG-09", time: at(2), slot: at(2), subject: "Operating Systems", batch: "CSE-A" },
    { ...base, floor: "Upper Floors", room: "UF-03", time: at(3), slot: at(3), subject: "Machine Design", batch: "ME-B" }
  ]);
  addAudit("Samples loaded", "5 sample bookings added");
  logActivity("Sample bookings loaded.");
  renderAll();
  notify("Sample bookings loaded — open the Slots tab to preview.");
});

// ======================================================================
// 13. INITIALISE
// ======================================================================
applyTheme(currentTheme(), { persist: false });
applyAccent(currentAccent(), { persist: false });
$("#bookingDate").value = new Date().toISOString().slice(0, 10);
$("#dateLabel").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase() + " · ROOM OPERATIONS";
$$("#scheduleDayTabs button").forEach(button => button.classList.toggle("is-today", button.dataset.day === todayName()));
renderTimeOptions();
$("#bookingDate").addEventListener("change", renderTimeOptions);
populateSeatOptions();
populateSubjectOptions();
setFindOpen(window.innerWidth > 1180 && window.innerHeight >= 780);   // starts collapsed on small screens
setBookingOpen(window.innerWidth > 1180); // starts collapsed on tablets / phones so the blueprint stays clear
renderActivity();
restoreSession();
