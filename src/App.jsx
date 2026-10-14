import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Send, Bot, Code, Briefcase, 
  GraduationCap, Trophy, Mail, Download,
  ChevronRight, X, Sparkles, Server, Database, Box, GitPullRequest, ExternalLink, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM CSS FOR ANIMATIONS ---
const StyleBlock = () => (
  <style>{`
    /* Architectural Grid Background */
    .bg-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }

    /* Infinite Marquee */
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: scroll 30s linear infinite;
      display: flex;
      width: max-content;
    }

    /* Crisp Cyber Glitch (Applied only to the emerald name span) */
    .glitch-text {
      position: relative;
      display: inline-block;
    }
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      opacity: 0;
      pointer-events: none;
    }
    .glitch-text::before {
      left: 2px;
      text-shadow: -2px 0 #10b981;
      animation: glitch-anim 2.5s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      left: -2px;
      text-shadow: 2px 0 #047857;
      animation: glitch-anim 3s infinite linear alternate-reverse;
    }

    /* Tight keyframe intervals (93%-100%) so slices snap instead of sliding */
    @keyframes glitch-anim {
      0%, 93% { opacity: 0; clip-path: inset(0 0 0 0); transform: translate(0); }
      94% { opacity: 1; clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
      96% { opacity: 1; clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
      98% { opacity: 1; clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
      99% { opacity: 1; clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
      100% { opacity: 0; clip-path: inset(0 0 0 0); transform: translate(0); }
    }

    /* Single-fire burst class triggered on mouse enter, automatically resets */
    .glitch-burst::before {
      animation: glitch-Once-1 0.35s steps(1, end) 1 !important;
    }
    .glitch-burst::after {
      animation: glitch-Once-2 0.35s steps(1, end) 1 !important;
    }

    @keyframes glitch-Once-1 {
      0% { opacity: 1; clip-path: inset(15% 0 75% 0); transform: translate(-3px, 1px); }
      25% { opacity: 1; clip-path: inset(65% 0 10% 0); transform: translate(3px, -1px); }
      50% { opacity: 1; clip-path: inset(35% 0 45% 0); transform: translate(-3px, 2px); }
      75% { opacity: 1; clip-path: inset(80% 0 5% 0); transform: translate(3px, -2px); }
      100% { opacity: 0; clip-path: inset(0 0 0 0); transform: translate(0); }
    }

    @keyframes glitch-Once-2 {
      0% { opacity: 1; clip-path: inset(70% 0 10% 0); transform: translate(3px, -1px); }
      25% { opacity: 1; clip-path: inset(10% 0 80% 0); transform: translate(-3px, 2px); }
      50% { opacity: 1; clip-path: inset(50% 0 25% 0); transform: translate(3px, 1px); }
      75% { opacity: 1; clip-path: inset(25% 0 60% 0); transform: translate(-3px, -1px); }
      100% { opacity: 0; clip-path: inset(0 0 0 0); transform: translate(0); }
    }
  `}</style>
);

// --- ANIMATION COMPONENTS ---
export function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Vercel-style Mouse Spotlight Card + Pop-Out Scaling
export function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 hover:border-emerald-500/40 bg-zinc-900 transition-colors duration-300 hover:shadow-2xl hover:shadow-emerald-950/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

