# Real Estate Property Listing Web Application

A premium, fully responsive Real Estate Property Listing application. Built using a modern React SPA on the frontend, powered by a Django REST Framework (DRF) backend, and backed by a MySQL database.

---

## ✨ Features

- **🏠 Comprehensive Listings**: Explore apartments, villas, independent houses, and commercial spaces.
- **🔍 Advanced Search & Filter System**: Real-time filtering by property type, bedroom configuration, price range, and city with sorting (newest, low to high, high to low).
- **⏳ Skeleton Loaders**: Fluid placeholders while images and details are fetching.
- **🌓 Light & Dark Theme Toggle**: Built-in theme selector utilizing modern CSS variables.
- **❤️ Favorites System**: Bookmark properties and keep them synced with `localStorage`.
- **🕒 Recently Viewed Widget**: Displays the last 4 visited listings dynamically.
- **✉️ Agent Inquiry Form**: Post questions/viewing requests on the details page which saves directly to the database.
- **🗃️ Database Seeding Command**: Comes with a pre-configured database seeder containing realistic data and imagery.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Lucide Icons, Custom CSS Variables & Layouts.
- **Backend**: Django, Django REST Framework (DRF), PyMySQL, CORS Headers.
- **Database**: MySQL.

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18+)
- Python (v3.8+)
- MySQL Server

### 2. Database Configuration
1. Open your MySQL client and ensure a database named `realestate_db` exists:
   ```sql
   CREATE DATABASE IF NOT EXISTS realestate_db;
   ```
2. The project connects using credentials located in `backend/.env`. The password is preconfigured as `Narendra@143`. If you need to make changes, edit `backend/.env`:
   ```env
   DB_NAME=realestate_db
   DB_USER=root
   DB_PASSWORD=Narendra@143
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

### 3. Startup Script (PowerShell)
In the root directory `c:\connect`, run:
```powershell
./run_project.ps1
```
This spawns separate windows for both servers automatically:
- **Frontend SPA**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

---

## 💻 Manual Setup & Database Seeding

If you prefer to start the servers manually, run the following commands:

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# (Optional) Install dependencies if not present
pip install django djangorestframework django-cors-headers PyMySQL python-dotenv

# Run Database Migrations
python manage.py migrate

# Seed the Database with Mock Data
python manage.py seed_db

# Start Development Server
python manage.py runserver
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Packages
npm install

# Start Vite Development Server
npm run dev
```
