# 📊 Excel Analytics MERN Project

A full-stack MERN application to upload Excel files, parse and visualize them using Chart.js with color customization, secure JWT authentication, password reset modal, role-based dashboards (Admin/User), column filtering, X-Y-axis control, chart exports, and advanced admin management.

---

## 🚀 Features

| Feature                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 📂 Excel Upload                  | Upload `.xls` / `.xlsx` files and preview data                             |
| 📈 Chart Visualizations          | Bar, Line, and Pie charts using Chart.js                                   |
| 🎨 Color Customization           | Customize chart colors directly from UI                                    |
| 📊 Filter by Column & Y-Axis     | Select specific columns and Y-axis for more relevant charts                |
| 🔐 JWT Authentication            | Secure login/register with bcrypt & JWT                                    |
| 👥 Role-Based Dashboard          | Redirect users/admins to respective dashboards                              |
| 🧑‍💼 Admin Dashboard             | View users, delete accounts, see activity stats                            |
| 🗑️ Delete User                   | Admin can delete any user (removes login access)                           |
| ✅ User Status                   | See active/inactive status of users                                        |
| 📊 Upload Statistics             | Total uploads per user + overall total                                     |
| 🕒 Last Login Info               | View last login timestamp per user                                         |
| 🔁 Password Reset (Modal)        | Reset password without navigating to a separate page                       |
| 📤 Export Options                | Export charts to PNG, PDF, or download as CSV                              |
| 📱 Responsive UI (Normal CSS)    | Fully responsive layout using standard CSS                                 |

---

## 🖼️ Screenshots

 for view visit:  https://drive.google.com/file/d/1DRKcRLRO8s4aeUGliRVJOMIULY-bfH9V/view?usp=sharing

---

## 🛠️ Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React (Vite), TypeScript, CSS    |
| Backend    | Node.js, Express, TypeScript     |
| Excel      | SheetJS (`xlsx`)                 |
| Charts     | Chart.js + `react-chartjs-2`     |
| Auth       | JWT, bcrypt                      |
| Export     | `html2canvas`, `jspdf`, custom CSV |
| Database   | MongoDB                          |

---

## ⚙️ Prerequisites

- ✅ Node.js (v18+)
- ✅ MongoDB (local or Atlas)
- ✅ npm or yarn

---

## 📦 Backend Setup

```bash
cd mern-auth-secure
npm install
```


```

```bash
npm run dev
```



## 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Visit: [http://localhost:5173](http://localhost:5173)


## 🔐 Authentication Flow

| Feature              | Implementation                              |
|----------------------|----------------------------------------------|
| 🔐 Secure Register   | With bcrypt password hashing                 |
| 🔑 Login             | JWT-based, stores token in localStorage      |
| 👥 Role Redirection  | Admin → `/adminpannel1`, User → `/user-dashboard` |
| 🔁 Reset Password    | Via modal (POST `/reset-password`)           |

---

## 📊 Excel to Chart Flow

| Step | Action                                      |
|------|---------------------------------------------|
| 1️⃣   | Upload `.xls` or `.xlsx` file               |
| 2️⃣   | Parse it using `xlsx` (SheetJS)             |
| 3️⃣   | Select relevant columns and Y-axis values   |
| 4️⃣   | Render chart (Bar/Line/Pie) with Chart.js   |
| 5️⃣   | Change colors, labels, and chart types      |
| 6️⃣   | Export chart (PNG, PDF, CSV)                |

---

## 📤 Export Features

| Format   | Tool Used         | Notes                          |
|----------|-------------------|--------------------------------|
| 🖼 PNG    | `html2canvas`     | Captures chart as image        |
| 📄 PDF   | `jspdf`           | Converts image to downloadable PDF |
| 📑 CSV   | Custom conversion | From parsed Excel data         |

---

## 📋 Admin Management Panel

- 🔎 View all registered users with:
  - Email
  - Role
  - Status (Active/Inactive)
  - Last login
  - Total uploads
- 🗑 Delete user accounts (removes login ability)
- 📈 See upload stats across all users
- export user status with mail and role in csv form

---

## 🧪 Run Project Locally

```bash
# Terminal 1 - Backend
cd mern-auth-secure
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 📌  Future Enhancements

- [ ] Add AI chart insights (Gemini/OpenAI)
- [ ] Deploy to Render/Vercel
- [ ] Create shareable chart links
- [ ] Show chart previews before rendering

---

## 👨‍💻 Author

**Rishav Kumar Singh**  
MERN Stack Developer  
📫 Email: `rishavse06@gmail.com`  
 if any query mail me
---

## 📜 License

This project is licensed under the MIT License.

---


