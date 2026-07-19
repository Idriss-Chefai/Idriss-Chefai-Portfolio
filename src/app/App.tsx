import { useState, useEffect, useCallback, useRef } from "react";
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
  Trophy,
  X,
  Boxes
} from "lucide-react";
import {
  PROFILE,
  SOCIALS,
  CATS,
  PROJECTS,
  TIMELINE,
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
  Instagram: Instagram,
  GitLab: Terminal,
  LeetCode: Cpu,   
  Codeforces: Trophy, 
  Facebook: Globe,
  WhatsApp: Mail,
  Email: Mail,
};

const CAT_ICONS: Record<Cat, React.ElementType> = {
  All: Layers,
  Games: Gamepad2,
  Web: Globe,
  Mobile: Smartphone,
  AI: Cpu,
  Software: Code2,
  Art : Layers
};

// COMPACT MATRIX TECH CLOUD DATA STRUCTURE
const TECH_MATRIX = [
  {
    category: "Systems Programming & Low-Level",
    icon: Terminal,
    skills: ["C", "C++", "Optimization"]
  },
  {
    category: "Interactive Systems & Game Engines",
    icon: Gamepad2,
    skills: ["Unity", "C#", "Physics", "Multiplayer"]
  },
  {
    category: "3D Assets & Animation Pipelines",
    icon: Layers,
    skills: ["Blender", "Mixamo"]
  },
  {
    category: "Full-Stack Web & Mobile",
    icon: Globe,
    skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Data Science & Cloud Systems",
    icon: Cpu,
    skills: ["PostgreSQL", "SQL", "Firebase", "Docker", "Git", "GitHub"]
  }
];

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

