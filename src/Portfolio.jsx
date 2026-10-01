import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "education", "contact"];

const ROLES = ["Software Engineer", "Backend Developer", "Digital Architect", "Full Stack Developer"];

const NAV_LABELS = {
  hero: "Accueil", about: "À propos", skills: "Compétences",
  experience: "Expériences", projects: "Projets", education: "Formation", contact: "Contact",
};

const experiences = [
  {
    period: "Oct 2025 — Présent",
    role: "Apprenti Full Stack Software Engineer",
    company: "SLB (Schlumberger)",
    location: "Paris",
    tasks: [
      "Développement et migration de systèmes d'alarmes temps réel en RxPy pour le monitoring d'outils internes en environnement industriel distribué",
      "Conception de l'architecture événementielle du pipeline d'alarmes",
      "Intégration d'événements asynchrones via RabbitMQ pour la communication entre microservices",
      "Mise en place de tests unitaires, d'intégration et d'interfaces avec Neotest",
      "Conteneurisation et déploiement des services avec Docker via Rancher Desktop",
      "Environnement Agile SCRUM · Sprints sur Azure DevOps",
    ],
    tags: ["Python", "RxPy", "RabbitMQ", "Docker", "Neotest", "Azure DevOps", "SCRUM"],
    current: true,
  },
  {
    period: "Fév — Oct 2025",
    role: "Backend Engineer — Stage de fin d'études",
    company: "SLB (Schlumberger)",
    location: "Paris",
    tasks: [
      "Développement backend en Python et C# pour des outils logiciels internes",
      "Intégration complète d'un protocole gRPC dans le framework Python interne (auth, flux asynchrones, métadonnées de canaux)",
      "Communication inter-microservices via RabbitMQ · Déploiement conteneurisé Docker/Kubernetes",
      "Analyse de code avec SonarQube et correction de bugs et vulnérabilités",
    ],
    tags: ["Python", "C#", "gRPC", "RabbitMQ", "Docker", "Kubernetes", "SonarQube"],
  },
  {
    period: "Avr — Août 2024",
    role: "Développeur Full-Stack — Stagiaire",
    company: "Actility SA",
    location: "Paris",
    tasks: [
      "Réalisation de drivers et device profiles pour objets connectés IoT en convertissant des chaînes binaires/hexadécimal en format JSON",
      "Mapping technique JavaScript pour convertir les mesures sous forme standardisée Actility (Ontologie)",
      "Amélioration d'un site web en VueJS + HTML/CSS + Java + Docker + Postman",
    ],
    tags: ["Vue.js", "JavaScript", "Java", "IoT", "Docker", "Postman"],
  },
];

const projects = [
  {
    title: "API de Messagerie Sécurisée & Interface Web",
    tasks: [
      "Conception d'une plateforme de communication sécurisée pour secteurs éducatif et médical",
      "API REST Java/Spring Boot — gestion des messages, utilisateurs et droits d'accès",
      "Interface web React.js connectée à une base de données MongoDB",
      "Authentification forte 2FA, chiffrement des communications et gestion des rôles",
      "Système de gestion des accès et permissions garantissant l'intégrité des échanges",
    ],
    tags: ["Java", "Spring Boot", "React", "MongoDB", "2FA"],
    type: "Projet Ingénieur",
    accent: "#06B6D4",
    featured: true,
  },
  {
    title: "ArchiPolicy — Gouvernance des Accès Fédérés",
    tasks: [
      "Architecture décentralisée PAP/PDP/PEP avec Smart Contract et Ledger distribué",
      "Gestion des politiques d'accès contextuelles NORMAL/EMERGENCY en <500ms via OPA/Rego",
      "Modèle ABAC : contrôle par rôle, ressource, contexte et zone géographique",
      "Identités décentralisées (DID / Verifiable Credentials) pour chaque acteur",
      "Cas d'étude : écosystème RATP · Île-de-France Mobilités · BSPP/SAMU",
    ],
    tags: ["OPA/Rego", "ABAC", "Smart Contract", "DID", "Blockchain", "RGPD"],
    type: "Projet MS ADE",
    accent: "#06B6D4",
    link: "https://archipolicy-prototype.vercel.app/",
  },
  {
    title: "AutoQC — Maxwell Platform",
    tasks: [
      "Système de Quality Control automatisé pour données pétrolières temps réel",
      "Architecture événementielle avec RxPy et RabbitMQ",
      "Déploiement en environnement industriel distribué via Docker",
    ],
    tags: ["Python", "RxPy", "RabbitMQ", "Docker"],
    type: "Professionnel",
    accent: "#6366F1",
  },
  {
    title: "IoT Device Drivers — Actility",
    tasks: [
      "Parsing de payloads binaires LoRaWAN vers JSON standardisé",
      "Mapping ontologique pour interopérabilité des objets connectés",
      "Intégration dans la plateforme ThingPark d'Actility",
    ],
    tags: ["JavaScript", "IoT", "LoRaWAN", "Vue.js"],
    type: "Professionnel",
    accent: "#6366F1",
  },
  {
    title: "Auto Doc Generator",
    tasks: [
      "Génération automatique de documentation technique depuis des repos GitHub",
      "Analyse statique de code et production de docs structurées via NLP",
      "Export en formats Markdown et HTML",
    ],
    tags: ["Python", "GitHub API", "NLP"],
    type: "Personnel",
    accent: "#8B5CF6",
    inProgress: true,
  },
  {
    title: "Cyber Governance Dashboard",
    tasks: [
      "Dashboard de monitoring cybersécurité aligné NIST CSF / NIS2",
      "Visualisation de la posture sécurité et du niveau de conformité",
      "Génération de rapports d'audit automatisés",
    ],
    tags: ["React", "Python", "NIST CSF", "NIS2"],
    type: "Personnel",
    accent: "#8B5CF6",
    inProgress: true,
  },
];

const skillCategories = [
  { category: "Backend",             color: "#6366F1", skills: ["Java / Spring Boot", "Python / Django", "C# / ASP.NET", "Node.js", "REST / gRPC", "PHP"] },
  { category: "Frontend",            color: "#8B5CF6", skills: ["React", "Vue.js", "HTML / CSS", "JavaScript / TypeScript", "Android"] },
  { category: "Data & Cloud",        color: "#06B6D4", skills: ["MySQL / Oracle / PL/SQL", "MongoDB", "Docker / Kubernetes", "RabbitMQ", "Azure DevOps"] },
  { category: "Architecture & Sécu", color: "#F59E0B", skills: ["TOGAF / ArchiMate", "BPMN / ITIL4", "NIST CSF / NIS2", "Microservices", "IoT / LoRaWAN"] },
  { category: "Outils",              color: "#34D399", skills: ["Git / Jira / GitLab", "Postman", "JUnit5 / Neotest", "SonarQube", "Rancher Desktop"] },
];

