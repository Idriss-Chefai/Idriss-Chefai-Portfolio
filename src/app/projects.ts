import { Project } from "./data-types";

export const PROJECTS: Project[] = [
  // --- 2026: PINNED / RECENT HIGHLIGHTS (GAMES & HACKATHON) ---
  {
    id: 21,
    name: "Heist AI", // replace with your real title
    cat: ["Games"],
    role: "Pathfinding & AI Programmer (Team of 3)",
    period: "2026", // confirm
    highlights: [
      "Real-time heist game in Unity on a tile grid, built as a team to compare three AI techniques in the same game: A*, an ad hoc FSM and Monte Carlo",
      "Implemented the A* pathfinding from scratch, with terrain costs where mud makes the cheapest route differ from the shortest one",
      "Built click-to-move for the player: a click plans an A* route, and a new click replans mid-walk",
      "Built an automatic escape behavior using A* with a D* Lite-style approach, so the player replans its route to get away from enemies as they move",
      "Shared architecture across the team: game state, enemy brain interface and rendering kept separate so each AI plugs into the same game"
    ],
    tech: ["C#", "Unity", "A*", "D* Lite", "Pathfinding", "Game AI"],
    media: [
      {
        type: "image",
        thumb: "/content/projects/HeistAI/1.png",
        label: "A* Search Visualization"
      }
    ]
  },
    {
    id: 20,
    name: "Capture the Flag",
    cat: ["Games"],
    role: "Solo Developer (Unity Client & Backend)",
    period: "2026", // confirm
    highlights: [
       "Designed and built alone an online two-player mobile game in Unity: each player collects three flags in the opponent's territory and brings them back to their base",
      "Designed a symmetric multi-level arena with ladders, platforms, spike traps, rotating spiked hazards and enemies that make a player drop a carried flag",
      "Implemented real-time multiplayer networking with Mirror",
      "Built the backend on Strapi and PostgreSQL: account creation with email verification, login, password reset",
      "Persistent win/loss tracking with win ratio for every player"
    ],
    tech: ["C#", "Unity", "Strapi", "PostgreSQL", "Multiplayer Networking"], // add Mirror or Netcode for GameObjects
    media: [
      {
        type: "image",
        thumb: "/content/projects/CaptureTheFlag/3.png",
        label: "Arena Layout"
      },
      {
        type: "image",
        thumb: "/content/projects/CaptureTheFlag/1.png",
        label: "Login Screen"
      },
      {
        type: "image",
        thumb: "/content/projects/CaptureTheFlag/2.png",
        label: "Victory Screen"
      }
    ]
  },
    {
    id: 19,
    name: "Unified Particle Physics",
    cat: ["Games"],
    role: "Core Engine & Rigid Body Programmer (Team of 3)",
    period: "2026",
    highlights: [
      "Team implementation in Unity of 'Unified Particle Physics for Real-Time Applications' (Macklin et al., NVIDIA Flex, SIGGRAPH 2014): rigid bodies, cloth and fluids as particles in a single simulation, with no Unity physics",
      "Built the core engine: Position-Based Dynamics substepping loop, spatial hash grid collision detection, and an extensible IConstraint interface that let cloth and fluid modules plug in without merge conflicts",
      "Implemented rigid bodies with shape matching, warm-started rotation extraction and surface-only particle collision",
      "Added body sleeping so resting bodies act as static obstacles and wake on impact, a major performance gain",
      "Cloth drapes over rigid bodies and blocks float or sink in water, all through the same collision system"
    ],
    tech: ["C#", "Unity", "Position-Based Dynamics", "Shape Matching", "Spatial Hashing", "Physics Simulation"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/UnifiedPhysics/1.png",
        label: "Simulation Demo",
        embedUrl: "https://drive.google.com/file/d/1Vf0R-GOARBrrAtIiMGMdMLI78IuI5mr1/view?usp=sharing"
      }
    ]
  },
    {
    id: 18,
    name: "EventokenX",
    cat: ["Games"],
    role: "Gameplay & Mobile Developer (Intern)",
    period: "2026",
    highlights: [
      "Hybrid mobile app merging real-world event discovery with RPG progression: characters, classes, skills, XP and combat",
      "Optimized the main gameplay scene from ~399k to ~50k triangles and fixed a shared ScriptableObject bug that leaked scaled enemy XP across sessions",
      "Replaced a switch-based skill system with an interface-based VFX pipeline covering projectiles, lob arcs, beams, persistent zones and melee slashes",
      "Built a geolocated map using Web-Mercator projection, tile pooling, an 800-tile LRU cache, debounced prefetching and OSRM routing",
      "Wired the Unity client to a Node.js/Firebase REST backend with JWT auth and session persistence"
    ],
    tech: ["C#", "Unity", "Node.js", "Express", "Firebase", "OpenStreetMap", "OSRM", "Postman"],
    media: [
            {
        type: "image",
        thumb: "/content/projects/EventokenX/NewCharacterCreationPanel.jpg",
        label: "Character Creation Panel"
      },
      {
        type: "image",
        thumb: "/content/projects/EventokenX/Panel_Competence.jpg",
        label: "Skill Panel"
      },
      {
        type: "image",
        thumb: "/content/projects/EventokenX/LoginPanel.jpg",
        label: "Login Panel"
      },
      {
        type: "image",
        thumb: "/content/projects/EventokenX/SignUpPanel.jpg",
        label: "Sign Up Panel"
      },
      {
        type: "image",
        thumb: "/content/projects/EventokenX/LowTris.png",
        label: "Scene Screenshot (Optimized)"
      }
    ]
  },
  {
    id: 1,
    name: "VoidRunner",
    cat: ["Games"],
    role: "Gameplay Programmer",
    period: "2026",
    highlights: [
      "High-speed tactical gameplay system built specifically for the Voidrunner technical test",
      "Programmed advanced responsive movement mechanics alongside reactive level entities",
      "Produced a polished technical test showcase demonstrating optimized gameplay execution and system stability"
    ],
    tech: ["C#", "Unity", "Advanced Character Controller", "Optimization"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/VoidRunner/1.png",
        label: "Gameplay Demo",
        embedUrl:
          "https://drive.google.com/file/d/1JoI-65W0MYumv_NUeM40xrWlrgOSmAu9/view?usp=drive_link"
      }
    ]
  },
  {
    id: 2,
    name: "RUST & RUN",
    cat: ["Games"],
    role: "Network Programmer",
    period: "2026",
    highlights: [
      "Scalable multiplayer infrastructure managing synchronized game world states",
      "Implemented dedicated authoritative server code minimizing data payload overhead",
      "Integrated client-side prediction algorithms and smooth interpolation to counteract latency spikes"
    ],
    tech: ["C#", "Unity", "Multiplayer Networking", "Physics"],
    media: [ {
        type: "video",
        thumb: "/content/projects/Rust&Run/Gemini_Generated_Image_.png",
        label: "Gameplay Demo",
        embedUrl:
          "https://drive.google.com/file/d/1ovY12X5qyEUk_fNz7g-pPZnhTwpBRnuN/view?usp=sharing"
      }]
  },
  {
    id: 3,
    name: "The Reset",
    cat: ["Games"],
    role: "Multiplayer Systems Engineer",
    period: "2026",
    highlights: [
      "4-player cooperative multiplayer horror experience designed within Unity",
      "Engineered an efficient network-synced character customization workflow built around dynamic clothing mesh swapping",
      "Constructed custom placement logic for real-time multiplayer building and barricading mechanics",
      "Done survival mechanics and advanced first player movement and synchronisation"
    ],
    tech: ["C#", "Unity", "Netcode for GameObjects", "Blender"],
    media: [{
        type: "video",
        thumb: "/content/projects/TheReset/8.png",
        label: "Gameplay Trailer",
        embedUrl:"https://youtu.be/olb_UdaP3AA"
      },{
        type: "image",
        thumb: "/content/projects/TheReset/1.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/2.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/3.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/4.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/5.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/6.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/7.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/8.png",
        label: "Screenshot"
      },
    {
        type: "image",
        thumb: "/content/projects/TheReset/9.png",
        label: "Screenshot"
      }]
  },
  {
    id: 4,
    name: "Protect The White House",
    cat: ["Games"],
    role: "Game Developer",
    period: "2026",
    highlights: [
      "Unity tower-defense game set in a zombie apocalypse",
      "Manage resources like fuel and wood to build defensive stations and turrets",
      "8 levels with multiple zombie types and distinct behaviors",
      "Resource management, cooldown systems, and card-based building UI",
      "3D assets modeled in Blender with a cartoony visual style"
    ],
    tech: ["C#", "Unity", "Blender"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/protectThewhiteHouse/Capture d'écran 2026-07-22 122926.png",
        label: "Gameplay Demo",
        embedUrl:
          "https://drive.google.com/file/d/1uDiRH4Zy1p41Wrlm_5l-ctf8cMLgBN7H/view?usp=sharing"
      }
    ]
  },
  {
    id: 5,
    name: "AI Industrial Ad Campaign",
    cat: ["AI", "Art"],
    role: "AI Media Specialist / Producer",
    period: "2026",
    highlights: [
      "Produced a high-impact social media video advertisement (Instagram Reel/TikTok format) targeting B2B industrial growth within a strict 24-hour sprint",
      "Orchestrated a pipeline of diverse generative AI tools to rapidly iterate through conceptual scripting, professional voiceover generation, and cinematic scene layouts",
      "Directed the visual tone and pacing to effectively communicate the scaling potential of industrial land for incoming enterprises",
      "Aggregated, upscaled, and edited AI-generated video segments into a cohesive, high-retention marketing asset tailored for mobile feeds"
    ],
    tech: [
      "Generative AI Video Tools",
      "AI Voice Synthesis",
      "Video Editing Systems",
      "Prompt Engineering"
    ],
    media: [
      {
        type: "video",
        thumb: "/assets/thumbnails/ai_hackathon.png",
        label: "Ad Campaign Reel Preview",
        embedUrl:
          "https://drive.google.com/file/d/1-KkXVC0YuTeiZJd8LhBxt7hItvE2U0l6/view?usp=sharing"
      }
    ]
  },
  {
    id: 6,
    name: "Global Game Jam Project (Backstage)",
    cat: ["Games"],
    role: "Technical Designer , UI/UX , Mechanics Developer",
    period: "2026",
    highlights: [
      "Rapidly prototyped a game within a strict 48-hour development window conforming to the event theme",
      "Structured lightweight components ensuring core loop stability and functional features on a tight deadline",
      "Iterated rapidly on intuitive mechanics using customized asset templates and flexible logic components"
    ],
    tech: ["C#", "Unity", "Rapid Prototyping"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/GGJ26/1.png",
        label: "Jam Entry Build",
        embedUrl:
          "https://drive.google.com/file/d/1-xlgg5seTGxJ_q5P2TEcoTu5gnq2Kqu2/view?usp=drive_link"
      },

      {
        type: "image",
        thumb: "/content/projects/GGJ26/1.png",
        label: "Screenshot"
      },
      {
        type: "image",
        thumb: "/content/projects/GGJ26/1.png",
        label: "Screenshot"
      },
      {
        type: "image",
        thumb: "/content/projects/GGJ26/3.png",
        label: "Screenshot"
      },
      {
        type: "image",
        thumb: "/content/projects/GGJ26/4.png",
        label: "Screenshot"
      },
      {
        type: "image",
        thumb: "/content/projects/GGJ26/5.png",
        label: "Screenshot"
      },
      {
        type: "image",
        thumb: "/content/projects/GGJ26/5.png",
        label: "Screenshot"
      }
    ]
  },
  {
    id: 7,
    name: "VR Boxing Game",
    cat: ["Games"],
    role: "VR Interaction Programmer",
    period: "2026",
    highlights: [
      "Immersive virtual reality sports simulation built with Unity VR Interaction Toolkit",
      "Implemented physics-based haptic feedback and collision tracking to calculate punch velocity",
      "Designed fully optimized visual environments maintaining stable high frame rates for VR headset comfort"
    ],
    tech: ["C#", "Unity", "OpenXR", "VR Interaction Toolkit"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/Mecha VR/DESIGN VRGAME.png",
        label: "Trailer",
        embedUrl:"https://drive.google.com/file/d/1tiD6SR5jQzNv7P4XQI91XTtNMqb41s_p/view?usp=sharing"
      }
    ]
  },

  // --- 2025: WEB, MOBILE & FREELANCE ---
  {
    id: 8,
    name: "Camping & Outdoor Adventures Platform",
    cat: ["Web"],
    role: "Collaborator — Dual-Backend Architecture",
    period: "2025",
    highlights: [
      "Collaborative platform with two backends (Java and Symfony) sharing one MySQL database",
      "Campsite discovery and reservations",
      "User reviews, an integrated gear store, and social features"
    ],
    tech: ["JavaFX", "Java", "Symfony", "MySQL"],
    media: [
      {
        type: "video",
        thumb: "/assets/thumbnails/camping_platform.png",
        label: "Platform Demo",
        embedUrl:
          "https://drive.google.com/file/d/1mj54WLUylubDGtH2HKPibh8MUdFJANM4/view?usp=sharing"
      }
    ]
  },
  {
    id: 9,
    name: "Pure Change",
    cat: ["Web"],
    role: "Front-End Developer",
    period: "2025",
    highlights: [
      "Responsive interactive web application engineered for English educational workflows and reading resources",
      "Implemented modular layouts ensuring cross-device presentation fluidly scaling from desktop to mobile viewports",
      "Optimized DOM structures and light media delivery pipelines to minimize asset overhead and page load speeds"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://idriss-chefai.github.io/Pure-Change-Official-Website/",
    media: [
      {
        type: "image",
        thumb: "/assets/thumbnails/english_platform.png",
        label: "Desktop Interface"
      }
    ]
  },
  {
    id: 10,
    name: "Blender Character & Animation Showcase",
    cat: ["Art"],
    period: "2025",
    role: "3D Artist & Animator",
    highlights: [
      "Modeled a low-poly stylized character assets keeping geometry optimized for realtime deployment",
      "Rigged structural vertex weight groups and skeletal constraints to achieve clean, natural organic deformations",
      "Worked on a jump animation"
    ],
    tech: ["Blender", "Mixamo", "Stylized Low-Poly Art"],
    media: [
      {
        type: "image",
        thumb: "/assets/thumbnails/blender_showcase.png",
        label: "Blender Viewport Rig"
      }
    ]
  },
  {
    id: 11,
    name: "Academic JavaFX Applications",
    cat: ["Software"],
    role: "Freelance Software Developer",
    period: "2025",
    highlights: [
      "Engineered tailored desktop client software providing practical administrative toolsets for student cohorts",
      "Constructed structural UI layers via JavaFX using MVC architectures separating view components from DB queries",
      "Integrated structural validation methods handling error logging alongside automated analytical data summaries"
    ],
    tech: ["Java", "JavaFX", "MySQL", "Maven"],
    media: [
      {
        type: "video",
        thumb: "/assets/thumbnails/javafx_applications.png",
        label: "Desktop Application",
        embedUrl : "https://drive.google.com/file/d/1mTPAAxXamJcz4rW0qqIUDvZDgimbOI-6/view?usp=sharing"
      }
    ]
  },
  {
    id: 12, // Update this ID based on your existing project list
    name: "GAIN GymApp",
    cat: ["Mobile", "UI/UX"], // Adjust categories to match your Cat[] type definition
    role: "Lead Mobile Developer",
    period: "2025",
    highlights: [
      "Architected an all-in-one fitness ecosystem featuring real-time health metrics like step tracking and calorie counters.",
      "Built a complete course and event management module with dynamic form validations, date-time pickers, and admin controls.",
      "Integrated a localized e-commerce marketplace for sports equipment and apparel alongside a persistent shopping cart."
    ],
    tech: ["FlutterFlow", "Dart", "Firebase", "UI/UX Design"],
    media: [
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/1.png",
        label: "Login Screen"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/2.png",
        label: "Sign in screen"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/3.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/4.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/5.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/6.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/7.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/Gain GymApp/8.png",
        label: "Dashboard"
      }
    ],
    reportUrl: ""
  },
  {
    id: 13,
    name: "2D Puzzle Adventure Game",
    cat: ["Games"],
    role: "Game Developer",
    period: "2025",
    highlights: [
      "Multi-level 2D puzzle game with increasing difficulty",
      "Smooth character animations and interactive puzzle mechanics",
      "Built end-to-end in Java with JavaFX — First game project completed"
    ],
    tech: ["Java", "JavaFX", "Maven"],
    media: [
      {
        type: "image",
        thumb: "/content/projects/adventure_game/1.png",
        label: "Tutorial"
      },
      {
        type: "image",
        thumb: "/content/projects/adventure_game/2.png",
        label: "Level 1"
      },
      {
        type: "image",
        thumb: "/content/projects/adventure_game/3.png",
        label: "Level 2"
      },
      {
        type: "image",
        thumb: "/content/projects/adventure_game/4.png",
        label: "Dialogue System Showcase"
      }
    ]
  },

  // --- 2023 – 2024: ACADEMIC & FOUNDATIONAL PROJECTS ---
  {
    id: 14,
    name: "Dia-track — Diabetes Tracking App",
    cat: ["Mobile"],
    role: "Mobile Developer",
    period: "2024",
    highlights: [
      "React Native app for diabetes tracking",
      "Patients track blood sugar levels, medications, and meals",
      "Doctor-facing tools to manage patient profiles and appointments"
    ],
    tech: ["React Native", "Node.js", "Express", "MySQL"],
    media: [
      {
        type: "video",
        thumb: "/content/projects/Diatrack/1.png",
        label: "App Demo",
        embedUrl:
          "https://drive.google.com/file/d/1nlQ3CdGFS0zt7D07lCTblcwiJ3nQs2XU/view?usp=sharing"
      }
    ]
  },
  {
    id: 15,
    name: "Stock Market Analysis ML Model",
    cat: ["AI"],
    role: "ML Engineer",
    period: "2023 – 2024",
    highlights: [
      "Python ML model for stock market analysis developed as part of an academic graduation curriculum",
      "Data collection, preprocessing, and feature engineering",
      "Model training with scikit-learn and TensorFlow"
    ],
    tech: [
      "Python",
      "scikit-learn",
      "TensorFlow",
      "Angular",
      "Flask",
      "Pandas",
      "NumPy"
    ],
    media: [
      {
        type: "image",
        thumb: "/content/projects/stock_market_analysis/1.png",
        label: "Analysis Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/stock_market_analysis/2.png",
        label: "Analysis Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/stock_market_analysis/3.png",
        label: "Analysis Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/stock_market_analysis/4.png",
        label: "Analysis Dashboard"
      }
    ],
    reportUrl: "/content/reports/Rapport_ISTIC_PFE_2023_2024.pdf"
  },
  {
    id: 16,
    name: "Gestion Maintenance",
    cat: ["Software"],
    role: "Software Developer",
    period: "2023",
    highlights: [
      "Maintenance and asset management software built in Java",
      "Equipment inventory, maintenance schedules, and work orders",
      "Preventive maintenance planning and failure tracking"
    ],
    tech: ["Java", "Swing/JavaFX", "MySQL", "JDBC", "Maven"],
    media: [
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/1.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/2.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/3.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/4.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/5.png",
        label: "Dashboard"
      },
      {
        type: "image",
        thumb: "/content/projects/gestion_maintenance/6.png",
        label: "Dashboard"
      }
    ],
    reportUrl:
      "/content/reports/Rapport_Projet_Java_Gestion_Maintenance.pdf"
  },
  {
    id: 17,
    name: "E-Commerce Website",
    cat: ["Web"],
    role: "Full-Stack Developer",
    period: "2023",
    highlights: [
      "Electronics e-commerce site built on the MERN stack",
      "JWT-based user authentication",
      "Product catalog, shopping cart, and secure checkout flow"
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
    media: [
      {
        type: "image",
        thumb: "/assets/thumbnails/ecommerce.png",
        label: "Overview"
      }
    ]
  }
];