function SocialChip({ s }: { s: { label: string; handle: string; url: string; color: string } }) {
  const [hov, setHov] = useState(false);
  const Icon = SOCIAL_ICONS[s.label] ?? Globe;
  return (
    <a
      href={s.url}
      target={s.url.startsWith("mailto:") ? undefined : "_blank"}
      rel={s.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
  isLast,
  onProjectLinkClick
}: {
  item: TimelineItem;
  isLast: boolean;
  onProjectLinkClick?: (projectName: string) => void;
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
                {item.role === "Software Engineering Intern" &&
                  item.org.includes("Elite Council") &&
                  onProjectLinkClick && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectLinkClick("Dia-track");
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 bg-[#1C201E] border border-[#DFC07A] hover:bg-[#DFC07A] hover:text-[#131614] text-[#DFC07A]"
                    >
                      <ExternalLink size={11} /> View Dia-track Project Showcase
                    </button>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// COMPACT BENTO CLOUD MATRIX RENDER COMPONENT
function CompactSkillMatrix() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
      {TECH_MATRIX.map((cell) => {
        const CategoryIcon = cell.icon;
        return (
          <div
            key={cell.category}
            className="rounded-xl p-3.5 flex flex-col transition-colors duration-200 border"
            style={{
              background: P.deep,
              borderColor: P.border,
            }}
          >
            {/* Cell Header */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0, 0, 0, 0.2)" }}
              >
                <CategoryIcon size={12} style={{ color: P.accent }} />
              </div>
              <h4
                style={{
                  color: P.cream,
                  fontSize: 10.5,
                  fontWeight: 750,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase"
                }}
                className="truncate"
                title={cell.category}
              >
                {cell.category}
              </h4>
            </div>

            {/* Tight Micro-Chip Ecosystem Cloud */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {cell.skills.map((skill) => {
                const brand = BRAND_LOGOS[skill];
                const color = brand?.color ?? P.accent;
                const isHovered = hoveredSkill === skill;

                return (
                  <div
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md cursor-default select-none transition-all duration-200 border"
                    style={{
                      background: isHovered ? `${color}12` : P.card,
                      borderColor: isHovered ? color : "rgba(154, 167, 158, 0.08)",
                      boxShadow: isHovered ? `0 2px 8px ${color}10` : "none"
                    }}
                  >
                    {brand ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: brand.svg.replace(
                            /currentColor/g,
                            isHovered ? color : "#9AA79E"
                          )
                        }}
                        style={{
                          width: 12,
                          height: 12,
                          display: "block",
                          transition: "all 0.2s"
                        }}
                      />
                    ) : (
                      <Code2
                        size={10}
                        style={{ color: isHovered ? color : P.muted }}
                      />
                    )}
                    <span
                      style={{
                        color: isHovered ? P.cream : P.muted,
                        fontSize: 10.5,
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

function MediaCarousel({
  project,
  currentIndex,
  onChangeIndex
}: {
  project: Project;
  currentIndex: number;
  onChangeIndex: (i: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const media =
    project.media.length > 0
      ? project.media
      : [{ type: "image" as const, thumb: "", label: project.name }];
  const cur = media[currentIndex] || media[0];

  useEffect(() => {
    if (media.length <= 1 || playing) return;

    const interval = setInterval(() => {
      onChangeIndex((currentIndex + 1) % media.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, media.length, playing, onChangeIndex]);

  useEffect(() => {
    setPlaying(false);
  }, [project.id]);

  const go = (n: number) => {
    onChangeIndex((currentIndex + n + media.length) % media.length);
    setPlaying(false);
  };

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
            key={currentIndex}
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
            onClick={(e) => {
              e.stopPropagation();
              setPlaying(true);
            }}
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 z-10"
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
            className="absolute inset-0 w-full h-full z-20"
            style={{ border: 0 }}
          />
        )}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: P.cream,
                color: P.bg,
                border: `1.5px solid ${P.bg}`,
                zIndex: 30
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: P.cream,
                color: P.bg,
                border: `1.5px solid ${P.bg}`,
                zIndex: 30
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div
          className="absolute bottom-2.5 left-3 px-2 py-1 rounded-md z-10"
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
              onClick={(e) => {
                e.stopPropagation();
                onChangeIndex(i);
                setPlaying(false);
              }}
              style={{
                width: i === currentIndex ? 22 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentIndex ? P.accent : `${P.muted}33`,
                transition: "all 0.22s ease"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// REST OF THE ARCHITECTURE AND MODALS REMAIN EXACTLY UNTOUCHED
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
              compiled_manusxlpt.pdf
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

function LightboxModal({
  mediaList,
  activeIndex,
  onChangeIndex,
  onClose
}: {
  mediaList: any[];
  activeIndex: number;
  onChangeIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const cur = mediaList[activeIndex] || mediaList[0];

  const go = (n: number) => {
    onChangeIndex((activeIndex + n + mediaList.length) % mediaList.length);
    setPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out select-none"
    >
      <div
        className="w-full max-w-5xl flex items-center justify-between mb-3 px-2 text-[#F2ECD9]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs opacity-70">
          IMAGE {activeIndex + 1} / {mediaList.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="relative max-w-5xl w-full max-h-[75vh] aspect-video rounded-xl overflow-hidden bg-[#131614] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {cur.type === "video" && playing && cur.embedUrl ? (
            <iframe
              key={`vid-${activeIndex}`}
              src={getEmbedUrl(cur.embedUrl) ?? undefined}
              className="w-full h-full border-0 absolute inset-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <motion.img
              key={`img-${activeIndex}`}
              src={cur.thumb}
              alt={cur.label}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-contain"
            />
          )}
        </AnimatePresence>

        {cur.type === "video" && !playing && (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/45 transition-colors cursor-pointer z-10"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#DFC07A] shadow-xl">
              <Play
                size={24}
                fill="#131614"
                style={{ color: "#131614", marginLeft: 4 }}
              />
            </div>
          </button>
        )}

        {mediaList.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center bg-black/60 border border-white/10 text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer z-30"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center bg-black/60 border border-white/10 text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer z-30"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      <div
        className="mt-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-[#F2ECD9] text-center max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {cur.label}
      </div>
    </motion.div>
  );
}

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
        setTimeout(onComplete, 400);
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
  const [projectMediaIndex, setProjectMediaIndex] = useState(0); 
  const [openBlog, setOpenBlog] = useState<BlogPost | null>(null);
  const [openReport, setOpenReport] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showMoreLinks, setShowMoreLinks] = useState(false);

  // AUTOMATED METRICS ENGINE
  const totalInternships = TIMELINE.filter((item) => item.type === "intern").length;
  const totalProjects = PROJECTS.length;
  const totalHackathons = COMPETITIONS.length;
  const totalCertifications = CERTIFICATIONS.length;

  // Calculates years since your earliest listed education timeline entry
  const yearsInField = (() => {
    const eduItems = TIMELINE.filter((item) => item.type === "edu");
    if (eduItems.length === 0) return 4; // Intelligent hard-coded baseline fallback
    
    const years = eduItems.map((item) => {
      const match = item.period.match(/\b(20\d{2})\b/);
      return match ? parseInt(match[1], 10) : null;
    }).filter((y): y is number => y !== null);

    if (years.length === 0) return 4;
    const startYear = Math.min(...years);
    const currentYear = new Date().getFullYear();
    return Math.max(1, currentYear - startYear);
  })();

  const absoluteSocialsList = [
    ...SOCIALS,
    {
      label: "Email",
      handle: PROFILE.email,
      url: `mailto:${PROFILE.email}`,
      color: "#DFC07A"
    }
  ];

  const filtered = PROJECTS.filter(
    (p) => activeCat === "All" || p.cat.includes(activeCat)
  );

  const handleCat = (c: Cat) => {
    setActiveCat(c);
    const first = PROJECTS.find((p) => c === "All" || p.cat.includes(c));
    if (first) {
      setActiveProject(first);
      setProjectMediaIndex(0);
    }
  };

  const selectProject = (p: Project) => {
    setActiveProject(p);
    setProjectMediaIndex(0);
  };

  const navigateToProjectByName = useCallback((projectName: string) => {
    const target = PROJECTS.find((p) =>
      p.name.toLowerCase().includes(projectName.toLowerCase())
    );
    if (target) {
      const primaryCat = target.cat.find((c) => c !== "All") || "All";
      setActiveCat(primaryCat);
      setActiveProject(target);
      setProjectMediaIndex(0);

      setTimeout(() => {
        document
          .getElementById("my-projects-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, []);

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

                    {/* DENSE HIGH-IMPACT AUTOMATED METRICS ROW  */}
                    <div 
                      className="grid grid-cols-3 gap-2 mt-5 p-2 rounded-xl border border-dashed text-center"
                      style={{ 
                        background: "rgba(0,0,0,0.15)", 
                        borderColor: P.border 
                      }}
                    >
                      <div style={{ borderLeft: `1px solid ${P.border}` }}>
                        <p style={{ color: P.cream, fontSize: 18, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, lineHeight: 1 }}>{totalInternships}</p> 
                        <p style={{ color: P.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>Internships</p>
                      </div>
                      <div style={{ borderLeft: `1px solid ${P.border}` }}>
                        <p style={{ color: P.cream, fontSize: 18, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, lineHeight: 1 }}>{totalCertifications}</p> 
                        <p style={{ color: P.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>Certs</p> 
                      </div>
                      <div style={{ borderLeft: `1px solid ${P.border}` }}>
                        <p style={{ color: P.cream, fontSize: 18, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, lineHeight: 1 }}>{totalHackathons}</p> 
                        <p style={{ color: P.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>Hackathons</p>
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
                    <div className="mt-4">
                      <a
                        href={PROFILE.resumeFile}
                        download={PROFILE.resumeDownloadName}
                        className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-transform duration-200 hover:scale-102 font-bold text-xs"
                        style={{
                          background: P.accent,
                          color: P.bg
                        }}
                      >
                        <Download size={14} />
                        Download Resume
                      </a>
                    </div>
                  </BentoCard>

                  <BentoCard>
                    <Label icon={Users} text="Connect" />
                    <div className="grid grid-cols-1 gap-2">
                      {absoluteSocialsList.slice(0, 3).map((s) => (
                        <SocialChip key={s.label} s={s} />
                      ))}

                      <AnimatePresence initial={false}>
                        {showMoreLinks && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="flex flex-col gap-2 overflow-hidden w-full"
                          >
                            {absoluteSocialsList.slice(3).map((s) => (
                              <SocialChip key={s.label} s={s} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {absoluteSocialsList.length > 3 && (
                        <button
                          onClick={() => setShowMoreLinks(!showMoreLinks)}
                          className="mt-2 w-full py-2 rounded-xl text-center text-xs font-semibold tracking-wider uppercase transition-all duration-200 border border-transparent hover:border-[#DFC07A]/40"
                          style={{
                            background: P.deep,
                            color: P.accent,
                            fontFamily: "'JetBrains Mono', monospace",
                            cursor: "pointer"
                          }}
                        >
                          {showMoreLinks
                            ? "Show Less ▲"
                            : `More Links (${absoluteSocialsList.length - 3}) ▼`}
                        </button>
                      )}
                    </div>
                  </BentoCard>

                  <BentoCard>
                    <Label icon={Briefcase} text="Experience" />
                    <div className="flex flex-col">
                      {experienceItems.map((item, i) => (
                        <TimelineNode
                          key={i}
                          item={item}
                          isLast={i === experienceItems.length - 1}
                          onProjectLinkClick={navigateToProjectByName}
                        />
                      ))}
                    </div>
                  </BentoCard>

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
                                  onClick={() => {
                                    if (
                                      comp.title.toLowerCase().includes("ai ad")
                                    )
                                      navigateToProjectByName("AI Industrial");
                                    if (
                                      comp.title
                                        .toLowerCase()
                                        .includes("game jam")
                                    )
                                      navigateToProjectByName("VoidRunner");
                                  }}
                                  className="cursor-pointer hover:text-[#DFC07A] transition-colors duration-200 decoration-dotted hover:underline"
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
                              {(comp.organizer ||
                                comp.event ||
                                comp.description) && (
                                <p
                                  style={{
                                    color: P.muted,
                                    fontSize: 12,
                                    marginTop: 4,
                                    lineHeight: 1.4
                                  }}
                                >
                                  {comp.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </BentoCard>
                  )}

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
                              {(cert.image || cert.url) && (
                                <a
                                  href={cert.image || cert.url || undefined}
                                  onClick={(e) => {
                                    if (!cert.image && !cert.url)
                                      e.preventDefault();
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${!cert.image && !cert.url ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.02]"}`}
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
                  
                  {/* BEAUTIFIED CORE SKILLS MATRIX CARD */}
                  <BentoCard>
                    <Label icon={Boxes} text="Core Ecosystem Stack" />
                    <CompactSkillMatrix />
                  </BentoCard>

                  <BentoCard beam noPad>
                    <div
                      id="my-projects-section"
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
                        <div
                          className="md:w-[52%] cursor-zoom-in group/carousel"
                          onClick={() => setLightboxOpen(true)}
                        >
                          <MediaCarousel
                            project={activeProject}
                            currentIndex={projectMediaIndex}
                            onChangeIndex={setProjectMediaIndex}
                          />
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

                          <div className="flex flex-wrap gap-2 mt-2">
                            {/* Live Demo Deployment Link Setup */}
                            {activeProject.liveUrl && (
                              <a
                                href={activeProject.liveUrl}
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
                                <Globe size={16} />
                                Live Demo
                                <ExternalLink size={12} />
                              </a>
                            )}

                            {activeProject.repo && (
                              <a
                                href={activeProject.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-transform duration-200 hover:scale-102"
                                style={{
                                  background: activeProject.liveUrl ? P.deep : P.accent,
                                  border: activeProject.liveUrl ? `1px solid ${P.border}` : "none",
                                  color: activeProject.liveUrl ? P.cream : P.bg,
                                  minHeight: 48,
                                  fontSize: 14
                                }}
                              >
                                <Github size={16} />
                                View Source
                                <ExternalLink size={12} />
                              </a>
                            )}

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
                              onClick={() => selectProject(p)}
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
                  {lightboxOpen && (
                    <LightboxModal
                      mediaList={
                        activeProject.media.length > 0
                          ? activeProject.media
                          : [
                              {
                                type: "image",
                                thumb: "",
                                label: activeProject.name
                              }
                            ]
                      }
                      activeIndex={projectMediaIndex}
                      onChangeIndex={setProjectMediaIndex}
                      onClose={() => setLightboxOpen(false)}
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