const education = [
  {
    period: "Oct 2025 — Nov 2026",
    school: "Télécom Paris",
    degree: "Mastère Spécialisé",
    specialty: "Architecte Digital d'Entreprise",
    items: [
      "Architecture d'entreprise & urbanisation des SI (ArchiMate, TOGAF, cartographie fonctionnelle / applicative / technique)",
      "Connectivité & réseaux mobiles : 4G/5G/6G, IoT, Industrie 4.0, réseaux ad-hoc",
      "Cloud, virtualisation réseau & cloudification des infrastructures",
      "Cybersécurité, Big Data & Intelligence Artificielle",
      "Design de solutions As a Service : QoS, expérience utilisateur",
      "Gouvernance SI, gestion des exigences, UML, BPMN",
    ],
    accent: "#6366F1",
    logo: "T",
  },
  {
    period: "2022 — 2025",
    school: "ESIGELEC",
    degree: "Diplôme d'Ingénieur Généraliste",
    specialty: "Ingénierie des Services du Numérique",
    items: [
      "Développement d'applications Java EE (JUnit, Log4J, Maven, Hibernate, Spring)",
      "Stockage et manipulation de données : MySQL, Oracle, MongoDB",
      "Développement Android · Node.js · interfaces React et Vue.js",
      "Sécurité des systèmes d'information · Intelligence Artificielle avec Python",
      "Orchestration de conteneurs Docker avec Kubernetes",
    ],
    accent: "#8B5CF6",
    logo: "E",
  },
];

// ─────────────────────────────────────────────
//  HOOKS
// ─────────────────────────────────────────────

