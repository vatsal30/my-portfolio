import {
    SiPython,
    SiTensorflow,
    SiKeras,
    SiOpencv,
    SiCplusplus,
    SiNextdotjs,
    SiTailwindcss,
    SiFramer,
    SiJavascript,
    SiHtml5,
    SiCss3
} from "react-icons/si";
import { BrainCircuit } from "lucide-react";

export function TechBadge({ tech }: { tech: string }) {
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm border border-black/5 dark:border-white/5">
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {tech}
        </span>
    );
}
