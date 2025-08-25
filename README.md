Wellness Tracker Frontend
Overview
This is a React-based frontend for the Wellness Tracker project (Frontend Engineer track). It features mocked authentication, CRUD operations for wellness entries, dashboard summaries, interactive charts (line for trends, pie for moods), date filtering, dark/light mode, CSV/PDF export, and a custom confirmation modal for deletions. Data is mocked and persisted via localStorage.
Features

Mocked Authentication: Login/sign-up/logout with persistence in localStorage (wellnessAuth). Any email/password combination works; sign-up requires matching passwords with inline error messages.
CRUD Operations: Add/edit/delete entries (steps, sleep, mood, notes) with input validation and a custom confirmation modal for deletions.
Dashboard: Summary cards for average steps, average sleep, most common mood, and total entries. Recent Entries section shows up to 10 entries.
Charts: Interactive line chart (steps/sleep trends, up to 14 entries) and pie chart (mood distribution, all entries) using Recharts, with dark/light mode support.
Date Filtering: Filter entries by start/end dates, reset on mock data regeneration.
Bonus Features:
Dark/light mode toggle, persisted in localStorage (wellnessTheme).
CSV export of filtered entries with Excel-compatible date formats (MM/DD/YYYY).
PDF export of filtered entries using jsPDF, with simple tabular layout.
LocalStorage persistence for entries (wellnessEntries) and auth.
Reset mock data option to regenerate 30 days of data, clearing date filters.



Mock Data

Generation: On first load or when clicking "Reset Mock Data," generates 30 days of random data if no wellnessEntries exist in localStorage. Each entry includes:
Unique ID (entry-<index>).
Date (past 30 days, stored as YYYY-MM-DD, exported as MM/DD/YYYY in CSV/PDF).
Steps (3000–8000, random).
Sleep (6–10 hours, random).
Mood (Happy, Neutral, Tired, Stressed, random).
Notes (every third entry, e.g., "Had a great workout today!").


Persistence: Stored in localStorage (wellnessEntries) and updated on every add/edit/delete.
Auth Persistence: Mock user data (email, name) stored in localStorage (wellnessAuth).
Reset: "Reset Mock Data" button regenerates 30 days of data and clears date filters to show all entries (up to 10 in UI).

Setup Instructions

Clone the repo:git clone https://github.com/your-username/wellness-tracker.git
cd wellness-tracker


Install dependencies (including jsPDF for PDF export):npm install
npm install jspdf


Run locally:npm start

Open http://localhost:3000.

Dependencies

React
Recharts (charts)
Lucide-React (icons)
Tailwind CSS
jsPDF (PDF export)

Deployment
Deployed on Vercel: Live Demo
Notes

Mock data ensures no backend is needed.
All UI components (forms, modals, charts) are responsive and styled with Tailwind CSS.
Confirmation modal replaces native confirm for deletions, and error messages replace alert for better UX.
Resetting mock data clears date filters to ensure all recent entries (up to 10) are displayed.
CSV export formats dates as MM/DD/YYYY for compatibility with Excel. If dates show as ######## in Excel, widen the column (common display issue).
PDF export generates a simple text-based PDF with all filtered entries.