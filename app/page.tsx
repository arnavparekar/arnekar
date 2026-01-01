'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Monitor, Github, Linkedin, Twitter, Mail, ExternalLink, ChevronRight, Folder, File, Download } from 'lucide-react';

// Types
interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: Date;
}

interface Theme {
  name: string;
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
}

// Themes Configuration
const THEMES: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    background: '#0a0e27',
    foreground: '#00ff41',
    accent: '#00d9ff',
    secondary: '#1a1f3a'
  },
  light: {
    name: 'Light',
    background: '#f5f5f5',
    foreground: '#2d3748',
    accent: '#3182ce',
    secondary: '#e2e8f0'
  },
  'blue-matrix': {
    name: 'Blue Matrix',
    background: '#0d1b2a',
    foreground: '#00d9ff',
    accent: '#00ff41',
    secondary: '#1b263b'
  },
  espresso: {
    name: 'Espresso',
    background: '#2b1d0e',
    foreground: '#e4c07a',
    accent: '#d4976c',
    secondary: '#3d2817'
  },
  'green-goblin': {
    name: 'Green Goblin',
    background: '#0f2027',
    foreground: '#39ff14',
    accent: '#7fff00',
    secondary: '#1a3a3a'
  },
  ubuntu: {
    name: 'Ubuntu',
    background: '#300a24',
    foreground: '#ffffff',
    accent: '#e95420',
    secondary: '#5e2750'
  }
};

// Streaming Text Component
// const StreamingText: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ 
//   text, 
//   speed = 15,
//   onComplete 
// }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayedText(prev => prev + text[currentIndex]);
//         setCurrentIndex(prev => prev + 1);
//       }, speed);
//       return () => clearTimeout(timeout);
//     } else if (onComplete) {
//       onComplete();
//     }
//   }, [currentIndex, text, speed, onComplete]);

//   return <span>{displayedText}</span>;
// };
const StreamingText: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ 
  text, 
  speed = 15,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      // 1. Regular streaming logic
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      // 2. NEW: Wait for 1 seconds (1000ms) before signaling completion
      const delayTimeout = setTimeout(() => {
        onComplete();
      }, 1300); 

      return () => clearTimeout(delayTimeout);
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};


// ASCII Banner Component
const ASCIIBanner: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const banner = `

  System Booting...

  ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║                                                                                                                                        ║
  ║  :::'###::::'########::'##::: ##::::'###::::'##::::'##::::'########:::::'###::::'########::'########:'##:::'##::::'###::::'########::  ║
  ║  ::'## ##::: ##.... ##: ###:: ##:::'## ##::: ##:::: ##:::: ##.... ##:::'## ##::: ##.... ##: ##.....:: ##::'##::::'## ##::: ##.... ##:  ║
  ║  :'##:. ##:: ##:::: ##: ####: ##::'##:. ##:: ##:::: ##:::: ##:::: ##::'##:. ##:: ##:::: ##: ##::::::: ##:'##::::'##:. ##:: ##:::: ##:  ║
  ║  '##:::. ##: ########:: ## ## ##:'##:::. ##: ##:::: ##:::: ########::'##:::. ##: ########:: ######::: #####::::'##:::. ##: ########::  ║
  ║   #########: ##.. ##::: ##. ####: #########:. ##:: ##::::: ##.....::: #########: ##.. ##::: ##...:::: ##. ##::: #########: ##.. ##:::  ║
  ║   ##.... ##: ##::. ##:: ##:. ###: ##.... ##::. ## ##:::::: ##:::::::: ##.... ##: ##::. ##:: ##::::::: ##:. ##:: ##.... ##: ##::. ##::  ║
  ║   ##:::: ##: ##:::. ##: ##::. ##: ##:::: ##:::. ###::::::: ##:::::::: ##:::: ##: ##:::. ##: ########: ##::. ##: ##:::: ##: ##:::. ##:  ║
  ║  ..:::::..::..:::::..::..::::..::..:::::..:::::...::::::::..:::::::::..:::::..::..:::::..::........::..::::..::..:::::..::..:::::..::  ║
  ║                                                                                                                                        ║
  ║              P O R T F O L I O   v 1 . 0                                                                                               ║ 
  ║                                                                                                                                        ║
  ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

  System Iniitialized  

  `;

  return (
    <pre className="text-xs sm:text-sm font-mono mb-4 opacity-90">
      <StreamingText text={banner} speed={1} onComplete={onComplete} />
    </pre>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ 
  title: string; 
  description: string; 
  tags: string[]; 
  github?: string;
  demo?: string;
  image?: string;
}> = ({ title, description, tags, github, demo, image }) => {
  return (
    <div className="border border-current rounded-lg p-4 hover:scale-105 transition-transform duration-300 backdrop-blur-sm bg-opacity-10 bg-white">
      <div className="aspect-video bg-current bg-opacity-10 rounded mb-3 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Folder className="w-12 h-12 opacity-30" />
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm opacity-80 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded border border-current opacity-70">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:underline">
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:underline">
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  );
};

