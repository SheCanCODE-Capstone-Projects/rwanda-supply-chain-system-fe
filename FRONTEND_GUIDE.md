# RSCN Frontend Development Guide

## Rwanda Supply Chain Network (RSCN)

This document defines the frontend architecture, development standards, coding conventions, and collaboration guidelines for the Rwanda Supply Chain Network (RSCN) frontend application.

Every frontend developer should read this guide before contributing to the project.

---

## Technology Stack

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Lucide React
* JWT Authentication
* Google OAuth

---

## Project Architecture

The project follows a modular and scalable architecture.

```text
src/
│
├── app/
├── components/
├── features/
├── services/
├── providers/
├── hooks/
├── store/
├── config/
├── constants/
├── lib/
├── utils/
├── types/
├── styles/
└── assets/
```

Each folder has a single responsibility.

---

## Folder Responsibilities

### app/

Contains application routes using the Next.js App Router.

Example:

```text
(public)
(auth)
admin
farmer
warehouse
driver
government
```

Do not place reusable business logic inside `app/`.

---

### components/

Contains reusable UI components.

```text
components/
    ui/
    layouts/
    navigation/
    dashboard/
    charts/
    forms/
    tables/
    common/
```

Only reusable components belong here.

---

### features/

Contains feature-specific business modules.

Examples:

* Authentication
* Products
* Marketplace
* Warehouse
* Transportation
* Analytics
* Notifications
* Reports

Each feature should manage its own components, hooks, types, and API interactions where appropriate.

---

### services/

Contains API communication.

Examples:

* Authentication Service
* Product Service
* Warehouse Service
* Transport Service

Do not call APIs directly from page components.

---

### hooks/

Contains reusable custom React hooks.

Examples:

* useAuth
* useCurrentUser
* usePermissions
* useDebounce
* usePagination

---

### store/

Contains global state management.

Examples:

* Authentication Store
* User Store
* Notification Store

---

### providers/

Contains application providers.

Examples:

* Theme Provider
* Authentication Provider
* Query Provider
* Notification Provider

---

### config/

Contains project configuration.

Examples:

* Theme
* Navigation
* API Configuration
* Environment Configuration

---

### constants/

Contains shared constants.

Examples:

* Routes
* Roles
* Permissions
* Status Values

Do not hardcode these values throughout the project.

---

### lib/

Contains shared helper libraries.

Examples:

* Axios Instance
* Authentication Helpers
* Validation Helpers

---

### utils/

Contains utility functions.

Examples:

* Date Formatting
* Currency Formatting
* Phone Formatting
* General Helpers

---

### types/

Contains shared TypeScript interfaces and types.

---

## Routing Standards

Use the Next.js App Router.

Organize routes using route groups.

Example:

```text
(public)
(auth)
```

Each user role has its own dashboard.

Examples:

```text
/admin
/farmer
/manufacturer
/warehouse
/driver
/government
```

Do not use one shared dashboard for every role.

---

## Layouts

Use reusable layouts instead of repeating code.

Available layouts include:

* Public Layout
* Authentication Layout
* Dashboard Layout

Every page should inherit one of these layouts.

---

## Design System

The application uses one centralized design system.

Developers must use:

* Shared typography
* Shared spacing
* Shared shadows
* Shared border radius
* Shared colors

Do not introduce new design styles without team agreement.

---

## Colors

The application uses one primary brand color across every dashboard.

Different user roles should **not** use different primary colors.

Role differentiation should be achieved through:

* Navigation
* Icons
* KPIs
* Widgets
* Labels
* Permissions

---

## Components

Always reuse components from:

```text
components/ui
```

Examples include:

* Button
* Input
* Card
* Modal
* Table
* Badge
* Avatar
* Pagination
* Search
* Tabs

Never create duplicate versions of existing components.

---

## Forms

Use:

* React Hook Form
* Zod Validation

Every form must include:

* Validation
* Error messages
* Loading state
* Disabled state
* Success feedback

---

## Authentication

Supported methods:

* Email & Password
* Google OAuth
* JWT Authentication

Role-based access control (RBAC) must be enforced throughout the application.

---

## Dark Mode

The application supports:

* Light Mode
* Dark Mode

Theme preference should persist between sessions.

---

## Internationalization (i18n)

Supported languages:

* English
* Kinyarwanda
* French

All user-facing text should be translatable.

Avoid hard-coded strings in components.

---

## Coding Standards

All developers must:

* Use TypeScript.
* Use functional React components.
* Avoid inline styles.
* Keep components small and reusable.
* Use meaningful file names.
* Remove unused code before committing.
* Write clean and maintainable code.

---

## Git Workflow

Main branches:

```text
main
develop
```

Feature branches:

```text
feature/authentication
feature/business
feature/logistics
feature/admin
```

Workflow:

1. Create a feature branch from `develop`.
2. Commit frequently with descriptive messages.
3. Open a Pull Request to `develop`.
4. Resolve review comments.
5. Merge after approval.

Do not commit directly to `main`.

---

## Code Reviews

Every Pull Request should be reviewed by at least one other frontend developer before merging.

Review for:

* Functionality
* UI consistency
* Responsiveness
* Accessibility
* Performance
* Code quality

---

## Responsive Design

Every page must support:

* Mobile
* Tablet
* Laptop
* Desktop

No horizontal scrolling or broken layouts.

---

## Performance

Optimize:

* Images
* Fonts
* Dynamic imports
* Lazy loading
* Component rendering

Avoid unnecessary re-renders.

---

## Next.js 16

This project uses **Next.js 16**.

Route protection and request interception should use `src/proxy.ts`, which replaces the older `middleware.ts` convention.

Do not introduce `middleware.ts` into this project.

---

## Project Goal

Build a modern, scalable, enterprise-grade frontend that provides dedicated dashboards for each user role while maintaining a single, consistent design system, high code quality, and a smooth development experience for all contributors.
