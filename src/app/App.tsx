import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  ArrowLeft,
  Play,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  BookOpen,
  FileText,
  GraduationCap,
  Code2,
  Layers,
  Cpu,
  Gamepad2,
  Globe,
  Smartphone,
  Mail,
  Download,
  MapPin,
  ChevronDown,
  ChevronUp,
  Terminal,
  Award,
  Trophy
} from "lucide-react";
import {
  PROFILE,
  SOCIALS,
  CATS,
  PROJECTS,
  TIMELINE,
  SKILLS,
  BRAND_LOGOS,
  BLOGS,
  CERTIFICATIONS,
  COMPETITIONS,
  type Cat,
  type Project,
  type TimelineItem,
  type BlogPost
} from "./data";

// Low-fatigue Warm Dark Palette (Basalt, Muted Sage, and Sunset Gold Accent)
const P = {
  bg: "#131614", // Velvet obsidian-basalt (ultra-dark, zero-glare canvas)
  card: "#1C201E", // Warm dark charcoal (bento grid cells)
  deep: "#252B28", // Deep olive-slate (inner containers/chips)
  accent: "#DFC07A", // Sunset gold (focused highlighting for key call-to-actions)

  // High-contrast, easy-on-the-eyes text
  cream: "#F2ECD9", // Warm alabaster (highly legible primary text)
  muted: "#9AA79E", // Desaturated sage-grey (secondary text)
  border: "rgba(154, 167, 158, 0.12)" // Soft border outline
};

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram
};

const CAT_ICONS: Record<Cat, React.ElementType> = {
  All: Layers,
  Games: Gamepad2,
  Web: Globe,
  Mobile: Smartphone,
  AI: Cpu,
  Software: Code2
};

// 1. Updated SKILLS definition to map into clusters
const SKILLS_BY_CATEGORY = {
  "Interactive / Game Systems": {
    desc: "3D Engines, multiplayer networking, physics, rendering pipelines, and character animation.",
    skills: ["Unity", "C#", "Blender", "Mixamo", "Physics", "Multiplayer"]
  },
  "Full-Stack Web & Mobile": {
    desc: "Responsive web architectures, state management, and cross-platform mobile apps.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Next.js",
      "Firebase"
    ]
  },
  "Tools, Systems & Engine": {
    desc: "Version control, development CLIs, database configuration, and optimization techniques.",
    skills: ["Git", "GitHub", "PostgreSQL", "SQL", "Docker", "Optimization"]
  }
};

function BorderBeam({ active }: { active?: boolean }) {
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: "1.5px solid transparent",
          background: `linear-gradient(${P.card}, ${P.card}) padding-box, conic-gradient(from var(--beam-angle, 0deg), transparent 0%, ${P.accent} 20%, transparent 40%) border-box`,
          animation: "beam-spin 2.4s linear infinite"
        }}
      />
    </div>
  );
}

function BentoCard({
  children,
  className = "",
  style = {},
  beam = false,
  noPad = false
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  beam?: boolean;
  noPad?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-colors duration-300 group ${noPad ? "" : "p-5"} ${className}`}
      style={{
        background: P.card,
        border: `1px solid ${P.border}`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        ...style
      }}
    >
      {/* Smooth, static outline on hover instead of physical movement */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1.5px solid ${P.accent}`, zIndex: 3 }}
      />
      <BorderBeam active={beam} />
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

function Label({
  icon: Icon,
  text
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-5 h-5 rounded flex items-center justify-center"
        style={{ background: `${P.accent}15` }}
      >
        <Icon size={11} style={{ color: P.accent }} />
      </div>
      <span
        style={{
          color: P.cream,
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase"
        }}
      >
        {text}
      </span>
      <div className="flex-1 h-px" style={{ background: P.border }} />
    </div>
  );
}

function SocialChip({ s }: { s: (typeof SOCIALS)[0] }) {
  const [hov, setHov] = useState(false);
  const Icon = SOCIAL_ICONS[s.label] ?? Globe;
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 w-full text-left transition-all duration-200"
      style={{
        background: hov ? `${s.color}15` : P.deep,
        border: `1px solid ${hov ? s.color + "55" : "transparent"}`,
        boxShadow: hov ? `0 4px 12px ${s.color}15` : "none",
        minHeight: 48
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: hov ? `${s.color}25` : "rgba(0,0,0,0.2)" }}
      >
        <Icon size={15} style={{ color: hov ? s.color : P.muted }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          style={{
            color: P.cream,
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.2
          }}
        >
          {s.label}
        </p>
        <p
          style={{
            color: P.muted,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace"
          }}
        >
          {s.handle}
        </p>
      </div>
      <ExternalLink size={13} style={{ color: P.muted, flexShrink: 0 }} />
    </a>
  );
}

