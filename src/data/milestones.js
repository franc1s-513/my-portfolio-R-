export const DEFAULT_MILESTONES = [
  {
    id: "study-jam", number: "01",
    title: "Google Study Jam",
    overlayTitle: "Google Study Jam",
    overlaySubtitle: "Cloud & Developer Technologies",
    subtitle: "Cloud & Developer Technologies",
    category: "Learning", date: "Month Year", badge: "Participant",
    shortTitle: "Study Jam",
    treeRatio: [2.2, 0.15, 2.8], // Right bottom, far front
    sizeMultiplier: 0.7, // Small
    description: "Participated in the Google Study Jam, laying the foundation of my technical journey by diving deep into Google Cloud technologies and core development concepts.",
    highlights: ["Google Cloud", "Foundations", "Peer Learning"],
    color: "#93c5fd", // Soft blue
  },
  {
    id: "vit-workshop", number: "02",
    title: "VIT Workshop",
    overlayTitle: "VIT Technical Workshop",
    overlaySubtitle: "Specialized Technical Training",
    subtitle: "Specialized Technical Training",
    category: "Talks and workshops", date: "Month Year", badge: "Attendee",
    shortTitle: "VIT Workshop",
    treeRatio: [-2.6, 0.25, 2.5], // Left lower, front
    sizeMultiplier: 0.7, // Small
    description: "Attended an intensive technical workshop at VIT, gaining hands-on experience and specialized insights from industry professionals.",
    highlights: ["Technical Deep Dive", "Hands-on Practice"],
    color: "#a78bfa", // Violet
  },
  {
    id: "psg-presentation", number: "03",
    title: "PSG PPT Presentation",
    overlayTitle: "PSG Research Talk",
    overlaySubtitle: "Technical Speaker",
    subtitle: "Research & Technical Speaking",
    category: "Talks and workshops", date: "Month Year", badge: "Presenter",
    shortTitle: "PSG Talk",
    treeRatio: [3.2, 0.45, 2.0], // Right mid, front
    sizeMultiplier: 1.1, // Medium
    description: "Delivered a formal technical presentation at PSG. Researched, structured, and communicated complex technical concepts to a live audience.",
    highlights: ["Public Speaking", "Technical Research", "Q&A Handling"],
    color: "#a78bfa", // Violet
  },
  {
    id: "kpr-hackathon", number: "04",
    title: "KPR 24-hr Hackathon",
    overlayTitle: "KPR Hackathon",
    overlaySubtitle: "24-Hour Rapid Prototyping",
    subtitle: "Rapid Prototyping & Execution",
    category: "Hackathons", date: "Month Year", badge: "Participant (24 hrs)",
    shortTitle: "KPR 24h",
    treeRatio: [-3.4, 0.55, 2.2], // Far Left mid, front
    sizeMultiplier: 1.1, // Medium
    description: "Competed in a rigorous 24-hour hackathon at KPR. Brainstormed, built, and deployed a functional prototype under extreme time constraints.",
    highlights: ["Rapid MVP", "Team Execution", "Under Pressure"],
    color: "#2dd4bf", // Teal
  },
  {
    id: "gdg-hackathon", number: "05",
    title: "GDG 36-hr Hackathon",
    overlayTitle: "Google Developer Groups",
    overlaySubtitle: "36-Hour Hackathon Volunteer",
    subtitle: "Community Leadership & Support",
    category: "Hackathons", date: "Month Year", badge: "Volunteer (36 hrs)",
    shortTitle: "GDG 36h",
    treeRatio: [0.0, 0.70, 3.2], // Dead center front, floating high
    sizeMultiplier: 1.1, // Medium
    description: "Helped run and organize a massive 36-hour GDG hackathon. Supported participants, managed logistics, and ensured technical infrastructure ran smoothly.",
    highlights: ["Event Organization", "Technical Support", "Community Building"],
    color: "#2dd4bf", // Teal
  },
  {
    id: "praskala-intern", number: "06",
    title: "Praskala Technology",
    overlayTitle: "Praskala Technology",
    overlaySubtitle: "Graphic Design & Sales Intern",
    subtitle: "Professional Industry Experience",
    category: "Work", date: "Dec 2025 to Feb 2026", badge: "Intern",
    shortTitle: "Praskala",
    treeRatio: [-1.6, 0.75, 2.8], // Top left front
    sizeMultiplier: 1.8, // Large
    description: "Worked as an intern at Praskala Technology, bridging the gap between academic knowledge and real-world production environments. Contributed to live projects.",
    highlights: ["Production Code", "Agile Workflow", "Industry Standards"],
    color: "#fbbf24", // Gold
    customLayout: {
      top: {
        title: "Internship Details",
        content: "Company: Praskala Technology\nDuration: Dec 2025 to Feb 2026\nRole: Graphic Design & Project Maintenance"
      },
      center: {
        image: "/certificate-praskala.png"
      },
      left: {
        title: "My Job",
        points: ["I gathered the leads for more projects", "Learnt about SEO", "How SEO matters and its use"]
      },
      right: {
        title: "What I Learnt",
        points: ["The Structure of the company", "How a company works", "How they pull clients"]
      }
    }
  },
  {
    id: "touchmark-intern", number: "07",
    title: "Touch Mark",
    overlayTitle: "Touch Mark Solutions",
    overlaySubtitle: "Advanced Engineering Intern",
    subtitle: "Advanced Professional Role",
    category: "Work", date: "Month Year", badge: "Intern",
    shortTitle: "Touch Mark",
    treeRatio: [1.6, 0.80, 2.6], // Top right front
    sizeMultiplier: 1.8, // Large
    description: "Internship at Touch Mark, taking on increased responsibilities and delivering measurable value in a professional engineering capacity.",
    highlights: ["Advanced Delivery", "Cross-functional", "Real-world Impact"],
    color: "#fbbf24", // Gold
  }
];
