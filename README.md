# 🛡 CampusSafe – Smart Campus Safety & Issue Management System

CampusSafe is a role-based smart campus safety platform that enables students and faculty to report issues and emergencies, while allowing administrators to track, manage, and respond efficiently in real time.

---

## 🚩 Problem Statement
Large college campuses often face delayed responses to safety issues, infrastructure problems, and emergencies due to fragmented reporting systems and lack of real-time communication between students and administration.

---

## 💡 Our Solution
CampusSafe creates a **closed feedback loop** between students, faculty, and administrators by:
- Enabling structured issue reporting
- Providing real-time status updates
- Delivering role-based notifications
- Maintaining accountability through issue lifecycle tracking

---

## ✨ Key Features

### 👩‍🎓 Student / Faculty
- Secure login using Firebase Authentication
- Report campus issues with description and category
- Trigger SOS alerts for emergencies
- Receive notifications when issue status is updated

### 👨‍💼 Admin
- View all reported issues in a centralized dashboard
- Update issue status (Pending → In Progress → Resolved)
- Receive notifications when new issues are raised
- Maintain audit trail using status history

---

## 🔔 Notification System (Highlight Feature)
- Admin is notified when a new issue is submitted
- Students/faculty are notified when admin updates issue status
- Role-based notification filtering
- Read/unread notification state

---

## 🧠 Technologies Used (Google Stack)

- **Firebase Authentication** – User login & role-based access
- **Cloud Firestore** – Real-time database for issues & notifications
- **Firebase Hosting** – Deployed MVP
- **Dialogflow** – Voice-based emergency assistant
- **Google Cloud Platform** – Backend infrastructure

---

## 🏗 Architecture Overview

- Event-driven backend using Firestore
- Role-based access control (Admin / Student / Faculty)
- Decoupled notification system
- Scalable for multi-campus deployment

---

## 🚀 Live Demo
🔗 https://smartcampus-b4339.web.app

---

## 📂 Repository Structure


