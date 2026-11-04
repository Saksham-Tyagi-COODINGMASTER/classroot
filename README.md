# CLASSROOT — College Scheduling Portal

A vanilla HTML/CSS/JavaScript frontend served with Vite during development and Node.js + Express for local production preview.

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)

Check your installation:

```bash
node -v
npm -v
```

## Install

Open this folder in VS Code, open its terminal, and run:

```bash
npm install
```

## Run in development

```bash
npm run dev
```

Open the local URL Vite prints, normally http://localhost:5173.

## Build and run with Node.js

```bash
npm run build
npm start
```

Open http://localhost:3000.

The Express server serves the production files from `dist/`. The `/api/health` endpoint returns a small JSON status response.

## Notes

- Sign-in is Google Workspace OAuth 2.0 restricted to your institution domain. See **Google Workspace sign-in** below.
- The rest of the app is still a frontend demo: timetables, bookings and events live in browser localStorage.
- **Events tab** (both roles): timetable-style timeline of campus events. Professors can add, announce, edit and delete events by default. Students are view-only; 
- Replace the sample timetables by searching `script.js` for `TODO: ADD WEEKEND CLASS DATA HERE`, `TODO: ADD STUDENT SCHEDULES HERE`, `TODO: ADD MORE PROFESSOR CLASSES HERE` and `TODO: ADD MORE STUDENT CLASSES HERE`.
- Settings → "Load samples" adds example bookings so you can preview the Free / Booked / Clash map states.
- Bookings currently use browser localStorage, so they are saved in that browser only.
- To make bookings shared between multiple users, add a database and booking API in a future backend iteration.
- The floor map is now a generated SVG blueprint; the PNGs in `assets/` are no longer used and can be deleted.

## Report, Settings and themes

- **Report (Professor):** utilization heatmap (day × slot) with peak/idle bars, clashes-prevented tally, departmental allocation donut (by batch prefix), audit-log preview and **Export CSV Report** (downloads the audit log + bookings).
- **Report (Student):** weekly load gauge and per-day density, regular vs extra split, and primary floors/rooms.
- **Clash prevention:** the Slots booking form now refuses a booking that overlaps another booking or a professor timetable class, and logs it as "Clash prevented". Use Settings → Load samples to preview the Clash map state.
- **Settings:** dark/light switch (also in the header), accent colour (Blueprint Cyan / High-Contrast Neon), notification toggles, event passcode management (professor) or lock/unlock (student), and Clear cache. Theme and accent are saved in localStorage.
- **Theming:** all colours are CSS custom properties in `style.css` (`:root`, then `:root[data-theme="light"]` and `:root[data-accent="neon"]`). Change the tokens there to restyle.
- **Notifications** are in-portal toasts. 15-minute reminders check today's classes every 20 s; instant and room-change alerts fire when another tab of the same browser publishes a booking or event.
- The event passcode is stored client-side for demo purposes only.

## Slots search pill and Office tab

- **Slots search pill (top right):** search rooms by name/number ("lg01", "UF-02"), filter by subject and seat size. Matching rooms glow on the blueprint, the rest dim; the chips list matches on both floors (click one to jump to it) and the booking form only offers matching rooms. Enter jumps to the first match, Esc clears.
- **Manage the filter lists in `script.js`:** search for `TODO: ADD MANUALLY MANAGED SUBJECTS HERE` (subjects, plus optional room → subject links) and `TODO: ADD MANUALLY MANAGED SEAT SIZES HERE` (capacity ranges).
- **Office tab (both roles):** professors edit their own location and consultation windows (day chips + times); students browse the whole faculty directory with search and an "Available now" filter. Edit the starting directory at `TODO: CONFIGURE PROFESSOR OFFICE DETAILS HERE` (`OFFICE_DIRECTORY`). A professor's edits are saved in localStorage and matched by email.

## CLASSROOT branding & calendar sync

