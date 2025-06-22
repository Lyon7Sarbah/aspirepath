🧾 Product Requirements Document (PRD)
🧠 Product Name:
AspirePath (working title)

1. 🎯 Purpose
To empower SHS students and ambitious youth in Ghana (and similar contexts) to clearly define life goals and receive a personalized, actionable roadmap using AI. The app provides milestone goals, timelines, resources (courses, mentors, videos), and motivation, accessible even offline.

2. 🧑‍🎓 Target Audience
Primary: SHS students (15–19 years) in Ghana

Secondary: Recent SHS graduates, unemployed youth, early university students

Demographic Traits:

Low to moderate digital literacy

Limited access to stable internet or devices

High ambition, unclear pathways

3. 🎯 Goals & Objectives
Goal	Objective
Provide clarity	Help users define where they are now and where they want to be
Deliver steps	Use AI to generate custom roadmaps
Motivate users	Weekly check-ins, reminders, affirmations
Build self-reliance	Recommend local, free, or affordable tools & communities
Ensure accessibility	Offline support, biometric login, mobile-first PWA

4. 🧩 Features & Requirements
Core Features
Feature	Description
🧍 User Profile Input	Users input: education level, financial status, skills
🎯 Goal Definition	Choose 1–3 future goals (career, education, business)
📍 Roadmap Generation	LLM-based steps: milestones, timelines, resources
📦 Progress Tracking	Mark steps complete, track timeline & progress bar
🔁 Motivational Check-ins	Daily/weekly nudges, affirmations, local quotes
🎥 Recommended Resources	Curated: courses, mentors, communities, videos
🛜 Offline Mode	Local storage and sync when online
🔒 Biometric Login	Fingerprint/FaceID unlock for fast access
👤 User Accounts	Firebase/Supabase Auth (email, biometric)
💬 AI Chat Support	Ask follow-up questions or modify the plan

5. 🖌️ UX & Design Requirements
Mobile-first PWA

Minimalist, engaging, Gen Z-friendly design

Clear iconography (accessible for semi-literate users)

Framer Motion for fluid transitions

Offline status indicators (banner/toast)

Dark/light mode toggle

6. 🧠 AI Capabilities
Capability	Details
🎓 Profile Analysis	Parse user's inputs and build prompt
🔭 Goal Forecasting	Suggest missing steps or clarify vague goals
🧭 Roadmap Generator	Step-by-step plan with resources & timelines
🤖 Chat Assistant	GPT-powered mentor bot (future)
🛠 Prompt Personalization	Location, financial constraints, skill level all influence AI output

7. 🧱 Technical Requirements
Frontend
React + TypeScript

TailwindCSS + Shadcn/ui + Framer Motion

PWA ready (Offline-first)

LocalForage / IndexedDB for local storage

Backend
Node.js + Express or NestJS

REST API or GraphQL

OpenAI API integration

Role-based auth (user, mentor, admin)

Database
Primary: Supabase (PostgreSQL-based)

Sync: IndexedDB → Cloud when connected

Authentication
Supabase Auth (email/password)

Optional biometric unlock via Capacitor or LocalAuth

8. 📊 Metrics for Success
KPI	Target
🎯 Roadmaps Generated	10,000 in first 6 months
🔁 Weekly Active Users	5,000 by month 4
📥 Offline Access Usage	60% of total sessions
🧑‍🏫 Mentor Referrals	500 verified mentors onboarded
⭐️ NPS / Feedback	Avg 4.5/5 rating on helpfulness

9. 🔄 User Flows
New User Flow:
Sign up (or use biometric unlock if returning)

Input current status

Define goal(s)

AI generates roadmap

View steps, begin tracking

Repeat Flow:
Open dashboard → see today’s milestone

Mark complete → get next step + motivation

Ask MentorBot (future AI chat)

10. 🔐 Security & Privacy
User data encrypted at rest (Supabase)

No data shared with third parties without user consent

Biometric data handled via device (not stored remotely)

11. 🚀 Roadmap / Timeline
Phase	Duration	Milestones
Planning & Research	Week 1	Wireframes, PRD, stack decisions
Backend Setup	Week 2	Auth, DB schema, LLM API routes
Frontend Core UI	Weeks 3–4	Forms, roadmap view, sync logic
AI Integration	Week 5	Prompt testing + roadmap output
Testing & Feedback	Week 6	Pilot test with SHS group
Biometric + Offline	Week 7	Enable biometrics & PWA sync
Launch	Week 8	Final tweaks, deploy V1

12. 🧩 Future Features (V2+)
Peer goal-tracking groups

Voice input for low-literacy users

Mentorship matching engine

Scholarship notifier for Ghana/WA regions

Partnership dashboard for NGOs

13. 📎 Appendix
External APIs to Integrate
OpenAI

Supabase

[YouTube Data API](optional – for resources)

Ghana-specific datasets (optional/manual curation)