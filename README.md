# 🖥️ Terminal Portfolio

A professional, interactive terminal-themed portfolio website built with Next.js 15, React, and TypeScript. Features a retro CRT aesthetic with modern animations and a full command-line interface.

![Terminal Portfolio](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features
- **Terminal Engine**: Full command-line interface with history (↑/↓ arrows)
- **Streaming Text**: LLM-style character-by-character typing animation
- **Command Library**: 10+ interactive commands
- **Theme System**: 6 beautiful color schemes (Light, Dark, Espresso, Green-Goblin, Blue-Matrix, Ubuntu)
- **ASCII Art Banner**: Animated boot sequence on load
- **Glassmorphism UI**: Modern glass effect with CRT scanlines
- **Responsive Design**: Mobile-friendly with Quick Actions bar

### 📦 Available Commands

| Command | Description |
|---------|-------------|
| `help` | Display all available commands |
| `about` | Learn more about the developer |
| `projects` | View portfolio projects with cards |
| `cv` / `resume` | Interactive PDF viewer |
| `socials` | Social media links |
| `neofetch` | System info (Linux-style) |
| `themes` | List available themes |
| `themes set <name>` | Change color scheme |
| `gui` | Preview GUI mode transition |
| `clear` | Clear terminal history |

### 🎨 Available Themes
- **Dark** - Classic terminal green
- **Light** - Clean white background
- **Blue Matrix** - Cyan on dark blue
- **Espresso** - Warm coffee tones
- **Green Goblin** - Neon green vibes
- **Ubuntu** - Classic Ubuntu purple

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/terminal-portfolio.git
cd terminal-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
terminal-portfolio/
├── app/
│   ├── layout.tsx          
│   ├── page.tsx            
│   └── globals.css         
├── public/
│   ├── resume.pdf          
│   └── projects/           
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── next.config.js
```


## 🛠️ Advanced Features

### Adding New Commands

1. Create a new command component:
```typescript
const NewCommand: React.FC = () => {
  return <div>Your content here</div>;
};
```

2. Add to command parser:
```typescript
if (trimmedCmd === 'newcommand') {
  output = <NewCommand />;
}
```

3. Add to help menu:
```typescript
{ cmd: 'newcommand', desc: 'Description of your command' }
```

### Mobile Quick Actions

Commands in the mobile quick action bar can be customized:
```typescript
<div className="mt-4 md:hidden grid grid-cols-3 gap-2">
  {['help', 'projects', 'socials'].map((cmd) => (
    // Customize these commands
  ))}
</div>
```

## 📱 Responsive Design

- **Desktop**: Full terminal experience with keyboard navigation
- **Tablet**: Optimized layout with touch support
- **Mobile**: Quick Actions bar for easy command access

## 🎭 Visual Effects

### CRT Scanlines
The scanline overlay creates an authentic CRT monitor effect:
```css
.scanline {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  animation: scan 8s linear infinite;
}
```

### Glassmorphism
Terminal window uses backdrop blur for modern glass effect:
```typescript
backdrop-blur-md bg-opacity-10
```


## 🐛 Troubleshooting

**Fonts not loading?**
- Check Google Fonts import in `globals.css`
- Clear browser cache

**Theme not changing?**
- Verify CSS variables in `globals.css`
- Check browser console for errors

**Commands not working?**
- Ensure input has focus (click terminal area)
- Check command spelling (case-insensitive)


## 🙏 Acknowledgments

- ASCII Art: [patorjk.com/software/taag](https://patorjk.com/software/taag/)
- Icons: [Lucide React](https://lucide.dev/)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## 📞 Support

Found a bug? Have a feature request? 
- Open an issue on GitHub
- Submit a pull request
- Contact: parekar.arnav@gmail.com

---

**Built with ❤️ by Arnav Parekar**

⭐ Star this repo if you found it helpful!
