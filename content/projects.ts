export interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
}

export const featuredProjects: Project[] = [
    {
        title: "Melanoma Detection",
        description: "Developed a robust melanoma detection model using Convolutional Neural Networks, achieving high accuracy in classifying skin lesions from dermoscopic images.",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
        link: "https://github.com/vatsal30/Melanoma-Detection"
    },
    {
        title: "LeetCode Solutions",
        description: "A comprehensive collection of optimized data structures and algorithms solutions, demonstrating problem-solving across various challenges.",
        tech: ["Python", "C++", "Algorithms"],
        link: "https://github.com/vatsal30/leetcode"
    },
    {
        title: "My Portfolio",
        description: "My personal developer portfolio featuring a digital garden, integrated Spotify/TMDB stats, and an LLM-friendly markdown view.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        link: "https://github.com/vatsal30/my-portfolio"
    },
    {
        title: "2048 Game Clone",
        description: "A web-based clone of the popular 2048 puzzle game, featuring smooth animations and responsive design.",
        tech: ["JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/vatsal30/2048-game-clone"
    }
];
