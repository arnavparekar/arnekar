# Terminal Portfolio — Arnav Parekar

An interactive terminal-themed portfolio website built with Next.js 15, React 19, and TypeScript.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
terminal-portfolio/
├── app/
│   ├── page.tsx           # Main terminal component (client)
│   ├── layout.tsx         # Root layout with fonts and SEO
│   └── globals.css        # Themes, CRT effects, glassmorphism
├── public/
│   ├── resume.pdf         # ← Replace with your actual resume
│   └── projects/          # ← Add project screenshots here
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.js
└── tsconfig.json
```

## 🎨 Themes

6 built-in themes — switch with `themes set <name>`:

| Theme | Command |
|---|---|
| Dark (default) | `themes set dark` |
| Light | `themes set light` |
| Blue Matrix | `themes set blue-matrix` |
| Espresso | `themes set espresso` |
| Green Goblin | `themes set green-goblin` |
| Ubuntu | `themes set ubuntu` |

## ⌨️ Commands

`help` `about` `education` `experience` `projects` `skills` `publications` `certifications` `contact` `resume` `neofetch` `themes` `clear` `gui`

## 📝 Customization

1. **Resume**: Replace `public/resume.pdf` with your actual PDF
2. **Project Images**: Add screenshots to `public/projects/` (project1.jpg, project2.jpg, etc.)
3. **Personal Data**: Edit the data constants at the top of `app/page.tsx`

## 🏗️ Build

```bash
npm run build
npm start
```

## 📦 Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React Icons
