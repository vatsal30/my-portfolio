export type CareerItem = {
    id: string;
    company: string;
    role: string;
    date: string;
    location: string;
    description: string[];
    tech: { name: string; slug: string }[];
    link?: string;
    logo?: string;
};

export const careerData: CareerItem[] = [
    {
        id: "hcltech",
        company: "HCLTech",
        role: "Senior Developer",
        date: "April 2025 - Present",
        location: "Pune, India",
        description: [
            "Orchestrating the architectural migration of a legacy logistics system to React and Python FastAPI.",
            "Engineered a real-time geospatial tracking engine using WebSockets for 250+ concurrent drivers with sub-second latency.",
            "Designed and implemented core features including Job Creation workflows and comprehensive Driver Audit reports."
        ],
        tech: [
            { name: "React", slug: "react" },
            { name: "Python", slug: "python" },
            { name: "FastAPI", slug: "fastapi" }
        ],
        link: "https://www.hcltech.com/",
        logo: "https://media.licdn.com/dms/image/v2/C4D0BAQF-RIoeeMTMKQ/company-logo_200_200/company-logo_200_200/0/1664197008219/hcltech_logo?e=1773878400&v=beta&t=T63KwLQh3gX_9Bd-3SfJqIlohR748tLqDWKY0dPj9zc"
    },
    {
        id: "crest-data",
        company: "Crest Data",
        role: "Senior Software Engineer",
        date: "May 2021 - April 2025",
        location: "Ahmedabad, India",
        description: [
            "Architected an ML-Assisted Thresholding engine to provide automated KPI recommendations.",
            "Reduced nightly data recalculation search time by 90% through advanced query optimization.",
            "Developed the Service Insights module using React and Python, reducing false-positive alerts for 700+ enterprise customers.",
            "Led the development of the Configuration Assistant, recognized at Splunk.conf24 for its innovative use of ML-driven multi-KPI thresholding."
        ],
        tech: [
            { name: "Python", slug: "python" },
            { name: "React", slug: "react" },
            { name: "JavaScript", slug: "javascript" },
            { name: "GitLab", slug: "gitlab" },
            { name: "Splunk Cloud", slug: "splunkcloud" },
            { name: "Django", slug: "django" },
            { name: "Splunk", slug: "splunk" }
        ],
        link: "https://www.crestdata.ai/",
        logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE_FtL4007RnQ/company-logo_200_200/B4DZvAYvXyIIAI-/0/1768459270280/crest_data_logo?e=1773878400&v=beta&t=snleilE2R78nsmV3Zt0VYdu_qzFPANKI4JO_g3ACN98"
    },
    {
        id: "cspit",
        company: "Chandubhai S. Patel Inst. of Technology",
        role: "B.Tech in Computer Engineering",
        date: "Graduated May 2021",
        location: "Gujarat, India",
        description: [
            "Graduated with a CGPA of 9.49.",
            "Gained strong foundational knowledge in algorithms, data structures, and software engineering."
        ],
        tech: [
            { name: "C++", slug: "cplusplus" },
            { name: "Java", slug: "openjdk" },
            { name: "SQL", slug: "mysql" }
        ],
        link: "https://www.charusat.ac.in/",
        logo: "https://logo.clearbit.com/charusat.ac.in"
    }
];