// PDF Viewer Component
// const PDFViewer: React.FC = () => {
//   return (
//     <div className="border border-current rounded-lg p-4 max-w-4xl">
//       <div className="flex items-center justify-between mb-4 pb-2 border-b border-current">
//         <div className="flex items-center gap-2">
//           <File className="w-5 h-5" />
//           <span className="font-semibold">resume.pdf</span>
//         </div>
//         <a 
//           href="/resume.pdf" 
//           download 
//           className="px-3 py-1 border border-current rounded hover:bg-current hover:bg-opacity-20 transition-colors"
//         >
//           Download
//         </a>
//       </div>
//       <div className="w-full h-[700px] bg-zinc-800">
//         <iframe
//           src="/resume.pdf#view=FitH"
//           title="Resume Preview"
//           className="w-full h-full border-none"
//         />
//       </div>
//     </div>
//   );
// };
const PDFViewer: React.FC = () => {
  return (
    <div className="flex flex-col border border-current rounded-lg overflow-hidden w-full max-w-5xl bg-[#1a1a1a] mx-auto">
      
      {/* Responsive Header */}
      <div className="flex items-center justify-between px-3 py-2 md:px-4 border-b border-current bg-black/40">
        <div className="flex items-center gap-2 min-w-0">
          <File className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="font-mono text-xs md:text-sm truncate opacity-80">My Resume</span>
        </div>
        
        <div className="flex gap-2">
          {/* Mobile-only View Full Button (Hidden on Desktop) */}
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden text-[10px] px-2 py-1 border border-current rounded flex items-center gap-1 hover:bg-current hover:text-black transition-all"
          >
            <ExternalLink size={12} /> View
          </a>
        </div>
      </div>

      {/* PDF Container - Adjusts height based on screen size */}
      <div className="relative w-full h-[50vh] md:h-[75vh] lg:h-[85vh] bg-zinc-800">
        <iframe
          src="/resume.pdf#view=FitH"
          title="Resume Preview"
          className="w-full h-full border-none shadow-2xl"
        />
        
        {/* Mobile Fallback Hint */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-6 text-center text-zinc-500 md:hidden">
          <File size={48} className="mb-4 opacity-20" />
          <p className="text-sm">PDF preview might not be supported on your mobile browser.</p>
          <a href="/resume.pdf" target="_blank" className="mt-2 text-blue-400 underline">Open directly</a>
        </div>
      </div>
    </div>
  );
};

// Command Components
const HelpCommand: React.FC = () => {
  const commands = [
    { cmd: 'help', desc: 'Display all available commands' },
    { cmd: 'about', desc: 'Learn more about me' },
    { cmd: 'projects', desc: 'View my projects portfolio' },
    { cmd: 'cv / resume', desc: 'View my resume/CV' },
    { cmd: 'socials', desc: 'Find me on social media' },
    { cmd: 'neofetch', desc: 'Display system information' },
    { cmd: 'themes', desc: 'List available color themes' },
    { cmd: 'themes set <n>', desc: 'Change color theme' },
    { cmd: 'gui', desc: 'Switch to graphical interface' },
    { cmd: 'clear', desc: 'Clear terminal history' },
  ];

  return (
    <div className="space-y-2">
      <p className="mb-4">Available commands:</p>
      {commands.map((cmd, i) => (
        <div key={i} className="flex gap-4">
          <span className="font-bold min-w-[180px]">{cmd.cmd}</span>
          <span className="opacity-70">{cmd.desc}</span>
        </div>
      ))}
    </div>
  );
};

const AboutCommand: React.FC = () => {
  return (
    <div className="space-y-3">
      <p className="text-lg font-bold">👋 Hi, I'm  Arnav Parekar</p>
      <p>
      I’m a tech enthusiast working across OT security and 
      software development. I enjoy building practical systems,
      exploring how things work at scale, and learning by designing, breaking,
      and improving real-world applications.
      </p>
      <p>
      Currently focusing on improving problem-solving skills through data structures
      and algorithms, building end-to-end software projects, and gaining deeper
      exposure to OT environments and security-oriented system design.
      </p>
      <div className="mt-4 pt-4 border-t border-current">
        <p className="opacity-70">📍 Location: Pune, Maharashtra</p>
        <p className="opacity-70">💼 Open to: Freelance & Full-time opportunities</p>
      </div>
    </div>
  );
};

const ProjectsCommand: React.FC = () => {
  const projects = [
    {
      title: 'Remembron',
      description: 'It is an audio-visual app designed for individuals with Alzheimer’s, offering personalized reminders, geofencing, and guidance.',
      tags: ['Flutter', 'GCP', 'Tensorflow'],
      github: 'https://github.com/Nikhil-1426/Remembron',
      demo: 'https://github.com/Nikhil-1426/Remembron?tab=readme-ov-file#live-preview-',
      image: '/projects/project1.jpg'
    },
    {
      title: 'Travelshield',
      description: 'It is a comprehensive travel health management solution designed to ensure safer journeys for both travelers and airport authorities using a website and a mobile app.',
      tags: ['React', 'GCP', 'Azure', 'Flutter', 'Flask'],
      github: 'https://github.com/arnavparekar/TravelShield-Web',
      demo: 'https://github.com/Nikhil-1426/TravelShield?tab=readme-ov-file#live-preview',
      image: '/projects/project2.jpg'
    },
    {
      title: 'Dishcovery',
      description: 'It is an intelligent culinary assistant generating AI-powered recipes from available ingredients, organizing community recipe exploration, and automating grocery lists.',
      tags: ['React', 'Flask', 'GCP'],
      github: 'https://github.com/arnavparekar/Dishcovery',
      demo: 'https://dishcovery-f.onrender.com/',
      image: '/projects/project3.jpg'
    }
  ];

  return (
    <div>
      <p className="mb-6 text-lg font-bold">Featured Projects</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
      <p className="mt-6 text-sm opacity-70">
        You can find all my projects{' '}
        <a 
          href="https://github.com/arnavparekar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors cursor-pointer"
        >
          right here on Github
        </a>.
      </p>
    </div>
  );
};

const SocialsCommand: React.FC = () => {
  const socials = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/arnavparekar' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/arnav-parekar-b55786287/' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/yourusername' },
    { icon: Mail, label: 'Gmail', url: 'mailto:parekar.arnav@gmail.com' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold mb-4">Connect with me:</p>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:underline group"
        >
          <social.icon className="w-5 h-5" />
          <span className="group-hover:translate-x-2 transition-transform">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

const NeofetchCommand: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-1 font-mono text-sm">
        <div className="text-2xl font-bold mb-2">yourusername@portfolio</div>
        <div className="h-px bg-current opacity-30 mb-2"></div>
        <p><span className="font-bold">OS:</span> {navigator.platform}</p>
        <p><span className="font-bold">Browser:</span> {navigator.userAgent.split(' ').slice(-1)[0]}</p>
        <p><span className="font-bold">Resolution:</span> {window.screen.width}x{window.screen.height}</p>
        <p><span className="font-bold">Language:</span> {navigator.language}</p>
      </div>
      <div className="space-y-1 font-mono text-sm">
        <div className="text-xl font-bold mb-2">Tech Stack</div>
        <div className="h-px bg-current opacity-30 mb-2"></div>
        <p>⚛️  React / Next.js</p>
        <p>📘 TypeScript</p>
        <p>🎨 Tailwind CSS</p>
        <p>🔥 Framer Motion</p>
        <p>🐙 Git / GitHub</p>
        <p>☁️  AWS / Vercel</p>
        <p>🐳 Docker</p>
      </div>
    </div>
  );
};

const ThemesCommand: React.FC<{ currentTheme: string; onThemeChange: (theme: string) => void }> = ({ 
  currentTheme, 
  onThemeChange 
}) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-bold mb-4">Available Themes:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`p-3 border border-current rounded-lg text-left hover:scale-105 transition-transform ${
              currentTheme === key ? 'bg-current bg-opacity-20' : ''
            }`}
          >
            <div className="font-bold mb-1">{theme.name}</div>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.background }}></div>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.foreground }}></div>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }}></div>
            </div>
          </button>
        ))}
      </div>
      <p className="text-sm opacity-70 mt-4">
        Usage: <span className="font-mono">themes set &lt;name&gt;</span>
      </p>
    </div>
  );
};

// Main Terminal Component
export default function Home() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', THEMES[theme].background);
    document.documentElement.style.setProperty('--fg-color', THEMES[theme].foreground);
    document.documentElement.style.setProperty('--accent-color', THEMES[theme].accent);
    document.documentElement.style.setProperty('--secondary-color', THEMES[theme].secondary);
  }, [theme]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  const processCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode;

    if (trimmedCmd === 'help') {
      output = <HelpCommand />;
    } else if (trimmedCmd === 'about') {
      output = <AboutCommand />;
    } else if (trimmedCmd === 'projects') {
      output = <ProjectsCommand />;
    } else if (trimmedCmd === 'cv' || trimmedCmd === 'resume') {
      output = <PDFViewer />;
    } else if (trimmedCmd === 'socials') {
      output = <SocialsCommand />;
    } else if (trimmedCmd === 'neofetch') {
      output = <NeofetchCommand />;
    } else if (trimmedCmd === 'themes') {
      output = <ThemesCommand currentTheme={theme} onThemeChange={setTheme} />;
    } else if (trimmedCmd.startsWith('themes set ')) {
      const themeName = trimmedCmd.split('themes set ')[1];
      if (THEMES[themeName]) {
        setTheme(themeName);
        output = <p>Theme changed to: {THEMES[themeName].name}</p>;
      } else {
        output = <p className="text-red-400">Theme '{themeName}' not found. Type 'themes' to see available options.</p>;
      }
    } else if (trimmedCmd === 'gui') {
      output = (
        <div className="space-y-2">
          <p>Initializing graphical interface...</p>
          <p className="animate-pulse">🌐 Redirecting...</p>
          <p className="text-sm opacity-70">(GUI mode coming soon!)</p>
        </div>
      );
    } else if (trimmedCmd === 'clear') {
      setCommands([]);
      return;
    } else if (trimmedCmd === '') {
      return;
    } else {
      output = (
        <p>
          Command not found: <span className="font-bold">{cmd}</span>
          <br />
          Type <span className="font-bold">'help'</span> for available commands.
        </p>
      );
    }

    setCommands(prev => [...prev, { input: cmd, output, timestamp: new Date() }]);
  }, [theme]);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      setIsProcessing(true);
      setHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      processCommand(input);
      setInput('');
      setTimeout(() => setIsProcessing(false), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  if (isBooting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ 
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--fg-color)' 
      }}>
        <ASCIIBanner onComplete={() => setIsBooting(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ 
      backgroundColor: 'var(--bg-color)', 
      color: 'var(--fg-color)' 
    }}>
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-50">
        <div className="scanline"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div 
          className="rounded-lg overflow-hidden shadow-2xl backdrop-blur-md"
          style={{ 
            background: `linear-gradient(135deg, ${THEMES[theme].secondary}99 0%, ${THEMES[theme].background}cc 100%)`,
            border: `1px solid ${THEMES[theme].foreground}33`
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ 
            borderColor: `${THEMES[theme].foreground}33` 
          }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-mono">arnav@terminal_portfolio ~ zsh</span>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={outputRef}
            className="p-4 md:p-6 font-mono text-sm h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            <p className="mb-4 opacity-70">
              Welcome to my terminal portfolio. Type <span className="font-bold">'help'</span> to see available commands.
            </p>
            
            {commands.map((cmd, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                  <span className="opacity-70">arnav@profile:~$</span>
                  <span className="font-bold">{cmd.input}</span>
                </div>
                <div className="ml-6 mb-4">{cmd.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              <span className="opacity-70">arnav@profile:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(e);
                  } else {
                    handleKeyDown(e);
                  }
                }}
                className="flex-1 bg-transparent outline-none font-mono"
                autoFocus
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions for Mobile */}
        <div className="mt-4 md:hidden grid grid-cols-3 gap-2">
          {['help', 'projects', 'socials'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                processCommand(cmd);
              }}
              className="px-4 py-2 rounded border text-sm font-mono"
              style={{ 
                borderColor: 'var(--fg-color)',
                color: 'var(--fg-color)'
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scanline {
          width: 100%;
          height: 100vh;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          animation: scan 8s linear infinite;
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--fg-color);
          opacity: 0.3;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}