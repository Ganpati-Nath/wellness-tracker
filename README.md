# 🌿 Wellness Tracker (Frontend)

A **React-based frontend** for the Wellness Tracker project (Frontend Engineer track).  

<img width="798" height="474" alt="Dashboard" src="https://github.com/user-attachments/assets/2b40206b-4f9e-4917-95e9-d63f8fdb833c" />

It features mocked authentication, CRUD operations for wellness entries, dashboard summaries, interactive charts, date filtering, dark/light mode, and export options — all persisted using **localStorage**.  

---

## ✨ Features

### 🔐 Authentication
- Mocked **login / sign-up / logout**  
- Auth state persisted in `localStorage` (`wellnessAuth`)  
- Any email/password combination works  
- Sign-up requires matching passwords with **inline error handling**  

---

### 📝 CRUD Operations
- Add, edit, and delete entries (**steps, sleep, mood, notes**)  
- Input validation with inline error messages  
- **Custom confirmation modal** for deletions (no native `confirm`)  

---

### 📊 Dashboard
- Summary cards:
  - Average steps  
  - Average sleep  
  - Most common mood  
  - Total entries  
- **Recent Entries**: shows up to 10 latest entries  

<img width="785" height="474" alt="Dashboard Summary" src="https://github.com/user-attachments/assets/82057f7a-b04a-4f98-9659-dfce82335510" />

<img width="768" height="474" alt="Recent Entries" src="https://github.com/user-attachments/assets/636e8193-6954-405f-99ca-4b373343e2a5" />

---

### 📈 Charts
- **Line chart**: steps/sleep trends (up to 14 entries)  

<img width="359" height="269" alt="Line Chart" src="https://github.com/user-attachments/assets/b58ac643-c833-4e7c-86ad-0aa3126a7511" />

- **Pie chart**: mood distribution (all entries)  

<img width="368" height="282" alt="Pie Chart" src="https://github.com/user-attachments/assets/192d9ee9-a08f-4fff-824e-9bda980963c7" />

- Both charts support **dark/light mode**  

---

### 📅 Date Filtering
- Filter entries by **start/end date**  
- Filters reset automatically when mock data is regenerated  

---

### 🎁 Bonus Features
- 🌙 **Dark/Light mode toggle** persisted in `localStorage` (`wellnessTheme`)  
- 📂 **CSV export** of filtered entries (`MM/DD/YYYY` format for Excel)  
- 📄 **PDF export** of filtered entries using `jsPDF`  
- 🔄 **Reset Mock Data**: regenerates 30 days of entries & clears filters  

---

## 📦 Mock Data
- Generated on first load or when clicking **Reset Mock Data**  
- Each entry includes:  
  - `id`: `entry-<index>`  
  - `date`: past 30 days (`YYYY-MM-DD`, exported as `MM/DD/YYYY`)  
  - `steps`: random (3000–8000)  
  - `sleep`: random (6–10 hours)  
  - `mood`: one of `Happy`, `Neutral`, `Tired`, `Stressed`  
  - `notes`: included on every 3rd entry (*e.g., “Had a great workout today!”*)  

- **Persistence**:  
  - Entries → `localStorage` (`wellnessEntries`)  
  - Auth → `localStorage` (`wellnessAuth`)  

---

## 🚀 Setup Instructions

\`\`\`bash
# Clone repo
git clone https://github.com/your-username/wellness-tracker.git
cd wellness-tracker

# Install dependencies
npm install
npm install jspdf

# Run locally
npm start
\`\`\`

Then open **http://localhost:3000** in your browser.  

---

## 📚 Dependencies
- ⚛️ [React](https://reactjs.org/)  
- 📊 [Recharts](https://recharts.org/en-US/) (charts)  
- 🎨 [Lucide-React](https://lucide.dev/) (icons)  
- 💅 [Tailwind CSS](https://tailwindcss.com/) (styling)  
- 📄 [jsPDF](https://github.com/parallax/jsPDF) (PDF export)  

---

## 🌍 Deployment
Deployed with **Vercel**:  
👉 [Live Demo](https://wellness-tracker-mauve.vercel.app/)  

---

## 📝 Notes
- Mock data ensures **no backend required**  
- Responsive UI styled with **Tailwind CSS**  
- **Confirmation modal** replaces native dialogs for better UX  
- Resetting mock data **clears filters** to display all recent entries  
- For **CSV export**, dates formatted as `MM/DD/YYYY`  
  - If Excel shows `########`, widen the column (Excel formatting issue)  
- **PDF export** generates a simple, text-based table of filtered entries  
