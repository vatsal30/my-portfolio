export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  story?: string;
  date: string;
}

export const featuredProjects: Project[] = [
  {
    title: "My Portfolio",
    description:
      "My personal developer portfolio — a digital workspace with a garden, Spotify/TMDB integrations, aura effects, and an LLM-friendly markdown view.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/vatsal30/my-portfolio",
    date: "March 2026",
    story:
      "The second major iteration of my web presence. V2 doubles down on high-performance minimalism — I added an Aura Mode with zen ripple effects, fixed dark mode detection, a persistent Abacus click counter, LLM-friendly markdown mode, and a fully revamped tech stack showcasing my real skills. Built to feel like a workspace, not just a resume.",
  },
  {
    title: "Melanoma Detection",
    description:
      "A CNN-based melanoma detection model that classifies skin lesions from dermoscopic images with high accuracy.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
    link: "https://github.com/vatsal30/Melanoma-Detection",
    date: "May 2024",
    story:
      "Built during college — this computer vision pipeline parses thousands of dermoscopic images to spot malignant lesions. Getting recall high enough took weeks of hyperparameter tuning and data augmentation.",
  },
  {
    title: "LeetCode Solutions",
    description:
      "A well-organized collection of optimized DSA solutions across topics — from Trees & Graphs to segment trees.",
    tech: ["Python", "JavaScript", "Algorithms"],
    link: "https://github.com/vatsal30/LeetCode",
    date: "Continuous",
    story:
      "My daily algorithm journal, heavily organized by topic. It's the kind of repo that grows a little every time I hit a problem I can't shake.",
  },
  {
    title: "Advent of Code Solutions",
    description:
      "My solutions to the annual Advent of Code — sometimes elegant, sometimes brute-forced, always fun.",
    tech: ["Python", "Algorithms"],
    link: "https://github.com/vatsal30/Advent-of-Code",
    date: "December Yearly",
    story:
      "The December tradition. 25 days, 25 puzzles, varying levels of coffee required. These repos hold every solution from my clean ones to my 'it works, don't ask' ones.",
  },
];
