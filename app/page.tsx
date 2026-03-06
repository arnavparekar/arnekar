"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ExternalLink,
    Github,
    Mail,
    Linkedin,
    Download,
    Terminal,
    Monitor,
    Sun,
    Moon,
    Palette,
    Code2,
    BookOpen,
    User,
    Briefcase,
    FolderGit2,
    GraduationCap,
    Phone,
    FileText,
    HelpCircle,
    Layers,
    Award,
    X,
} from "lucide-react";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */

interface HistoryEntry {
    id: number;
    command: string;
    output: React.ReactNode;
    timestamp: number;
}

interface Project {
    title: string;
    description: string;
    techStack: string[];
    github: string;
    image: string;
    galleryImages?: string[];
    isMobile?: boolean;
}

interface ThemeConfig {
    name: string;
    label: string;
    bg: string;
    fg: string;
    accent: string;
    secondary: string;
}

/* ============================================
   STATIC DATA — from personal_info.md
   ============================================ */

const THEMES: ThemeConfig[] = [
    { name: "dark", label: "Dark", bg: "#0a0e27", fg: "#00ff41", accent: "#00d9ff", secondary: "#1a1f3a" },
    { name: "light", label: "Light", bg: "#f5f5f5", fg: "#2d3748", accent: "#3182ce", secondary: "#e2e8f0" },
    { name: "blue-matrix", label: "Blue Matrix", bg: "#0d1b2a", fg: "#00d9ff", accent: "#00ff41", secondary: "#1b263b" },
    { name: "espresso", label: "Espresso", bg: "#2b1d0e", fg: "#e4c07a", accent: "#d4976c", secondary: "#3d2817" },
    { name: "green-goblin", label: "Green Goblin", bg: "#0f2027", fg: "#39ff14", accent: "#7fff00", secondary: "#1a3a3a" },
    { name: "ubuntu", label: "Ubuntu", bg: "#300a24", fg: "#ffffff", accent: "#e95420", secondary: "#5e2750" },
];

const PROJECTS: Project[] = [
    {
        title: "FloatChat",
        description:
            "An end-to-end RAG chatbot using MiniLM embeddings, FAISS semantic search, and knowledge graphs to deliver explainable, source-backed domain Q&A with confidence scoring. Engineered a 3-layer reasoning pipeline with ETL for NetCDF → Supabase, and deployed an MCP-based agentic AI backend with production monitoring.",
        techStack: ["Python", "FAISS", "MiniLM", "Supabase", "MCP", "Knowledge Graphs"],
        github: "https://github.com/arnavparekar/Float_Chat",
        /* TODO: Replace with your actual project screenshot at /public/projects/project1.jpg */
        image: "/projects/project1.jpg",
        /* TODO: Add more gallery images for modal, e.g. ["/projects/project1-2.jpg", "/projects/project1-3.jpg"] */
        galleryImages: ["/projects/project1-2.jpg", "/projects/project1-3.jpg", "/projects/project1-4.jpg"],
    },
    {
        title: "Sashakt",
        description:
            "A community platform in Flutter with Supabase for real-time auth, database management, marketplace, and donation workflows. Implemented web scraping pipelines and secure payment integration to enable resource access and community-led financial support.",
        techStack: ["Flutter", "Supabase", "Dart", "Web Scraping", "Payments"],
        github: "https://github.com/arnavparekar/Sashakt",
        /* TODO: Replace with your actual project screenshot at /public/projects/project2.jpg */
        image: "/projects/project2.jpg",
        galleryImages: ["/projects/project2-2.jpg", "/projects/project2-3.jpg", "/projects/project2-4.jpg"],
        isMobile: true,
    },
    {
        title: "TravelShield",
        description:
            "A full-stack travel health platform (React + Flutter) integrating Azure OpenAI Search and Multilingual Services for real-time, personalized risk assessment. Built a Flask REST API with Gemini AI and Azure Functions for scalable predictive health analytics.",
        techStack: ["React", "Flutter", "Flask", "Azure OpenAI", "Gemini AI"],
        github: "https://github.com/arnavparekar/TravelShield-Web",
        /* TODO: Replace with your actual project screenshot at /public/projects/project3.jpg */
        image: "/projects/project3.jpg",
        galleryImages: ["/projects/project3-2.jpg", "/projects/project3-3.jpg", "/projects/project3-4.jpg", "/projects/project3-5.jpg"],
        isMobile: true,
    },
    {
        title: "Remembron",
        description:
            "An AI memory-aid system (Flutter + Flask + Firebase) using TensorFlow CNN facial recognition (>80% accuracy) and Gemini-based speech-to-text. Integrated Google Maps geofencing with real-time alerts and secure authentication for Alzheimer's patient safety.",
        techStack: ["Flutter", "Flask", "Firebase", "TensorFlow", "Google Maps"],
        github: "https://github.com/arnavparekar/Remembron",
        /* TODO: Replace with your actual project screenshot at /public/projects/project4.jpg */
        image: "/projects/project4.jpg",
        galleryImages: ["/projects/project4-2.jpg"],
        isMobile: true,
    },
    {
        title: "Justice.ai",
        description:
            "A legal AI assistant (Vue + Gemini AI) that simplifies legal documents by ~70% using NLP-driven summarization. Integrated WatsonX AI for multilingual legal insight extraction and adaptive explanations across 5+ languages.",
        techStack: ["Vue", "Gemini AI", "WatsonX", "NLP", "Multilingual"],
        github: "https://github.com/arnavparekar/Justice.ai",
        /* TODO: Replace with your actual project screenshot at /public/projects/project5.jpg */
        image: "/projects/project5.jpg",
        galleryImages: ["/projects/project5-2.jpg", "/projects/project5-3.jpg"],
    },
];

/* Valid single-word commands for strict matching */
const SINGLE_COMMANDS = [
    "help", "about", "education", "experience", "projects",
    "skills", "contact",
    "resume", "cv", "neofetch", "clear", "gui", "espresso", "banner", "details",
];

/* All command names for autocomplete */
const AUTOCOMPLETE_COMMANDS = [
    "help", "about", "education", "experience", "projects",
    "skills", "contact",
    "resume", "cv", "neofetch", "themes", "themes set",
    "clear", "gui", "espresso", "banner", "details",
];

