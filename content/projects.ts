export interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
}

export const featuredProjects: Project[] = [
    {
        title: "My Portfolio",
        description: "My personal developer portfolio featuring a digital garden, integrated Spotify/TMDB stats, and an LLM-friendly markdown view.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        link: "https://github.com/vatsal30/my-portfolio"
    },
    {
        title: "Melanoma Detection",
        description: "Developed a robust melanoma detection model using Convolutional Neural Networks, achieving high accuracy in classifying skin lesions from dermoscopic images.",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
        link: "https://github.com/vatsal30/Melanoma-Detection"
    },
    {
        title: "LeetCode Solutions",
        description: "A comprehensive collection of optimized data structures and algorithms solutions, demonstrating problem-solving across various challenges.",
        tech: ["Python", "JavaScript", "Algorithms"],
        link: "https://github.com/vatsal30/LeetCode"
    },   
    {
        title: "Advent of Code Solutions",
        description: "A collection of solutions to the annual Advent of Code challenge, showcasing problem-solving skills and algorithmic thinking.",
        tech: ["Python", "Algorithms"],
        link: "https://github.com/vatsal30/Advent-of-Code"
    },  
];
