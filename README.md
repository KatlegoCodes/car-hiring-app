People looking to rent a car often have to browse multiple websites, compare prices manually, and plan their trips separately. This project brings vehicle discovery, AI-assisted trip planning, and online booking into a single platform, making it easier to find the right vehicle and organize a journey from one place.

Car Hiring App
│
├── Problem
├── Solution
├── Features
├── Tech Stack
├── Architecture
├── Challenges
├── Future Improvements
├── Installation
└── Screenshots

# AI Car Hiring Platform

A modern full-stack vehicle rental platform that simplifies the process of discovering, booking and planning trips through AI-powered recommendations.

---

## The Problem

Planning a trip usually means juggling multiple platforms:

- Searching several rental companies
- Comparing prices manually
- Checking vehicle availability
- Planning destinations separately
- Estimating travel costs on your own

This fragmented experience makes booking a vehicle more time-consuming than it should be.

---

## The Solution

This application combines vehicle booking and AI-assisted trip planning into one platform.

Users can:

- Browse available vehicles
- Securely create an account
- Book cars online
- Receive AI-generated travel recommendations
- Manage their bookings from a personalized dashboard

---

## Features

- Authentication
- User Dashboard
- Vehicle Listings
- Car Booking System
- AI Trip Recommendations
- Booking History
- Responsive Design
- Secure Password Hashing
- PostgreSQL Database
- Modern UI

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Prisma ORM

### Database

- PostgreSQL

### Authentication

- Auth.js
- bcrypt

### AI

- Anthropic API

### Deployment

- Vercel
- Neon PostgreSQL

---

## Database Design

The application uses a relational PostgreSQL database with models for:

- Users
- Cars
- Bookings
- Reviews

Relationships are managed using Prisma ORM.

---

## Challenges

During development I learned how to:

- Design relational database schemas
- Implement authentication securely
- Manage bookings without data conflicts
- Integrate an external AI API
- Build reusable server and client components using Next.js

---

## Future Improvements

- Payment integration
- Live vehicle availability
- Interactive maps
- Email confirmations
- Admin dashboard
- Fleet management
- AI travel budgeting
- OAuth login

---

## Installation

```bash
git clone ...
```

```bash
npm install
```

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

---

## Environment Variables

```
DATABASE_URL=
AUTH_SECRET=
ANTHROPIC_API_KEY=
```

---

## Screenshots

<img width="1365" height="480" alt="Screenshot 2026-07-26 at 13-39-56 DriveEasy - Car Hire" src="https://github.com/user-attachments/assets/50dc4810-761c-4996-a457-192bb153d7bd" />

<img width="1355" height="534" alt="Screenshot 2026-07-27 at 14-25-50 DriveEasy - Car Hire" src="https://github.com/user-attachments/assets/da961fca-4880-4fb7-bb09-8226fe9550e0" />

<img width="1359" height="1107" alt="Screenshot 2026-07-27 at 14-27-36 DriveEasy - Car Hire" src="https://github.com/user-attachments/assets/975e71bc-fe1b-4daf-b8d6-6346dc4f45a0" />

<img width="1361" height="367" alt="Screenshot 2026-07-27 at 14-28-26 DriveEasy - Car Hire" src="https://github.com/user-attachments/assets/d87c90cc-d04d-4588-9c9f-b80fc1310722" />

---

## What I Learned

This project strengthened my understanding of building production-style full-stack applications using React, Next.js, Prisma, PostgreSQL and AI APIs. It also gave me practical experience with authentication, database relationships, server-side rendering and API development.