const SKILLS = {
    "Programming Languages": {
        proficient: ["JavaScript", "TypeScript", "C/C++"],
        intermediate: ["Java", "Python"],
    },
    Development: [
        "React", "Next.js", "Vue", "HTML5", "CSS3", "Tailwind CSS",
        "Node.js", "Express", "Flask", "FastAPI", "Flutter",
    ],
    "Cloud Technologies": ["AWS", "Google Cloud Platform", "Docker", "Git/GitHub", "GitLab"],
    Cybersecurity: [
        "ISO 27001", "MITRE ATT&CK", "Risk Assessment",
        "Nmap", "Nessus", "OpenVAS", "Metasploit",
        "Wireshark", "tcpdump", "Maltego", "OSINT",
    ],
};

const COMMANDS_LIST: { command: string; description: string }[] = [
    { command: "help", description: "Display all available commands" },
    { command: "about", description: "Learn more about me" },
    { command: "education", description: "View educational background" },
    { command: "experience", description: "View work experience" },
    { command: "projects", description: "Browse my project portfolio" },
    { command: "skills", description: "View technical skills" },
    // { command: "publications", description: "View patents and publications" },
    // { command: "certifications", description: "View certifications" },
    { command: "contact", description: "Get my contact information" },
    { command: "resume", description: "View or download my resume" },
    { command: "neofetch", description: "Display system info (Linux-style)" },
    { command: "themes", description: "List available color themes" },
    { command: "themes set <name>", description: "Switch to a specific theme" },
    { command: "banner", description: "Display the ASCII art banner" },
    { command: "details", description: "Tips & shortcuts for this terminal" },
    { command: "clear", description: "Clear terminal history" },
    { command: "gui", description: "Switch to GUI portfolio (coming soon)" },
];

/* ASCII art banner — desktop version */
const ASCII_BANNER_DESKTOP = `
╔═════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                     ║
║    :::'###::::'########::'##::: ##:'########:'##:::'##::::'###::::'########:::::    ║
║    ::'## ##::: ##.... ##: ###:: ##: ##.....:: ##::'##::::'## ##::: ##.... ##::::    ║
║    :'##:. ##:: ##:::: ##: ####: ##: ##::::::: ##:'##::::'##:. ##:: ##:::: ##::::    ║
║    '##:::. ##: ########:: ## ## ##: ######::: #####::::'##:::. ##: ########:::::    ║
║     #########: ##.. ##::: ##. ####: ##...:::: ##. ##::: #########: ##.. ##::::::    ║
║     ##.... ##: ##::. ##:: ##:. ###: ##::::::: ##:. ##:: ##.... ##: ##::. ##:::::    ║
║     ##:::: ##: ##:::. ##: ##::. ##: ########: ##::. ##: ##:::: ##: ##:::. ##::::    ║
║    ..:::::..::..:::::..::..::::..::........::..::::..::..:::::..::..:::::..:::::    ║
║                                                                                     ║
║    Developer • Cybersecurity Enthusiast • Builder                                   ║
║    Portfolio of Arnav Parekar                                                       ║
║                                                                                     ║
╚═════════════════════════════════════════════════════════════════════════════════════╝`;

/* ASCII art banner — mobile-friendly compact version */
const ASCII_BANNER_MOBILE = `
╔══════════════════════════════════════════╗
║                                          ║    
║ █████  ██████  ███    ██  █████  ██    ██║
║██   ██ ██   ██ ████   ██ ██   ██ ██    ██║
║███████ ██████  ██ ██  ██ ███████ ██    ██║
║██   ██ ██   ██ ██  ██ ██ ██   ██  ██  ██ ║
║██   ██ ██   ██ ██   ████ ██   ██   ████  ║
║                                          ║
║  Developer • Cybersecurity Enthusiast    ║
║  Portfolio of Arnav Parekar              ║
╚══════════════════════════════════════════╝`;

/* ============================================
   STREAMING TEXT COMPONENT
   ============================================ */