// --- PORTFOLIO DATA ---
const PORTFOLIO_DATA = {
  name: "Rohan Singh Rajput",
  role: "Senior Backend Engineer",
  bio: "Senior Backend Engineer with nearly 5 years of experience architecting scalable, resilient systems with a deep focus on Golang and microservices. Passionate about building robust infrastructure that powers modern web applications.",
  experience: [
    {
      company: "Axis Direct",
      role: "Senior Backend Engineer - Golang",
      period: "March 2025 - Present",
      description: "Leading backend architecture, optimizing database performance, and scaling microservices.",
      achievements: [
        "Overhauled the Security Master platform architecture, slashing API latency by 60%",
        "Optimized options chain data retrieval, reducing peak response times from 5s to under 100ms with Redis",
        "Elevated system reliability to 99.99% uptime and mentored 4 engineers"
      ]
    },
    {
      company: "Wiz Freight",
      role: "Software Development Engineer 1",
      period: "June 2022 - Feb 2025",
      description: "Developed and maintained core backend services for logistics and supply chain management.",
      achievements: [
        "Optimized AWS-deployed task management system, reducing manual intervention by 30% using Go gRPC APIs",
        "Enhanced logistics algorithms and ERD workflows using real-time WebSocket integrations"
      ]
    },
    {
      company: "NGP Websmart Pvt. Ltd",
      role: "Software Developer Intern",
      period: "Jan 2022 - Apr 2022",
      description: "Engineered custom automation scripts to streamline routine operational workflows.",
      achievements: [
        "Drove a 15% improvement in team productivity using Python automation"
      ]
    }
  ],
  skills: [
    {
      category: "Languages & Data",
      items: ["Golang", "Python", "PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
      icon: "Database"
    },
    {
      category: "Architecture",
      items: ["Microservices", "Event-Driven", "gRPC", "RESTful APIs", "WebSockets", "Apache Kafka"],
      icon: "Server"
    },
    {
      category: "Cloud & Infra",
      items: ["AWS (S3, SQS)", "Docker", "Kubernetes", "HashiCorp Vault"],
      icon: "Box"
    },
    {
      category: "DevOps & Tools",
      items: ["Jenkins", "JFrog", "Git", "Dynatrace"],
      icon: "Terminal"
    }
  ],
  awards: [
    {
      title: "Best Debutant Award",
      event: "Axcellence 2026, Axis Direct",
      description: "Awarded for outstanding platform impact, driving rapid architectural improvements and stability."
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering (GPA: 8.96)",
      institution: "SRM Institute of Science and Technology",
      period: "June 2018 - May 2022"
    }
  ],
  openSource: [
    {
      project: "JFrog CLI",
      role: "Contributor",
      description: "Engineered automated Bitbucket tag creation triggered by new JFrog/Artifactory releases via Go.",
      link: "https://github.com/goyalayush0610/jfrog-cli/pull/2"
    }
  ],
  contact: {
    email: "rsr86854@gmail.com",
    phone: "+91-7665505428",
    linkedin: "rohansinghrajput06",
    github: "Denx00"
  }
};

const SYSTEM_PROMPT = `
You are the personal AI representative and professional assistant for Rohan Singh Rajput. 
You are speaking with a recruiter or engineering manager who is visiting Rohan's portfolio.
Your goal is to answer their questions about Rohan's experience, skills, and qualifications persuasively and accurately based ONLY on the provided information.

### Current Context
- Today's Date: 
${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
- ALWAYS use this current date to calculate accurate durations for his work experience.

### Identity & Core Info
- Name: Rohan Singh Rajput
- Role: Senior Backend Engineer
- Experience: nearly 5 years of total professional backend experience.
- Focus: Backend architecture, Golang, Python, Microservices, Scalable Systems.

### Experience History
- Axis Direct (March 2025 to Present): Senior Backend Engineer - Golang. Slashing API latency by 60%, reducing options chain retrieval from 5s to 100ms via Redis, and achieving 99.99% uptime. 
- Wiz Freight (June 2022 to Feb 2025): Software Development Engineer 1. Built AWS Go gRPC APIs and real-time WebSockets to optimize logistics by 30%.
- NGP Websmart Pvt. Ltd (Jan 2022 to Apr 2022): Software Developer Intern. Streamlined operational workflows using Python automation.

### Technical Arsenal
- Architecture: Microservices, Event-Driven Architecture, gRPC, RESTful APIs, WebSockets, Apache Kafka.
- Infrastructure: AWS (S3, SQS), Docker, Kubernetes, HashiCorp Vault.
- Databases: PostgreSQL, MongoDB, DynamoDB, Redis.
- DevOps: Jenkins, JFrog, Git, Dynatrace.

### Education & Awards
- B.Tech CSE from SRM Institute (June 2018 - May 2022, 8.96 GPA).
- Best Debutant Award at Axis Direct (July 2026).
- Open Source Contributor for JFrog CLI (Golang).

### Guidelines
- Tone: Professional, confident, concise. Format key terms in **bold**.
- Keep responses brief (1-3 paragraphs) as they are in a chat interface.
- If asked about contact info, provide email: 
${PORTFOLIO_DATA.contact.email} and Phone: ${PORTFOLIO_DATA.contact.phone}.
- Always advocate for Rohan as an excellent candidate for senior backend roles.
`;

export default function PortfolioApp() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative">
      <StyleBlock />
      
      {/* Structural Network Background */}
      <div className="absolute inset-0 z-0 bg-grid pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
          <HeroSection chatOpen={chatOpen} setChatOpen={setChatOpen} />
          <div className="mt-24 space-y-32">
            <ExperienceSection />
            <SkillsSection />
            <OpenSourceSection />
            <AwardsSection />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-6 h-6 text-emerald-400" />
          <span className="text-white font-bold text-xl tracking-tight">Rohan<span className="text-emerald-500">.dev</span></span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-zinc-400">
          <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
          <a href="#opensource" className="hover:text-emerald-400 transition-colors">Open Source</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ chatOpen, setChatOpen }) {
  const [bursting, setBursting] = useState(false);
  const marqueeTech = ["GOLANG", "MICROSERVICES", "AWS", "POSTGRESQL", "KAFKA", "REDIS", "DOCKER", "KUBERNETES", "PYTHON", "gRPC"];

  const triggerGlitchBurst = () => {
    if (bursting) return;
    setBursting(true);
    setTimeout(() => setBursting(false), 350);
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-32 flex flex-col items-center text-center">
      
      <FadeIn delay={0.1}>
        <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium text-zinc-300">Available for new opportunities</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 select-none">
          Hi, I'm{' '}
          <span 
            onMouseEnter={triggerGlitchBurst}
            className={`text-emerald-400 glitch-text cursor-pointer ${bursting ? 'glitch-burst' : ''}`}
            data-text={PORTFOLIO_DATA.name}
          >
            {PORTFOLIO_DATA.name}
          </span>
        </h1>
      </FadeIn>
      
      <FadeIn delay={0.3}>
        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mb-8">
          {PORTFOLIO_DATA.role} specializing in scalable infrastructure, microservices, and high-performance Golang backend systems.
        </p>
      </FadeIn>

      <FadeIn delay={0.4}>
        <CurlBadge />
      </FadeIn>

      {/* Infinite Tech Stack Marquee */}
      <FadeIn delay={0.5} className="w-full overflow-hidden border-y border-zinc-800/50 bg-zinc-900/30 py-3 my-10 backdrop-blur-sm">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 mx-6">
              {marqueeTech.map((tech, j) => (
                <span key={j} className="text-zinc-500 font-mono text-sm tracking-widest flex items-center">
                  {tech}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 ml-12"></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.6} className="w-full max-w-3xl relative z-20 mt-8">
        <AnimatePresence mode="wait">
          {!chatOpen ? (
            <motion.div 
              key="chat-trigger"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => setChatOpen(true)}
              className="group flex items-center bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden cursor-text transition-colors duration-300 hover:shadow-emerald-900/20 backdrop-blur-sm p-4"
            >
              <Sparkles className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0" />
              <div className="flex-1 text-left text-zinc-400 text-lg">
                Ask my AI assistant about my experience...
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                <span>Press</span>
                <kbd className="bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-300">Enter</kbd>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chat-box"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1.02, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="w-full py-2"
            >
              <AIChatBox onClose={() => setChatOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}

function CurlBadge() {
  const [copied, setCopied] = useState(false);
  const command = "curl -s https://rohanrajput.is-a.dev/summary.json";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className="inline-flex items-center space-x-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-xs text-zinc-400 cursor-pointer transition-colors group mb-2 hover:shadow-lg hover:shadow-emerald-900/20"
    >
      <span className="text-emerald-400">$</span>
      <span>{command}</span>
      <span className="text-zinc-600 group-hover:text-zinc-400 text-[10px] ml-2">
        {copied ? "copied!" : "click to copy"}
      </span>
    </motion.div>
  );
}

function AIChatBox({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm Rohan's AI assistant. I can calculate his exact years of experience, detail his work at Axis Direct, or discuss his Golang expertise. What would you like to know?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxWrapperRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // On mount: focus input WITHOUT jumping the page, and center the whole chat box in the viewport
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });

    const timer = setTimeout(() => {
      chatBoxWrapperRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Scroll internal message container only when new messages arrive
  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (messages.length <= 1) {
      chatContainerRef.current.scrollTop = 0;
    } else {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const formatAIResponse = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-emerald-400 font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue('');
    
    const newMessages = [...messages, { role: 'user', content: userQuery }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      
      const filteredHistory = newMessages.filter(msg => 
        !msg.content.includes("trouble connecting") && !msg.content.includes("rate_limit")
      );

      const payload = {
        model: "qwen/qwen3.8-27b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...filteredHistory
        ]
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("rate_limit_exceeded");
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0].message) {
        const aiResponse = data.choices[0].message.content;
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMsg = error.message.includes("rate_limit") 
        ? "I'm experiencing heavy traffic right now (rate limit exceeded). Please email Rohan directly or try again in a minute."
        : "I'm having a little trouble connecting right now. Please feel free to email Rohan directly or try again in a moment.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={chatBoxWrapperRef}
      className="bg-zinc-900 border border-emerald-500/40 ring-1 ring-emerald-500/20 rounded-2xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col h-[420px] w-full text-left scroll-mt-24"
    >
      {/* Top Header with Close Cross */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-zinc-100">Rohan's AI Agent</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <button 
          onClick={onClose}
          title="Close chat (Esc)"
          className="p-1.5 bg-zinc-800/80 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-300 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/60 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-sm' 
                : 'bg-zinc-900 text-zinc-200 rounded-tl-sm border border-zinc-800'
            }`}>
              <div className="text-sm leading-relaxed">
                {msg.role === 'user' ? msg.content : formatAIResponse(msg.content)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex space-x-2 items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex-shrink-0">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about my backend architecture experience..."
            className="w-full bg-zinc-950 text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 border border-zinc-800 placeholder-zinc-500"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 bg-emerald-500 text-zinc-950 rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <FadeIn>
        <div className="flex items-center space-x-3 mb-12">
          <Briefcase className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-white">Experience</h2>
        </div>
      </FadeIn>
      
      <div className="relative border-l border-zinc-800 ml-4 space-y-12 pb-4">
        {PORTFOLIO_DATA.experience.map((exp, idx) => (
          <FadeIn key={idx} delay={0.1 * idx} className="relative pl-8 md:pl-12 group">
            {/* Interactive Timeline Dot */}
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-zinc-950 z-10 transition-all duration-300 group-hover:scale-150 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_#10b981]"></div>
            
            <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
              {/* Pop-Out Company Info Block */}
              <div className="md:col-span-2 mb-4 md:mb-0 pt-1 origin-left transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105 hover:!scale-110 cursor-default">
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">{exp.company}</h3>
                <div className="text-emerald-400 font-medium mb-1">{exp.role}</div>
                <div className="text-zinc-500 text-sm font-mono group-hover:text-zinc-400 transition-colors">{exp.period}</div>
              </div>
              
              {/* Spotlight Card with Pop-Out */}
              <div className="md:col-span-3">
                <SpotlightCard className="p-6">
                  <p className="text-zinc-400 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="text-zinc-300 text-sm">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const getCategoryIcon = (iconName) => {
    switch(iconName) {
      case 'Code': return <Code className="w-5 h-5 text-emerald-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Box': return <Box className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      default: return <Code className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="scroll-mt-24">
      <FadeIn>
        <div className="flex items-center space-x-3 mb-12">
          <Code className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} className="h-full">
            <SpotlightCard className="h-full p-6 group">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-800/50">
                {getCategoryIcon(skillGroup.icon)}
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">{skillGroup.category}</h3>
              </div>
              <ul className="space-y-3 relative z-10">
                {skillGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center text-zinc-400 hover:text-zinc-100 transition-all duration-200 hover:translate-x-1 cursor-default">
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function OpenSourceSection() {
  return (
    <section id="opensource" className="scroll-mt-24">
      <FadeIn>
        <div className="flex items-center space-x-3 mb-12">
          <GitPullRequest className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-white">Open Source</h2>
        </div>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.openSource.map((oss, idx) => (
          <FadeIn key={idx} delay={0.1 * idx} className="h-full">
            <SpotlightCard className="h-full p-6 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">{oss.project}</h3>
                  <div className="text-emerald-500 text-sm font-medium mt-1">{oss.role}</div>
                </div>
                <a href={oss.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors relative z-20">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-zinc-400 text-sm flex-1 leading-relaxed">
                {oss.description}
              </p>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function AwardsSection() {
  return (
    <section id="awards" className="scroll-mt-24">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <FadeIn>
            <div className="flex items-center space-x-3 mb-8">
              <Trophy className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Awards</h2>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {PORTFOLIO_DATA.awards.map((award, idx) => (
              <FadeIn key={idx} delay={0.1}>
                <SpotlightCard className="p-6 group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity z-0 pointer-events-none">
                    <Trophy className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1 relative z-10">{award.title}</h3>
                  <div className="text-emerald-400 text-sm font-medium mb-3 relative z-10">{award.event}</div>
                  <p className="text-zinc-400 text-sm relative z-10">{award.description}</p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>

        <div>
          <FadeIn>
            <div className="flex items-center space-x-3 mb-8">
              <GraduationCap className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <FadeIn key={idx} delay={0.1}>
                <SpotlightCard className="p-6 group">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1 relative z-10">{edu.degree}</h3>
                  <div className="text-zinc-400 text-sm mb-2 relative z-10">{edu.institution}</div>
                  <div className="inline-block bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded font-mono relative z-10">
                    {edu.period}
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-800 bg-zinc-950 mt-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-6">Let's build something great.</h2>
            <p className="text-zinc-400 mb-8">
              Currently open for new opportunities. Whether you have a question about scalable systems or just want to say hi, I'll try my best to get back to you!
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="flex justify-center items-center mb-12">
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              download="Rohan_Singh_Rajput_Resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </motion.a>
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="flex items-center text-zinc-500 hover:text-emerald-400 transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              <span className="font-mono text-sm">{PORTFOLIO_DATA.contact.email}</span>
            </a>
            <a href={`https://github.com/${PORTFOLIO_DATA.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-zinc-500 hover:text-emerald-400 transition-colors">
              <GithubIcon className="w-5 h-5 mr-2" />
              <span className="font-mono text-sm">{PORTFOLIO_DATA.contact.github}</span>
            </a>
            <a href={`https://linkedin.com/in/${PORTFOLIO_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-zinc-500 hover:text-emerald-400 transition-colors">
              <LinkedinIcon className="w-5 h-5 mr-2" />
              <span className="font-mono text-sm">{PORTFOLIO_DATA.contact.linkedin}</span>
            </a>
            <a href={`tel:${PORTFOLIO_DATA.contact.phone}`} className="flex items-center text-zinc-500 hover:text-emerald-400 transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-mono text-sm">{PORTFOLIO_DATA.contact.phone}</span>
            </a>
          </FadeIn>
        </div>
        <div className="mt-16 text-center text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}