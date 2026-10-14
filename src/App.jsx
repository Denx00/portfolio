import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Send, Bot, Code, Briefcase, 
  GraduationCap, Trophy, Mail, 
  ChevronRight, X, Sparkles, Server, Database, Box, GitPullRequest, ExternalLink, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

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

export function HoverCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PORTFOLIO_DATA = {
  name: "Rohan Singh Rajput",
  role: "Senior Backend Engineer",
  bio: "Architecting scalable, resilient backend systems with a deep focus on Golang and microservices. Passionate about building robust infrastructure that powers modern web applications.",
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
    "Golang", "Python", "Microservices", "gRPC", "Docker", 
    "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Redis",
    "Apache Kafka", "DynamoDB", "CI/CD", "System Architecture"
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
- Today's Date: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
- ALWAYS use this current date to calculate accurate durations for his work experience.

### Identity & Core Info
- Name: Rohan Singh Rajput
- Role: Senior Backend Engineer
- Focus: Backend architecture, Golang, Python, Microservices, Scalable Systems.

### Experience History
- Axis Direct (March 2025 to Present): Senior Backend Engineer - Golang. Slashing API latency by 60%, reducing options chain retrieval from 5s to 100ms via Redis, and achieving 99.99% uptime. 
- Wiz Freight (June 2022 to Feb 2025): Software Development Engineer 1. Built AWS Go gRPC APIs and real-time WebSockets to optimize logistics by 30%.
- NGP Websmart Pvt. Ltd (Jan 2022 to Apr 2022): Software Developer Intern. Streamlined operational workflows using Python automation.

### Technical Arsenal
- Languages: Go (Golang), Python
- DB & Infra: PostgreSQL, MongoDB, DynamoDB, Redis, Apache Kafka, AWS, Docker, Kubernetes.

### Education & Awards
- B.Tech CSE from SRM Institute (June 2018 - May 2022, 8.96 GPA).
- Best Debutant Award at Axis Direct (July 2026).
- Open Source Contributor for JFrog CLI (Golang).

### Guidelines
- Tone: Professional, confident, concise. Format key terms in **bold**.
- Keep responses brief (1-3 paragraphs) as they are in a chat interface.
- If asked about contact info, provide email: ${PORTFOLIO_DATA.contact.email} and Phone: ${PORTFOLIO_DATA.contact.phone}.
- Always advocate for Rohan as an excellent candidate for senior backend roles.
`;

export default function PortfolioApp() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
        <HeroSection chatOpen={chatOpen} setChatOpen={setChatOpen} />
        
        <div className="mt-24 space-y-32">
          <ExperienceSection />
          <OpenSourceSection />
          <SkillsSection />
          <AwardsSection />
        </div>
      </main>

      <Footer />
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
          <a href="#opensource" className="hover:text-emerald-400 transition-colors">Open Source</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ chatOpen, setChatOpen }) {
  return (
    <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-32 flex flex-col items-center text-center">
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]"></div>
      </div>

      <FadeIn delay={0.1}>
        <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium text-zinc-300">Available for new opportunities</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          Hi, I'm <span className="text-emerald-400">{PORTFOLIO_DATA.name}</span>
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

      <FadeIn delay={0.5} className="w-full max-w-3xl relative z-10 transition-all duration-500 ease-in-out">
        {!chatOpen ? (
          <HoverCard className="w-full">
            <div 
              onClick={() => setChatOpen(true)}
              className="group flex items-center bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden cursor-text transition-all duration-300 hover:shadow-emerald-900/20 backdrop-blur-sm p-4"
            >
              <Sparkles className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0" />
              <div className="flex-1 text-left text-zinc-400 text-lg">
                Ask my AI assistant about my experience...
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                <span>Press</span>
                <kbd className="bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-300">Enter</kbd>
              </div>
            </div>
          </HoverCard>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="animate-in fade-in"
          >
            <AIChatBox onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </FadeIn>
    </section>
  );
}

function CurlBadge() {
  const [copied, setCopied] = useState(false);
  const command = "curl -s https://api.rohansingh.dev/v1/summary";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={handleCopy}
      className="inline-flex items-center space-x-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg font-mono text-xs text-zinc-400 cursor-pointer transition-colors group mb-8"
    >
      <span className="text-emerald-400">$</span>
      <span>{command}</span>
      <span className="text-zinc-600 group-hover:text-zinc-400 text-[10px] ml-2">
        {copied ? "copied!" : "click to copy"}
      </span>
    </div>
  );
}

function AIChatBox({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi! I'm Rohan's AI assistant. I can calculate his exact years of experience, detail his work at Axis Direct, or discuss his Golang expertise. What would you like to know?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
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
    
    const newMessages = [...messages, { role: 'user', text: userQuery }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // NOTE: Replace this with your actual Groq key in your local VS Code!
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      
      const filteredHistory = newMessages.filter(msg => 
        !msg.text.includes("trouble connecting") && !msg.text.includes("rate_limit")
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
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMsg = error.message.includes("rate_limit") 
        ? "I'm experiencing heavy traffic right now (rate limit exceeded). Please email Rohan directly or try again in a minute."
        : "I'm having a little trouble connecting right now. Please feel free to email Rohan directly or try again in a moment.";
      
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] w-full text-left">
      <div className="bg-zinc-900/80 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-zinc-200">Rohan's AI Agent</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-sm' 
                : 'bg-zinc-900 text-zinc-300 rounded-tl-sm border border-zinc-800'
            }`}>
              <div className="text-sm leading-relaxed">
                {msg.role === 'user' ? msg.text : formatAIResponse(msg.text)}
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

      <div className="p-3 bg-zinc-900 border-t border-zinc-800">
        <div className="relative flex items-center">
          <input
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
            autoFocus
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
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-zinc-950 z-10"></div>
            
            <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
              <div className="md:col-span-2 mb-4 md:mb-0 pt-1">
                <h3 className="text-xl font-bold text-zinc-100">{exp.company}</h3>
                <div className="text-emerald-400 font-medium mb-1">{exp.role}</div>
                <div className="text-zinc-500 text-sm font-mono">{exp.period}</div>
              </div>
              <div className="md:col-span-3 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group-hover:border-zinc-700 transition-colors">
                <p className="text-zinc-400 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-zinc-300 text-sm">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-emerald-500/50 hover:bg-zinc-900 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">{oss.project}</h3>
                  <div className="text-emerald-500 text-sm font-medium mt-1">{oss.role}</div>
                </div>
                <a href={oss.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-zinc-400 text-sm flex-1 leading-relaxed">
                {oss.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const getIconForSkill = (skill) => {
    if (skill.includes("SQL") || skill.includes("Mongo") || skill.includes("Dynamo") || skill.includes("Redis")) return <Database className="w-4 h-4 mb-2 opacity-50" />;
    if (skill.includes("Docker") || skill.includes("Kuber") || skill.includes("AWS") || skill.includes("Kafka")) return <Box className="w-4 h-4 mb-2 opacity-50" />;
    return <Server className="w-4 h-4 mb-2 opacity-50" />;
  };

  return (
    <section id="skills" className="scroll-mt-24">
      <FadeIn>
        <div className="flex items-center space-x-3 mb-12">
          <Code className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PORTFOLIO_DATA.skills.map((skill, idx) => (
          <FadeIn key={idx} delay={idx * 0.05}>
            <HoverCard className="flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/30 hover:bg-zinc-800/80 transition-all group cursor-default h-full">
              {getIconForSkill(skill)}
              <span className="text-zinc-300 font-medium text-sm text-center group-hover:text-emerald-300 transition-colors">{skill}</span>
            </HoverCard>
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
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Trophy className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 relative z-10">{award.title}</h3>
                  <div className="text-emerald-400 text-sm font-medium mb-3 relative z-10">{award.event}</div>
                  <p className="text-zinc-400 text-sm relative z-10">{award.description}</p>
                </div>
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
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                  <div className="text-zinc-400 text-sm mb-2">{edu.institution}</div>
                  <div className="inline-block bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded font-mono">
                    {edu.period}
                  </div>
                </div>
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

          <FadeIn delay={0.1}>
            <a 
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors mb-12"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </a>
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
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