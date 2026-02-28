"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        id: 1,
        role: "Senior Software Engineer",
        company: "Tech StartUp Co.",
        date: "2023 - Present",
        description:
            "Led the frontend team in building a modern scalable web application using Next.js and Tailwind CSS. Improved performance by 40%.",
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Agency XYZ",
        date: "2020 - 2023",
        description:
            "Developed custom eCommerce solutions, created RESTful APIs using Node.js, and implemented highly interactive UIs with React.",
    },
    {
        id: 3,
        role: "Frontend Intern",
        company: "Big Corp Inc.",
        date: "2019 - 2020",
        description:
            "Assisted in migrating legacy jQuery applications to modern React. Learned agile methodologies and version control practices.",
    },
];

export default function ExperienceTimeline() {
    return (
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-6 mt-12 mb-16 space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 md:pl-0"
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-zinc-950 md:-left-[5px]" />

                    <div className="md:pl-10 flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                        <div className="flex-shrink-0 md:w-32 pt-1">
                            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                {exp.date}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                                {exp.role}
                            </h3>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                                {exp.company}
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