- **Logo:** inline SVG symbol `#crLogo` at the top of `index.html` (a circuit tree growing from an open book), reused in the header and login card. Colours follow the theme (`--accent`, `--logo-book`). The favicon is an inline data-URI copy.
- **Theme tokens:** `--bg-color`, `--text-color`, `--card-bg`, `--grid-line`, `--accent-color` and `--border-color` are aliases of the theme variables in `:root`; the light palette lives under `:root[data-theme="light"]`.
- **Settings → Calendar sync:** downloads an `.ics` of your timetable (weekly recurring for 4/8/16 weeks, plus professors' published bookings and upcoming campus events). Turn on "15-minute class reminders" first to include alarms.
- **Comment markers in `script.js`:** `TODO: ADD WEEKEND CLASS DATA HERE`, `TODO: ADD STUDENT SCHEDULES HERE`, `TODO: ADD MANUALLY MANAGED SUBJECTS HERE`, `TODO: ADD MANUALLY MANAGED SEAT SIZES HERE`, `TODO: CONFIGURE PROFESSOR OFFICE DETAILS HERE`.

## Unified timetable sync (Slots tab)

- Every class in `professorScheduleData`, every class in `studentScheduleData` and every published booking is merged per room by `roomSessions()` in `script.js`. A student class in `LG-02` on Monday 10:00 therefore marks `LG-02` as **Booked** for Monday 10:00 on the Slots map. Two different classes in the same room, day and slot show as **Clash**. The same class listed in both timetables counts once.
- The Slots title block has **Day** and **Time** selectors and a **Now** button. The map colours, legend counts and tooltips follow that view (default: today, all slots; choose "Whole week" / "All slots" to see everything).
- Click a room to open its inspector: a day picker, the full slot-by-slot schedule for that day (Free / Booked / Clash with the class and its source) and a Mon-Sun "week at a glance" grid.
- The booking form refuses a slot already used by either timetable or another booking. Reports ignore the Slots view and always use the whole week.

## Google Workspace sign-in

Sign-in uses Google Identity Services (OAuth 2.0 / OpenID Connect) and only accepts accounts on one Workspace domain. No passwords are stored anywhere and no third-party email service is used (notifications are in-portal toasts and `.ics` calendar exports).

### One-time setup (needs the institute's Workspace admin or a Workspace account)

1. Open [Google Cloud Console](https://console.cloud.google.com/) signed in with your **institution** account and create a project (e.g. `classroot`).
2. **APIs & Services -> OAuth consent screen**: choose user type **Internal** (only visible when the project belongs to the institute's Workspace organization; this makes Google itself block every account outside the domain). App name `CLASSROOT`, add your email as support/developer contact.
3. **APIs & Services -> Credentials -> Create credentials -> OAuth client ID -> Web application**. Add **Authorized JavaScript origins**:
   - `http://localhost:5173` (npm run dev)
   - `http://localhost:3000` (npm start)
   - your deployed origin, e.g. `https://<user>.github.io` (no path, no trailing slash)
4. Copy the **Client ID**.
5. Copy `.env.example` to `.env` and fill in `VITE_GOOGLE_CLIENT_ID`, `VITE_ALLOWED_DOMAIN` and `VITE_PROFESSOR_EMAILS`. Restart `npm run dev`.
6. For GitHub Pages: repository **Settings -> Secrets and variables -> Actions -> Variables**, add the same three `VITE_*` variables, then re-run the deploy workflow.

### How the domain restriction is enforced

- The consent screen is **Internal** (Google blocks outside accounts).
- The app checks the ID token: issuer, audience (your client ID), expiry, `email_verified`, the `hd` hosted-domain claim and the `@domain` suffix.
- When the Express server is running (`npm run build && npm start`), the browser also posts the token to `POST /api/auth/google`, where `googleToken.js` verifies Google's signature (RS256, against Google's published signing keys, using only Node's built-in `crypto`). A server rejection always blocks sign-in.
- On static hosting such as GitHub Pages there is no server, so only the in-browser claim check runs. That is fine for a demo, but anyone can tamper with a static page, so host the Express server if you need sign-in to be tamper-proof.

### Roles and timetables

- Faculty are the emails in `VITE_PROFESSOR_EMAILS`; every other account is a Student.
- Timetable classes are matched by each class's `owner` email in `script.js`. Replace the sample `@clt.edu` owners with real institution emails, or while testing map your login to a sample timetable in `ACCOUNT_ALIASES` (`script.js`, section 4).
- To test before you have the real domain, set `VITE_ALLOWED_DOMAIN=gmail.com` and use a personal Google account as the client's test user.

## Multiple professor and student accounts

- Accounts come from Google sign-in (see above); there is no account list to maintain.
- Give each class an `owner` (that account's email, or an array of emails for a class several students share) in `professorScheduleData` / `studentScheduleData`. Classes without `owner` belong to the first demo account of that role.
- Each account's Schedule tab, Report, calendar (.ics) export and reminders use only its own classes. A professor's published bookings are tagged with their email.
- The Slots tab merges **all** accounts' classes, so a room shows Booked for anyone's class and Clash when two different classes share a room, day and slot. The same class listed under several accounts counts once.
- Optionally add a matching entry to `OFFICE_DIRECTORY` for each professor so the Office tab lists their office and hours.

## Asymmetric timetable (Mon–Sat, no Sunday)

Time blocks differ by day and are defined once in `DAY_PATTERNS` (`script.js`, section 2). Every `slot` in the timetable data must be one of that day's labels (24-hour clock, en dash):

| Days | Slots |
| --- | --- |
| Mon / Wed / Fri | 08:30–09:25 · 09:30–10:25 · 10:30–11:25 · 11:30–12:25 · 14:00–17:00 |
| Tue / Thu | 08:30–09:55 · 10:00–11:25 · 11:30–12:30 · 14:00–16:00 |
| Sat | 10:30–12:30 |

- Helpers: `slotsFor(day)`, `patternFor(day)`, `defaultDay()` (opens on Monday if today is Sunday).
- The Schedule grid/agenda, Slots day/time pickers, room side-panel, booking form time list, heatmap and student density gauge all read the active day's slots.
- Slots sync: the Slots tab matches by `day|slot|room`, so a student class in LG-02 at Monday 10:30–11:25 shows LG-02 as Booked for that exact slot.
- Report heatmap is drawn as three blocks (Mon/Wed/Fri, Tue/Thu, Sat); peak/idle bars compare slots by sessions per day so patterns with fewer days stay comparable.
- Booking on a Sunday date is refused; the Time list switches automatically when the booking date changes.

## Professor → student extra-class sync

- A booking a professor publishes on the Slots tab is treated as an extra/makeup class. `studentExtraClasses()` in `script.js` matches it to students by **subject**: the booking form's Subject dropdown uses the same list as the Slots search filter, and only students whose own timetable contains that subject receive the class (today + next 6 days).
- It appears on the student's Schedule tab (violet "Extra · New" card with the date and faculty), Report, 15-minute reminders and `.ics` export, and it keeps marking the room Booked on the Slots tab.
- Bookings are still stored in browser localStorage, so this sync works within one browser; use a backend for cross-device sync.
