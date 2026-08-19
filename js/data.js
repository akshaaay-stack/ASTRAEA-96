/**
 * ASTRAEA Core Ecosystem Data
 * JAIN University Kochi - Work-Integrated BCA
 */

const ASTRAEA_DATA = {
  university: {
    name: "JAIN (Deemed-to-be University) Kochi",
    campus: "Kochi Knowledge Park Campus",
    program: "Work-Integrated BCA (Bachelor of Computer Applications)",
    academicYear: "2026-2027",
    supportedDomains: ["@jainuniversity.ac.in", "@jain.ac.in"]
  },

  specialisations: {
    nova: {
      id: "nova",
      name: "NOVA",
      fullName: "Full Stack AI Development",
      color: "#c084fc",
      bgGlow: "rgba(192, 132, 252, 0.25)",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      planetEmoji: "🟣",
      tagline: "Architecting autonomous agents and modern cloud-native AI pipelines",
      description: "Focuses on full-stack web platforms, distributed AI microservices, neural network deployment, and reactive frontends.",
      coreSkills: ["Full Stack Engineering", "Agentic Systems", "Cloud & Docker", "PyTorch/TensorFlow", "API Design", "TypeScript/Next.js"],
      accentHue: 270
    },
    aether: {
      id: "aether",
      name: "AETHER",
      fullName: "Generative AI & Technology Management",
      color: "#818cf8",
      bgGlow: "rgba(129, 140, 248, 0.25)",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      planetEmoji: "🪻",
      tagline: "Pioneering frontier LLMs, context engineering, and tech leadership",
      description: "Bridges state-of-the-art Generative AI models, context engineering, multimodal workflows, and tech venture management.",
      coreSkills: ["Generative AI", "Context & Prompt Engineering", "Python Automation", "LLM Orchestration", "Tech Management", "AI Ethics"],
      accentHue: 240
    },
    quanta: {
      id: "quanta",
      name: "QUANTA",
      fullName: "Applied AI & Data Analytics",
      color: "#38bdf8",
      bgGlow: "rgba(56, 189, 248, 0.25)",
      badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      planetEmoji: "🔵",
      tagline: "Uncovering deep signals through advanced data science & probabilistic AI",
      description: "Dedicated to statistical modeling, big data pipelines, deep predictive analytics, machine learning ops, and business intelligence.",
      coreSkills: ["Data Science", "Statistical Modeling", "Predictive Analytics", "MLOps", "SQL & BigQuery", "Visualization"],
      accentHue: 195
    },
    lumina: {
      id: "lumina",
      name: "LUMINA",
      fullName: "Design Technology",
      color: "#f472b6",
      bgGlow: "rgba(244, 114, 182, 0.25)",
      badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      planetEmoji: "🌸",
      tagline: "Crafting luminous human-AI interfaces and immersive digital experiences",
      description: "Unites cognitive ergonomics, generative UI/UX, design systems, 3D spatial web design, and human-computer symbiosis.",
      coreSkills: ["Generative UI/UX", "Design Systems", "Figma & Prototyping", "Spatial UI & 3D Web", "User Research", "Motion Design"],
      accentHue: 330
    }
  },

  // Semester Curriculums with Knowledge Graphs & Subject Star Systems
  curriculum: {
    aether: {
      1: [
        {
          id: "aeth-101",
          code: "BCA-AET101",
          name: "Context Engineering",
          mastery: 72,
          credits: 4,
          icon: "sparkles",
          description: "Advanced semantic memory management, vector embeddings, dynamic context injection, and attention window optimization.",
          connectedKnowledge: [
            { name: "Context Engineering", level: 1, type: "core" },
            { name: "Prompt Engineering", level: 2, type: "parent" },
            { name: "Generative AI Foundations", level: 3, type: "discipline" },
            { name: "Automation Pipelines", level: 4, type: "application" },
            { name: "Real-world AI Applications", level: 5, type: "outcome" }
          ],
          topics: [
            { title: "RAG & Vector Retrieval", status: "Mastered", progress: 90 },
            { title: "Long-Context Attention Mechanics", status: "In Progress", progress: 65 },
            { title: "Structured JSON Output Constraints", status: "Mastered", progress: 85 },
            { title: "Dynamic Memory Cache Invalidation", status: "Review Needed", progress: 48 }
          ],
          highYieldExamTopics: [
            "Vector distance metrics (Cosine vs Euclidean)",
            "Chunking strategies for semantic retrieval",
            "Context window token budgeting calculation",
            "Zero-shot vs Few-shot in-context priming"
          ]
        },
        {
          id: "aeth-102",
          code: "BCA-AET102",
          name: "Foundations of Generative AI & Prompt Engineering",
          mastery: 84,
          credits: 4,
          icon: "brain-circuit",
          description: "Transformer architecture deep-dive, tokenization algorithms, decoder mechanisms, and precision prompt engineering techniques.",
          connectedKnowledge: [
            { name: "Prompt Engineering", level: 1, type: "core" },
            { name: "Transformer Decoders", level: 2, type: "parent" },
            { name: "Multimodal Models", level: 3, type: "application" },
            { name: "Autonomous Workflows", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Self-Attention & Multi-Head Math", status: "Mastered", progress: 95 },
            { title: "Chain-of-Thought & Tree-of-Thoughts", status: "Mastered", progress: 88 },
            { title: "Temperature & Top-P Sampling", status: "Mastered", progress: 80 },
            { title: "System Role Framing & Guardrails", status: "In Progress", progress: 72 }
          ],
          highYieldExamTopics: [
            "Scaled Dot-Product Attention Equation",
            "Hallucination mitigation strategies",
            "Prompt injection attack defense patterns",
            "Temperature vs Top-K parameter trade-offs"
          ]
        },
        {
          id: "aeth-103",
          code: "BCA-AET103",
          name: "Python Programming & Automation Basics",
          mastery: 68,
          credits: 4,
          icon: "code",
          description: "Modern asynchronous Python, functional programming, automated testing, task pipelines, and external API integrations.",
          connectedKnowledge: [
            { name: "Python Asynchronous Basics", level: 1, type: "core" },
            { name: "Data Structures & Generators", level: 2, type: "parent" },
            { name: "API Client Workflows", level: 3, type: "application" },
            { name: "Production Automation", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Asyncio & Concurrent Tasks", status: "In Progress", progress: 60 },
            { title: "Decorators & Context Managers", status: "Mastered", progress: 82 },
            { title: "FastAPI Endpoint Design", status: "In Progress", progress: 70 },
            { title: "Error Handling & Logging", status: "Review Needed", progress: 55 }
          ],
          highYieldExamTopics: [
            "List comprehensions vs Generator expressions",
            "Async/await event loop lifecycles",
            "Class inheritance vs Composition in Python",
            "Exception handling with custom Error hierarchies"
          ]
        },
        {
          id: "aeth-104",
          code: "BCA-AET104",
          name: "Mathematical Reasoning & Statistics",
          mastery: 58,
          credits: 3,
          icon: "calculator",
          description: "Linear algebra for AI, probability distributions, Bayes' Theorem, gradient descent intuition, and statistical hypothesis testing.",
          connectedKnowledge: [
            { name: "Matrix Transformations", level: 1, type: "core" },
            { name: "Probability & Bayes Rule", level: 2, type: "parent" },
            { name: "Loss Functions & Optimization", level: 3, type: "application" },
            { name: "Neural Weight Convergence", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Eigenvalues & Eigenvectors", status: "Review Needed", progress: 45 },
            { title: "Normal & Poisson Distributions", status: "In Progress", progress: 62 },
            { title: "Bayesian Conditional Probability", status: "Mastered", progress: 78 },
            { title: "Gradient Vectors & Partial Derivatives", status: "Review Needed", progress: 48 }
          ],
          highYieldExamTopics: [
            "Bayes' Theorem calculation problem",
            "Matrix multiplication and dot product properties",
            "Standard deviation & Z-score interpretation",
            "Derivation of Mean Squared Error gradient"
          ]
        },
        {
          id: "aeth-105",
          code: "BCA-AET105",
          name: "Computer Systems & Architecture",
          mastery: 76,
          credits: 3,
          icon: "cpu",
          description: "Von Neumann architecture, GPU tensor cores vs CPU SIMD, memory hierarchies, cache coherence, and OS process virtualization.",
          connectedKnowledge: [
            { name: "GPU vs CPU Architecture", level: 1, type: "core" },
            { name: "Memory Hierarchy & L1/L2/L3", level: 2, type: "parent" },
            { name: "Tensor Core Acceleration", level: 3, type: "application" },
            { name: "High Performance Model Inference", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Paging & Virtual Memory", status: "Mastered", progress: 85 },
            { title: "CUDA Parallel Execution Grid", status: "In Progress", progress: 70 },
            { title: "Instruction Pipelining & Hazards", status: "Mastered", progress: 80 },
            { title: "I/O Multiplexing & Epoll", status: "In Progress", progress: 68 }
          ],
          highYieldExamTopics: [
            "Pipelining hazards (Data, Structural, Control)",
            "Cache miss types (Compulsory, Capacity, Conflict)",
            "SIMD vs MIMD architectural classification",
            "Process vs Thread memory address isolation"
          ]
        },
        {
          id: "aeth-106",
          code: "BCA-AET106",
          name: "Communication & Design Thinking",
          mastery: 89,
          credits: 2,
          icon: "users",
          description: "Technical pitch mastery, empathy mapping, stakeholder synthesis, product narrative construction, and cross-team leadership.",
          connectedKnowledge: [
            { name: "Empathy & User Personas", level: 1, type: "core" },
            { name: "Problem Framing Frameworks", level: 2, type: "parent" },
            { name: "Product Narrative Pitching", level: 3, type: "application" },
            { name: "High-Synergy Team Leadership", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Problem Reframing Matrices", status: "Mastered", progress: 92 },
            { title: "Executive Tech Briefing", status: "Mastered", progress: 90 },
            { title: "Rapid Storyboarding", status: "Mastered", progress: 85 }
          ],
          highYieldExamTopics: [
            "5 Stages of Design Thinking (Empathize, Define, Ideate, Prototype, Test)",
            "Structuring an executive-ready technical briefing",
            "Conflict resolution in cross-disciplinary engineering teams"
          ]
        }
      ],
      2: [
        { id: "aeth-201", code: "BCA-AET201", name: "Autonomous Agent Orchestration (LangGraph & CrewAI)", mastery: 40, credits: 4, icon: "bot" },
        { id: "aeth-202", code: "BCA-AET202", name: "Fine-Tuning & Quantization of Open LLMs", mastery: 35, credits: 4, icon: "sliders" },
        { id: "aeth-203", code: "BCA-AET203", name: "Full Stack FastAPI & Vector Databases", mastery: 45, credits: 4, icon: "database" },
        { id: "aeth-204", code: "BCA-AET204", name: "AI Product Management & Agile Sprint Workflows", mastery: 50, credits: 3, icon: "briefcase" }
      ],
      3: [
        { id: "aeth-301", code: "BCA-AET301", name: "Multimodal AI & Speech/Vision Synthesis", mastery: 15, credits: 4, icon: "eye" },
        { id: "aeth-302", code: "BCA-AET302", name: "Enterprise AI Security, Guardrails & Governance", mastery: 20, credits: 4, icon: "shield-check" }
      ]
    },

    nova: {
      1: [
        {
          id: "nov-101",
          code: "BCA-NOV101",
          name: "Modern Full Stack Architecture (TypeScript & Next.js)",
          mastery: 80,
          credits: 4,
          icon: "layers",
          description: "Server Components, dynamic hydration, edge computing, distributed state management, and modern CSS architectures.",
          connectedKnowledge: [
            { name: "Next.js Server Actions", level: 1, type: "core" },
            { name: "TypeScript Type Systems", level: 2, type: "parent" },
            { name: "Microservices Architecture", level: 3, type: "application" },
            { name: "Production Web Applications", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "React Server Components", status: "Mastered", progress: 88 },
            { title: "State Stores (Zustand)", status: "Mastered", progress: 85 },
            { title: "Edge Middleware & Auth", status: "In Progress", progress: 70 }
          ],
          highYieldExamTopics: ["SSR vs SSG vs ISR rendering modes", "Optimistic UI mutations pattern", "JWT session storage security"]
        },
        {
          id: "nov-102",
          code: "BCA-NOV102",
          name: "Neural Network Foundations & PyTorch",
          mastery: 65,
          credits: 4,
          icon: "cpu",
          description: "Tensors, autograd, backpropagation algorithms, activation functions, loss optimizers, and model serialization.",
          connectedKnowledge: [
            { name: "PyTorch Autograd", level: 1, type: "core" },
            { name: "Backpropagation Math", level: 2, type: "parent" },
            { name: "Custom Neural Layers", level: 3, type: "application" },
            { name: "Production Inference APIs", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Feedforward Networks", status: "Mastered", progress: 80 },
            { title: "Convolutional Layers", status: "In Progress", progress: 60 }
          ],
          highYieldExamTopics: ["Vanishing gradient problem solutions", "Cross-entropy loss calculation", "Adam vs SGD with Momentum"]
        },
        {
          id: "nov-103",
          code: "BCA-NOV103",
          name: "Cloud-Native Infrastructure & Docker",
          mastery: 74,
          credits: 4,
          icon: "cloud",
          description: "Multi-stage Docker builds, container orchestration, reverse proxies, CI/CD automated pipelines, and cloud observability.",
          connectedKnowledge: [
            { name: "Docker Containerization", level: 1, type: "core" },
            { name: "Nginx & Load Balancing", level: 2, type: "parent" },
            { name: "Kubernetes Deployments", level: 3, type: "application" },
            { name: "Fault-Tolerant AI Systems", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Multi-stage Dockerfiles", status: "Mastered", progress: 90 },
            { title: "Docker Compose Networks", status: "In Progress", progress: 75 }
          ],
          highYieldExamTopics: ["Layer caching optimization in Docker", "Bridge vs Host networking", "Container security & non-root users"]
        }
      ]
    },

    quanta: {
      1: [
        {
          id: "qua-101",
          code: "BCA-QUA101",
          name: "Applied Data Science & Statistical Inference",
          mastery: 75,
          credits: 4,
          icon: "bar-chart-2",
          description: "Hypothesis testing, ANOVA, linear & logistic regressions, exploratory data analysis, and probabilistic programming.",
          connectedKnowledge: [
            { name: "Statistical Hypothesis Testing", level: 1, type: "core" },
            { name: "Data Cleaning Pipelines", level: 2, type: "parent" },
            { name: "Predictive Regressions", level: 3, type: "application" },
            { name: "Quantitative Decision Making", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "P-Values & Confidence Intervals", status: "Mastered", progress: 85 },
            { title: "Pandas & Polars DataFrames", status: "Mastered", progress: 82 }
          ],
          highYieldExamTopics: ["Type I vs Type II statistical errors", "Assumptions of Linear Regression", "T-test vs ANOVA selection"]
        },
        {
          id: "qua-102",
          code: "BCA-QUA102",
          name: "Machine Learning Pipelines & Feature Engineering",
          mastery: 70,
          credits: 4,
          icon: "git-merge",
          description: "Dimensionality reduction (PCA), feature encoders, ensemble models (XGBoost, Random Forests), and automated hyperparameter tuning.",
          connectedKnowledge: [
            { name: "Feature Encoding & Scaling", level: 1, type: "core" },
            { name: "Ensemble Trees", level: 2, type: "parent" },
            { name: "MLflow Pipeline Tracking", level: 3, type: "application" },
            { name: "Production Scoring Engine", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "PCA Dimensionality Reduction", status: "In Progress", progress: 68 },
            { title: "XGBoost Gradient Boosting", status: "Mastered", progress: 80 }
          ],
          highYieldExamTopics: ["Bias-Variance trade-off mathematical formulation", "Handling imbalanced datasets (SMOTE)", "ROC-AUC curve interpretation"]
        }
      ]
    },

    lumina: {
      1: [
        {
          id: "lum-101",
          code: "BCA-LUM101",
          name: "Generative UI/UX & Cognitive Ergonomics",
          mastery: 82,
          credits: 4,
          icon: "layout",
          description: "Fitts's Law, cognitive load reduction, dynamic AI-adaptive design systems, micro-interactions, and accessibility standards.",
          connectedKnowledge: [
            { name: "Cognitive Load Principles", level: 1, type: "core" },
            { name: "Design Token Systems", level: 2, type: "parent" },
            { name: "Adaptive AI Interfaces", level: 3, type: "application" },
            { name: "Seamless Human-AI Synergy", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Design Tokens & Variable Fonts", status: "Mastered", progress: 92 },
            { title: "AI Streaming State Affordances", status: "Mastered", progress: 85 }
          ],
          highYieldExamTopics: ["Hick's Law and decision latency", "WCAG 2.2 AAA Contrast compliance", "Skeleton loading vs Shimmer perception"]
        },
        {
          id: "lum-102",
          code: "BCA-LUM102",
          name: "Spatial Web Design & Interactive 3D (Three.js/WebGL)",
          mastery: 65,
          credits: 4,
          icon: "globe",
          description: "Shaders, vertex buffer objects, lighting matrices, camera controls, GLTF asset pipelines, and canvas physics.",
          connectedKnowledge: [
            { name: "Three.js Scene Graphs", level: 1, type: "core" },
            { name: "GLSL Fragment Shaders", level: 2, type: "parent" },
            { name: "3D Visualizations", level: 3, type: "application" },
            { name: "Immersive Cosmic Experiences", level: 4, type: "outcome" }
          ],
          topics: [
            { title: "Shader Materials & Uniforms", status: "In Progress", progress: 62 },
            { title: "OrbitControls & Raycasting", status: "Mastered", progress: 80 }
          ],
          highYieldExamTopics: ["PerspectiveCamera FoV calculations", "Lighting models (Phong vs PBR)", "Draw call batching optimization"]
        }
      ]
    }
  },

  // Student DNA default matrix & evidence breakdown
  studentDNA: {
    skills: [
      { name: "Generative AI", level: 82, color: "#818cf8", evidence: "Built Context-Aware RAG Agent + Top 5% in Kochi AI Hackathon" },
      { name: "Python Automation", level: 74, color: "#38bdf8", evidence: "Completed 28 FastAPI micro-missions + Automated Scripting Lab" },
      { name: "Communication", level: 88, color: "#c084fc", evidence: "Led Semester 1 Design Thinking Pitch + Technical Briefing High Distinction" },
      { name: "Problem Solving", level: 79, color: "#34d399", evidence: "Solved 42 Algorithmic Missions on ASTRAEA Next Move Engine" },
      { name: "Leadership", level: 64, color: "#fbbf24", evidence: "Formed 4-World Cross-Specialisation Team for Smart Campus Hackathon" },
      { name: "UI/UX Design", level: 52, color: "#f472b6", evidence: "Designed Figma Glassmorphic Component Library for BCA Project Lab" }
    ],
    overallRank: "Top 8% of Semester 1 Cohort",
    constellationStars: 14,
    studyMissionsCompleted: 38
  },

  // Opportunity Radar
  opportunities: [
    {
      id: "opp-01",
      title: "Kerala AI Nexus Hackathon 2026",
      organization: "Kochi Innovation Hub & JAIN Tech Park",
      matchScore: 94,
      difficulty: "Beginner / Intermediate",
      deadline: "9 days remaining",
      teamRequired: 4,
      recommendedFor: ["aether", "nova", "quanta", "lumina"],
      whyMatch: [
        "✓ Aether Generative AI specialisation required",
        "✓ Strong Python & Vector Search DNA match",
        "✓ Matches Semester 1 Context Engineering syllabus",
        "✓ Multi-disciplinary team bonus (Needs Full Stack + Design)"
      ],
      rolesNeeded: [
        { world: "aether", role: "AI Core & Prompt Engineer", filled: true, student: "You (Identity Confirmed)" },
        { world: "nova", role: "Full Stack & Cloud Deployer", filled: false, suggestedName: "Rohan M." },
        { world: "quanta", role: "Dataset & Vector Pipeline", filled: false, suggestedName: "Ananya S." },
        { world: "lumina", role: "Cosmic UI/UX Designer", filled: false, suggestedName: "Kavya N." }
      ],
      prize: "₹1,50,000 + JAIN Incubation Seed Grant"
    },
    {
      id: "opp-02",
      title: "Smart Campus Autonomous Assistant Challenge",
      organization: "JAIN University Work-Integrated Tech Cell",
      matchScore: 89,
      difficulty: "All Semesters",
      deadline: "16 days remaining",
      teamRequired: 3,
      recommendedFor: ["aether", "nova", "lumina"],
      whyMatch: [
        "✓ Heavy focus on Campus Memory & LLM retrieval",
        "✓ Excellent portfolio asset for 2nd Year Industry Placement",
        "✓ Mentorship from Senior AI Architects"
      ],
      rolesNeeded: [
        { world: "aether", role: "LLM Orchestrator", filled: true, student: "You" },
        { world: "nova", role: "API Backend", filled: false, suggestedName: "Aditya V." },
        { world: "lumina", role: "Voice & UI Lead", filled: false, suggestedName: "Meera P." }
      ],
      prize: "Direct Work-Integrated Co-op Shortlist"
    },
    {
      id: "opp-03",
      title: "Google Gemini Frontier Research Grant",
      organization: "Google DeepMind Academic Alliance",
      matchScore: 81,
      difficulty: "Advanced",
      deadline: "24 days remaining",
      teamRequired: 2,
      recommendedFor: ["aether", "quanta"],
      whyMatch: [
        "✓ Context window optimization benchmark match",
        "✓ High academic distinction points"
      ],
      rolesNeeded: [
        { world: "aether", role: "Context Engineer", filled: true, student: "You" },
        { world: "quanta", role: "Statistical Evaluator", filled: false, suggestedName: "Devika R." }
      ],
      prize: "$2,500 Cloud Credits + Co-Authorship"
    }
  ],

  // Constellations Social & Multi-Disciplinary Team Matchmaker
  constellationPeers: [
    {
      id: "peer-nova-1",
      name: "Rohan Menon",
      studentId: "JU24BCA-N012",
      specialisation: "nova",
      semester: 1,
      match: "98% Synergy",
      skills: ["Next.js", "Docker", "FastAPI", "PostgreSQL"],
      bio: "Building distributed agent runtimes. Looking for a GenAI lead for the Kerala AI Nexus Hackathon.",
      avatarSeed: "Rohan",
      dnaHighlight: "Full Stack 88% | Cloud 76%"
    },
    {
      id: "peer-quanta-1",
      name: "Ananya Sharma",
      studentId: "JU24BCA-Q034",
      specialisation: "quanta",
      semester: 1,
      match: "96% Synergy",
      skills: ["Polars", "Feature Engineering", "Vector Math", "BigQuery"],
      bio: "Passionate about high-dimensional vector embeddings and statistical evaluation of AI agents.",
      avatarSeed: "Ananya",
      dnaHighlight: "Data Science 85% | Python 82%"
    },
    {
      id: "peer-lumina-1",
      name: "Kavya Nair",
      studentId: "JU24BCA-L019",
      specialisation: "lumina",
      semester: 1,
      match: "97% Synergy",
      skills: ["Figma Design Systems", "Three.js", "Generative UI", "Framer"],
      bio: "Specializing in cosmic glassmorphic interfaces and intuitive streaming AI interaction flows.",
      avatarSeed: "Kavya",
      dnaHighlight: "UI/UX 92% | Spatial Web 78%"
    },
    {
      id: "peer-aether-2",
      name: "Siddharth Verma",
      studentId: "JU24BCA-A045",
      specialisation: "aether",
      semester: 1,
      match: "91% Synergy",
      skills: ["LangChain", "Evaluation Evals", "Fine-Tuning", "Tech Strategy"],
      bio: "Exploring open-source model quantizations and low-latency local inference.",
      avatarSeed: "Siddharth",
      dnaHighlight: "Gen AI 84% | Strategy 80%"
    }
  ],

  // Campus Memory: Crowdsourced Academic Intelligence
  campusMemory: [
    {
      id: "mem-01",
      subject: "Context Engineering & GenAI Foundations",
      professor: "Dr. Radhakrishnan K.",
      difficulty: 8.4,
      ratingsCount: 127,
      confidence: 91,
      status: "Verified",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      lastUpdated: "16 days ago",
      insightText: "Professor focuses heavily on practical reasoning over memorization. Expect scenario-based questions where you must diagnose token budget overruns and vector drift rather than just writing definitions.",
      keyAdvice: "Master few-shot system prompt structures and vector similarity trade-offs. The lab exam expects working FastAPI endpoints.",
      verifiedByFaculty: true
    },
    {
      id: "mem-02",
      subject: "Mathematical Reasoning & Statistics",
      professor: "Prof. Anjali Mohan",
      difficulty: 8.9,
      ratingsCount: 94,
      confidence: 88,
      status: "Verified",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      lastUpdated: "11 days ago",
      insightText: "Quizzes are rigorous on Bayes Theorem and Gradient Descent intuitions. Solve the tutorial sheet step-by-step before every class.",
      keyAdvice: "Pay special attention to matrix multiplication dimensions for multi-head attention.",
      verifiedByFaculty: true
    },
    {
      id: "mem-03",
      subject: "Python Programming & Automation",
      professor: "Prof. George Mathew",
      difficulty: 6.8,
      ratingsCount: 142,
      confidence: 95,
      status: "Verified",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      lastUpdated: "5 days ago",
      insightText: "High reward for clean PEP-8 code and async programming. If you write automated unit tests for your assignments, you gain extra marks.",
      keyAdvice: "Use Type Hints and Pydantic models. Avoid monolithic scripts.",
      verifiedByFaculty: true
    },
    {
      id: "mem-04",
      subject: "Computer Systems & Architecture",
      professor: "Dr. Sandeep Paul",
      difficulty: 7.6,
      ratingsCount: 81,
      confidence: 82,
      status: "Developing",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      lastUpdated: "3 days ago",
      insightText: "Transitioned this semester to focus 50% on GPU tensor architecture and CUDA memory hierarchies instead of purely classic 8086 CPUs.",
      keyAdvice: "Understand the differences between CPU cache lines and GPU shared memory.",
      verifiedByFaculty: false
    }
  ],

  // Campus Pulse: Live Real-Time Activity Feed
  campusPulse: [
    {
      id: "pulse-1",
      type: "team",
      badge: "Team Formation",
      color: "border-purple-500/30 text-purple-400",
      title: "23 students are looking for Kerala AI Nexus Hackathon teammates",
      time: "4 mins ago",
      meta: "NOVA + AETHER + LUMINA combinations trending"
    },
    {
      id: "pulse-2",
      type: "discussion",
      badge: "Lumina Workshop",
      color: "border-pink-500/30 text-pink-400",
      title: "Design Technology students are sharing advanced Figma glassmorphic UI tokens",
      time: "18 mins ago",
      meta: "14 downloadable asset kits shared"
    },
    {
      id: "pulse-3",
      type: "opportunity",
      badge: "New Competition",
      color: "border-sky-500/30 text-sky-400",
      title: "Google Cloud GenAI Hackathon registration opened for Kochi campus",
      time: "32 mins ago",
      meta: "Verified by JAIN Work-Integrated Placement Cell"
    },
    {
      id: "pulse-4",
      type: "academic",
      badge: "Study Pulse",
      color: "border-indigo-500/30 text-indigo-400",
      title: "Context Engineering topic 'Long Context Retrieval' is trending in Semester 1 study groups",
      time: "1 hour ago",
      meta: "84 micro-missions completed today"
    },
    {
      id: "pulse-5",
      type: "rescue",
      badge: "Exam Rescue",
      color: "border-rose-500/30 text-rose-400",
      title: "Exam Rescue activated: Mid-term assessment in 3 days for Mathematical Reasoning",
      time: "2 hours ago",
      meta: "High-yield concept sheets published"
    }
  ],

  // Campus Time Machine: Evolutive milestones
  timeMachine: {
    "2026": {
      year: "2026",
      theme: "The Dawn of Autonomous Workflows",
      headline: "Foundational LLM integration & 4-World Work-Integrated Inception",
      keyHighlights: [
        "Inception of the 4-World BCA model at JAIN University Kochi",
        "ASTRAEA ecosystem deployed for intelligent student layer",
        "Top project: Multi-Agent Clinical Diagnosis Assistant (Aether + Nova)",
        "Core industry shift: From basic coding to context engineering and system architecture"
      ],
      stats: { studentsEnrolled: 240, hackathonsWon: 12, industryPartners: 18 }
    },
    "2027": {
      year: "2027",
      theme: "The Multi-Agent Synthesis",
      headline: "Autonomous agent teams and spatial computing interfaces",
      keyHighlights: [
        "Over 85% of student projects run on autonomous self-healing agent clusters",
        "Lumina students deploy spatial WebGL interfaces for real-time robotic telemetry",
        "Quanta big data pipelines power real-time Kochi smart logistics pilot",
        "All 4 specialisations collaborate on student-led enterprise spinouts"
      ],
      stats: { studentsEnrolled: 520, hackathonsWon: 34, industryPartners: 45 }
    },
    "2028": {
      year: "2028",
      theme: "Frontier Symbiosis & Global Deployment",
      headline: "Full work-integrated industry deployment & student founders",
      keyHighlights: [
        "First graduating cohort of the Work-Integrated BCA ecosystem",
        "100% placement rate in frontier AI engineering & design strategy roles",
        "6 student startups funded by leading national VC syndicates",
        "ASTRAEA digital memory spans 3 years of living campus wisdom"
      ],
      stats: { studentsEnrolled: 890, hackathonsWon: 78, industryPartners: 110 }
    }
  },

  // Career Orbit trajectory match %
  careerOrbits: [
    {
      title: "Generative AI Engineer",
      match: 82,
      color: "#818cf8",
      demand: "Extremely High (Kochi & Bangalore AI Hubs)",
      avgPackage: "₹12 - 24 LPA",
      requirements: ["Deep LLM Context Engineering", "Async Python & FastAPI", "Vector DB Architecture"],
      gapToClose: ["Build 2 production LangGraph projects", "Master open-source model quantizations"]
    },
    {
      title: "AI Product Specialist / Technical PM",
      match: 78,
      color: "#c084fc",
      demand: "High Growth",
      avgPackage: "₹10 - 18 LPA",
      requirements: ["Cross-World Synthesis", "Design Thinking", "AI Ergonomics & Guardrails"],
      gapToClose: ["Document 1 end-to-end product PRD in Project Lab", "Lead a 4-specialisation hackathon team"]
    },
    {
      title: "Autonomous Automation Developer",
      match: 76,
      color: "#38bdf8",
      demand: "High",
      avgPackage: "₹9 - 16 LPA",
      requirements: ["FastAPI Microservices", "Docker & CI/CD", "Tool Calling & Agents"],
      gapToClose: ["Complete Docker multi-stage build mastery", "Implement resilient error recovery"]
    },
    {
      title: "Applied Data Analyst & ML Engineer",
      match: 61,
      color: "#34d399",
      demand: "Steady",
      avgPackage: "₹8 - 15 LPA",
      requirements: ["Statistical Modeling", "Polars & Pandas", "SQL Optimizations"],
      gapToClose: ["Deepen statistical hypothesis testing scores", "Collaborate with Quanta peer on big data set"]
    }
  ],

  // Admin & Faculty Initial Mock Roster for Teacher Command Deck
  teacherRoster: [
    { id: "JU24BCA-A001", name: "Aarav Sharma", email: "aarav.s@jainuniversity.ac.in", spec: "aether", sem: 1, masteryAvg: 74, status: "Active", stars: 14 },
    { id: "JU24BCA-A002", name: "Sneha Nair", email: "sneha.n@jainuniversity.ac.in", spec: "aether", sem: 1, masteryAvg: 81, status: "Active", stars: 19 },
    { id: "JU24BCA-N001", name: "Rohan Menon", email: "rohan.m@jainuniversity.ac.in", spec: "nova", sem: 1, masteryAvg: 83, status: "Active", stars: 22 },
    { id: "JU24BCA-N002", name: "Aditya Varma", email: "aditya.v@jainuniversity.ac.in", spec: "nova", sem: 1, masteryAvg: 69, status: "Active", stars: 11 },
    { id: "JU24BCA-Q001", name: "Ananya Sharma", email: "ananya.s@jainuniversity.ac.in", spec: "quanta", sem: 1, masteryAvg: 86, status: "Active", stars: 25 },
    { id: "JU24BCA-Q002", name: "Devika Rajan", email: "devika.r@jainuniversity.ac.in", spec: "quanta", sem: 1, masteryAvg: 72, status: "Active", stars: 15 },
    { id: "JU24BCA-L001", name: "Kavya Nair", email: "kavya.n@jainuniversity.ac.in", spec: "lumina", sem: 1, masteryAvg: 88, status: "Active", stars: 28 },
    { id: "JU24BCA-L002", name: "Meera Pillai", email: "meera.p@jainuniversity.ac.in", spec: "lumina", sem: 1, masteryAvg: 77, status: "Active", stars: 16 }
  ]
};

if (typeof window !== 'undefined') {
  window.ASTRAEA_DATA = ASTRAEA_DATA;
}
