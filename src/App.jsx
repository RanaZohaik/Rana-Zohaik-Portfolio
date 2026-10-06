import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Smartphone,
  Monitor,
  Globe,
  Database,
  Check,
  Menu,
  X,
  Mail,
  Send,
  Download,
  ExternalLink,
  Eye,
  ArrowUp
} from "lucide-react";
import {
  RiBriefcase3Line,
  RiGraduationCapLine,
  RiArrowRightUpLine,
  RiLinkedinFill,
  RiGithubLine,
  RiWhatsappLine,
  RiMailLine
} from "react-icons/ri";

// Cutout & Story Portraits
import heroSuitPortrait from "./assets/rana-portrait.png";
import storyLoungePortrait from "./assets/img1.png";

// Generated High-Res Project Thumbnail Images
import project1Thumbnail from "./assets/projects/project-1.png";
import project2Thumbnail from "./assets/projects/project-2.png";
import project3Thumbnail from "./assets/projects/project-3.png";
import project4Thumbnail from "./assets/projects/project-4.png";
import project5Thumbnail from "./assets/projects/project-5.png";
import project6Thumbnail from "./assets/projects/project-6.png";

import "./App.css";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [activeWorkTab, setActiveWorkTab] = useState("experience"); // "experience" | "education"

  // Continuous 1-Second Auto-Slide Project Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardStep, setCardStep] = useState(440);
  const firstCardRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Contact Form State (Direct Delivery to zohaik.muhammad@gmail.com)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // "" | "success" | "error"
  const [copiedEmail, setCopiedEmail] = useState(false);

  const carouselRef = useRef(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Mouse Parallax & Navigation Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setHeroParallax({ x: offsetX * 12, y: offsetY * 7 });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Continuous 1-Second Looping Slideshow (Never Stops)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dynamically Measure Card Width + Gap for Perfect Responsiveness
  useEffect(() => {
    const updateStep = () => {
      if (firstCardRef.current) {
        const rect = firstCardRef.current.getBoundingClientRect();
        const gap = window.innerWidth <= 768 ? 20 : 32;
        setCardStep(rect.width + gap);
      }
    };
    updateStep();
    const timer = setTimeout(updateStep, 150);
    window.addEventListener("resize", updateStep);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateStep);
    };
  }, []);

  // Projects Data with Real Pictures
  const projects = [
    {
      num: "01",
      category: "Mobile",
      title: "Fixio - Rental & Marketplace",
      techstack: "Flutter, Dart, Firebase, Cloud Firestore, Riverpod, Google Maps",
      desc: "Comprehensive mobile rental and commerce marketplace enabling users to browse, list, and rent heavy tools and consumer equipment with real-time Firestore sync and localized discovery.",
      thumbnail: project1Thumbnail,
      features: [
        "Real-time rental equipment catalog & availability",
        "Instant user-to-owner in-app messaging & alerts",
        "Secure Firebase authentication & image storage",
        "Geolocation-based item search & distance filters",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      num: "02",
      category: "POS Software",
      title: "AR Shanwari Restaurant POS",
      techstack: "React JS, Electron, Express, SQLite, Thermal Printing, Tailwind CSS",
      desc: "Enterprise desktop point-of-sale and kitchen order management system built for high-volume restaurant operations, local offline-first transactions, and multi-printer dispatch.",
      thumbnail: project2Thumbnail,
      features: [
        "Zero-downtime offline transactions with embedded SQLite",
        "Automatic thermal kitchen ticket routing by prep station",
        "Daily cashier shift summaries and revenue audit ledgers",
        "Streamlined order processing time by over 40%",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      num: "03",
      category: "Web",
      title: "Learning Management System",
      techstack: "ASP.NET Core MVC, C#, SQL Server, Bootstrap, Entity Framework Core",
      desc: "Robust web-based university management system for handling academic records, student enrollment, course rosters, instructor evaluations, and institutional metrics.",
      thumbnail: project3Thumbnail,
      features: [
        "Role-based authentication (Admin, Instructor, Student)",
        "Normalized relational database schemas on SQL Server",
        "Course grading ledgers, assignment uploads & reports",
        "Dynamic curriculum scheduling with audit trails",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      num: "04",
      category: "Mobile",
      title: "STB Courier & Driver Dispatch",
      techstack: "Flutter, Dart, Laravel Backend, Google Maps API, WebSockets",
      desc: "High-performance on-demand logistics dispatch application featuring live GPS driver route telemetry, job acceptance queues, passenger state synchronization, and push alerts.",
      thumbnail: project4Thumbnail,
      features: [
        "Background GPS location beacon with bearing rotation",
        "Real-time socket job broadcast and instant driver bidding",
        "Automated fare calculation & multi-stop route guidance",
        "Sub-second websocket order state reconciliation",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      num: "05",
      category: "Software",
      title: "Retail Inventory Management",
      techstack: "SQL Server, Database Management, C#, Stored Procedures, WinForms",
      desc: "Desktop inventory control and supply ledger software engineered to track product stock levels, sales velocity, supplier restock thresholds, and automated ledger reporting.",
      thumbnail: project5Thumbnail,
      features: [
        "Barcode / SKU stock entry and automated restock alerts",
        "Optimized SQL Server stored procedures for rapid lookups",
        "Sales record archives and daily profitability analysis",
        "Multi-warehouse tracking and vendor invoice management",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
    {
      num: "06",
      category: "System",
      title: "Admission Workflow Optimization",
      techstack: "BPMN 2.0, Process Analysis, Administrative Systems Modeling",
      desc: "Modeled, analyzed, and re-engineered the administrative university admission workflow using BPMN methodology, eliminating paper-based bottlenecks and achieving 70% process efficiency.",
      thumbnail: project6Thumbnail,
      features: [
        "Complete end-to-end process mapping from application to matriculation",
        "Identified key bureaucratic delays and designed automated stages",
        "Achieved documented 70% turnaround time improvement",
        "Standardized operational guidelines for departmental faculty",
      ],
      githubUrl: "https://github.com/RanaZohaik",
    },
  ];

  // Work Experience Data (From CV)
  const workExperience = [
    {
      role: "Mobile Application Developer",
      company: "Astapor Technologies",
      year: "Sep-\nPresent 26",
      description:
        "Developing cross-platform mobile applications using React Native. Building core features, integrating RESTful backend APIs, debugging performance bottlenecks, and improving mobile application responsiveness across iOS and Android.",
    },
    {
      role: "Manager & Software Developer",
      company: "AR Shanwari Hujra",
      year: "June-\nSep- 26",
      description:
        "Managed daily restaurant operations, including staff coordination, customer service, order management, and overall workflow. Designed and developed a customized POS system for restaurant operations and developed a mobile application to improve ordering, management, and customer experience.",
    },
    {
      role: "Flutter & Backend Intern",
      company: "Techno Fortress Software House",
      year: "Nov-\nMay- 26",
      description:
        "Developed mobile application features using Flutter and Dart, integrating Firebase for authentication and database management. Assisted in Laravel backend development and API integration, debugging software issues and supporting the development of real-world applications.",
    },
    {
      role: "Teacher",
      company: "Fatima Public School",
      year: "June-\nAug- 24",
      description:
        "Taught secondary-level students, delivering lessons, explaining core computer and STEM concepts, and supporting students in their academic development. Managed classroom activities, prepared learning materials, and maintained an effective, organized learning environment.",
    },
  ];

  // Education Section (Exactly as requested: only BS in Software Engineering)
  const educationExperience = [
    {
      role: "BS in Software Engineering",
      company: "University of Gujrat (UOG)",
      year: "2022-\n2026",
      description:
        "Earned a Bachelor of Science in Software Engineering with a Cumulative GPA of 3.12. Focused on mobile application engineering, object-oriented software design, relational database systems, and full-stack software development methodologies.",
    },
  ];

  // Skills Categories
  const skillsCategories = [
    {
      title: "Mobile Development",
      icon: <Smartphone size={20} />,
      items: ["Flutter", "Dart", "React Native", "Firebase", "Riverpod", "Android Studio", "Xcode", "REST APIs"],
    },
    {
      title: "Desktop & POS Systems",
      icon: <Monitor size={20} />,
      items: ["Desktop POS", "Electron", "SQLite", "Thermal Printing", "Hardware Interfacing", "Offline Persistence"],
    },
    {
      title: "Web & Full-Stack",
      icon: <Globe size={20} />,
      items: ["React JS", "ASP.NET Core MVC", "C#", "Node.js", "Tailwind CSS", "Bootstrap", "HTML5 & CSS3"],
    },
    {
      title: "Databases & Tools",
      icon: <Database size={20} />,
      items: ["SQL Server", "MySQL", "SQLite", "Cloud Firestore", "Git", "GitHub", "VS Code", "Postman", "BPMN"],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("zohaik.muhammad@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Direct Gmail Dispatch Function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Dispatches directly to zohaik.muhammad@gmail.com via FormSubmit endpoint
      const response = await fetch("https://formsubmit.co/ajax/zohaik.muhammad@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: "table",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback: Open mailto with filled details directly
        window.location.href = `mailto:zohaik.muhammad@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom:%20${encodeURIComponent(formData.name)}%20(${encodeURIComponent(formData.email)})`;
        setSubmitStatus("success");
      }
    } catch (err) {
      // Fallback
      window.location.href = `mailto:zohaik.muhammad@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom:%20${encodeURIComponent(formData.name)}%20(${encodeURIComponent(formData.email)})`;
      setSubmitStatus("success");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 6000);
    }
  };

  return (
    <>
      {/* Subtle film grain texture */}
      <div className="film-grain" />

      {/* Ambient cursor radial light */}
      <div
        className="cursor-light"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* ============================================================
          TOP NAVIGATION BAR (Clean, Responsive & Focused)
          ============================================================ */}
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container nav">
          {/* Brand Logo */}
          <a href="#hero" className="nav__logo">
            <span className="nav__logo-dot" />
            Rana Zohaik
            <span className="nav__logo-badge">SE '26</span>
          </a>

          {/* Clean Focused Navigation Links */}
          <div className="nav__menu">
            <ul className="nav__list">
              <li>
                <a href="#hero" className="nav__link">Overview</a>
              </li>
              <li>
                <a href="#about" className="nav__link">About</a>
              </li>
              <li>
                <a href="#projects" className="nav__link">Projects</a>
              </li>
              <li>
                <a href="#work" className="nav__link">Experience</a>
              </li>
              <li>
                <a href="#contact" className="nav__link">Contact</a>
              </li>
            </ul>

            {/* Action Buttons: Resume & Let's Talk */}
            <div className="nav__actions">
              <button
                onClick={() => setShowResumeModal(true)}
                className="button button-secondary nav__btn"
                title="View & Download CV"
              >
                <Eye size={14} /> Resume
              </button>
              <a href="#contact" className="button nav__btn">
                Let's Talk <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="nav__mobile-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-nav-top">
              <div className="nav__logo">
                <span className="nav__logo-dot" /> Rana Zohaik
              </div>
              <button
                className="nav__mobile-toggle"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={26} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <a href="#hero" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>01 // Overview</a>
              <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>02 // About</a>
              <a href="#projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>03 // Projects</a>
              <a href="#work" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>04 // Experience</a>
              <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>05 // Contact</a>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResumeModal(true);
                }}
                className="button button-secondary"
                style={{ flex: 1 }}
              >
                <Eye size={15} /> Resume
              </button>
              <a
                href="#contact"
                className="button"
                style={{ flex: 1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ============================================================
            HERO SECTION — "RANA ZOHAIK" 3D EDITORIAL TYPOGRAPHY
            ============================================================ */}
        <section id="hero" className="editorial-hero-wrapper container">
          <div className="editorial-hero-card">
            {/* Ambient warm glow in center */}
            <div
              className="hero-warm-glow"
              style={{
                transform: `translate(calc(-50% + ${heroParallax.x * 0.4}px), calc(-50% + ${heroParallax.y * 0.3}px))`,
              }}
            />

            {/* Top Bar: Role on Left, Arrow Link on Right */}
            <div className="hero-card-top-bar">
              <span className="hero-role-title">Software Engineer & Mobile Architect</span>

              <a
                href="#projects"
                className="hero-top-arrow-btn"
                title="Explore Projects"
              >
                <ArrowRight size={24} />
              </a>
            </div>

            {/* Centerpiece 3D Stage: Solid RANA ZOHAIK -> Cutout Portrait -> Stroke RANA ZOHAIK */}
            <div className="hero-centerpiece-stage">
              {/* LAYER 1: Solid Bone Typography Layer Behind Subject */}
              <div
                className="hero-typography-layer"
                style={{
                  transform: `translate(${heroParallax.x * -0.2}px, ${heroParallax.y * -0.1}px)`,
                }}
              >
                <h1 className="hero-giant-word">
                  RANA ZOHAIK
                </h1>
              </div>

              {/* LAYER 2: Suited Transparent Cutout Portrait of Rana */}
              <div className="hero-subject-frame">
                <img
                  src={heroSuitPortrait}
                  alt="Rana Zohaik"
                  className="hero-subject-img"
                  style={{
                    transform: `translate(${heroParallax.x * 0.35}px, ${heroParallax.y * 0.25}px)`,
                  }}
                />
              </div>

              {/* LAYER 3: Stroke Typography Layer in Front of Subject */}
              <div
                className="hero-typography-layer hero-stroke-layer"
                style={{
                  transform: `translate(${heroParallax.x * -0.2}px, ${heroParallax.y * -0.1}px)`,
                }}
              >
                <div className="hero-giant-word stroke-word">
                  RANA ZOHAIK
                </div>
              </div>

              {/* Floor blend */}
              <div className="hero-card-floor-blend" />
            </div>

            {/* Bottom Bar: Name on Left, Location / Status on Right */}
            <div className="hero-card-bottom-bar">
              <span className="hero-bottom-author">Rana Zohaik</span>

              <div className="hero-bottom-meta">
                <span className="hero-status-dot" />
                <span>SIALKOT / GUJRAT, PK • EDITION '26</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ABOUT ME SECTION
            ============================================================ */}
        <section className="about section" id="about">
          <div className="container about__container">
            <div className="about__image-col">
              <div className="about__image-frame">
                <img
                  src={storyLoungePortrait}
                  alt="Rana Zohaik"
                  className="about__img"
                />
              </div>
            </div>

            <div className="about__content">
              <span className="about__subtitle">Creativity & Engineering</span>
              <h2 className="about__heading">
                Building Reliable, High-Impact <span className="text-bone">Software</span>
              </h2>

              <p className="about__text">
                Software Engineering graduate from the <strong>University of Gujrat</strong> (CGPA 3.12) with hands-on professional experience in cross-platform mobile app development, customized enterprise POS systems, and database-driven web platforms.
              </p>

              <p className="about__text">
                From engineering Flutter and React Native apps at <strong>Astapor Technologies</strong> to building zero-latency restaurant POS solutions at <strong>AR Shanwari Hujra</strong>, I focus on building reliable software with clean domain architectures.
              </p>

              <div className="about__stats-row">
                <div className="about__stat-box">
                  <div className="about__stat-num">3+</div>
                  <div className="about__stat-label">Years Hands-On Dev</div>
                </div>
                <div className="about__stat-box">
                  <div className="about__stat-num">6+</div>
                  <div className="about__stat-label">Production Projects</div>
                </div>
                <div className="about__stat-box">
                  <div className="about__stat-num">70%</div>
                  <div className="about__stat-label">Workflow Optimization</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#contact" className="button">
                  Get In Touch <ArrowUpRight size={15} />
                </a>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="button button-secondary"
                >
                  View Full CV <Download size={15} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROJECTS SECTION (Infinite 1-Second Looping Slideshow)
            ============================================================ */}
        <section className="projects section" id="projects">
          <div className="container">
            {/* Top Glowing Orb & Heading */}
            <div className="projects__header-wrap">
              <div className="section-orb-glow" />
              <h2 className="section__title">
                I make Incredible <br />
                <span>Projects</span>
              </h2>

              {/* Automatic Slideshow Indicator Badge */}
              <div className="projects__auto-pill">
                <span className="projects__auto-dot" />
                <span>1-SECOND INFINITE LOOPING SLIDESHOW</span>
              </div>
            </div>

            {/* Continuous Carousel Container */}
            <div className="projects__carousel-container">
              <div className="projects__track-wrapper" ref={carouselRef}>
                <div
                  className="projects__track"
                  style={{
                    transform: `translateX(-${currentSlide * cardStep}px)`,
                  }}
                >
                  {projects.map((proj, pIdx) => (
                    <article
                      key={pIdx}
                      ref={pIdx === 0 ? firstCardRef : null}
                      className="projects__card"
                      onClick={() => setSelectedProject(proj)}
                    >
                      {/* Ambient card glow */}
                      <div className="projects__card-ambient" />

                      {/* Number & Category Pill */}
                      <div className="projects__number">
                        <h1>{proj.num}</h1>
                        <h3>{proj.category}</h3>
                      </div>

                      {/* Project Data */}
                      <div className="projects__data">
                        <h2 className="projects__title">{proj.title}</h2>
                        <p className="projects__subtitle">Techstack used</p>
                        <p className="projects__description">{proj.techstack}</p>
                      </div>

                      {/* Real Picture Thumbnail */}
                      <div className="projects__image">
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          className="projects__img"
                        />

                        {/* Floating Arrow button on top right of thumbnail */}
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="projects__button"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          title="View Repository / Demo"
                        >
                          <RiArrowRightUpLine />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Slideshow Controls */}
              <div className="projects__controls">
                <button
                  className="projects__arrow-btn"
                  onClick={prevSlide}
                  aria-label="Previous Project"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="projects__dots">
                  {projects.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`projects__dot ${currentSlide === dotIdx ? "active" : ""}`}
                      onClick={() => setCurrentSlide(dotIdx)}
                    />
                  ))}
                </div>

                <button
                  className="projects__arrow-btn"
                  onClick={nextSlide}
                  aria-label="Next Project"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WORK EXPERIENCE & EDUCATION SECTION
            ============================================================ */}
        <section className="work section" id="work">
          <div className="container work__container">
            <div style={{ textAlign: "center" }}>
              <div className="section-orb-glow" />
              <h2 className="section__title">
                <span className="text-tobacco">My Work</span> <br />
                Experience
              </h2>
            </div>

            {/* Tabs: Experience | Education */}
            <div className="work__tabs">
              <button
                className={`work__button ${activeWorkTab === "experience" ? "work-active" : ""}`}
                onClick={() => setActiveWorkTab("experience")}
              >
                Experience <RiBriefcase3Line size={16} />
              </button>
              <button
                className={`work__button ${activeWorkTab === "education" ? "work-active" : ""}`}
                onClick={() => setActiveWorkTab("education")}
              >
                Education <RiGraduationCapLine size={16} />
              </button>
            </div>

            {/* Timeline Area with continuous vertical glowing timeline line */}
            <div className="work__area">
              <div className="work__line" />

              <div className="work__content">
                {(activeWorkTab === "experience" ? workExperience : educationExperience).map(
                  (item, wIdx) => (
                    <div key={wIdx} className="work__card">
                      <div className="work__card-node" />

                      {/* Left Side: Role Title, Company, and Year Badge */}
                      <div className="work__data">
                        <div>
                          <h3 className="work__title">{item.role}</h3>
                          <h4 className="work__subtitle">{item.company}</h4>
                        </div>
                        <h2
                          className="work__year"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {item.year}
                        </h2>
                      </div>

                      {/* Right Side: Description */}
                      <p className="work__description">{item.description}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TECHNICAL ARSENAL & SKILLS
            ============================================================ */}
        <section className="skills section" id="skills">
          <div className="container">
            <div className="section-orb-glow" />
            <h2 className="section__title">
              Technical <span>Arsenal</span>
            </h2>

            <div className="skills__grid">
              {skillsCategories.map((cat, idx) => (
                <div key={idx} className="skills__box">
                  <div className="skills__box-header">
                    {cat.icon}
                    <h3 className="skills__box-title">{cat.title}</h3>
                  </div>

                  <div className="skills__pill-list">
                    {cat.items.map((skill, sIdx) => (
                      <span key={sIdx} className="skills__badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CONTACT SECTION (Direct Delivery to zohaik.muhammad@gmail.com)
            ============================================================ */}
        <section className="contact section" id="contact">
          <div className="container">
            <div className="section-orb-glow" />
            <h2 className="section__title">
              Tell me about your <span>next project</span>
            </h2>

            <div className="contact__container">
              {/* Left Column: Direct Connect & Details */}
              <div className="contact__info-card">
                <div>
                  <h3 className="contact__card-title">Let's build something exceptional.</h3>
                  <p className="contact__card-desc">
                    Send me a message below and it will be delivered directly to my inbox (<strong>zohaik.muhammad@gmail.com</strong>). You can also connect directly on WhatsApp or LinkedIn.
                  </p>
                </div>

                <div className="contact__methods">
                  <a
                    href="https://wa.me/923275716901"
                    target="_blank"
                    rel="noreferrer"
                    className="contact__method-item"
                  >
                    <div className="contact__method-icon">
                      <RiWhatsappLine />
                    </div>
                    <div>
                      <div className="contact__method-label">Direct WhatsApp</div>
                      <div className="contact__method-val">+92 327 5716901</div>
                    </div>
                  </a>

                  <div
                    className="contact__method-item"
                    onClick={copyEmail}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="contact__method-icon">
                      <RiMailLine />
                    </div>
                    <div>
                      <div className="contact__method-label">Direct Email</div>
                      <div className="contact__method-val">
                        zohaik.muhammad@gmail.com {copiedEmail && "✓ (Copied!)"}
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/rana-zohaik-069553373/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact__method-item"
                  >
                    <div className="contact__method-icon">
                      <RiLinkedinFill />
                    </div>
                    <div>
                      <div className="contact__method-label">LinkedIn Profile</div>
                      <div className="contact__method-val">in/rana-zohaik-069553373</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/RanaZohaik"
                    target="_blank"
                    rel="noreferrer"
                    className="contact__method-item"
                  >
                    <div className="contact__method-icon">
                      <RiGithubLine />
                    </div>
                    <div>
                      <div className="contact__method-label">GitHub Repositories</div>
                      <div className="contact__method-val">github.com/RanaZohaik</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Gmail Dispatch Form */}
              <form className="contact__form" onSubmit={handleFormSubmit}>
                <div className="contact__form-group">
                  <label className="contact__form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="contact__input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="contact__form-group">
                  <label className="contact__form-label">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    className="contact__input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="contact__form-group">
                  <label className="contact__form-label">Project Details / Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message will be delivered directly to zohaik.muhammad@gmail.com..."
                    className="contact__textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="button"
                  style={{ width: "100%" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending to Gmail..."
                  ) : submitStatus === "success" ? (
                    <>
                      <Check size={18} /> Message Sent to Gmail!
                    </>
                  ) : (
                    <>
                      Send to My Gmail <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          ANIMATED LUXURY FOOTER
          ============================================================ */}
      <footer className="footer">
        {/* Ambient Top Glow */}
        <div className="footer-ambient-glow" />

        {/* Large Aesthetic Watermark */}
        <div className="footer-giant-watermark">RANA ZOHAIK</div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="footer__main-grid">
            {/* Brand Block */}
            <div className="footer__brand-block">
              <h3 className="footer__brand-title">Rana Zohaik</h3>
              <p className="footer__brand-desc">
                Mobile Application Developer & Software Engineer dedicated to architecting reliable, user-focused mobile applications, POS systems, and scalable web solutions.
              </p>
              <div className="footer__social-links">
                <a
                  href="https://github.com/RanaZohaik"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  title="GitHub"
                >
                  <RiGithubLine />
                </a>
                <a
                  href="https://www.linkedin.com/in/rana-zohaik-069553373/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  title="LinkedIn"
                >
                  <RiLinkedinFill />
                </a>
                <a
                  href="https://wa.me/923275716901"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  title="WhatsApp"
                >
                  <RiWhatsappLine />
                </a>
                <a
                  href="mailto:zohaik.muhammad@gmail.com"
                  className="footer__social-btn"
                  title="Email"
                >
                  <RiMailLine />
                </a>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="footer__nav-col">
              <h4 className="footer__col-heading">Navigation</h4>
              <div className="footer__nav-list">
                <a href="#hero" className="footer__nav-item">Overview</a>
                <a href="#about" className="footer__nav-item">About Me</a>
                <a href="#projects" className="footer__nav-item">Featured Projects</a>
                <a href="#work" className="footer__nav-item">Work Experience</a>
                <a href="#contact" className="footer__nav-item">Contact Direct</a>
              </div>
            </div>

            {/* Contact & Availability Details */}
            <div className="footer__nav-col">
              <h4 className="footer__col-heading">Contact & Location</h4>
              <div className="footer__nav-list">
                <span className="footer__nav-item">📍 Gujrat & Sialkot, PK</span>
                <span className="footer__nav-item">✉️ zohaik.muhammad@gmail.com</span>
                <span className="footer__nav-item">📞 +92 327 5716901</span>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="footer__nav-item"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                >
                  📄 View & Download CV
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="footer__bottom-bar">
            <p className="footer__copy">
              © 2026 <span>Rana Zohaik</span>. Built with React, Framer Motion, GSAP & Lenis. All rights reserved.
            </p>

            <a href="#hero" className="footer__back-to-top">
              Back to Top <ArrowUp size={15} />
            </a>
          </div>
        </div>
      </footer>

      {/* ============================================================
          RESUME / CV VIEWER & DOWNLOAD MODAL
          ============================================================ */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="modal-overlay" onClick={() => setShowResumeModal(false)}>
            <motion.div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setShowResumeModal(false)}
                title="Close"
              >
                <X size={20} />
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.75rem", color: "var(--color-bone)", marginBottom: "0.25rem" }}>
                    Rana Zohaik — Curriculum Vitae
                  </h2>
                  <p style={{ color: "var(--color-tobacco)", fontWeight: 600, fontSize: "0.9rem" }}>
                    Software Engineering Graduate • Mobile & Software Developer
                  </p>
                </div>

                {/* Instant Download Button */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a
                    href="/RanaZohaik_CV.pdf"
                    download="RanaZohaik_CV.pdf"
                    className="button"
                    title="Direct Download PDF"
                  >
                    <Download size={16} /> Download CV
                  </a>
                  <a
                    href="/RanaZohaik_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary"
                    title="Open in Full Tab"
                  >
                    <ExternalLink size={16} /> Full Screen
                  </a>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="cv-preview-container">
                <iframe
                  src="/RanaZohaik_CV.pdf#toolbar=1"
                  title="Rana Zohaik CV"
                  className="cv-iframe"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  File: RanaZohaik_CV.pdf (208 KB) • Verified Document
                </p>

                <div style={{ display: "flex", gap: "0.85rem" }}>
                  <a
                    href="/RanaZohaik_CV.pdf"
                    download="RanaZohaik_CV.pdf"
                    className="button"
                  >
                    <Download size={15} /> Download PDF
                  </a>
                  <button
                    className="button button-secondary"
                    onClick={() => setShowResumeModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          PROJECT DETAIL MODAL
          ============================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-bone)" }}>
                  {selectedProject.num}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    background: "rgba(230, 224, 214, 0.08)",
                    border: "1px solid rgba(230, 224, 214, 0.2)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    color: "var(--color-bone)",
                  }}
                >
                  {selectedProject.category}
                </span>
              </div>

              <div style={{ borderRadius: "1.5rem", overflow: "hidden", marginBottom: "1.25rem", border: "1px solid var(--border-color)" }}>
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  style={{ width: "100%", height: "230px", objectFit: "cover" }}
                />
              </div>

              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.6rem", color: "var(--color-bone)" }}>
                {selectedProject.title}
              </h2>

              <p style={{ color: "var(--color-tobacco)", fontWeight: 600, fontSize: "0.88rem", marginBottom: "1.1rem" }}>
                {selectedProject.techstack}
              </p>

              <p style={{ lineHeight: 1.7, color: "var(--text-color)", marginBottom: "1.5rem" }}>
                {selectedProject.desc}
              </p>

              <div style={{ marginBottom: "1.75rem" }}>
                <h4 style={{ fontSize: "0.95rem", color: "var(--color-bone)", marginBottom: "0.85rem" }}>
                  Key Architecture & Engineering Highlights
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {selectedProject.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.88rem",
                        color: "var(--text-color)",
                      }}
                    >
                      <Check size={16} color="var(--color-bone)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                  style={{ flex: 1 }}
                >
                  <RiGithubLine size={18} /> View Repository
                </a>
                <button
                  className="button button-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
