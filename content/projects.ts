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
      "My personal developer portfolio featuring a digital garden, integrated Spotify/TMDB stats, and an LLM-friendly markdown view.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/vatsal30/my-portfolio",
    date: "March 2026",
    story:
      "This is the third major iteration of my web presence. I wanted to move away from overly complex 3D animations and focus strictly on high-performance minimalism, typography, and functional features like the Markdown API feed for agents.",
  },
  {
    title: "Melanoma Detection",
    description:
      "Developed a robust melanoma detection model using Convolutional Neural Networks, achieving high accuracy in classifying skin lesions from dermoscopic images.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
    link: "https://github.com/vatsal30/Melanoma-Detection",
    date: "May 2024",
    story:
      "Built during my time at college, this computer vision pipeline parses thousands of dermoscopic images to spot malignant lesions. Getting the recall high enough took weeks of hyperparameter tuning and data augmentation.",
  },
  {
    title: "LeetCode Solutions",
    description:
      "A comprehensive collection of optimized data structures and algorithms solutions, demonstrating problem-solving across various challenges.",
    tech: ["Python", "JavaScript", "Algorithms"],
    link: "https://github.com/vatsal30/LeetCode",
    date: "Continuous",
    story:
      "My daily journal of algorithm practice. It's heavily organized by topic—from generic Trees & Graphs all the way down to obscure segment tree implementations.",
  },
  {
    title: "Advent of Code Solutions",
    description:
      "A collection of solutions to the annual Advent of Code challenge, showcasing problem-solving skills and algorithmic thinking.",
    tech: ["Python", "Algorithms"],
    link: "https://github.com/vatsal30/Advent-of-Code",
    date: "December Yearly",
    story:
      "Ah, the December tradition. These repositories hold all of my sometimes elegant, sometimes horribly brute-forced solutions to the famous 25-day coding gauntlet.",
  },
];