function StreamingText({
    content,
    speed = 5,
    onComplete,
}: {
    content: string;
    speed?: number;
    onComplete?: () => void;
}) {
    const [displayedChars, setDisplayedChars] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setDisplayedChars(0);
        intervalRef.current = setInterval(() => {
            setDisplayedChars((prev) => {
                if (prev >= content.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    onComplete?.();
                    return prev;
                }
                return prev + 1;
            });
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [content, speed, onComplete]);

    return <span>{content.slice(0, displayedChars)}</span>;
}

/* ============================================
   PROJECT MODAL COMPONENT
   ============================================ */
function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
    const [activeIdx, setActiveIdx] = useState(0);
    const galleryRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const allImages = [project.image, ...(project.galleryImages || [])];

    // IntersectionObserver to sync active dot with visible image
    useEffect(() => {
        const container = galleryRef.current;
        if (!container || allImages.length <= 1) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const idx = slideRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (idx !== -1) setActiveIdx(idx);
                    }
                }
            },
            { root: container, threshold: 0.6 }
        );

        slideRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [allImages.length]);

    const handleImgError = (src: string) => {
        setImgErrors((prev) => ({ ...prev, [src]: true }));
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden border flex flex-col"
                style={{
                    borderColor: "color-mix(in srgb, var(--fg) 25%, transparent)",
                    background: "var(--bg)",
                }}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-lg transition-all hover:scale-110"
                    style={{
                        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
                        color: "var(--fg)",
                        border: "1px solid color-mix(in srgb, var(--fg) 20%, transparent)",
                    }}
                    aria-label="Close modal"
                >
                    <X size={18} />
                </button>

                {/* Image Gallery — horizontal scroll on desktop, vertical on mobile */}
                <div
                    ref={galleryRef}
                    className="flex md:flex-row flex-col md:overflow-x-auto md:overflow-y-hidden overflow-y-auto overflow-x-hidden shrink-0 scroll-smooth"
                    style={{
                        maxHeight: "50vh",
                        minHeight: "200px",
                        background: "color-mix(in srgb, var(--fg) 3%, transparent)",
                        scrollSnapType: "x mandatory",
                    }}
                >
                    {allImages.map((src, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { slideRefs.current[idx] = el; }}
                            className="flex-shrink-0 flex items-center justify-center md:w-full md:min-w-full w-full"
                            style={{
                                scrollSnapAlign: "start",
                                aspectRatio: project.isMobile ? undefined : "16/9",
                                minHeight: project.isMobile ? "250px" : undefined,
                                padding: project.isMobile ? "24px" : "0",
                            }}
                        >
                            {!imgErrors[src] ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={src}
                                    alt={`${project.title} screenshot ${idx + 1} `}
                                    className={`${project.isMobile
                                        ? "h-full max-h-[45vh] w-auto object-contain rounded-lg"
                                        : "w-full h-full object-cover"
                                        } `}
                                    onError={() => handleImgError(src)}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                    <FolderGit2 size={48} style={{ color: "var(--fg)", opacity: 0.2 }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Scroll indicator dots — synced with visible image, hidden on mobile */}
                {allImages.length > 1 && (
                    <div className="hidden md:flex justify-center gap-1.5 py-2" style={{ background: "var(--bg)" }}>
                        {allImages.map((_, idx) => (
                            <button
                                key={idx}
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                    background: idx === activeIdx
                                        ? "var(--accent)"
                                        : "color-mix(in srgb, var(--fg) 25%, transparent)",
                                    transform: idx === activeIdx ? "scale(1.3)" : "scale(1)",
                                }}
                                onClick={() => {
                                    slideRefs.current[idx]?.scrollIntoView({ behavior: "smooth", inline: "start" });
                                }}
                                aria-label={`Go to image ${idx + 1} `}
                            />
                        ))}
                    </div>
                )}

                {/* Fixed text content below images */}
                <div className="p-5 space-y-4 overflow-y-auto">
                    <h3
                        className="text-xl font-semibold"
                        style={{ color: "var(--fg)" }}
                    >
                        {project.title}
                    </h3>
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--fg)", opacity: 0.8 }}
                    >
                        {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-3 py-1 rounded border"
                                style={{
                                    borderColor: "color-mix(in srgb, var(--fg) 40%, transparent)",
                                    color: "var(--accent)",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-1">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all hover:scale-105"
                            style={{
                                color: "var(--accent)",
                                borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)",
                            }}
                        >
                            <Github size={16} />
                            <span>Source Code</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ============================================
   PROJECT CARD COMPONENT
   ============================================ */
function ProjectCard({
    project,
    onOpenModal,
}: {
    project: Project;
    onOpenModal: (project: Project) => void;
}) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            className="border rounded-xl overflow-hidden theme-transition group cursor-pointer"
            style={{
                borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)",
                background: "color-mix(in srgb, var(--secondary) 50%, transparent)",
            }}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => onOpenModal(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpenModal(project); }}
        >
            {/* Project Image — uniform fixed container */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    aspectRatio: "16 / 9",
                    background: "color-mix(in srgb, var(--fg) 5%, transparent)",
                }}
            >
                {!imgError ? (
                    <div className="w-full h-full flex items-center justify-center p-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 rounded"
                            onError={() => setImgError(true)}
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FolderGit2
                            size={48}
                            style={{ color: "var(--fg)", opacity: 0.3 }}
                        />
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--fg)" }}
                >
                    {project.title}
                </h3>
                <p
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{ color: "var(--fg)", opacity: 0.75 }}
                >
                    {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded border"
                            style={{
                                borderColor: "color-mix(in srgb, var(--fg) 40%, transparent)",
                                color: "var(--accent)",
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1">
                    <span
                        className="flex items-center gap-1.5 text-sm transition-transform hover:translate-x-1"
                        style={{ color: "var(--accent)" }}
                    >
                        <Github size={16} />
                        <span>Source Code</span>
                        <ExternalLink size={12} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ============================================
   MAIN TERMINAL COMPONENT
   ============================================ */
export default function TerminalPortfolio() {
    /* ------- STATE ------- */
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isBooting, setIsBooting] = useState(true);
    const [bootText, setBootText] = useState("");
    const [currentTheme, setCurrentTheme] = useState("dark");
    const [isProcessing, setIsProcessing] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
    const [modalProject, setModalProject] = useState<Project | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const bootTimerRef = useRef<NodeJS.Timeout | null>(null);

    /* ------- DETECT MOBILE ------- */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ------- THEME MANAGEMENT ------- */
    useEffect(() => {
        const saved = localStorage.getItem("terminal-theme");
        if (saved && THEMES.some((t) => t.name === saved)) {
            setCurrentTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    const setTheme = useCallback((themeName: string) => {
        setCurrentTheme(themeName);
        document.documentElement.setAttribute("data-theme", themeName);
        localStorage.setItem("terminal-theme", themeName);
    }, []);

    /* ------- BOOT SEQUENCE ------- */
    useEffect(() => {
        const banner = isMobile ? ASCII_BANNER_MOBILE : ASCII_BANNER_DESKTOP;
        const bootSequence = banner + "\n\n  System Booting...\n  Loading modules...  ██████████████████  100%\n\n  Welcome! Type 'help' to see available commands.\n";
        let charIndex = 0;

        const streamBoot = () => {
            if (charIndex < bootSequence.length) {
                // Stream in chunks for speed
                const chunkSize = 3;
                charIndex += chunkSize;
                setBootText(bootSequence.slice(0, charIndex));
                bootTimerRef.current = setTimeout(streamBoot, 1);
            } else {
                setBootText(bootSequence);
                setTimeout(() => setIsBooting(false), 600);
            }
        };

        streamBoot();
        return () => {
            if (bootTimerRef.current) clearTimeout(bootTimerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    /* ------- AUTO SCROLL ------- */
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history, bootText]);

    /* ------- FOCUS INPUT ------- */
    useEffect(() => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    }, [isBooting]);

    /* ------- COMMAND PROCESSOR ------- */
    const processCommand = useCallback(
        (cmd: string): React.ReactNode => {
            const trimmed = cmd.trim().toLowerCase();
            const parts = trimmed.split(/\s+/);
            const baseCmd = parts[0];

            /* --- Strict matching: single-word commands must be exact --- */
            if (SINGLE_COMMANDS.includes(baseCmd) && parts.length > 1) {
                /* Exception: "themes" can have subcommands */
                if (baseCmd !== "themes") {
                    return (
                        <div>
                            <p style={{ color: "#ef4444" }}>
                                Invalid usage: <strong>{cmd.trim()}</strong>
                            </p>
                            <p style={{ opacity: 0.7 }}>
                                <strong style={{ color: "var(--accent)" }}>{baseCmd}</strong> does not accept arguments.
                                Type <strong style={{ color: "var(--accent)" }}>help</strong> for available commands.
                            </p>
                        </div>
                    );
                }
            }

            /* === HELP === */
            if (trimmed === "help") {
                return (
                    <div className="space-y-1">
                        <p className="font-semibold mb-3" style={{ color: "var(--accent)" }}>
                            Available Commands:
                        </p>
                        <div className="grid gap-1">
                            {COMMANDS_LIST.map((c) => (
                                <div key={c.command} className="flex gap-4">
                                    <span
                                        className="font-bold min-w-[200px] shrink-0"
                                        style={{ color: "var(--fg)" }}
                                    >
                                        {c.command}
                                    </span>
                                    <span style={{ color: "var(--fg)", opacity: 0.7 }}>
                                        {c.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            /* === ABOUT === */
            if (trimmed === "about") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <User size={20} style={{ color: "var(--accent)" }} />
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: "var(--accent)" }}
                            >
                                About Me
                            </h2>
                        </div>
                        <p style={{ color: "var(--fg)", opacity: 0.9 }} className="leading-relaxed">
                            {`I'm Arnav Parekar, a developer passionate about building meaningful tech trying to create real-world impact. With experience in Flutter, Web Development, Cloud technologies and cybersecurity (especially OT security), I love combining clean product thinking with strong technical foundations.`}
                        </p >
                        <p style={{ color: "var(--fg)", opacity: 0.9 }} className="leading-relaxed">
                            {`I'm currently focused on growing into a software developer while continuing to build projects that solve real problems. I'm open to internship opportunities and full-time roles.`}
                        </p>
                        <p style={{ color: "var(--fg)", opacity: 0.9 }} className="leading-relaxed">
                            {`My hobbies include travelling, cubing, playing the guitar and racket sports.`}
                        </p>
                        <div
                            className="flex items-center gap-2 text-sm mt-4 pt-3 border-t"
                            style={{ borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)" }}
                        >
                            <Monitor size={14} style={{ color: "var(--accent)" }} />
                            <span style={{ opacity: 0.6 }}>📍 Pune, Maharashtra</span>
                        </div>
                    </div >
                );
            }

            /* === EDUCATION === */
            if (trimmed === "education") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Education
                            </h2>
                        </div>
                        <div
                            className="p-4 rounded-lg border"
                            style={{
                                borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                                background: "color-mix(in srgb, var(--secondary) 40%, transparent)",
                            }}
                        >
                            <h3 className="font-semibold text-lg" style={{ color: "var(--fg)" }}>
                                Vellore Institute of Technology Chennai
                            </h3>
                            <p style={{ color: "var(--accent)" }} className="mt-1">
                                Bachelor of Technology — Computer Science and Engineering
                            </p>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ opacity: 0.8 }}>
                                <span>CGPA: <strong>9.19 / 10.0</strong></span>
                                <span>2023 — 2027</span>
                            </div>
                            <div className="mt-4">
                                <p className="font-medium text-sm mb-2" style={{ color: "var(--accent)" }}>
                                    Relevant Coursework:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Data Structures & Algorithms",
                                        "Operating Systems",
                                        "Database Management",
                                        "Computer Networks",
                                        "Cloud Architecture",
                                        "Software Engineering",
                                        "Information Security Audit & Analysis",
                                    ].map((course) => (
                                        <span
                                            key={course}
                                            className="text-xs px-2 py-1 rounded border"
                                            style={{
                                                borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)",
                                                color: "var(--fg)",
                                                opacity: 0.85,
                                            }}
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            /* === EXPERIENCE === */
            if (trimmed === "experience") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Experience
                            </h2>
                        </div>
                        <div
                            className="p-4 rounded-lg border"
                            style={{
                                borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                                background: "color-mix(in srgb, var(--secondary) 40%, transparent)",
                            }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="font-semibold text-lg" style={{ color: "var(--fg)" }}>
                                    OSICS Technologies LLP
                                </h3>
                                <span className="text-sm" style={{ color: "var(--accent)" }}>
                                    June 2025 — July 2025
                                </span>
                            </div>
                            <p className="font-medium" style={{ color: "var(--accent)" }}>
                                OT Cybersecurity Intern — Pune, Maharashtra
                            </p>
                            <ul className="mt-3 space-y-2 text-sm" style={{ opacity: 0.85 }}>
                                <li className="flex gap-2">
                                    <span style={{ color: "var(--accent)" }}>▸</span>
                                    <span>Applied cybersecurity standards to reduce potential vulnerabilities in ICS network simulations</span>
                                </li>
                                <li className="flex gap-2">
                                    <span style={{ color: "var(--accent)" }}>▸</span>
                                    <span>Gained hands-on experience with OT network architectures and ICS protocols (Modbus, DNP3, OPC UA) through the LabShock tool, analyzing traffic and simulating attack scenarios in a containerized SCADA setup</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            }

            /* === PROJECTS === */
            if (trimmed === "projects") {
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FolderGit2 size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Featured Projects
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {PROJECTS.map((project) => (
                                <ProjectCard key={project.title} project={project} onOpenModal={setModalProject} />
                            ))}
                        </div>
                    </div>
                );
            }

            /* === SKILLS === */
            if (trimmed === "skills") {
                return (
                    <div className="space-y-4 max-w-4xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Code2 size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Technical Skills
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(SKILLS).map(([category, skills]) => (
                                <div
                                    key={category}
                                    className="p-4 rounded-lg border"
                                    style={{
                                        borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                                        background: "color-mix(in srgb, var(--secondary) 40%, transparent)",
                                    }}
                                >
                                    <h3 className="font-semibold mb-3" style={{ color: "var(--accent)" }}>
                                        {category}
                                    </h3>
                                    {typeof skills === "object" && !Array.isArray(skills) ? (
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-xs font-medium" style={{ opacity: 0.6 }}>
                                                    PROFICIENT
                                                </span>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {(skills as { proficient: string[]; intermediate: string[] }).proficient.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="text-sm px-3 py-1 rounded border font-medium"
                                                            style={{
                                                                borderColor: "var(--accent)",
                                                                color: "var(--accent)",
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium" style={{ opacity: 0.6 }}>
                                                    INTERMEDIATE
                                                </span>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {(skills as { proficient: string[]; intermediate: string[] }).intermediate.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="text-sm px-3 py-1 rounded border"
                                                            style={{
                                                                borderColor: "color-mix(in srgb, var(--fg) 40%, transparent)",
                                                                color: "var(--fg)",
                                                                opacity: 0.8,
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {(skills as string[]).map((s) => (
                                                <span
                                                    key={s}
                                                    className="text-sm px-3 py-1 rounded border"
                                                    style={{
                                                        borderColor: "color-mix(in srgb, var(--fg) 40%, transparent)",
                                                        color: "var(--fg)",
                                                        opacity: 0.85,
                                                    }}
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            /* === PUBLICATIONS === */
            // if (trimmed === "publications") {
            //     return (
            //         <div className="space-y-4 max-w-3xl">
            //             <div className="flex items-center gap-2 mb-2">
            //                 <Award size={20} style={{ color: "var(--accent)" }} />
            //                 <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
            //                     Publications & Patents
            //                 </h2>
            //             </div>
            //             <div
            //                 className="p-4 rounded-lg border"
            //                 style={{
            //                     borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
            //                     background: "color-mix(in srgb, var(--secondary) 40%, transparent)",
            //                 }}
            //             >
            //                 <h3 className="font-semibold" style={{ color: "var(--fg)" }}>
            //                     Patent — Indian Patent Office
            //                 </h3>
            //                 <p className="mt-2" style={{ color: "var(--accent)" }}>
            //                     System for monitoring vehicle speed in traffic environments and method of speed estimation
            //                 </p>
            //                 <div className="flex flex-wrap gap-4 mt-2 text-sm" style={{ opacity: 0.8 }}>
            //                     <span>Patent No: 202541130222</span>
            //                     <span>Filed: 2nd January 2026</span>
            //                     <span>Status: Filed</span>
            //                 </div>
            //             </div>
            //         </div>
            //     );
            // }

            /* === CERTIFICATIONS === */
            // if (trimmed === "certifications") {
            //     return (
            //         <div className="space-y-4 max-w-3xl">
            //             <div className="flex items-center gap-2 mb-2">
            //                 <BookOpen size={20} style={{ color: "var(--accent)" }} />
            //                 <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
            //                     Certifications
            //                 </h2>
            //             </div>
            //             <div className="space-y-3">
            //                 {[
            //                     { name: "CISA 210W 01-11", issuer: "CISA", date: "23/06/2025" },
            //                     {
            //                         name: "Supervised Machine Learning: Regression and Classification",
            //                         issuer: "DeepLearning.ai",
            //                         date: "4/10/2024",
            //                     },
            //                 ].map((cert) => (
            //                     <div
            //                         key={cert.name}
            //                         className="p-3 rounded-lg border"
            //                         style={{
            //                             borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
            //                             background: "color-mix(in srgb, var(--secondary) 40%, transparent)",
            //                         }}
            //                     >
            //                         <p className="font-semibold" style={{ color: "var(--fg)" }}>
            //                             {cert.name}
            //                         </p>
            //                         <div className="flex gap-4 mt-1 text-sm" style={{ opacity: 0.8 }}>
            //                             <span>Issuer: {cert.issuer}</span>
            //                             <span>Date: {cert.date}</span>
            //                         </div>
            //                     </div>
            //                 ))}
            //             </div>
            //         </div>
            //     );
            // }

            /* === CONTACT === */
            if (trimmed === "contact") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Phone size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Contact Information
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                {
                                    icon: <Mail size={18} />,
                                    label: "Email",
                                    value: "parekar.arnav@gmail.com",
                                    href: "mailto:parekar.arnav@gmail.com",
                                },
                                {
                                    icon: <Github size={18} />,
                                    label: "GitHub",
                                    value: "arnavparekar",
                                    href: "https://github.com/arnavparekar",
                                },
                                {
                                    icon: <Linkedin size={18} />,
                                    label: "LinkedIn",
                                    value: "Arnav Parekar",
                                    href: "https://www.linkedin.com/in/arnav-parekar-b55786287/",
                                },
                                {
                                    icon: <Code2 size={18} />,
                                    label: "LeetCode",
                                    value: "arnav_parekar",
                                    href: "https://leetcode.com/u/arnav_parekar/",
                                },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:translate-x-2"
                                    style={{
                                        borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                                        background: "color-mix(in srgb, var(--secondary) 30%, transparent)",
                                        color: "var(--fg)",
                                    }}
                                >
                                    <span style={{ color: "var(--accent)" }}>{link.icon}</span>
                                    <span className="font-medium">{link.label}</span>
                                    <span style={{ opacity: 0.7 }}>—</span>
                                    <span style={{ color: "var(--accent)" }}>{link.value}</span>
                                    <ExternalLink size={14} style={{ opacity: 0.5, marginLeft: "auto" }} />
                                </a>
                            ))}
                        </div>
                    </div>
                );
            }

            /* === RESUME / CV === */
            if (baseCmd === "resume" || baseCmd === "cv") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Resume
                            </h2>
                        </div>
                        <div
                            className="rounded-lg border overflow-hidden"
                            style={{
                                borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                            }}
                        >
                            {/* Header with download */}
                            <div
                                className="flex items-center justify-between p-3 border-b"
                                style={{
                                    borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                                    background: "color-mix(in srgb, var(--secondary) 50%, transparent)",
                                }}
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <FileText size={16} style={{ color: "var(--accent)" }} />
                                    <span>resume.pdf</span>
                                </div>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border transition-all hover:scale-105"
                                    style={{
                                        borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)",
                                        color: "var(--accent)",
                                    }}
                                >
                                    <Download size={14} />
                                    Download
                                </a>
                            </div>
                            {/* PDF Preview — TODO: Replace /resume.pdf with your actual resume */}
                            <div className="bg-white" style={{ minHeight: "500px" }}>
                                <iframe
                                    src="/resume.pdf"
                                    className="w-full"
                                    style={{ height: "600px", border: "none" }}
                                    title="Resume PDF Preview"
                                />
                            </div>
                        </div>
                        <p className="text-sm" style={{ opacity: 0.5 }}>
                            Tip: If the preview doesn&apos;t load, click Download to get the PDF directly.
                        </p>
                    </div>
                );
            }

            /* === NEOFETCH === */
            if (trimmed === "neofetch") {
                const sysInfo = [
                    { label: "OS", value: typeof navigator !== "undefined" ? navigator.platform || "Web" : "Web" },
                    { label: "Browser", value: typeof navigator !== "undefined" ? navigator.userAgent.split(" ").pop()?.split("/")[0] || "Browser" : "Browser" },
                    {
                        label: "Resolution",
                        value: typeof window !== "undefined" ? `${window.innerWidth}×${window.innerHeight}` : "N/A",
                    },
                    { label: "Language", value: typeof navigator !== "undefined" ? navigator.language : "en-US" },
                    { label: "Theme", value: THEMES.find((t) => t.name === currentTheme)?.label || currentTheme },
                ];

                // const techStack = [
                //     { icon: "⚛️", name: "React / Next.js" },
                //     { icon: "📘", name: "TypeScript" },
                //     { icon: "🎨", name: "Tailwind CSS" },
                //     { icon: "🐍", name: "Python / Flask" },
                //     { icon: "📱", name: "Flutter / Dart" },
                //     { icon: "☁️", name: "AWS / GCP" },
                //     { icon: "🐳", name: "Docker" },
                //     { icon: "🛡️", name: "Cybersecurity" },
                //     { icon: "🔥", name: "Firebase" },
                //     { icon: "🧠", name: "Machine Learning" },
                // ];

                const techStack = [
                    { name: "React / Next.js" },
                    { name: "TypeScript" },
                    { name: "Tailwind CSS" },
                    { name: "Python / Flask" },
                    { name: "Flutter / Dart" },
                    { name: "AWS / GCP" },
                    { name: "Docker" },
                    { name: "Cybersecurity" },
                    { name: "Machine Learning" },
                ];

                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl">
                        {/* System Info */}
                        <div>
                            <p className="font-bold mb-1" style={{ color: "var(--accent)" }}>
                                arnav@portfolio
                            </p>
                            <div
                                className="mb-3 border-t"
                                style={{ borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)" }}
                            />
                            {sysInfo.map((info) => (
                                <div key={info.label} className="flex gap-2 text-sm mb-1">
                                    <span className="font-bold min-w-[100px]">{info.label}:</span>
                                    <span style={{ opacity: 0.9 }}>{info.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <p className="font-bold mb-1" style={{ color: "var(--accent)" }}>
                                Tech Stack
                            </p>
                            <div
                                className="mb-3 border-t"
                                style={{ borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)" }}
                            />
                            <div className="grid grid-cols-1 gap-1 text-sm">
                                {techStack.map((tech) => (
                                    <div key={tech.name} className="flex items-center gap-2">
                                        <span style={{ color: "var(--accent)" }}>▸</span>
                                        <span style={{ opacity: 0.9 }}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            /* === THEMES (list) === */
            if (baseCmd === "themes" && parts.length === 1) {
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Palette size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Available Themes
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {THEMES.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => setTheme(theme.name)}
                                    className="p-4 rounded-lg border text-left transition-all hover:scale-105"
                                    style={{
                                        borderColor: currentTheme === theme.name ? theme.accent : "color-mix(in srgb, var(--fg) 20%, transparent)",
                                        background: theme.bg,
                                        color: theme.fg,
                                        outline: currentTheme === theme.name ? `2px solid ${theme.accent}` : "none",
                                        outlineOffset: "2px",
                                    }}
                                >
                                    <p className="font-semibold mb-2">{theme.label}</p>
                                    <div className="flex gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full border"
                                            style={{ background: theme.bg, borderColor: theme.fg }}
                                        />
                                        <div className="w-4 h-4 rounded-full" style={{ background: theme.fg }} />
                                        <div className="w-4 h-4 rounded-full" style={{ background: theme.accent }} />
                                    </div>
                                    {currentTheme === theme.name && (
                                        <p className="text-xs mt-2" style={{ color: theme.accent }}>
                                            ✓ Active
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm" style={{ opacity: 0.5 }}>
                            Usage: themes set &lt;name&gt; (e.g., themes set espresso)
                        </p>
                    </div>
                );
            }

            /* === THEMES SET <name> === */
            if (baseCmd === "themes" && parts[1] === "set" && parts[2]) {
                const themeName = parts[2];
                const found = THEMES.find((t) => t.name === themeName);
                if (found) {
                    setTheme(found.name);
                    return (
                        <p>
                            Theme switched to <strong style={{ color: "var(--accent)" }}>{found.label}</strong>
                        </p>
                    );
                }
                return (
                    <p>
                        <span style={{ color: "#ef4444" }}>Theme &apos;{themeName}&apos; not found.</span>
                        {" "}Available: {THEMES.map((t) => t.name).join(", ")}
                    </p>
                );
            }

            /* === BANNER === */
            if (trimmed === "banner") {
                const banner = typeof window !== "undefined" && window.innerWidth < 768
                    ? ASCII_BANNER_MOBILE
                    : ASCII_BANNER_DESKTOP;
                return (
                    <pre
                        className="text-xs md:text-sm whitespace-pre-wrap break-all text-glow"
                        style={{ color: "var(--fg)" }}
                    >
                        {banner}
                    </pre>
                );
            }

            /* === DETAILS === */
            if (trimmed === "details") {
                return (
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal size={20} style={{ color: "var(--accent)" }} />
                            <h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
                                Terminal Tips & Shortcuts
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { keys: "Tab", desc: "Autocomplete commands and theme names (e.g. type 'themes set es' then press Tab)" },
                                { keys: "↑ / ↓", desc: "Navigate through your command history" },
                                { keys: "Enter", desc: "Execute the current command" },
                                { keys: "Esc", desc: "Close any open project modal" },
                            ].map((item) => (
                                <div key={item.keys} className="flex gap-4 items-start">
                                    <span
                                        className="font-mono text-sm px-2 py-0.5 rounded border shrink-0"
                                        style={{
                                            borderColor: "color-mix(in srgb, var(--fg) 40%, transparent)",
                                            color: "var(--accent)",
                                            background: "color-mix(in srgb, var(--secondary) 60%, transparent)",
                                        }}
                                    >
                                        {item.keys}
                                    </span>
                                    <span style={{ color: "var(--fg)", opacity: 0.85 }}>{item.desc}</span>
                                </div>
                            ))}
                        </div>
                        <div
                            className="mt-4 pt-3 border-t space-y-2 text-sm"
                            style={{ borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)" }}
                        >
                            <p style={{ color: "var(--fg)", opacity: 0.85 }}>
                                <strong style={{ color: "var(--accent)" }}>Themes:</strong>{" "}
                                Customise the look with <strong>themes</strong> to list options, or <strong>themes set {'<name>'}</strong> to apply one.
                            </p>
                            <p style={{ color: "var(--fg)", opacity: 0.85 }}>
                                <strong style={{ color: "var(--accent)" }}>Projects:</strong>{" "}
                                Click any project card to open a detailed gallery modal.
                            </p>
                            <p style={{ color: "var(--fg)", opacity: 0.85 }}>
                                <strong style={{ color: "var(--accent)" }}>Mobile:</strong>{" "}
                                Use the quick-action buttons at the bottom for common commands.
                            </p>
                        </div>
                    </div>
                );
            }

            /* === GUI === */
            if (trimmed === "gui") {
                return (
                    <div className="space-y-2">
                        <p>GUI mode is coming soon!</p>
                        <p style={{ opacity: 0.7 }}>
                            A graphical portfolio interface is under development. Stay tuned for the update.
                        </p>
                    </div>
                );
            }

            /* === CLEAR === */
            if (trimmed === "clear") {
                return null; // handled separately
            }

            /* === COMMAND NOT FOUND === */
            return (
                <div>
                    <p style={{ color: "#ef4444" }}>
                        Command not found: <strong>{cmd.trim()}</strong>
                    </p>
                    <p style={{ opacity: 0.7 }}>
                        Type <strong style={{ color: "var(--accent)" }}>help</strong> for available commands.
                    </p>
                </div>
            );
        },
        [currentTheme, setTheme]
    );

    /* ------- HANDLE COMMAND SUBMIT ------- */
    const handleSubmit = useCallback(
        (cmdOverride?: string) => {
            const cmd = cmdOverride ?? input;
            if (!cmd.trim() || isProcessing) return;

            const trimmed = cmd.trim().toLowerCase();
            setIsProcessing(true);

            // Add to command history
            setCommandHistory((prev) => [...prev, cmd.trim()]);
            setHistoryIndex(-1);
            setInput("");

            // Handle clear command
            if (trimmed === "clear") {
                setHistory([]);
                setIsProcessing(false);
                return;
            }

            const output = processCommand(cmd);
            const newEntry: HistoryEntry = {
                id: idCounter,
                command: cmd.trim(),
                output,
                timestamp: Date.now(),
            };

            setIdCounter((prev) => prev + 1);

            // Small delay for UX
            setTimeout(() => {
                setHistory((prev) => [...prev, newEntry]);
                setIsProcessing(false);
                // Focus input after command
                setTimeout(() => inputRef.current?.focus(), 50);
            }, 100);
        },
        [input, isProcessing, processCommand, idCounter]
    );

    /* ------- KEYBOARD HANDLER ------- */
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleSubmit();
                return;
            }

            // Tab — autocomplete
            if (e.key === "Tab") {
                e.preventDefault();
                const current = input.trim().toLowerCase();
                if (!current) return;

                // Theme name autocomplete: "themes set <partial>"
                const themeSetPrefix = "themes set ";
                if (current.startsWith(themeSetPrefix)) {
                    const partial = current.slice(themeSetPrefix.length);
                    if (partial) {
                        const themeMatches = THEMES
                            .map((t) => t.name)
                            .filter((n) => n.startsWith(partial));
                        if (themeMatches.length === 1) {
                            setInput(`themes set ${themeMatches[0]}`);
                        } else if (themeMatches.length > 1) {
                            let prefix = themeMatches[0];
                            for (const m of themeMatches) {
                                while (!m.startsWith(prefix)) {
                                    prefix = prefix.slice(0, -1);
                                }
                            }
                            if (prefix.length > partial.length) {
                                setInput(`themes set ${prefix}`);
                            }
                        }
                    }
                    return;
                }

                // General command autocomplete
                const matches = AUTOCOMPLETE_COMMANDS.filter((c) =>
                    c.startsWith(current)
                );
                if (matches.length === 1) {
                    setInput(matches[0]);
                } else if (matches.length > 1) {
                    // Find longest common prefix
                    let prefix = matches[0];
                    for (const m of matches) {
                        while (!m.startsWith(prefix)) {
                            prefix = prefix.slice(0, -1);
                        }
                    }
                    if (prefix.length > current.length) {
                        setInput(prefix);
                    }
                }
                return;
            }

            // Arrow up — previous command
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (commandHistory.length === 0) return;
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }

            // Arrow down — next command
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex === -1) return;
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        },
        [handleSubmit, commandHistory, historyIndex, input]
    );

    /* ------- QUICK ACTION BUTTONS (Mobile) ------- */
    const quickActions = [
        { label: "Help", cmd: "help", icon: <HelpCircle size={16} /> },
        { label: "Projects", cmd: "projects", icon: <FolderGit2 size={16} /> },
        { label: "Skills", cmd: "skills", icon: <Layers size={16} /> },
        { label: "Contact", cmd: "contact", icon: <Phone size={16} /> },
        { label: "Resume", cmd: "resume", icon: <FileText size={16} /> },
        { label: "About", cmd: "about", icon: <User size={16} /> },
    ];

    /* ============================================
       RENDER
       ============================================ */
    /* ------- GLOBAL CLICK HANDLER — focus input unless modal is open ------- */
    const handleMainClick = useCallback(
        (e: React.MouseEvent) => {
            // Don't refocus if modal is open
            if (modalProject) return;
            // Don't refocus if they clicked an interactive element inside output
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button']")) return;
            inputRef.current?.focus();
        },
        [modalProject]
    );

    return (
        <main
            className="min-h-screen flex flex-col items-center justify-start p-4 md:p-6 lg:p-8 relative"
            style={{ background: "var(--bg)" }}
            onClick={handleMainClick}
        >
            {/* CRT Scanline Overlay */}
            <div className="crt-scanlines" aria-hidden="true" />

            {/* Project Modal */}
            <AnimatePresence>
                {modalProject && (
                    <ProjectModal
                        project={modalProject}
                        onClose={() => setModalProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Terminal Window */}
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="terminal-glass rounded-xl overflow-hidden min-h-[600px] flex flex-col theme-transition">
                    {/* Terminal Header */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
                        style={{
                            borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                            background: "color-mix(in srgb, var(--secondary) 60%, transparent)",
                        }}
                    >
                        {/* Traffic Lights */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        {/* Title */}
                        <div className="flex items-center gap-2 ml-2 text-sm" style={{ opacity: 0.7 }}>
                            <Terminal size={16} />
                            <span>arnav@portfolio ~ zsh</span>
                        </div>
                        {/* Theme Quick Toggle */}
                        <button
                            onClick={() => {
                                const idx = THEMES.findIndex((t) => t.name === currentTheme);
                                const next = THEMES[(idx + 1) % THEMES.length];
                                setTheme(next.name);
                            }}
                            className="ml-auto p-1.5 rounded-md transition-all hover:scale-110"
                            style={{
                                color: "var(--accent)",
                                background: "color-mix(in srgb, var(--fg) 10%, transparent)",
                            }}
                            title="Cycle theme"
                            aria-label="Cycle theme"
                        >
                            {currentTheme === "light" ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>

                    {/* Terminal Output Area */}
                    <div
                        ref={outputRef}
                        className="flex-1 overflow-y-auto p-4 md:p-6 text-sm md:text-base"
                        style={{ maxHeight: "calc(100vh - 200px)" }}
                    >
                        {/* Boot Sequence */}
                        <AnimatePresence>
                            {isBooting && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <pre
                                        className="text-xs md:text-sm whitespace-pre-wrap break-all text-glow"
                                        style={{ color: "var(--fg)" }}
                                    >
                                        {bootText}
                                        <span className="cursor-blink">█</span>
                                    </pre>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Command History */}
                        {!isBooting && (
                            <div className="space-y-4">
                                {/* Welcome (after boot) */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <pre
                                        className="text-xs md:text-sm whitespace-pre-wrap break-all text-glow mb-4"
                                        style={{ color: "var(--fg)" }}
                                    >
                                        {isMobile ? ASCII_BANNER_MOBILE : ASCII_BANNER_DESKTOP}
                                    </pre>
                                    <p className="mb-1" style={{ opacity: 0.7 }}>
                                        Welcome! Type <strong style={{ color: "var(--accent)" }}>help</strong> to see available commands.
                                    </p>
                                </motion.div>

                                {/* Rendered History */}
                                {history.map((entry) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-2"
                                    >
                                        {/* Command Line */}
                                        <div className="flex items-center gap-2">
                                            <span style={{ color: "var(--accent)", opacity: 0.7 }}>
                                                guest@portfolio:~$
                                            </span>
                                            <span className="font-medium">{entry.command}</span>
                                        </div>
                                        {/* Output */}
                                        {entry.output && (
                                            <div className="pl-0 md:pl-2 mt-1">{entry.output}</div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Current Input Line — real caret that moves with text */}
                                <div className="flex items-center gap-2">
                                    <span style={{ color: "var(--accent)", opacity: 0.7 }}>
                                        <ChevronRight size={16} className="inline" />
                                    </span>
                                    <span style={{ opacity: 0.7 }} className="hidden sm:inline">
                                        guest@portfolio:~$
                                    </span>
                                    {/* Visible text + blinking caret overlay */}
                                    <div className="flex-1 relative font-mono" style={{ minHeight: "1.5em" }}>
                                        {/* Visible typed text + caret */}
                                        <span style={{ color: "var(--fg)" }}>
                                            {input}
                                        </span>
                                        {/* Only show blinking cursor when input is focused */}
                                        <span
                                            className={inputFocused ? "cursor-blink" : ""}
                                            style={{ color: "var(--fg)", opacity: inputFocused ? 1 : 0.4 }}
                                        >█</span>
                                        {!input && !isProcessing && (
                                            <span className="absolute left-0 top-0 pointer-events-none" style={{ color: "var(--fg)", opacity: 0.3 }}>
                                                Type a command...
                                            </span>
                                        )}
                                        {/* Hidden input that captures keystrokes */}
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => setInputFocused(true)}
                                            onBlur={() => setInputFocused(false)}
                                            className="absolute inset-0 w-full h-full bg-transparent border-none outline-none caret-transparent font-mono opacity-0"
                                            style={{ color: "transparent" }}
                                            disabled={isProcessing}
                                            autoFocus
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            spellCheck={false}
                                            aria-label="Terminal command input"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Quick Actions */}
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2 lg:hidden">
                    {quickActions.map((action) => (
                        <button
                            key={action.cmd}
                            onClick={() => handleSubmit(action.cmd)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-mono transition-all hover:scale-105 active:scale-95"
                            style={{
                                borderColor: "color-mix(in srgb, var(--fg) 25%, transparent)",
                                color: "var(--fg)",
                                background: "color-mix(in srgb, var(--secondary) 50%, transparent)",
                            }}
                        >
                            {action.icon}
                            <span className="hidden sm:inline">{action.label}</span>
                            <span className="sm:hidden text-xs">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}
