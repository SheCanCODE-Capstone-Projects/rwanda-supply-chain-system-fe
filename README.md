# Rwanda Supply Chain Network (RSCN) – Frontend

> **Connecting Every Product, Every Business, Every Movement.**

The **Rwanda Supply Chain Network (RSCN) Frontend** is the user interface of the Rwanda Supply Chain Network platform, built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a modern, responsive, and scalable web application for all stakeholders in Rwanda's supply chain ecosystem.

This repository contains only the frontend application and follows a modular architecture that supports collaboration among multiple developers.

---

## Project Overview

The frontend provides role-based dashboards and interfaces for different users across the supply chain, including farmers, manufacturers, warehouse managers, transport companies, retailers, buyers, financial institutions, and government officers.

Each user has a dedicated dashboard, navigation, permissions, and workflows while sharing the same enterprise design system.

---

## Technology Stack

* Next.js (App Router)
* React 19
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Lucide React
* JWT Authentication
* Google OAuth
* ESLint
* Prettier

---

## Frontend Features

### Authentication

* Email & Password Login
* Continue with Google
* Password Strength Indicator
* Forgot Password
* Reset Password
* Email Verification
* JWT Authentication
* Role Selection

---

### Role-Based Dashboards

Dedicated dashboards for:

* Super Administrator
* Government Officer
* Farmer
* Cooperative
* Manufacturer
* Supplier
* Buyer
* Retailer
* Warehouse Manager
* Transport Company
* Driver
* Financial Institution

---

### Core Modules

* Authentication
* User Profile
* Products
* Inventory
* Marketplace
* Procurement
* Warehouse Management
* Transportation
* Orders
* Analytics
* Reports
* Notifications
* Messaging
* Settings

---

## Project Structure

```text
rscn-frontend/
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── logos/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── admin/
│   │   ├── government/
│   │   ├── farmer/
│   │   ├── cooperative/
│   │   ├── manufacturer/
│   │   ├── supplier/
│   │   ├── buyer/
│   │   ├── retailer/
│   │   ├── warehouse/
│   │   ├── transport/
│   │   ├── driver/
│   │   ├── bank/
│   │   ├── unauthorized/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── layouts/
│   │   ├── navigation/
│   │   ├── dashboard/
│   │   ├── charts/
│   │   ├── forms/
│   │   ├── maps/
│   │   └── tables/
│   │
│   ├── features/
│   ├── hooks/
│   ├── providers/
│   ├── services/
│   ├── store/
│   ├── config/
│   ├── constants/
│   ├── contexts/
│   ├── lib/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── assets/
│
├── .env.local
├── next.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.js
├── README.md
└── FRONTEND_GUIDE.md
```

---

## Design Principles

The project follows a centralized design system to ensure consistency across all dashboards.

* Single primary brand color
* Shared typography
* Shared spacing system
* Reusable UI components
* Responsive layouts
* Accessible interfaces
* Dark mode support
* Multi-language support (English, Kinyarwanda, French)

---

## Team Development Guidelines

All developers should:

* Follow the existing folder structure.
* Use reusable components from `src/components/ui`.
* Avoid duplicate components.
* Follow TypeScript best practices.
* Keep components modular and reusable.
* Write responsive interfaces.
* Maintain consistent naming conventions.
* Submit changes through Pull Requests.

---

## Git Workflow

Main branches:

* `main` – Stable production-ready code
* `develop` – Integration branch

Feature branches:

* `feature/authentication`
* `feature/business`
* `feature/logistics`
* `feature/admin`

All new work should be developed in feature branches and merged into `develop` after code review.

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd rscn-frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Project Status

### Frontend Development in Progress

Current milestone:

* Project setup
* Folder structure
* Design system
* Authentication
* Role-based dashboards
* Reusable components

---

## Contributors

Frontend Team (4 Developers)

* Frontend Developer 1 – Core Platform & Authentication
* Frontend Developer 2 – Marketplace & Business Operations
* Frontend Developer 3 – Logistics & Supply Chain
* Frontend Developer 4 – Administration & Analytics

---

## Future Enhancements

* Progressive Web App (PWA)
* Offline support
* Real-time notifications
* Advanced analytics dashboards
* AI-powered demand forecasting
* Performance optimization
* Automated UI testing

---

## License

This project is developed for educational and capstone purposes. Licensing will be determined before public release.
