import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Mail, 
  Smartphone, 
  Terminal, 
  Globe, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Database,
  Cpu,
  Sparkles,
  ArrowDown
} from "lucide-react";
import heroSuitPortrait from "./assets/rana-portrait.png";
import storyLoungePortrait from "./assets/img1.png";
import "./App.css";

// SVG Brand Icons
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [heroTextMode, setHeroTextMode] = useState("name"); // "name" | "portfolio"
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Clock in PKT (Pakistan Standard Time UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setHeroParallax({ x: offsetX * 14, y: offsetY * 8 });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("zohaik.muhammad@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const featurePillars = [
    {
      num: "01",
      icon: <Smartphone size={22} />,
      title: "MOBILE ENGINEERING",
      subtitle: "Flutter & React Native",
      desc: "Architecting buttery 60fps cross-platform iOS & Android mobile apps with Riverpod & clean domain state control.",
    },
    {
      num: "02",
      icon: <Terminal size={22} />,
      title: "BACKENDS & RESILIENT APIS",
      subtitle: "Laravel & ASP.NET Core",
      desc: "Designing high-throughput microservices, hardened authentication gateways, and optimized relational database schemas.",
    },
    {
      num: "03",
      icon: <Globe size={22} />,
      title: "FULL-STACK & DESKTOP POS",
      subtitle: "React & Electron Systems",
      desc: "Engineering zero-latency local-first desktop POS applications, real-time inventory ledgers, and reactive web interfaces.",
    },
    {
      num: "04",
      icon: <Layers size={22} />,
      title: "REAL-TIME TELEMETRY",
      subtitle: "Firestore & Cloud Sync",
      desc: "Live GPS driver dispatch, sub-second WebSocket / Firebase feeds, transactional payment pipelines, and cloud triggers.",
    },
  ];

  const projects = [
    {
      id: "01",
      edition: "MARKETPLACE ECOSYSTEM",
      title: "FIXIO",
      subtitle: "Multi-Category Rental & Commerce Platform",
      metric: "Real-time Telemetry & Search",
      desc: "A mission-critical mobile marketplace allowing users to rent, list, and buy tools, heavy equipment, and consumer electronics with instant Firestore sync and localized discovery.",
      architecture: "Clean Architecture + Feature-First Flutter Layering",
      challenges: [
        "Architected optimistic UI updates ensuring zero perceived latency during inventory search.",
        "Integrated dynamic rental duration calculations, security deposit holds, and user rating feeds.",
        "Implemented real-time Firestore query caching for instant mobile reload with minimal battery overhead."
      ],
      tags: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "Riverpod"],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      id: "02",
      edition: "ENTERPRISE DESKTOP POS",
      title: "AR SHANWARI HUJRA",
      subtitle: "Offline-First Restaurant POS & Inventory Engine",
      metric: "40% Quicker Order Processing",
      desc: "A high-volume enterprise desktop and local-network POS application engineered for continuous operations, cashier shifts, automated thermal kitchen printing, and SQLite persistence.",
      architecture: "Electron + React Desktop Client with Express Local Daemon",
      challenges: [
        "Guaranteed 100% offline uptime with local SQLite storage so cashiers never experience network pauses.",
        "Engineered automated kitchen ticket routing separating grill, tandoor, and beverage orders.",
        "Automated daily reconciliation ledgers and multi-tier manager access tokens."
      ],
      tags: ["React", "Electron", "Express.js", "SQLite", "Tailwind CSS", "Node.js"],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      id: "03",
      edition: "FLEET DISPATCH SYSTEM",
      title: "STB DRIVER",
      subtitle: "On-Demand Logistics & Live Dispatch Telemetry",
      metric: "Sub-Second Route Sync",
      desc: "A high-performance courier dispatch application featuring real-time GPS route telemetry, job acceptance queues, passenger state synchronization, and scalable RESTful API endpoints.",
      architecture: "Riverpod Reactive State + Laravel Backend Worker Queues",
      challenges: [
        "Maintained uninterrupted background location tracking with smooth bearing animations on Flutter maps.",
        "Engineered a resilient job dispatch queue handling concurrent rider bids with zero collision.",
        "Integrated push notification alerts with deep linking directly into active delivery tickets."
      ],
      tags: ["Flutter", "Riverpod", "Laravel", "MySQL", "Google Maps API", "WebSockets"],
      githubUrl: "https://github.com/RanaZohaik",
    },
  ];

  const experienceData = [
    {
      id: "01",
      role: "Mobile Application Developer",
      company: "Astapor Technologies",
      period: "2026 — PRESENT",
      type: "Full-Time / Contract",
      location: "Remote / Hybrid",
      summary:
        "Architecting cross-platform mobile solutions with Flutter and React Native. Spearheading clean Riverpod state patterns, offline-first caching routines, and seamless REST/GraphQL API integration.",
      highlights: [
        "Delivered production Flutter applications with sub-second cold starts and buttery 60fps animations.",
        "Integrated secure token authentication, payment SDKs, and push notification gateways.",
        "Standardized repository codebases with automated linting, unit testing, and Git flow best practices."
      ],
      skills: ["Flutter", "Dart", "React Native", "Riverpod", "REST APIs", "Git", "CI/CD"],
    },
    {
      id: "02",
      role: "Software Developer & Systems Lead",
      company: "AR Shanwari Hujra",
      period: "2026",
      type: "Lead / Enterprise",
      location: "On-Site / Enterprise",
      summary:
        "Designed and engineered the enterprise point-of-sale, inventory control, and staff workflow platform. Led developer operations while directly modernizing floor and cashier processes.",
      highlights: [
        "Engineered a local Electron & React POS running embedded SQLite for zero-downtime offline transactions.",
        "Streamlined order processing throughput by 40% and eliminated end-of-day revenue reconciliation discrepancies.",
        "Configured multi-terminal thermal printing networks for instant kitchen order dispatch."
      ],
      skills: ["React", "Electron", "Express.js", "SQLite", "System Architecture", "Leadership"],
    },
    {
      id: "03",
      role: "Mobile Development Intern",
      company: "Techno Fortress",
      period: "2025 — 2026",
      type: "Internship",
      location: "On-Site",
      summary:
        "Collaborated with senior engineering squads on client-facing mobile applications, automated regression testing, and agile sprint deliveries.",
      highlights: [
        "Authored modular UI widgets and API client services for commercial client applications.",
        "Assisted in debugging state management issues and memory leaks across low-spec Android devices.",
        "Sharpened expertise in industry-standard code review cycles and production deployment pipelines."
      ],
      skills: ["Flutter", "Dart", "Firebase", "API Integration", "Agile / Scrum"],
    },
  ];

  const technicalArsenal = [
    {
      category: "MOBILE ECOSYSTEM",
      icon: <Smartphone size={18} />,
      items: ["Flutter", "Dart", "React Native", "Riverpod", "Bloc", "Native Android/iOS Bridge", "Offline Cache Sync"],
    },
    {
      category: "BACKEND & DISTRIBUTED APIS",
      icon: <Terminal size={18} />,
      items: ["Laravel", "ASP.NET Core", "Express.js", "RESTful Architecture", "JWT Auth", "Microservices"],
    },
    {
      category: "DATABASES & CLOUD",
      icon: <Database size={18} />,
      items: ["Firebase", "Firestore", "SQLite", "MySQL", "Cloud Functions", "Push Notifications"],
    },
    {
      category: "WEB & DESKTOP PLATFORMS",
      icon: <Code2 size={18} />,
      items: ["React 19", "Electron", "JavaScript / ES6+", "Vite", "Tailwind CSS", "HTML5 & CSS3"],
    },
  ];

  return (
    <>
      {/* Subtle Cinematic Film Grain Texture */}
      <div className="film-grain" />

      {/* Atmospheric Cursor Light Glow */}
      <div
        className="cursor-atmospheric-light"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* ============================================================
          TOP NAVIGATION BAR (Ultra-Clean Luxury Editorial)
          ============================================================ */}
      <header className={`cinema-nav ${scrolled ? "cinema-nav-scrolled" : ""}`}>
        <a href="#hero" className="cinema-brand">
          <span className="brand-dot" />
          <span className="brand-name">RANA ZOHAIK</span>
          <span className="brand-badge">EDITION '26</span>
        </a>

        <nav className="cinema-nav-links">
          <a href="#hero" className="cinema-nav-link">Overview</a>
          <a href="#about" className="cinema-nav-link">About</a>
          <a href="#work" className="cinema-nav-link">Selected Works</a>
          <a href="#experience" className="cinema-nav-link">Trajectory</a>
          <a href="#contact" className="cinema-nav-link">Contact</a>
        </nav>

        <div className="cinema-nav-right">
          <div className="nav-time-badge" title="Pakistan Standard Time">
            <span className="live-clock-dot" />
            <span className="clock-digits">{currentTime || "PKT UTC+5"}</span>
          </div>

          <a href="#contact" className="nav-cta-btn">
            Let's Talk <ArrowUpRight size={14} />
          </a>

          <button
            className="cinema-menu-btn"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title">NAVIGATION</span>
              <button onClick={() => setMobileMenuOpen(false)} className="mobile-close-btn">
                <X size={22} />
              </button>
            </div>
            <a href="#hero" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>01 // Overview</a>
            <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>02 // Philosophy & About</a>
            <a href="#work" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>03 // Selected Works</a>
            <a href="#experience" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>04 // Trajectory & Experience</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>05 // Get In Touch</a>
            <div className="mobile-socials-row">
              <a href="https://github.com/RanaZohaik" target="_blank" rel="noreferrer"><GithubIcon size={20} /></a>
              <a href="https://www.linkedin.com/in/muhammad-zohaik-069553373/" target="_blank" rel="noreferrer"><LinkedinIcon size={20} /></a>
              <a href="https://www.instagram.com/zohaikrana/" target="_blank" rel="noreferrer"><InstagramIcon size={20} /></a>
              <a href="mailto:zohaik.muhammad@gmail.com"><Mail size={20} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ============================================================
            HERO SECTION — EXACT EDITORIAL ARCHITECTURE FROM REFERENCE
            (Rounded Editorial Card, Cutout Subject, Background Cream Typography,
             and Foreground Stroke Outline Crossing Subject)
            ============================================================ */}
        <section id="hero" className="editorial-hero-wrapper">
          <div className="editorial-hero-card">
            {/* Atmospheric Backlight / Ambient Warm Aura */}
            <div
              className="hero-warm-glow"
              style={{
                transform: `translate(calc(-50% + ${heroParallax.x * 0.4}px), calc(-50% + ${heroParallax.y * 0.3}px))`,
              }}
            />

            {/* Top Bar (Exact composition like reference: Top-Left role tag, Top-Right slender arrow) */}
            <div className="hero-card-top-bar">
              <div className="hero-role-pill">
                <span className="hero-role-dot" />
                <span className="hero-role-text">MOBILE & FULL-STACK ARCHITECT</span>
              </div>

              {/* Title Mode Switcher: Click to switch between 'RANA ZOHAIK' and 'PORTFOLIO' */}
              <div className="hero-title-toggle-pill" title="Toggle Hero Display Word">
                <button
                  type="button"
                  className={`toggle-btn ${heroTextMode === "name" ? "active" : ""}`}
                  onClick={() => setHeroTextMode("name")}
                >
                  RANA ZOHAIK
                </button>
                <span className="toggle-separator">/</span>
                <button
                  type="button"
                  className={`toggle-btn ${heroTextMode === "portfolio" ? "active" : ""}`}
                  onClick={() => setHeroTextMode("portfolio")}
                >
                  PORTFOLIO
                </button>
              </div>

              <a href="#contact" className="hero-top-arrow-btn" aria-label="Explore or Connect" title="Connect Directly">
                <span className="arrow-caption">CONNECT</span>
                <span className="arrow-symbol">⟶</span>
              </a>
            </div>

            {/* Centerpiece 3D Depth Stage */}
            <div className="hero-centerpiece-stage">
              {/* LAYER 1: Solid Cream Display Typography Behind Rana */}
              <div
                className="hero-typography-layer hero-solid-layer"
                style={{
                  transform: `translate(${heroParallax.x * -0.25}px, ${heroParallax.y * -0.15}px)`,
                }}
              >
                <h1 className="hero-giant-word">
                  {heroTextMode === "name" ? "RANA ZOHAIK" : "PORTFOLIO"}
                </h1>
              </div>

              {/* LAYER 2: Suited Transparent Cutout Portrait of Rana */}
              <div className="hero-subject-frame">
                <img
                  src={heroSuitPortrait}
                  alt="Rana Zohaik - Mobile & Full-Stack Developer"
                  className="hero-subject-img"
                  style={{
                    transform: `translate(${heroParallax.x * 0.35}px, ${heroParallax.y * 0.25}px)`,
                  }}
                />
              </div>

              {/* LAYER 3: Exact Stroke Outline Typography Over Rana (Creates the 3D pass-through outline effect!) */}
              <div
                className="hero-typography-layer hero-stroke-layer"
                aria-hidden="true"
                style={{
                  transform: `translate(${heroParallax.x * -0.25}px, ${heroParallax.y * -0.15}px)`,
                }}
              >
                <div className="hero-giant-word stroke-word">
                  {heroTextMode === "name" ? "RANA ZOHAIK" : "PORTFOLIO"}
                </div>
              </div>

              {/* Bottom Blend Floor Gradient */}
              <div className="hero-card-floor-blend" />
            </div>

            {/* Bottom Bar (Exact like reference: Bottom-Left name, Bottom-Right availability) */}
            <div className="hero-card-bottom-bar">
              <div className="hero-author-identity">
                <span className="author-name">Rana Zohaik</span>
                <span className="author-subtext">Software Engineer • Lahore, PK</span>
              </div>

              <a href="#about" className="hero-scroll-prompt">
                <span className="scroll-arrow-icon">↓</span>
                <span className="scroll-prompt-text">EXPLORE DOSSIER</span>
              </a>

              <div className="hero-status-pill">
                <span className="status-live-beacon" />
                <span className="status-label">OPEN FOR WORLDWIDE CONTRACTS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CONTINUOUS LUXURY MARQUEE TICKER
            ============================================================ */}
        <section className="luxury-ticker-strip">
          <div className="ticker-track">
            <div className="ticker-content">
              <span>CROSS-PLATFORM MOBILE (FLUTTER & REACT NATIVE)</span>
              <span className="ticker-star">✦</span>
              <span>ENTERPRISE POS SYSTEMS (REACT & ELECTRON)</span>
              <span className="ticker-star">✦</span>
              <span>RESILIENT BACKENDS (LARAVEL & ASP.NET CORE)</span>
              <span className="ticker-star">✦</span>
              <span>REAL-TIME TELEMETRY & CLOUD FUNCTIONS</span>
              <span className="ticker-star">✦</span>
              <span>RIVERPOD & CLEAN ARCHITECTURE</span>
              <span className="ticker-star">✦</span>
            </div>
            <div className="ticker-content" aria-hidden="true">
              <span>CROSS-PLATFORM MOBILE (FLUTTER & REACT NATIVE)</span>
              <span className="ticker-star">✦</span>
              <span>ENTERPRISE POS SYSTEMS (REACT & ELECTRON)</span>
              <span className="ticker-star">✦</span>
              <span>RESILIENT BACKENDS (LARAVEL & ASP.NET CORE)</span>
              <span className="ticker-star">✦</span>
              <span>REAL-TIME TELEMETRY & CLOUD FUNCTIONS</span>
              <span className="ticker-star">✦</span>
              <span>RIVERPOD & CLEAN ARCHITECTURE</span>
              <span className="ticker-star">✦</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            FEATURE PILLARS / CAPABILITY QUADRANT
            ============================================================ */}
        <section className="pillars-section">
          <div className="pillars-grid">
            {featurePillars.map((pill) => (
              <div key={pill.num} className="pillar-card">
                <div className="pillar-header">
                  <span className="pillar-number">{pill.num} // DOMAIN</span>
                  <div className="pillar-icon-box">{pill.icon}</div>
                </div>
                <h3 className="pillar-title">{pill.title}</h3>
                <div className="pillar-subtitle">{pill.subtitle}</div>
                <p className="pillar-desc">{pill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            ABOUT / PHILOSOPHY SPREAD (Editorial Magazine Layout)
            ============================================================ */}
        <section id="about" className="editorial-about-section">
          <div className="about-grid-spread">
            <div className="about-narrative-col">
              <div className="section-eyebrow">// PHILOSOPHY & CRAFT</div>
              <h2 className="about-monumental-heading">
                PRECISION.<br />
                SCALE.<br />
                CRAFTSMANSHIP.
              </h2>
              <p className="about-lead-para">
                I am a Software Developer driven by a singular obsession: turning intricate business requirements into elegant, high-throughput software architectures.
              </p>
              <p className="about-secondary-para">
                From sub-second cross-platform mobile apps engineered with Flutter and React Native to zero-downtime offline point-of-sale systems built with Electron and SQLite, I bridge the gap between aesthetic perfection and rock-solid system stability.
              </p>

              {/* Key Metrics Quadrant */}
              <div className="about-stats-grid">
                <div className="stat-card">
                  <div className="stat-value">3+</div>
                  <div className="stat-label">YEARS DEV EXPERIENCE</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">10+</div>
                  <div className="stat-label">PRODUCTION RELEASES</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">60 FPS</div>
                  <div className="stat-label">NATIVE FLUIDITY</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">99.9%</div>
                  <div className="stat-label">UPTIME ARCHITECTURE</div>
                </div>
              </div>

              {/* Action Link */}
              <div style={{ marginTop: "2.5rem" }}>
                <a href="#work" className="editorial-pill-btn">
                  Explore Selected Works <ChevronRight size={16} />
                </a>
              </div>
            </div>

            <div className="about-portrait-col">
              <div className="about-portrait-wrapper">
                <img
                  src={storyLoungePortrait}
                  alt="Rana Zohaik in Studio"
                  className="about-portrait-img"
                />
                <div className="portrait-corner-badge">
                  <span className="badge-coords">31.5204° N, 74.3587° E</span>
                  <span className="badge-role">RANA ZOHAIK — DEVELOPER</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TECHNICAL ARSENAL (Categorized Grid)
            ============================================================ */}
        <section className="arsenal-section">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow">// ARCHITECTURAL STACK</div>
              <h2 className="section-monumental-title">TECHNICAL ARSENAL</h2>
            </div>
            <div className="section-meta-text">
              PRODUCTION-HARDENED TOOLS & FRAMEWORKS
            </div>
          </div>

          <div className="arsenal-grid">
            {technicalArsenal.map((category, idx) => (
              <div key={idx} className="arsenal-card">
                <div className="arsenal-category-header">
                  <div className="arsenal-icon-box">{category.icon}</div>
                  <h3 className="arsenal-category-name">{category.category}</h3>
                </div>
                <div className="arsenal-tags-cloud">
                  {category.items.map((tech) => (
                    <span key={tech} className="arsenal-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SELECTED WORKS (Featured Projects with Modal Case Studies)
            ============================================================ */}
        <section id="work" className="editorial-work-section">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow">// CURATED DOSSIER</div>
              <h2 className="section-monumental-title">SELECTED WORKS</h2>
            </div>
            <div className="section-meta-text">
              ENTERPRISE & CONSUMER DELIVERABLES
            </div>
          </div>

          <div className="works-editorial-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="work-editorial-card">
                <div className="work-preview-banner">
                  <div className="banner-grid-overlay" />
                  <span className="work-edition-tag">{proj.edition}</span>
                  <div className="work-watermark-title">{proj.title}</div>
                  <div className="work-metric-pill">
                    <Sparkles size={13} /> {proj.metric}
                  </div>
                </div>

                <div className="work-card-body">
                  <div className="work-header-line">
                    <span className="work-index-tag">{proj.id} // CASE STUDY</span>
                    <h3 className="work-title">{proj.title}</h3>
                  </div>

                  <div className="work-subtitle">{proj.subtitle}</div>
                  <p className="work-description">{proj.desc}</p>

                  <div className="work-tags-row">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="tech-badge-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="work-card-bottom-actions">
                    <button
                      type="button"
                      className="case-study-open-btn"
                      onClick={() => setSelectedProject(proj)}
                    >
                      View Case Study <ChevronRight size={15} />
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-external-icon-btn"
                      title="GitHub Profile"
                    >
                      <GithubIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            TRAJECTORY & EXPERIENCE SECTION
            ============================================================ */}
        <section id="experience" className="editorial-exp-section">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow">// PROFESSIONAL CHRONOLOGY</div>
              <h2 className="section-monumental-title">CAREER TRAJECTORY</h2>
            </div>
            <div className="section-meta-text">
              ROLES, IMPACT & CONTRIBUTIONS
            </div>
          </div>

          <div className="exp-timeline-flow">
            {experienceData.map((exp) => (
              <div key={exp.id} className="exp-timeline-card">
                <div className="exp-card-top">
                  <div>
                    <span className="exp-id-pill">{exp.id} // APPOINTMENT</span>
                    <h3 className="exp-role-title">{exp.role}</h3>
                    <div className="exp-company-line">
                      <span className="company-name">{exp.company}</span>
                      <span className="bullet-sep">•</span>
                      <span className="company-type">{exp.type}</span>
                      <span className="bullet-sep">•</span>
                      <span className="company-location">{exp.location}</span>
                    </div>
                  </div>

                  <div className="exp-period-badge">
                    {exp.period}
                  </div>
                </div>

                <p className="exp-summary-text">{exp.summary}</p>

                <div className="exp-achievements-box">
                  <div className="achievements-label">DELIVERED IMPACT & TECHNICAL HIGHLIGHTS</div>
                  <ul className="achievements-list">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="achievement-item">
                        <span className="achievement-arrow">⟶</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exp-skills-row">
                  {exp.skills.map((s) => (
                    <span key={s} className="exp-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            EDITORIAL FINALE & CONTACT (Luxury Closure)
            ============================================================ */}
        <section id="contact" className="editorial-contact-section">
          <div className="contact-canvas">
            <div className="section-eyebrow">// INITIATE CONTACT</div>
            <h2 className="contact-giant-title">
              LET'S BUILD<br />
              EXTRAORDINARY.
            </h2>
            <p className="contact-subtext">
              Whether you are architecting a high-performance cross-platform mobile application, an enterprise desktop POS, or a resilient backend service — let's bring it to life with world-class engineering.
            </p>

            {/* Direct Copyable Email Button */}
            <div className="contact-primary-action-wrap">
              <button
                type="button"
                className="copy-email-mega-btn"
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                <span className="email-text">zohaik.muhammad@gmail.com</span>
                <span className="copy-icon-wrap">
                  {copiedEmail ? <Check size={18} color="#000" /> : <Copy size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    className="copied-toast"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    COPIED TO CLIPBOARD ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Channels Quadrant */}
            <div className="contact-channels-grid">
              <a
                href="https://github.com/RanaZohaik"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
              >
                <div className="channel-icon-circle"><GithubIcon size={18} /></div>
                <div>
                  <div className="channel-name">GitHub</div>
                  <div className="channel-handle">/RanaZohaik</div>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-zohaik-069553373/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
              >
                <div className="channel-icon-circle"><LinkedinIcon size={18} /></div>
                <div>
                  <div className="channel-name">LinkedIn</div>
                  <div className="channel-handle">Muhammad Zohaik</div>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://www.instagram.com/zohaikrana/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
              >
                <div className="channel-icon-circle"><InstagramIcon size={18} /></div>
                <div>
                  <div className="channel-name">Instagram</div>
                  <div className="channel-handle">@zohaikrana</div>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="mailto:zohaik.muhammad@gmail.com"
                className="channel-card"
              >
                <div className="channel-icon-circle"><Mail size={18} /></div>
                <div>
                  <div className="channel-name">Direct Mail</div>
                  <div className="channel-handle">Open Mail Client</div>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>
            </div>

            {/* Bottom Footer Credits */}
            <div className="editorial-footer-bar">
              <div className="footer-left">
                <strong>RANA ZOHAIK</strong> — MOBILE & FULL-STACK ENGINEER
              </div>
              <div className="footer-center">
                LAHORE, PAKISTAN • {currentTime || "PKT UTC+5"}
              </div>
              <div className="footer-right">
                <a href="#hero" className="back-to-top-btn">
                  BACK TO APEX ↑
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          INTERACTIVE PROJECT CASE STUDY MODAL
          ============================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-window"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-edition-badge">{selectedProject.edition}</span>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <div className="modal-subtitle">{selectedProject.subtitle}</div>
                </div>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="modal-body-scroll">
                <div className="modal-overview-block">
                  <h4 className="modal-section-title">// SYSTEM OVERVIEW</h4>
                  <p className="modal-desc">{selectedProject.desc}</p>
                </div>

                <div className="modal-arch-block">
                  <h4 className="modal-section-title">// ARCHITECTURE & PATTERN</h4>
                  <div className="modal-arch-badge">{selectedProject.architecture}</div>
                </div>

                <div className="modal-challenges-block">
                  <h4 className="modal-section-title">// KEY ENGINEERING ACCOMPLISHMENTS</h4>
                  <ul className="modal-bullets-list">
                    {selectedProject.challenges.map((c, i) => (
                      <li key={i} className="modal-bullet-item">
                        <span className="modal-bullet-indicator">✦</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-tags-block">
                  <h4 className="modal-section-title">// TECHNOLOGIES EMPLOYED</h4>
                  <div className="modal-tags-row">
                    {selectedProject.tags.map((t) => (
                      <span key={t} className="modal-tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-github-btn"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
                <a
                  href="#contact"
                  className="modal-inquire-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Inquire System Architecture <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
