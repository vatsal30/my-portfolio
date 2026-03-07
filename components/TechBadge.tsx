import {
    SiPython, SiTensorflow, SiKeras, SiOpencv, SiCplusplus,
    SiNextdotjs, SiTailwindcss, SiFramer, SiJavascript, SiHtml5, SiCss3
} from "react-icons/si";
import { BrainCircuit } from "lucide-react";

// Cycle through these to give each badge a distinct but harmonious color
const TAG_COLORS = [
    "text-green-600  dark:text-green-400",
    "text-orange-500 dark:text-orange-400",
    "text-purple-600 dark:text-purple-400",
    "text-sky-600    dark:text-sky-400",
    "text-rose-500   dark:text-rose-400",
];

export function TechBadge({ tech, index = 0 }: { tech: string; index?: number }) {
    const color = TAG_COLORS[index % TAG_COLORS.length];

    let Icon = null;
    switch (tech.toLowerCase()) {
        case "python": Icon = SiPython; break;
        case "tensorflow": Icon = SiTensorflow; break;
        case "keras": Icon = SiKeras; break;
        case "opencv": Icon = SiOpencv; break;
        case "c++": Icon = SiCplusplus; break;
        case "algorithms": Icon = BrainCircuit; break;
        case "next.js": Icon = SiNextdotjs; break;
        case "tailwind css": Icon = SiTailwindcss; break;
        case "framer motion": Icon = SiFramer; break;
        case "javascript": Icon = SiJavascript; break;
        case "html5": Icon = SiHtml5; break;
        case "css3": Icon = SiCss3; break;
        default: break;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-xs font-mono font-semibold border border-zinc-200 dark:border-zinc-700/50 ${color}`}>
            {Icon && <Icon className="w-3 h-3 shrink-0" />}
            {tech}
        </span>
    );
}

