# 📦 E-Commerce Order Management System – Frontend-Only (React.js)

## 📚 Table of Contents

- [📝 Project Overview](#-project-overview)
- [🎯 Objectives](#-objectives)
- [🏗️ Tech Stack](#️-tech-stack)
- [🚀 Setup Instructions](#-setup-instructions)
- [🌐 Live Demo](#-live-demo)
- [🧪 Testing Instructions](#-testing-instructions)
- [🧭 Project Structure](#-project-structure)
- [🌍 Localization Details](#-localization-details)
- [🛠 Features Summary](#-features-summary)
- [📌 Design Notes](#-design-notes)
- [📤 Deployment Instructions](#-deployment-instructions)

---

## 📝 Project Overview

This project is a complete **Frontend-Only E-Commerce Order Management System** built using **React.js**. It simulates real-world e-commerce features such as user authentication, product management, order processing, and multilingual support — all **without any backend integration**.

User and data interactions (auth, products, orders) are handled via **localStorage** and **React services (custom hooks and context)**. The system supports **English** and **Arabic** languages with **RTL layout adjustment** for Arabic.

---

## 🎯 Objectives

- **Simulated User Management**
  - Mock login and registration
  - Role-based UI (Admin vs. Customer)
  - Session management via localStorage

- **Product Inventory Management**
  - Product catalog with filtering and search
  - Admin functionality to add/edit/delete products

- **Order Management**
  - Cart functionality and order placement
  - Order tracking for users
  - Admin panel to update order statuses

- **Localization (i18n)**
  - Language toggle (English ↔ Arabic)
  - RTL layout for Arabic
  - JSON translation files using `react-i18next`

- **Frontend-Only Simulation**
  - Data persisted using `localStorage`
  - No backend or API required

---

## 🏗️ Tech Stack

- **React.js** (Functional Components, Hooks)
- **React Router** (Routing & Protected Routes)
- **react-i18next** (Localization)
- **Bootstrap** (Responsive Styling)
- **localStorage** (Session & Data Simulation)
- **React Toastify** (Notifications)
- **FontAwesome** (Icons)

---

## 🚀 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-order-management-react.git
   cd ecommerce-order-management-react
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the App Locally**
   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

---

## 🌐 Live Demo

🔗 Hosted on: [https://ahmed-shaltout3g.github.io/Ecommerce-Task/#/](https://ahmed-shaltout3g.github.io/Ecommerce-Task/#/)

🎥 Demo Video (Loom): [https://www.loom.com/share/d64f7f35d03945418d58e86abd4dcb93?sid=ef8c5206-79f6-4929-bd92-25f75720b55a](https://www.loom.com/share/d64f7f35d03945418d58e86abd4dcb93?sid=ef8c5206-79f6-4929-bd92-25f75720b55a)
---

## 🧪 Testing Instructions

- Manual testing currently supported
- To reset the app:
  - Open browser DevTools → Application → Clear localStorage

---

## 🧭 Project Structure

```
src/
├── assets/                # Static images and icons used in the UI
├── components/            # Reusable UI components
│   ├── admin/             # Admin dashboard components
│   ├── auth/              # Login and register forms
│   ├── common/            # Footer, Navbars, NotFound, ProtectedRoute
│   ├── Dashboard/         # Admin dashboard charts & sidebar
│   ├── Header/            # Homepage slider
│   ├── Layout/            # Layout wrapper with role-based Navbar
│   ├── orders/            # Order card component
│   └── products/          # Product cards, list, details, and styles
├── context/               # Cart, Favorite, Order context providers
├── data/                  # Static product list
├── hooks/                 # Custom language switcher hook
├── i18n/                  # en.json, ar.json, i18n config file
├── pages/                 # Home, Login, Register, Cart, etc.
├── services/              # Services for auth, orders, products
├── App.js                 # Main routes and layout logic
├── index.js               # App entry point
```

---

## 🌍 Localization Details

- Language switching via dropdown
- Configured using `react-i18next`
- Translations stored in `/i18n/en.json` and `/i18n/ar.json`
- Layout direction is adjusted using `dir="rtl"` for Arabic

---

## 🛠 Features Summary

| Feature                  | Customer | Admin |
|--------------------------|----------|--------|
| Login/Register           | ✅       | ✅    |
| View Products            | ✅       | ✅    |
| Add/Edit/Delete Product  | ❌       | ✅    |
| Cart and Checkout        | ✅       | ❌    |
| View Orders              | ✅       | ✅    |
| Update Order Status      | ❌       | ✅    |
| Localization (EN/AR)     | ✅       | ✅    |

---

## 📌 Design Notes

- Entirely frontend-based with `localStorage` for data simulation
- Role-based navigation and route protection
- Responsive and RTL/LTR-aware layout using Bootstrap
- Clean and accessible UI with meaningful component separation

---

## 📤 Deployment Instructions

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Install the package:
     ```bash
     npm install gh-pages --save-dev
     ```
   - Add the following to your `package.json`:
     ```json
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```
   - Run:
     ```bash
     npm run deploy
     ```

3. Access the live site via the URL above!

> 💡 Make sure your repo is public and initialized with the correct name.