const TIMELINE_COLOR: Record<TimelineItem["type"], string> = {
  edu: P.muted,
  intern: P.accent
};

function TimelineNode({
  item,
  isLast
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const color = TIMELINE_COLOR[item.type];
  const Icon = item.type === "edu" ? GraduationCap : Briefcase;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: open ? `${color}15` : P.deep,
            border: `2px solid ${open ? color : "transparent"}`
          }}
        >
          <Icon size={15} style={{ color }} />
        </button>
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 mb-0"
            style={{
              background: `linear-gradient(to bottom, ${color}33, ${P.border})`,
              minHeight: 20
            }}
          />
        )}
      </div>
      <div className="flex-1 pb-5 min-w-0">
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p
                style={{
                  color: P.cream,
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.3
                }}
              >
                {item.role}
              </p>
              <p style={{ color: P.muted, fontSize: 13, fontWeight: 500 }}>
                {item.org}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  style={{
                    color: P.muted,
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {item.period}
                </span>
                {item.current && (
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(223, 192, 122, 0.15)",
                      border: `1px solid ${P.accent}`,
                      color: P.accent,
                      fontSize: 9,
                      fontWeight: 700
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>
            </div>
            <div style={{ color: P.muted, flexShrink: 0 }}>
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="mt-3 rounded-xl p-3"
                style={{ background: P.deep, border: `1px solid ${P.border}` }}
              >
                <p style={{ color: P.muted, fontSize: 11, marginBottom: 6 }}>
                  <MapPin
                    size={11}
                    style={{
                      display: "inline",
                      marginRight: 4,
                      verticalAlign: -1
                    }}
                  />
                  {item.location}
                </p>
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 mb-1.5 last:mb-0">
                    <span
                      style={{
                        color,
                        fontSize: 12,
                        flexShrink: 0,
                        marginTop: 1
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{ color: P.cream, fontSize: 13, lineHeight: 1.5 }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
                {item.tech && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md"
                        style={{
                          background: "rgba(0,0,0,0.2)",
                          border: `1px solid ${P.border}`,
                          color: P.accent,
                          fontSize: 10,
                          fontFamily: "'JetBrains Mono', monospace"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SkillGrid() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {Object.entries(SKILLS_BY_CATEGORY).map(([category, data]) => {
        const isCatHovered = hoveredCategory === category;

        return (
          <div
            key={category}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="flex flex-col rounded-xl p-4 transition-all duration-300 relative"
            style={{
              background: P.deep,
              border: `1.5px solid ${isCatHovered ? P.accent : "transparent"}`,
              boxShadow: isCatHovered
                ? `0 6px 20px rgba(223, 192, 122, 0.05)`
                : "none"
            }}
          >
            {/* Category Header */}
            <div className="mb-3">
              <h4
                style={{
                  color: isCatHovered ? P.accent : P.cream,
                  fontSize: 13,
                  fontWeight: 750,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s"
                }}
              >
                {category}
              </h4>
              <p
                style={{
                  color: P.muted,
                  fontSize: 11,
                  lineHeight: 1.4,
                  marginTop: 4
                }}
              >
                {data.desc}
              </p>
            </div>

            {/* Inner Connector Line */}
            <div
              className="w-full h-px mb-4"
              style={{ background: P.border }}
            />

            {/* Nodes (Skills) */}
            <div className="flex flex-wrap gap-2.5 mt-auto">
              {data.skills.map((skill) => {
                const brand = BRAND_LOGOS[skill];
                const color = brand?.color ?? P.cream;
                const isSkillHovered = hoveredSkill === skill;

                return (
                  <div
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-default select-none transition-all duration-200"
                    style={{
                      background: isSkillHovered ? `${color}15` : P.card,
                      border: `1.5px solid ${isSkillHovered ? color : "rgba(154, 167, 158, 0.1)"}`,
                      boxShadow: isSkillHovered
                        ? `0 4px 12px ${color}15`
                        : "none"
                    }}
                  >
                    {brand ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: brand.svg.replace(
                            /currentColor/g,
                            isSkillHovered ? color : "#9AA79E"
                          )
                        }}
                        style={{
                          width: 15,
                          height: 15,
                          display: "block",
                          transition: "all 0.2s"
                        }}
                      />
                    ) : (
                      <Code2
                        size={13}
                        style={{ color: isSkillHovered ? color : P.muted }}
                      />
                    )}
                    <span
                      style={{
                        color: isSkillHovered ? P.cream : P.muted,
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        transition: "color 0.2s"
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getEmbedUrl(url?: string) {
  if (!url) return null;
  if (
    url.includes("youtube.com") ||
    url.includes("youtube-nocookie.com") ||
    url.includes("vimeo.com")
  )
    return url;
  const driveMatch = url.match(/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]{10,})/);
  if (driveMatch?.[1])
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  return url;
}

function MediaCarousel({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const media =
    project.media.length > 0
      ? project.media
      : [{ type: "image" as const, thumb: "", label: project.name }];
  const cur = media[idx];
  const go = (n: number) => {
    setIdx((idx + n + media.length) % media.length);
    setPlaying(false);
  };
  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [project.id]);

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative rounded-xl overflow-hidden group"
        style={{
          aspectRatio: "16/9",
          border: `2px solid ${P.deep}`,
          boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
          background: P.deep
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={cur.thumb}
            alt={cur.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {cur.type === "video" && !playing && (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: P.accent,
                boxShadow: `0 4px 14px rgba(0,0,0,0.3)`
              }}
            >
              <Play
                size={22}
                fill={P.bg}
                style={{ color: P.bg, marginLeft: 3 }}
              />
            </div>
          </button>
        )}
        {playing && cur.embedUrl && (
          <iframe
            src={getEmbedUrl(cur.embedUrl) ?? undefined}
            title={`${project.name} demo`}
            allow="autoplay"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        )}
        {media.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: P.cream,
                color: P.bg,
                border: `1.5px solid ${P.bg}`
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: P.cream,
                color: P.bg,
                border: `1.5px solid ${P.bg}`
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div
          className="absolute bottom-2.5 left-3 px-2 py-1 rounded-md"
          style={{
            background: "rgba(0,0,0,0.75)",
            border: `1px solid ${P.border}`,
            color: P.cream,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600
          }}
        >
          {cur.label}
        </div>
      </div>
      {media.length > 1 && (
        <div className="flex gap-2 justify-center items-center">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIdx(i);
                setPlaying(false);
              }}
              style={{
                width: i === idx ? 22 : 8,
                height: 8,
                borderRadius: 4,
                background: i === idx ? P.accent : `${P.muted}33`,
                transition: "all 0.22s ease"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogModal({ blog, onClose }: { blog: BlogPost; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-0 z-50 flex flex-col rounded-2xl overflow-hidden"
      style={{ background: P.card, border: `1px solid ${P.border}` }}
    >
      <div
        className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 flex-shrink-0"
        style={{
          background: `${P.card}f5`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${P.border}`
        }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm flex-shrink-0 transition-transform duration-200 hover:scale-102"
          style={{ background: P.accent, color: P.bg, minHeight: 44 }}
        >
          <ArrowLeft size={16} />
          Close Article
        </button>
        <div className="min-w-0">
          <p
            style={{
              color: P.muted,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            {blog.date}
          </p>
          <h3
            style={{
              color: P.cream,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.3
            }}
            className="mt-0.5 truncate"
          >
            {blog.title}
          </h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {blog.body.split("\n\n").map((block, i) => {
          if (block.startsWith("## "))
            return (
              <h2
                key={i}
                style={{
                  color: P.cream,
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  marginTop: 24,
                  marginBottom: 12
                }}
              >
                {block.replace("## ", "")}
              </h2>
            );
          if (block.startsWith("### "))
            return (
              <h3
                key={i}
                style={{
                  color: P.accent,
                  fontSize: 16,
                  fontWeight: 600,
                  marginTop: 18,
                  marginBottom: 8
                }}
              >
                {block.replace("### ", "")}
              </h3>
            );
          if (block.includes("```")) {
            const code = block.replace(/```\w*\n?/, "").replace(/\n?```/, "");
            return (
              <pre
                key={i}
                style={{
                  background: P.deep,
                  border: `1px solid ${P.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  color: P.cream,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  overflowX: "auto",
                  margin: "16px 0"
                }}
              >
                <code>{code}</code>
              </pre>
            );
          }
          return (
            <p
              key={i}
              style={{
                color: P.muted,
                fontSize: 16,
                lineHeight: 1.75,
                marginBottom: 16
              }}
            >
              {block}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
}

// LaTeX Report Viewer Modal Window
function ReportModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-50 flex flex-col rounded-2xl overflow-hidden"
      style={{ background: P.card, border: `1px solid ${P.border}` }}
    >
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{
          background: `${P.card}f5`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${P.border}`
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(223, 192, 122, 0.15)" }}
          >
            <FileText size={16} style={{ color: P.accent }} />
          </div>
          <div>
            <h3 style={{ color: P.cream, fontSize: 15, fontWeight: 750 }}>
              LaTeX Technical Report
            </h3>
            <p
              style={{
                color: P.muted,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              compiled_manuscript.pdf
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{
              background: P.deep,
              border: `1px solid ${P.border}`,
              color: P.cream
            }}
          >
            Open in Tab <ExternalLink size={12} />
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-transform"
            style={{ background: P.accent, color: P.bg }}
          >
            Close
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#151716] p-1 md:p-4">
        <iframe
          src={`${url}#toolbar=0`}
          className="w-full h-full rounded-lg"
          style={{ border: `1px solid ${P.border}` }}
          title="LaTeX Project Report Preview"
        />
      </div>
    </motion.div>
  );
}

// Core Engine Boot-up Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sequences = [
      "sys_init: booting portfol.io architecture...",
      "pipeline: mapping low-glare basalt themes...",
      "load_engine: initializing unity 3d coordinate matrix...",
      "networking: preparing peer-to-peer multiplayer sockets...",
      "document_service: mounting compiled latex document trees...",
      "sys_init: initialization successful. welcome."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < sequences.length) {
        setLogs((prev) => [...prev, sequences[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400); // Small pause at the end for smooth fadeout
      }
    }, 240);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
      style={{ background: P.bg }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: P.card,
          border: `1.5px solid ${P.border}`,
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
        }}
      >
        {/* Terminal Header */}
        <div
          className="flex items-center justify-between pb-4 mb-4"
          style={{ borderBottom: `1px solid ${P.border}` }}
        >
          <div className="flex items-center gap-2">
            <Terminal size={14} style={{ color: P.accent }} />
            <span
              style={{
                color: P.cream,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                letterSpacing: "0.08em"
              }}
            >
              SYSTEM_BOOT_INIT
            </span>
          </div>
          <div className="flex gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(154, 167, 158, 0.2)" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(154, 167, 158, 0.2)" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: P.accent }}
            />
          </div>
        </div>

        {/* Dynamic Log Output */}
        <div
          className="flex flex-col gap-2 min-h-[140px] font-mono text-[12px] leading-relaxed select-none"
          style={{ color: P.muted }}
        >
          {logs.map((log, index) => {
            const isLast = index === logs.length - 1;
            const isSuccess = log?.includes("welcome");
            return (
              <div key={index} className="flex gap-2 items-start">
                <span
                  style={{ color: isSuccess ? "#22C55E" : P.accent }}
                  className="flex-shrink-0"
                >
                  {isSuccess ? "✓" : "❯"}
                </span>
                <span
                  style={{
                    color: isSuccess ? P.cream : isLast ? P.cream : P.muted
                  }}
                >
                  {log}
                </span>
              </div>
            );
          })}
          {logs.length < 6 && (
            <div className="flex gap-2 items-center">
              <span style={{ color: P.accent }}>❯</span>
              <span
                className="w-1.5 h-4 animate-pulse"
                style={{ background: P.accent }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<Cat>("All");
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [openBlog, setOpenBlog] = useState<BlogPost | null>(null);
  const [openReport, setOpenReport] = useState<string | null>(null);

  const filtered = PROJECTS.filter(
    (p) => activeCat === "All" || p.cat.includes(activeCat)
  );
  const handleCat = (c: Cat) => {
    setActiveCat(c);
    const first = PROJECTS.find((p) => c === "All" || p.cat.includes(c));
    if (first) setActiveProject(first);
  };

  const experienceItems = TIMELINE.filter((item) => item.type === "intern");
  const educationItems = TIMELINE.filter((item) => item.type === "edu");

  return (
    <>
      <style>{`
        @keyframes beam-spin { to { --beam-angle: 360deg; } }
        @property --beam-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
      `}</style>

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: P.bg,
              minHeight: "100vh",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <div className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
              {/* LEFT COLUMN */}
              <aside
                className="lg:w-[40%] lg:h-full lg:overflow-y-auto"
                style={{ borderRight: `1px solid ${P.border}` }}
              >
                <div className="flex flex-col gap-5 p-5">
                  {/* Profile */}
                  <BentoCard beam>
                    <div className="flex gap-4 items-start">
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
                          style={{
                            background: P.deep,
                            border: `2.5px solid ${P.accent}`,
                            boxShadow: `0 4px 14px rgba(0,0,0,0.4)`
                          }}
                        >
                          <img
                            src={PROFILE.avatar}
                            alt={PROFILE.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                              const sib = (e.target as HTMLImageElement)
                                .nextElementSibling as HTMLElement;
                              if (sib) sib.style.display = "flex";
                            }}
                          />
                          <span
                            style={{
                              display: "none",
                              fontSize: 24,
                              fontWeight: 800,
                              color: P.cream
                            }}
                          >
                            {PROFILE.initials}
                          </span>
                        </div>
                        <div
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background: "#22C55E",
                            border: `2px solid ${P.card}`
                          }}
                          title={PROFILE.availability}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1
                          style={{
                            color: P.cream,
                            fontSize: 28,
                            fontWeight: 800,
                            fontFamily: "'DM Serif Display', serif",
                            lineHeight: 1.1
                          }}
                        >
                          {PROFILE.name}
                        </h1>
                        <p
                          style={{
                            color: P.accent,
                            fontSize: 15,
                            fontWeight: 600,
                            marginTop: 2
                          }}
                        >
                          {PROFILE.title}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{
                              background: "rgba(223, 192, 122, 0.15)",
                              border: `1px solid ${P.accent}`,
                              color: P.accent
                            }}
                          >
                            {PROFILE.availability}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs flex items-center gap-1 font-medium"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              border: `1px solid ${P.border}`,
                              color: P.muted
                            }}
                          >
                            <MapPin size={11} /> {PROFILE.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        color: P.muted,
                        fontSize: 14,
                        lineHeight: 1.6,
                        marginTop: 16
                      }}
                    >
                      {PROFILE.bio}
                    </p>
                  </BentoCard>

                  {/* Connect */}
                  <BentoCard>
                    <Label icon={Users} text="Connect" />
                    <div className="grid grid-cols-1 gap-2">
                      {SOCIALS.map((s) => (
                        <SocialChip key={s.label} s={s} />
                      ))}
                    </div>
                  </BentoCard>

                  {/* Experience */}
                  <BentoCard>
                    <Label icon={Briefcase} text="Experience" />
                    <div className="flex flex-col">
                      {experienceItems.map((item, i) => (
                        <TimelineNode
                          key={i}
                          item={item}
                          isLast={i === experienceItems.length - 1}
                        />
                      ))}
                    </div>
                  </BentoCard>

                  {/* Education */}
                  <BentoCard>
                    <Label icon={GraduationCap} text="Education" />
                    <div className="flex flex-col">
                      {educationItems.map((item, i) => (
                        <TimelineNode
                          key={i}
                          item={item}
                          isLast={i === educationItems.length - 1}
                        />
                      ))}
                    </div>
                  </BentoCard>

                  {/* Competitions */}
                  {COMPETITIONS && COMPETITIONS.length > 0 && (
                    <BentoCard>
                      <Label icon={Trophy} text="Competitions" />
                      <div className="flex flex-col gap-4">
                        {COMPETITIONS.map((comp: any, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${P.accent}15` }}
                            >
                              <Trophy size={14} style={{ color: P.accent }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4
                                  style={{
                                    color: P.cream,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                  }}
                                >
                                  {comp.title || comp.name}
                                </h4>
                                <span
                                  style={{
                                    color: P.muted,
                                    fontSize: 11,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    flexShrink: 0
                                  }}
                                >
                                  {comp.date}
                                </span>
                              </div>
                              <p
                                style={{
                                  color: P.accent,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginTop: 2
                                }}
                              >
                                {comp.award || comp.rank || comp.result}
                              </p>
                              {(comp.organizer || comp.event) && (
                                <p
                                  style={{
                                    color: P.muted,
                                    fontSize: 12,
                                    marginTop: 1
                                  }}
                                >
                                  {comp.organizer || comp.event}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </BentoCard>
                  )}

                  {/* Certifications */}
                  {CERTIFICATIONS && CERTIFICATIONS.length > 0 && (
                    <BentoCard>
                      <Label icon={Award} text="Certifications" />
                      <div className="flex flex-col gap-5">
                        {CERTIFICATIONS.map((cert: any, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(154, 167, 158, 0.1)" }}
                            >
                              <Award size={14} style={{ color: P.muted }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4
                                  style={{
                                    color: P.cream,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                  }}
                                >
                                  {cert.title || cert.name}
                                </h4>
                                <span
                                  style={{
                                    color: P.muted,
                                    fontSize: 11,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    flexShrink: 0
                                  }}
                                >
                                  {cert.date}
                                </span>
                              </div>
                              <p
                                style={{
                                  color: P.muted,
                                  fontSize: 12,
                                  marginTop: 2
                                }}
                              >
                                {cert.issuer || cert.authority || cert.org}
                              </p>

                              {/* VIEW CERTIFICATE BUTTON */}
                              {(cert.image || cert.url) && (
                                <a
                                  href={cert.image || cert.url || undefined}
                                  onClick={(e) => {
                                    // If the URL is missing or empty, block the default link behavior completely
                                    if (!cert.image && !cert.url) {
                                      e.preventDefault();
                                    }
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                    !cert.image && !cert.url
                                      ? "opacity-40 cursor-not-allowed"
                                      : "hover:scale-[1.02]"
                                  }`}
                                  style={{
                                    background: P.deep,
                                    border: `1px solid ${P.border}`,
                                    color: P.accent
                                  }}
                                >
                                  <ExternalLink size={11} />
                                  View Certificate
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </BentoCard>
                  )}
                </div>
              </aside>

              {/* RIGHT COLUMN */}
              <main className="flex-1 lg:h-full lg:overflow-y-auto relative">
                <div className="flex flex-col gap-5 p-5">
                  {/* Core Skills Grid */}
                  <BentoCard>
                    <Label icon={Cpu} text="Core Skills" />
                    <SkillGrid />
                  </BentoCard>

                  {/* Contact / Resume */}
                  <BentoCard>
                    <Label icon={Mail} text="Get In Touch" />
                    <div className="flex flex-col md:flex-row gap-3">
                      <a
                        href={PROFILE.resumeFile}
                        download={PROFILE.resumeDownloadName}
                        className="flex-1 flex items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 transition-transform duration-200 hover:scale-102"
                        style={{
                          background: P.accent,
                          color: P.bg,
                          fontWeight: 750,
                          fontSize: 14
                        }}
                      >
                        <Download size={16} />
                        Download Resume
                      </a>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="flex-1 flex items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:border-accent"
                        style={{
                          background: P.deep,
                          border: `1px solid ${P.border}`,
                          color: P.cream,
                          fontWeight: 600,
                          fontSize: 14
                        }}
                      >
                        <Mail size={16} style={{ color: P.muted }} />
                        {PROFILE.email}
                      </a>
                    </div>
                  </BentoCard>

                  {/* Projects */}
                  <BentoCard beam noPad>
                    <div
                      className="flex gap-2 flex-wrap px-5 pt-5 pb-3"
                      style={{ borderBottom: `1px solid ${P.border}` }}
                    >
                      <Label icon={Gamepad2} text="My Projects" />
                      {CATS.map((c) => {
                        const Icon = CAT_ICONS[c];
                        const active = activeCat === c;
                        return (
                          <motion.button
                            key={c}
                            onClick={() => handleCat(c)}
                            layout
                            className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold overflow-hidden"
                            style={{
                              minHeight: 44,
                              color: active ? P.bg : P.cream,
                              zIndex: 0
                            }}
                          >
                            {active && (
                              <motion.span
                                layoutId="cat-pill-bg"
                                className="absolute inset-0 rounded-full"
                                style={{ background: P.accent, zIndex: -1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 30
                                }}
                              />
                            )}
                            <Icon size={13} />
                            {c}
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col md:flex-row gap-5 p-5"
                      >
                        <div className="md:w-[52%]">
                          <MediaCarousel project={activeProject} />
                        </div>
                        <div className="flex-1 flex flex-col gap-4 min-w-0">
                          <div>
                            <h2
                              style={{
                                color: P.cream,
                                fontSize: 22,
                                fontWeight: 800,
                                fontFamily: "'DM Serif Display', serif",
                                lineHeight: 1.2
                              }}
                            >
                              {activeProject.name}
                            </h2>
                            <p
                              style={{
                                color: P.accent,
                                fontSize: 13,
                                fontWeight: 600,
                                marginTop: 4
                              }}
                            >
                              {activeProject.role}
                              {activeProject.period
                                ? ` · ${activeProject.period}`
                                : ""}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.tech.map((t: string) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                                style={{
                                  background: P.deep,
                                  border: `1px solid ${P.border}`,
                                  color: P.cream,
                                  fontFamily: "'JetBrains Mono', monospace"
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-col gap-2">
                            {activeProject.highlights.map(
                              (h: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex gap-2.5 items-start"
                                >
                                  <span
                                    style={{
                                      color: P.accent,
                                      fontSize: 12,
                                      flexShrink: 0,
                                      marginTop: 2
                                    }}
                                  >
                                    ◆
                                  </span>
                                  <span
                                    style={{
                                      color: P.muted,
                                      fontSize: 15,
                                      lineHeight: 1.5
                                    }}
                                  >
                                    {h}
                                  </span>
                                </div>
                              )
                            )}
                          </div>

                          {/* Project Action Panel */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {activeProject.repo && (
                              <a
                                href={activeProject.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-transform duration-200 hover:scale-102"
                                style={{
                                  background: P.accent,
                                  color: P.bg,
                                  minHeight: 48,
                                  fontSize: 14
                                }}
                              >
                                <Github size={16} />
                                View Source
                                <ExternalLink size={12} />
                              </a>
                            )}

                            {/* LaTeX Report Button */}
                            {activeProject.reportUrl && (
                              <button
                                onClick={() =>
                                  setOpenReport(activeProject.reportUrl ?? null)
                                }
                                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200"
                                style={{
                                  background: P.deep,
                                  border: `1px solid ${P.accent}`,
                                  color: P.accent,
                                  minHeight: 48,
                                  fontSize: 14
                                }}
                              >
                                <FileText size={16} />
                                LaTeX Report
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {filtered.length > 1 && (
                      <div
                        className="flex gap-2 px-5 pb-4 overflow-x-auto"
                        style={{
                          scrollbarWidth: "none",
                          borderTop: `1px solid ${P.border}`
                        }}
                      >
                        <div className="inline-flex gap-2 pt-3 whitespace-nowrap">
                          {filtered.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setActiveProject(p)}
                              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                              style={{
                                background:
                                  activeProject.id === p.id
                                    ? P.deep
                                    : "rgba(0,0,0,0.15)",
                                border: `1px solid ${activeProject.id === p.id ? P.accent : P.border}`,
                                color:
                                  activeProject.id === p.id
                                    ? P.accent
                                    : P.cream,
                                minHeight: 44
                              }}
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blog Section */}
                    <div
                      className="px-5 pt-5 pb-4 hidden md:block"
                      style={{ borderTop: `1px solid ${P.border}` }}
                    >
                      <Label icon={BookOpen} text="Blog" />
                      <div className="flex flex-col gap-3 mt-3">
                        {BLOGS.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setOpenBlog(b)}
                            className="w-full text-left rounded-xl p-4 transition-colors duration-200 border border-transparent hover:border-accent"
                            style={{ background: P.deep, minHeight: 48 }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p
                                style={{
                                  color: P.cream,
                                  fontSize: 15,
                                  fontWeight: 750,
                                  lineHeight: 1.4
                                }}
                              >
                                {b.title}
                              </p>
                              <span
                                style={{
                                  color: P.muted,
                                  fontSize: 11,
                                  fontFamily: "'JetBrains Mono', monospace",
                                  flexShrink: 0,
                                  paddingTop: 2
                                }}
                              >
                                {b.date}
                              </span>
                            </div>
                            <p
                              style={{
                                color: P.muted,
                                fontSize: 14,
                                lineHeight: 1.6,
                                marginTop: 6
                              }}
                            >
                              {b.snippet}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                </div>

                {/* Modals Container */}
                <AnimatePresence>
                  {openBlog && (
                    <BlogModal
                      blog={openBlog}
                      onClose={() => setOpenBlog(null)}
                    />
                  )}
                  {openReport && (
                    <ReportModal
                      url={openReport}
                      onClose={() => setOpenReport(null)}
                    />
                  )}
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
