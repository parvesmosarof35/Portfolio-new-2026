# 🚀 Premium Developer Portfolio & Admin Dashboard

A modern, high-performance, and fully interactive developer portfolio built with **Next.js 16** and **Tailwind CSS v4**. It features an elegant dark-theme design, smooth animations, glassmorphism elements, and a built-in admin control center powered by a local storage-backed database for zero-config deployment.

---

## ✨ Features

- 🎨 **Modern & Responsive UI**: Stunning visual aesthetics featuring curated color systems, glassmorphism cards, and premium gradients.
- ⚡ **Interactive Squircle Avatar**: A customized hero avatar layout with orbiting decorative rings, neon spin glow overlays, and floating status badges.
- 🌓 **Dynamic Theme System**: Sleek light/dark mode switcher contextually synchronized with local storage.
- 🛠️ **Zero-Setup Admin Dashboard**: Real-time inline edit panel (`/dashboard`) allowing updates to profile details, services, experiences, and project listings without database overhead.
- 📩 **Contact Portal & Message Center**: Fully operational messaging setup where visitors can contact you, storing messages instantly inside the admin panel.
- 📱 **Mobile First**: Built with responsive layouts ensuring a flawless experience from mobile viewports to desktop monitors.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 & Vanilla CSS
- **State Management:** React Context (Theme) & React Hooks
- **Database (Mock):** LocalStorage-backed central database (`mockDb.js`)
- **Icons:** Lucide React

---

## 📁 Directory Structure

```text
├── public/             # Static assets (icons, SVGs, etc.)
├── src/
│   ├── app/            # App router page structure
│   │   ├── (public)/   # Public website pages (Home, About, Projects, Services, Contact)
│   │   ├── admin/      # Admin redirect controller
│   │   ├── dashboard/  # Control center dashboards (Profile, Experience, Projects, Services)
│   │   └── login/      # Simple admin login form
│   ├── components/     # Reusable layout and graphic components
│   ├── context/        # Context providers (ThemeContext)
│   └── services/       # Mock database services (localStorage DB wrapper)
│   └── globals.css     # Tailwind styling rules and animations
├── package.json        # Dependencies & scripts
└── next.config.mjs     # NextJS configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18.x or higher is recommended).

### 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Portfolio.git
   cd Portfolio/Frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## ⚙️ Building for Production

To optimize the bundle size and compile the static build of the website:

```bash
npm run build
```

Start the production build server locally:

```bash
npm start
```

---

## 🤝 Contribution

Feel free to fork this project, submit issues, or open pull requests to improve design elements or implement new features.
