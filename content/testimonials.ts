export type Testimonial = {
    id: string;
    quote: string;
    name: string;
    role: string;
    company: string;
    linkedinUrl: string;
};

export const testimonialsData: Testimonial[] = [
    {
        id: "ayyappa-muthusami",
        name: "Ayyappa Muthusami",
        role: "Senior Engineering Manager",
        company: "Cisco Splunk",
        quote: "Vatsal’s dedication to learning and his ability to tackle complex customer issues made a significant impact. His transition from front-end development to full-stack engineering was seamless, and his curiosity and commitment to quality enabled him to contribute to several innovative and research-driven initiatives. I highly rate Vatsal’s work.",
        linkedinUrl: "https://www.linkedin.com/in/ayyappamuthusami/"
    },
    {
        id: "nadir-riyani",
        name: "Nadir Riyani",
        role: "Engineering Leader",
        company: "Software Delivery & Innovation",
        quote: "I’ve been consistently impressed by his dedication, problem-solving abilities, and overall professionalism. Vatsal stands out for his proactive support and troubleshooting skills, especially when handling complex customer issues. He resolves problems efficiently while maintaining excellent customer relationships.",
        linkedinUrl: "https://www.linkedin.com/in/nadir-riyani-7bba5b3a"
    },
    {
        id: "jeffrey-shih",
        name: "Jeffrey Shih",
        role: "Software Engineer",
        company: "Meta",
        quote: "Vatsal consistently goes above and beyond in his role, putting in maximum effort to ensure the success of every project. His versatility as a full-stack engineer is awesome - there have been many times he would switch between working on a front-end feature and a back-end bug fix, completing both within the same sprint.",
        linkedinUrl: "https://www.linkedin.com/in/jeffrey-shih/"
    },
    {
        id: "everett-kotler",
        name: "Everett Kotler",
        role: "Senior Staff Software Engineer",
        company: "Splunk / Cisco",
        quote: "Vatsal’s technical skills, particularly in front-end development with React, were critical in translating complex data-driven insights into an intuitive and highly effective user interface. He was proactive, detail-oriented, and consistently delivered results that exceeded expectations.",
        linkedinUrl: "https://www.linkedin.com/in/everettkotler/"
    },
    {
        id: "annu-kath",
        name: "Annu Kath",
        role: "Sr. Principal Software Engineer",
        company: "Splunk",
        quote: "Vatsal is a dedicated and talented software engineer who made significant contributions to the ITSI application team at Splunk. He is a fast learner and quickly became a go-to person for complex front-end features and bug fixes. Vatsal has a great eye for detail.",
        linkedinUrl: "https://www.linkedin.com/in/annukath/"
    }
];
