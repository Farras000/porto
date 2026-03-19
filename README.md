<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=200&section=header&text=Modern%20Developer%20Portfolio&fontSize=50&fontAlign=50&fontAlignY=40&desc=A%20Sleek,%20Professional,%20&%20Visually%20Impressive%20Showcase&descAlign=50&descAlignY=65" alt="Header" />

  <p align="center">
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  </p>
  
  <p align="center">
    <b>A modern portfolio landing page designed with stunning dark themes, smooth animations, and automatic visitor analytics.</b>
  </p>
</div>

---

## ✨ Key Features

💎 **Modern Hero Section**  
An engaging, visually striking introduction using a premium dark theme aesthetic.

🚀 **Skill & Project Showcase**  
Beautifully animated grid layouts explicitly displaying your technical expertise and highlighted works.

📊 **Automated Visitor Analytics**  
Smart tracking using `useEffect` that silently logs visitor data (IP, Location, ISP, Device, OS, Browser, Screen Resolution, Language) straight to a private Discord Webhook!

🎨 **Silky Smooth Animations**  
Seamless page transitions, scroll-triggered fade-ins, and gorgeous micro-interactions powered by `framer-motion`.

📱 **100% Responsive & Accessible**  
Flawlessly styled with Tailwind CSS v4, guaranteeing a perfect experience on any mobile, tablet, or desktop device.

---

## 📂 Project Structure

```text
📦 portfolio
 ┣ 📂 public/              # Static assets (Favicon, etc.)
 ┣ 📂 src/
 ┃ ┣ 📂 assets/            # Images, icons, and illustrations
 ┃ ┣ 📂 components/        # Reusable UI React components
 ┃ ┣ 📂 hooks/             # Custom React hooks (e.g. useVisitorTracking)
 ┃ ┣ 📂 utils/             # Helper functions & constants
 ┃ ┣ 📜 App.tsx            # Main application root component
 ┃ ┣ 📜 App.css            # Global component styles
 ┃ ┣ 📜 index.css          # Tailwind directives & theme configuration
 ┃ ┗ 📜 main.tsx           # React DOM injection point
 ┣ 📜 .env                 # Environment variables (Discord Webhook)
 ┣ 📜 package.json         # Project dependencies & scripts
 ┗ 📜 vite.config.ts       # Vite bundler configuration
```

---

## ⚡ Quick Start

### 1. Prerequisites

Make sure you have [Bun](https://bun.sh/) installed locally. It's incredibly fast!

### 2. Installation

Clone this repository and navigate into the project folder:

```bash
git clone https://github.com/Farras000/porto.git
cd porto
```

Install all required dependencies:

```bash
bun install
```

### 3. Setup Environment Variables

To get the Visitor Analytics working, create a `.env` file at the root of the project:

```env
VITE_DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

### 4. Run the Development Server

Fire up the local dev server:

```bash
bun run dev
```

Open up your browser and visit the local URL (usually `http://localhost:5173`) to view your new amazing portfolio!

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/Farras000/porto/issues) if you want to contribute.

## 📝 License

This project is generously licensed under the [MIT License](LICENSE).