function useCountUp(target, delay = 700, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, delay, duration]);
  return count;
}

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [isDark, setIsDark]               = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible]             = useState(new Set(["hero"]));
  const [typeText, setTypeText]           = useState("");
  const [typeCaret, setTypeCaret]         = useState(true);

  const c3  = useCountUp(3,  700);
  const c6  = useCountUp(6,  900);
  const c20 = useCountUp(20, 1100);
  const c2  = useCountUp(2,  1300);

  /* apply data-theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  /* typewriter */
  useEffect(() => {
    let wi = 0, ci = 0, del = false, t;
    const tick = () => {
      const w = ROLES[wi];
      if (!del) {
        setTypeText(w.slice(0, ++ci));
        if (ci === w.length) { del = true; t = setTimeout(tick, 2200); return; }
      } else {
        setTypeText(w.slice(0, --ci));
        if (ci === 0) { del = false; wi = (wi + 1) % ROLES.length; }
      }
      t = setTimeout(tick, del ? 40 : 72);
    };
    const blink = setInterval(() => setTypeCaret(v => !v), 520);
    t = setTimeout(tick, 900);
    return () => { clearTimeout(t); clearInterval(blink); };
  }, []);

  /* scroll */
  useEffect(() => {
    const fn = () => {
      const tot = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(tot > 0 ? (window.scrollY / tot) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(p => new Set([...p, e.target.id]));
          setActiveSection(e.target.id);
        }
      }),
      { threshold: 0.15 }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goto = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const vis  = (id) => visible.has(id) ? "s-in" : "s-out";

  const tilt    = (e) => { const el = e.currentTarget, r = el.getBoundingClientRect(); el.style.transform = `perspective(900px) rotateX(${(e.clientY - r.top - r.height / 2) / 14}deg) rotateY(${(r.width / 2 - (e.clientX - r.left)) / 14}deg) translateZ(10px)`; };
  const untilt  = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ═══════════════════════════════════════
           THEME VARIABLES
        ═══════════════════════════════════════ */

        :root {
          --accent:   #6366f1;
          --accent-2: #8b5cf6;
          --accent-3: #06b6d4;
          --a-dim:    rgba(99,102,241,.1);
          --a-dim2:   rgba(99,102,241,.14);
        }

        [data-theme="dark"] {
          --bg:           #04080f;
          --bg-card:      #0a1020;
          --bg-hover:     #0d1828;
          --bg-nav:       rgba(4,8,15,.85);
          --border:       rgba(30,42,64,.55);
          --border-s:     rgba(30,42,64,.9);
          --text:         #e2e8f0;
          --text-2:       #94a3b8;
          --text-3:       #475569;
          --dot-idle:     rgba(255,255,255,.18);
          --orb-a:        rgba(99,102,241,.14);
          --orb-b:        rgba(139,92,246,.11);
          --orb-c:        rgba(6,182,212,.09);
          --grid-line:    rgba(99,102,241,.022);
          --noise-op:     .028;
          --name-grad:    linear-gradient(140deg,#fff 0%,#c7d9ff 42%,#a78bfa 100%);
          --stat-grad:    linear-gradient(135deg,#6366f1,#a78bfa);
          --chip-bg:      rgba(52,211,153,.08);
          --chip-bd:      rgba(52,211,153,.28);
          --chip-tx:      #34d399;
          --tl-dot-bg:    #04080f;
          --shadow:       rgba(0,0,0,.45);
          --photo-tint:   0;
          --toggle-bg:    rgba(99,102,241,.12);
          --toggle-bd:    rgba(99,102,241,.4);
          --footer-c:     #1e2a40;
        }

        [data-theme="light"] {
          --bg:           #f3f5ff;
          --bg-card:      #ffffff;
          --bg-hover:     #ece9ff;
          --bg-nav:       rgba(243,245,255,.9);
          --border:       rgba(196,207,232,.7);
          --border-s:     rgba(196,207,232,.95);
          --text:         #0f172a;
          --text-2:       #334155;
          --text-3:       #64748b;
          --dot-idle:     rgba(0,0,0,.2);
          --orb-a:        rgba(99,102,241,.07);
          --orb-b:        rgba(139,92,246,.06);
          --orb-c:        rgba(6,182,212,.05);
          --grid-line:    rgba(99,102,241,.04);
          --noise-op:     .012;
          --name-grad:    linear-gradient(140deg,#1e1b4b 0%,#4338ca 48%,#7c3aed 100%);
          --stat-grad:    linear-gradient(135deg,#4338ca,#7c3aed);
          --chip-bg:      rgba(22,163,74,.08);
          --chip-bd:      rgba(22,163,74,.28);
          --chip-tx:      #15803d;
          --tl-dot-bg:    #f3f5ff;
          --shadow:       rgba(99,102,241,.1);
          --photo-tint:   0;
          --toggle-bg:    rgba(245,158,11,.1);
          --toggle-bd:    rgba(245,158,11,.45);
          --footer-c:     #94a3b8;
        }

        /* ═══════════════════════════════════════
           BASE
        ═══════════════════════════════════════ */

        *,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }

        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:linear-gradient(var(--accent),var(--accent-2)); border-radius:2px; }
        ::selection { background:rgba(99,102,241,.3); color:#fff; }

        body {
          background:var(--bg);
          color:var(--text);
          font-family:'Inter','Segoe UI',sans-serif;
          line-height:1.7;
          -webkit-font-smoothing:antialiased;
          transition:background-color .4s ease, color .3s ease;
        }

        /* smooth theme transitions on key elements */
        .topnav, .sk-card, .tl-card, .p-card, .edu-card,
        .contact-wrap, .chip, nav.side-dots { transition:background .4s ease, border-color .3s ease, color .3s ease, box-shadow .3s ease; }

        /* ─── Noise overlay ─── */
        .noise {
          position:fixed; inset:0; z-index:9998; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px 180px;
          opacity:var(--noise-op);
          mix-blend-mode:overlay;
        }

        /* ─── Progress bar ─── */
        .progress {
          position:fixed; top:0; left:0; z-index:200; height:2px;
          background:linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3));
          transition:width .12s linear;
          box-shadow:0 0 12px rgba(99,102,241,.8);
        }

        /* ─── Side dots ─── */
        nav.side-dots {
          position:fixed; right:22px; top:50%; transform:translateY(-50%);
          display:flex; flex-direction:column; gap:11px; z-index:50;
          background:none; border:none;
        }
        @media(max-width:1100px){ nav.side-dots { display:none; } }
        .side-dot {
          width:7px; height:7px; border-radius:50%; border:none; cursor:pointer; padding:0;
          background:var(--dot-idle); transition:all .3s;
        }
        .side-dot:hover { background:rgba(99,102,241,.6); transform:scale(1.25); }
        .side-dot.on { background:var(--accent); transform:scale(1.4); box-shadow:0 0 0 3px rgba(99,102,241,.2),0 0 10px rgba(99,102,241,.5); }

        /* ═══════════════════════════════════════
           ANIMATIONS
        ═══════════════════════════════════════ */

        @keyframes orb-a { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,-20px) scale(1.05)} }
        @keyframes orb-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.08)} }
        @keyframes orb-c { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-25px)} }
        @keyframes dot-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,.5)} 50%{box-shadow:0 0 0 7px rgba(52,211,153,0)} }
        @keyframes chip-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes photo-glow { 0%,100%{opacity:.7} 50%{opacity:1} }

        /* theme-switch icon animations */
        @keyframes spin-in  { from{transform:rotate(-90deg) scale(0.5);opacity:0} to{transform:rotate(0) scale(1);opacity:1} }
        @keyframes spin-out { from{transform:rotate(0) scale(1);opacity:1} to{transform:rotate(90deg) scale(0.5);opacity:0} }

        .s-out { opacity:0; transform:translateY(44px); }
        .s-in  { opacity:1; transform:translateY(0); transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }

        .stagger>*           { opacity:0; transform:translateY(28px); }
        .s-in.stagger>*:nth-child(1){ opacity:1; transform:none; transition:all .6s .05s cubic-bezier(.22,1,.36,1); }
        .s-in.stagger>*:nth-child(2){ opacity:1; transform:none; transition:all .6s .15s cubic-bezier(.22,1,.36,1); }
        .s-in.stagger>*:nth-child(3){ opacity:1; transform:none; transition:all .6s .25s cubic-bezier(.22,1,.36,1); }
        .s-in.stagger>*:nth-child(4){ opacity:1; transform:none; transition:all .6s .35s cubic-bezier(.22,1,.36,1); }
        .s-in.stagger>*:nth-child(5){ opacity:1; transform:none; transition:all .6s .45s cubic-bezier(.22,1,.36,1); }
        .s-in.stagger>*:nth-child(6){ opacity:1; transform:none; transition:all .6s .55s cubic-bezier(.22,1,.36,1); }

        /* ═══════════════════════════════════════
           NAV
        ═══════════════════════════════════════ */

        .topnav {
          position:fixed; top:0; left:0; right:0; z-index:100;
          backdrop-filter:blur(24px) saturate(180%);
          background:var(--bg-nav);
          border-bottom:1px solid var(--border);
        }
        .nav-wrap {
          max-width:1160px; margin:0 auto; padding:0 32px;
          display:flex; align-items:center; justify-content:space-between; height:64px;
        }
        .nav-logo {
          font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px;
          color:var(--text); cursor:pointer; letter-spacing:-.5px; user-select:none;
        }
        .nav-logo em {
          font-style:normal;
          background:linear-gradient(135deg,var(--accent),var(--accent-2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .nav-right { display:flex; align-items:center; gap:8px; }
        .nav-list  { display:flex; gap:2px; list-style:none; }
        .nav-btn {
          background:none; border:none; color:var(--text-2);
          font-family:'Inter',sans-serif; font-size:13.5px; font-weight:500;
          padding:8px 13px; border-radius:8px; cursor:pointer; transition:all .2s;
        }
        .nav-btn:hover  { color:var(--text); background:var(--a-dim); }
        .nav-btn.active { color:var(--accent); background:var(--a-dim2); }

        /* ─── Theme toggle ─── */
        .theme-toggle {
          display:flex; align-items:center; justify-content:center;
          width:40px; height:40px; border-radius:10px; border:1.5px solid var(--toggle-bd);
          background:var(--toggle-bg); cursor:pointer; overflow:hidden; position:relative;
          transition:background .3s, border-color .3s, transform .15s;
        }
        .theme-toggle:hover { transform:scale(1.08); }
        .theme-toggle:active { transform:scale(.94); }
        .t-icon {
          position:absolute; font-size:18px; line-height:1;
          transition:transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s;
        }
        .t-icon.sun  { opacity:${isDark ? 0 : 1}; transform:${isDark ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)"}; }
        .t-icon.moon { opacity:${isDark ? 1 : 0}; transform:${isDark ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0)"}; }

        .nav-burger {
          display:none; background:none; border:none; color:var(--text);
          font-size:21px; cursor:pointer; padding:8px;
        }
        @media(max-width:768px){
          .nav-list {
            display:${menuOpen ? "flex" : "none"}; flex-direction:column;
            position:absolute; top:64px; left:0; right:0;
            background:var(--bg-nav); padding:10px;
            border-bottom:1px solid var(--border); gap:2px;
            backdrop-filter:blur(24px);
          }
          .nav-burger { display:block; }
        }

        /* ═══════════════════════════════════════
           LAYOUT
        ═══════════════════════════════════════ */

        .wrap { max-width:1160px; margin:0 auto; padding:100px 32px; }
        @media(max-width:640px){ .wrap { padding:80px 20px; } }

        .sec-label {
          font-family:'JetBrains Mono',monospace; font-size:11.5px; font-weight:500;
          text-transform:uppercase; letter-spacing:3px; margin-bottom:14px; display:block;
          background:linear-gradient(135deg,var(--accent),var(--accent-2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .sec-title {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(26px,3.8vw,40px); font-weight:700;
          color:var(--text); margin-bottom:56px; letter-spacing:-.8px;
          position:relative; display:inline-block;
          transition:color .4s;
        }
        .sec-title::after {
          content:''; position:absolute; bottom:-10px; left:0; width:40px; height:3px;
          background:linear-gradient(90deg,var(--accent),var(--accent-2)); border-radius:2px;
        }

        /* ═══════════════════════════════════════
           HERO
        ═══════════════════════════════════════ */

        #hero { min-height:100vh; position:relative; overflow:hidden; }

        .hero-inner {
          min-height:100vh;
          max-width:1160px; margin:0 auto; padding:80px 32px 48px;
          display:grid; grid-template-columns:1fr 300px;
          gap:60px; align-items:center;
        }
        @media(max-width:960px){ .hero-inner { grid-template-columns:1fr; } }
        @media(max-width:640px){ .hero-inner { padding:72px 20px 40px; } }

        .hero-orb-a,.hero-orb-b,.hero-orb-c {
          position:fixed; border-radius:50%; pointer-events:none; z-index:-1;
        }
        .hero-orb-a {
          width:700px; height:700px;
          background:radial-gradient(circle,var(--orb-a) 0%,transparent 68%);
          top:-200px; right:-150px; animation:orb-a 11s ease-in-out infinite;
        }
        .hero-orb-b {
          width:500px; height:500px;
          background:radial-gradient(circle,var(--orb-b) 0%,transparent 68%);
          bottom:0; left:-100px; animation:orb-b 14s ease-in-out infinite;
        }
        .hero-orb-c {
          width:280px; height:280px;
          background:radial-gradient(circle,var(--orb-c) 0%,transparent 68%);
          bottom:25%; right:10%; animation:orb-c 9s ease-in-out infinite 1s;
        }
        .hero-grid {
          position:fixed; inset:0; z-index:-1;
          background-image:
            linear-gradient(var(--grid-line) 1px,transparent 1px),
            linear-gradient(90deg,var(--grid-line) 1px,transparent 1px);
          background-size:72px 72px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 30%,black 20%,transparent 100%);
        }

        .hero-chip {
          display:inline-flex; align-items:center; gap:9px;
          background:var(--chip-bg); border:1px solid var(--chip-bd);
          border-radius:20px; padding:6px 16px; margin-bottom:30px;
          font-family:'JetBrains Mono',monospace; font-size:12px;
          color:var(--chip-tx); letter-spacing:.5px;
          animation:chip-float 4s ease-in-out infinite;
          transition:background .4s, border-color .3s, color .3s;
        }
        .hero-chip-dot {
          width:7px; height:7px; border-radius:50%; background:var(--chip-tx); flex-shrink:0;
          animation:dot-pulse 2.2s ease-in-out infinite;
        }
        .hero-name {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(44px,7vw,88px); font-weight:700;
          letter-spacing:-3px; line-height:1.03; margin-bottom:8px;
          background:var(--name-grad);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          transition:background .4s;
        }
        .hero-role {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(18px,2.5vw,30px); font-weight:400;
          color:var(--accent); margin-bottom:26px; min-height:38px;
          display:flex; align-items:center; gap:2px;
        }
        .hero-caret {
          display:inline-block; width:2px; height:.9em; background:var(--accent);
          margin-left:3px; vertical-align:middle;
        }
        .hero-sub {
          font-size:clamp(14px,1.7vw,17px); color:var(--text-3); font-weight:400;
          max-width:520px; line-height:1.85; margin-bottom:38px;
          transition:color .4s;
        }
        .hero-sub strong { color:var(--text-2); font-weight:500; }
        .hero-ctas { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:60px; }

        .btn-p {
          background:linear-gradient(135deg,var(--accent),#818cf8);
          color:#fff; border:none; padding:14px 30px; border-radius:10px;
          font-size:15px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif;
          box-shadow:0 4px 24px rgba(99,102,241,.4); transition:transform .2s,box-shadow .2s;
        }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(99,102,241,.55); }
        .btn-o {
          background:transparent; color:var(--accent);
          border:1.5px solid rgba(99,102,241,.45);
          padding:14px 30px; border-radius:10px;
          font-size:15px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif;
          transition:all .2s;
        }
        .btn-o:hover { background:var(--a-dim); border-color:var(--accent); transform:translateY(-2px); }

        /* ─── CV download button ─── */
        @keyframes arrow-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(3px)} }
        .btn-cv {
          display:inline-flex; align-items:center; gap:9px;
          position:relative; overflow:hidden;
          padding:14px 28px; border-radius:10px; border:1.5px solid var(--border-s);
          font-size:15px; font-weight:600; font-family:'Inter',sans-serif;
          text-decoration:none; cursor:pointer; color:var(--text-2);
          background:var(--bg-card);
          transition:color .25s, border-color .25s, transform .2s, box-shadow .25s, background .25s;
        }
        .btn-cv::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,var(--accent),var(--accent-2));
          opacity:0; transition:opacity .3s; z-index:0;
        }
        .btn-cv:hover {
          color:#fff; border-color:transparent;
          transform:translateY(-2px);
          box-shadow:0 10px 36px rgba(99,102,241,.4);
        }
        .btn-cv:hover::before { opacity:1; }
        .btn-cv-inner { position:relative; z-index:1; display:flex; align-items:center; gap:9px; }
        .btn-cv-arrow { font-size:17px; transition:transform .2s; }
        .btn-cv:hover .btn-cv-arrow { animation:arrow-bounce .5s ease infinite; }

        .hero-stats {
          display:flex; gap:40px; flex-wrap:wrap;
          padding-top:32px; border-top:1px solid var(--border);
        }
        .stat-val {
          font-family:'Space Grotesk',sans-serif; font-size:34px; font-weight:700; line-height:1;
          background:var(--stat-grad);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .stat-lbl { font-size:12px; color:var(--text-3); margin-top:6px; letter-spacing:.3px; }

        /* ─── Photo frame ─── */
        .photo-wrap {
          position:relative; width:300px; height:380px;
          flex-shrink:0; justify-self:end;
        }
        @media(max-width:960px){
          .photo-wrap { width:180px; height:220px; justify-self:center; order:-1; }
        }
        .photo-ring {
          position:absolute; inset:-2px; border-radius:26px;
          background:linear-gradient(135deg,var(--accent),var(--accent-2),var(--accent-3));
          z-index:0; opacity:.75; animation:photo-glow 4s ease-in-out infinite;
        }
        .photo-img {
          position:relative; z-index:1; width:100%; height:100%;
          object-fit:cover; object-position:center 5%;
          border-radius:24px; display:block;
        }
        .photo-glow {
          position:absolute; inset:-40px; border-radius:50%; z-index:-1; pointer-events:none;
          background:radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%);
          filter:blur(10px);
        }
        /* badge on photo */
        .photo-badge {
          position:absolute; bottom:-14px; left:50%; transform:translateX(-50%);
          z-index:2; white-space:nowrap;
          background:var(--bg-card); border:1px solid var(--border);
          border-radius:20px; padding:6px 16px;
          font-family:'JetBrains Mono',monospace; font-size:11.5px;
          color:var(--accent); box-shadow:0 4px 16px var(--shadow);
          transition:background .4s, border-color .3s;
        }

        /* ═══════════════════════════════════════
           ABOUT
        ═══════════════════════════════════════ */

        .about-grid { display:grid; grid-template-columns:1fr 200px; gap:52px; align-items:start; }
        @media(max-width:860px){ .about-grid { grid-template-columns:1fr; } }
        .about-p { font-size:17px; color:var(--text-3); line-height:1.9; transition:color .4s; }
        .about-p+.about-p { margin-top:20px; }
        .hl { color:var(--text); font-weight:500; }
        .info-chips { display:flex; flex-direction:column; gap:10px; }
        @media(max-width:860px){ .info-chips { flex-direction:row; flex-wrap:wrap; } }
        .chip {
          display:flex; align-items:center; gap:9px;
          background:var(--a-dim); border:1px solid var(--border);
          border-radius:10px; padding:10px 14px; font-size:13px; color:var(--text-2);
        }
        .chip:hover { background:var(--a-dim2); border-color:rgba(99,102,241,.35); }

        /* ═══════════════════════════════════════
           SKILLS
        ═══════════════════════════════════════ */

        .marquee-wrap {
          overflow:hidden; margin-bottom:52px;
          mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);
        }
        .marquee-track {
          display:flex; gap:12px; width:max-content;
          animation:marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state:paused; }
        .m-tag {
          font-family:'JetBrains Mono',monospace; font-size:12.5px;
          color:var(--accent); background:var(--a-dim);
          border:1px solid rgba(99,102,241,.22);
          padding:6px 16px; border-radius:20px; white-space:nowrap;
        }
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:16px; }
        .sk-card {
          border-radius:16px; padding:24px 22px; position:relative; overflow:hidden;
          border:1px solid transparent;
          background:linear-gradient(var(--bg-card),var(--bg-card)) padding-box,
                      linear-gradient(135deg,var(--border-s),rgba(30,42,64,.2)) border-box;
          transition:transform .3s,box-shadow .3s,background .4s;
        }
        .sk-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--c,var(--accent)); border-radius:16px 16px 0 0;
        }
        .sk-card:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 50px var(--shadow);
          background:linear-gradient(var(--bg-hover),var(--bg-hover)) padding-box,
                      linear-gradient(135deg,var(--c,var(--accent)),rgba(139,92,246,.4)) border-box;
        }
        .sk-head {
          font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700;
          color:var(--text); margin-bottom:16px; display:flex; align-items:center; gap:9px;
          transition:color .4s;
        }
        .sk-dot {
          width:9px; height:9px; border-radius:50%; flex-shrink:0;
          background:var(--c,var(--accent)); box-shadow:0 0 10px var(--c,var(--accent));
        }
        .sk-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .sk-tag {
          font-family:'JetBrains Mono',monospace; font-size:12px;
          color:var(--c,var(--accent));
          background:var(--cbg,rgba(99,102,241,.08));
          border:1px solid var(--cbd,rgba(99,102,241,.25));
          padding:3px 10px; border-radius:6px;
        }

        /* ═══════════════════════════════════════
           BULLET LISTS (shared)
        ═══════════════════════════════════════ */

        .task-list { list-style:none; display:flex; flex-direction:column; gap:9px; margin:14px 0 16px; }
        .task-item {
          display:flex; align-items:flex-start; gap:10px;
          font-size:14px; color:var(--text-3); line-height:1.72;
          transition:color .4s;
        }
        .task-bullet {
          flex-shrink:0; margin-top:5px; width:6px; height:6px;
          border-radius:50%; background:var(--accent);
          box-shadow:0 0 6px var(--accent);
          opacity:.8;
        }

        /* ═══════════════════════════════════════
           EXPERIENCE
        ═══════════════════════════════════════ */

        .tl { display:flex; flex-direction:column; position:relative; padding-left:36px; }
        .tl::before {
          content:''; position:absolute; left:7px; top:20px; bottom:20px; width:2px;
          background:linear-gradient(to bottom,var(--accent) 0%,rgba(139,92,246,.4) 60%,transparent);
        }
        .tl-row { position:relative; padding-bottom:32px; }
        .tl-row:last-child { padding-bottom:0; }
        .tl-dot {
          position:absolute; left:-36px; top:10px; width:16px; height:16px;
          border-radius:50%; border:2.5px solid var(--accent); background:var(--tl-dot-bg);
          box-shadow:0 0 14px rgba(99,102,241,.5);
          transition:background .4s;
        }
        .tl-dot.now { border-color:#34d399; box-shadow:0 0 14px rgba(52,211,153,.55); }
        .tl-card {
          background:var(--bg-card); border:1px solid var(--border-s);
          border-radius:16px; padding:24px 28px;
        }
        .tl-card:hover {
          border-color:rgba(99,102,241,.45); background:var(--bg-hover);
          box-shadow:0 10px 40px var(--shadow);
        }
        .tl-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:4px; }
        .tl-period {
          font-family:'JetBrains Mono',monospace; font-size:11.5px;
          color:var(--accent); background:var(--a-dim);
          border:1px solid rgba(99,102,241,.25);
          padding:3px 10px; border-radius:20px; white-space:nowrap;
        }
        .tl-role   { font-family:'Space Grotesk',sans-serif; font-size:19px; font-weight:700; color:var(--text); margin-bottom:3px; transition:color .4s; }
        .tl-co     { font-size:14px; color:var(--text-2); margin-bottom:2px; display:flex; align-items:center; gap:8px; }
        .tl-co-dot { width:4px; height:4px; border-radius:50%; background:var(--text-3); }
        .tl-divider { height:1px; background:var(--border); margin:14px 0; }
        .tl-tags   { display:flex; flex-wrap:wrap; gap:6px; margin-top:16px; }
        .tl-tag {
          font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--text-2);
          background:var(--bg); border:1px solid var(--border-s);
          padding:3px 10px; border-radius:5px; transition:background .4s, border-color .3s;
        }

        /* ═══════════════════════════════════════
           PROJECTS  (bento grid)
        ═══════════════════════════════════════ */

        .bento { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:minmax(200px,auto); gap:16px; }
        .bento>.p-card:first-child { grid-column:span 2; }
        @media(max-width:900px){ .bento { grid-template-columns:repeat(2,1fr); } .bento>.p-card:first-child { grid-column:span 2; } }
        @media(max-width:600px){ .bento { grid-template-columns:1fr; } .bento>.p-card:first-child { grid-column:span 1; } }

        .p-card {
          border-radius:16px; padding:26px; display:flex; flex-direction:column;
          position:relative; overflow:hidden;
          border:1px solid transparent;
          background:linear-gradient(var(--bg-card),var(--bg-card)) padding-box,
                      linear-gradient(135deg,var(--border-s),rgba(30,42,64,.2)) border-box;
          transition:box-shadow .3s, background .4s;
        }
        .p-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--pa,var(--accent)); border-radius:16px 16px 0 0;
        }
        .p-card:hover {
          box-shadow:0 24px 60px var(--shadow);
          background:linear-gradient(var(--bg-hover),var(--bg-hover)) padding-box,
                      linear-gradient(135deg,var(--pa,var(--accent)),rgba(139,92,246,.4)) border-box;
        }
        .p-type  { font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:var(--pa,var(--accent)); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
        @keyframes wip-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .p-wip {
          font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:500;
          color:#f59e0b; background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.35);
          padding:2px 8px; border-radius:20px; letter-spacing:1px; text-transform:uppercase;
          animation:wip-pulse 2s ease-in-out infinite;
        }
        .p-title { font-family:'Space Grotesk',sans-serif; font-size:17px; font-weight:700; color:var(--text); margin-bottom:4px; line-height:1.35; transition:color .4s; }
        .bento>.p-card:first-child .p-title { font-size:20px; }
        .p-divider { height:1px; background:var(--border); margin:12px 0; }
        .p-task-list { list-style:none; display:flex; flex-direction:column; gap:8px; flex:1; margin-bottom:16px; }
        .p-task-item {
          display:flex; align-items:flex-start; gap:9px;
          font-size:13px; color:var(--text-3); line-height:1.68;
        }
        .p-task-bullet {
          flex-shrink:0; margin-top:5px; width:5px; height:5px;
          border-radius:50%; background:var(--pa,var(--accent)); opacity:.8;
        }
        .p-tags  { display:flex; flex-wrap:wrap; gap:6px; margin-top:auto; }
        .p-tag {
          font-family:'JetBrains Mono',monospace; font-size:11.5px;
          color:var(--pa,var(--accent));
          background:var(--pb,rgba(99,102,241,.08));
          border:1px solid var(--pc,rgba(99,102,241,.25));
          padding:3px 9px; border-radius:5px;
        }
        .p-link {
          display:inline-flex; align-items:center; gap:6px; margin-top:14px;
          font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:500;
          color:var(--pa,var(--accent)); text-decoration:none;
          border:1px solid var(--pc,rgba(99,102,241,.3));
          background:var(--pb,rgba(99,102,241,.06));
          padding:6px 14px; border-radius:8px; align-self:flex-start;
          transition:all .22s;
        }
        .p-link:hover {
          background:var(--pa,var(--accent)); color:#fff;
          border-color:transparent; transform:translateY(-1px);
          box-shadow:0 6px 20px var(--pb,rgba(99,102,241,.3));
        }
        .p-link-arrow { transition:transform .2s; }
        .p-link:hover .p-link-arrow { transform:translateX(3px); }

        /* ═══════════════════════════════════════
           EDUCATION
        ═══════════════════════════════════════ */

        .edu-list { display:flex; flex-direction:column; gap:16px; }
        .edu-card {
          border-radius:16px; overflow:hidden;
          border:1px solid transparent;
          background:linear-gradient(var(--bg-card),var(--bg-card)) padding-box,
                      linear-gradient(135deg,var(--border-s),rgba(30,42,64,.2)) border-box;
          display:grid; grid-template-columns:80px 1fr;
          transition:transform .3s,box-shadow .3s,background .4s;
        }
        .edu-card:hover {
          transform:translateY(-4px); box-shadow:0 16px 44px var(--shadow);
          background:linear-gradient(var(--bg-hover),var(--bg-hover)) padding-box,
                      linear-gradient(135deg,var(--ea,var(--accent)),rgba(139,92,246,.3)) border-box;
        }
        @media(max-width:600px){ .edu-card { grid-template-columns:1fr; } }
        .edu-logo {
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,var(--ea,rgba(99,102,241,.15)),var(--ea,rgba(99,102,241,.05)));
          font-family:'Space Grotesk',sans-serif; font-size:28px; font-weight:700;
          color:var(--ea,var(--accent)); border-right:1px solid var(--border);
          text-shadow:0 0 20px var(--ea,var(--accent));
          transition:background .4s, border-color .3s;
        }
        @media(max-width:600px){ .edu-logo { display:none; } }
        .edu-body   { padding:26px 28px; }
        .edu-period { font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--ea,var(--accent)); margin-bottom:8px; background:var(--a-dim); border:1px solid rgba(99,102,241,.2); padding:3px 10px; border-radius:20px; display:inline-block; }
        .edu-school { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; color:var(--text); margin-bottom:2px; transition:color .4s; }
        .edu-deg    { font-size:13px; color:var(--ea,var(--accent)); margin-bottom:2px; font-weight:500; }
        .edu-spec   { font-size:15px; color:var(--text-2); font-weight:600; margin-bottom:0; }
        .edu-divider { height:1px; background:var(--border); margin:14px 0; }
        .edu-item-list { list-style:none; display:flex; flex-direction:column; gap:9px; }
        .edu-item {
          display:flex; align-items:flex-start; gap:10px;
          font-size:13.5px; color:var(--text-3); line-height:1.72;
        }
        .edu-item-dot {
          flex-shrink:0; margin-top:5px; width:6px; height:6px;
          border-radius:50%; background:var(--ea,var(--accent));
          box-shadow:0 0 6px var(--ea,var(--accent)); opacity:.75;
        }

        /* ═══════════════════════════════════════
           CONTACT
        ═══════════════════════════════════════ */

        .contact-wrap {
          max-width:580px; margin:0 auto; text-align:center;
          background:linear-gradient(145deg,var(--bg-card),var(--bg-hover));
          border:1px solid rgba(99,102,241,.22); border-radius:22px; padding:52px 44px;
          box-shadow:0 0 80px rgba(99,102,241,.06),inset 0 1px 0 rgba(255,255,255,.04);
          position:relative; overflow:hidden;
          transition:background .4s;
        }
        .contact-wrap::before {
          content:''; position:absolute; top:-60%; left:50%; transform:translateX(-50%);
          width:360px; height:360px; border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%);
        }
        .c-head { font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:700; color:var(--text); margin-bottom:12px; position:relative; transition:color .4s; }
        .c-sub  { color:var(--text-3); font-size:15px; margin-bottom:36px; line-height:1.8; position:relative; transition:color .4s; }
        .c-links { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; position:relative; }
        .c-link {
          display:inline-flex; align-items:center; gap:8px;
          color:var(--accent); background:var(--a-dim); border:1px solid rgba(99,102,241,.25);
          padding:11px 20px; border-radius:10px; text-decoration:none;
          font-weight:500; font-size:14px; font-family:'Inter',sans-serif; transition:all .25s;
        }
        .c-link:hover { background:var(--a-dim2); border-color:var(--accent); transform:translateY(-2px); box-shadow:0 8px 28px rgba(99,102,241,.22); }

        /* ─── Footer ─── */
        footer {
          text-align:center; padding:40px 32px; border-top:1px solid var(--border);
          font-family:'JetBrains Mono',monospace; font-size:12px;
          letter-spacing:.5px; color:var(--footer-c); transition:color .4s, border-color .3s;
        }
        footer b {
          background:linear-gradient(135deg,var(--accent),var(--accent-2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:600;
        }
      `}</style>

      <div className="noise" />
      <div className="progress" style={{ width: `${scrollProgress}%` }} />

      {/* ── Side dots ── */}
      <nav className="side-dots">
        {SECTIONS.map(s => (
          <button key={s} className={`side-dot${activeSection === s ? " on" : ""}`}
            onClick={() => goto(s)} title={NAV_LABELS[s]} />
        ))}
      </nav>

      {/* ── Top nav ── */}
      <nav className="topnav">
        <div className="nav-wrap">
          <div className="nav-logo" onClick={() => goto("hero")}>MT<em>.</em></div>
          <div className="nav-right">
            <ul className="nav-list">
              {SECTIONS.map(s => (
                <li key={s}>
                  <button className={`nav-btn${activeSection === s ? " active" : ""}`} onClick={() => goto(s)}>
                    {NAV_LABELS[s]}
                  </button>
                </li>
              ))}
            </ul>
            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={() => setIsDark(d => !d)}
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <span className="t-icon sun">☀️</span>
              <span className="t-icon moon">🌙</span>
            </button>
            <button className="nav-burger" onClick={() => setMenuOpen(o => !o)}>{menuOpen ? "✕" : "☰"}</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div id="hero" className={vis("hero")}>
        <div className="hero-grid" />
        <div className="hero-orb-a" /><div className="hero-orb-b" /><div className="hero-orb-c" />

        <div className="hero-inner">
          {/* Left: content */}
          <div>
            <div className="hero-chip">
              <span className="hero-chip-dot" />
              Disponible · CDI · France
            </div>
            <h1 className="hero-name">Mor Talla</h1>
            <div className="hero-role">
              {typeText}
              <span className="hero-caret" style={{ opacity: typeCaret ? 1 : 0 }} />
            </div>
            <p className="hero-sub">
              Ingénieur logiciel chez <strong>SLB (Schlumberger)</strong>, en Mastère Spécialisé{" "}
              <strong>Architecture Digitale Bac+6</strong> à Télécom Paris.{" "}
              Je conçois des APIs robustes, systèmes distribués et architectures SI modernes.
            </p>
            <div className="hero-ctas">
              <button className="btn-p" onClick={() => goto("projects")}>Voir mes projets</button>
              <button className="btn-o" onClick={() => goto("contact")}>Me contacter</button>
              <a className="btn-cv" href="/cv-mor-talla.pdf" download="CV_Mor_Talla_2026.pdf">
                <span className="btn-cv-inner">
                  <span className="btn-cv-arrow">↓</span> Télécharger CV
                </span>
              </a>
            </div>
            <div className="hero-stats">
              {[
                { v: c3,  s: "+", l: "Expériences" },
                { v: c6,  s: "",  l: "Projets" },
                { v: c20, s: "+", l: "Technologies" },
                { v: c2,  s: "",  l: "Diplômes" },
              ].map(({ v, s, l }) => (
                <div key={l}><div className="stat-val">{v}{s}</div><div className="stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="photo-wrap">
            <div className="photo-ring" />
            <img src="/avatar.jpeg" alt="Mor Talla" className="photo-img" />
            <div className="photo-glow" />
            <div className="photo-badge">🎓 Ingénieur Logiciel</div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className={`wrap ${vis("about")} stagger`} id="about">
        <span className="sec-label">01 — À propos</span>
        <h2 className="sec-title">Qui suis-je</h2>
        <div className="about-grid">
          <div>
            <p className="about-p">
              Ingénieur généraliste diplômé de l'<span className="hl">ESIGELEC</span>, je poursuis un
              Mastère Spécialisé en <span className="hl">Architecture Digitale d'Entreprise</span> à Télécom Paris.
              En parallèle, je travaille comme Software Engineer chez <span className="hl">SLB</span> sur
              l'écosystème Maxwell — développement d'outils de QC automatisé et de monitoring temps réel.
            </p>
            <p className="about-p">
              Mon parcours couvre le <span className="hl">développement full-stack</span>, les architectures
              distribuées, l'<span className="hl">IoT industriel</span>, la cybersécurité et la transformation
              digitale. Je vise un CDI en tant qu'Ingénieur Logiciel & Architecte Technique SI.
            </p>
          </div>
          <div className="info-chips">
            {[["📍","France"],["🎓","Télécom Paris · ESIGELEC"],["💼","SLB · Engineer"],["🌐","FR · EN · AR"]].map(([ic, tx]) => (
              <div className="chip" key={tx}><span>{ic}</span>{tx}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className={`wrap ${vis("skills")} stagger`} id="skills">
        <span className="sec-label">02 — Compétences</span>
        <h2 className="sec-title">Stack Technique</h2>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...skillCategories.flatMap(c => c.skills), ...skillCategories.flatMap(c => c.skills)].map((s, i) => (
              <span className="m-tag" key={i}>{s}</span>
            ))}
          </div>
        </div>
        <div className="skills-grid">
          {skillCategories.map(cat => (
            <div className="sk-card" key={cat.category}
              style={{ "--c": cat.color, "--cbg": `${cat.color}14`, "--cbd": `${cat.color}38` }}>
              <div className="sk-head"><div className="sk-dot" />{cat.category}</div>
              <div className="sk-tags">{cat.skills.map(s => <span className="sk-tag" key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className={`wrap ${vis("experience")} stagger`} id="experience">
        <span className="sec-label">03 — Expériences</span>
        <h2 className="sec-title">Parcours Professionnel</h2>
        <div className="tl">
          {experiences.map((exp, i) => (
            <div className="tl-row" key={i}>
              <div className={`tl-dot${exp.current ? " now" : ""}`} />
              <div className="tl-card">
                <div className="tl-header">
                  <div>
                    <div className="tl-role">{exp.role}</div>
                    <div className="tl-co">
                      {exp.company}
                      <span className="tl-co-dot" />
                      {exp.location}
                    </div>
                  </div>
                  <span className="tl-period">{exp.period}{exp.current ? " · Actuel" : ""}</span>
                </div>
                <div className="tl-divider" />
                <ul className="task-list">
                  {exp.tasks.map((t, j) => (
                    <li className="task-item" key={j}>
                      <span className="task-bullet" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="tl-tags">{exp.tags.map(t => <span className="tl-tag" key={t}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className={`wrap ${vis("projects")} stagger`} id="projects">
        <span className="sec-label">04 — Projets</span>
        <h2 className="sec-title">Réalisations</h2>
        <div className="bento">
          {projects.map((p, i) => (
            <div className="p-card" key={i}
              style={{ "--pa": p.accent, "--pb": `${p.accent}14`, "--pc": `${p.accent}38` }}
              onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="p-type">{p.type}{p.inProgress && <span className="p-wip">En cours</span>}</div>
              <div className="p-title">{p.title}</div>
              <div className="p-divider" />
              <ul className="p-task-list">
                {p.tasks.map((t, j) => (
                  <li className="p-task-item" key={j}>
                    <span className="p-task-bullet" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="p-tags">{p.tags.map(t => <span className="p-tag" key={t}>{t}</span>)}</div>
              {p.link && (
                <a className="p-link" href={p.link} target="_blank" rel="noreferrer">
                  Voir le prototype <span className="p-link-arrow">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className={`wrap ${vis("education")} stagger`} id="education">
        <span className="sec-label">05 — Formation</span>
        <h2 className="sec-title">Parcours Académique</h2>
        <div className="edu-list">
          {education.map((edu, i) => (
            <div className="edu-card" key={i} style={{ "--ea": edu.accent }}>
              <div className="edu-logo">{edu.logo}</div>
              <div className="edu-body">
                <div className="edu-period">{edu.period}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-deg">{edu.degree}</div>
                <div className="edu-spec">{edu.specialty}</div>
                <div className="edu-divider" />
                <ul className="edu-item-list">
                  {edu.items.map((item, j) => (
                    <li className="edu-item" key={j}>
                      <span className="edu-item-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className={`wrap ${vis("contact")} stagger`} id="contact">
        <span className="sec-label">06 — Contact</span>
        <h2 className="sec-title">Travaillons ensemble</h2>
        <div className="contact-wrap">
          <div className="c-head">Prêt à collaborer</div>
          <p className="c-sub">
            Ouvert aux opportunités CDI, missions freelance et collaborations techniques.<br />
            N'hésitez pas à me contacter.
          </p>
          <div className="c-links">
            <a className="c-link" href="mailto:mortalla23102001@gmail.com">✉ Email</a>
            <a className="c-link" href="https://www.linkedin.com/in/mor-talla-047893266/" target="_blank" rel="noreferrer">in LinkedIn</a>
            <a className="c-link" href="https://github.com/mortalla23" target="_blank" rel="noreferrer">⌥ GitHub</a>
            <a className="c-link" href="tel:+33609113541">✆ Téléphone</a>
          </div>
          <div style={{marginTop:"28px",display:"flex",justifyContent:"center"}}>
            <a className="btn-cv" href="/cv-mor-talla.pdf" download="CV_Mor_Talla_2026.pdf" style={{fontSize:"14px",padding:"13px 32px"}}>
              <span className="btn-cv-inner">
                <span className="btn-cv-arrow">↓</span> Télécharger mon CV
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} <b>Mor Talla</b> — Conçu avec passion · France</footer>
    </>
  );
}
