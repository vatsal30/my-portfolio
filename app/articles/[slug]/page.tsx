import { getBlogContent, getBlogList } from "@/lib/blog";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import Image from "next/image";
import ReadingProgress from "@/components/ReadingProgress";
import CopyCodeButtons from "@/components/CopyCodeButtons";
import "@/styles/markdown.css";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    const articles = await getBlogList();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = await getBlogContent(slug);

    if (!content) return { title: "Article Not Found" };

    const { data } = matter(content);

    return {
        title: `${data.title || slug.replace(/-/g, " ")} | Vector Builds`,
        description: data.excerpt || `Read article ${slug}`,
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const rawContent = await getBlogContent(slug);

    if (!rawContent) {
        notFound();
    }

    const { data, content } = matter(rawContent);

    const prettyCodeOptions = {
        theme: "one-dark-pro",
        keepBackground: false,
    };

    // Format date beautifully
    const formattedDate = data.date 
        ? new Date(data.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    // Handle tags properly
    const tagsArray = data.tags && data.tags.length > 0 
        ? data.tags 
        : (data.category ? [data.category] : []);

    return (
        <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <ReadingProgress />
            
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl pt-24 pb-32">
                <div className="mb-12">
                    <Link
                        href="/articles"
                        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                        </svg>
                        Back to Articles
                    </Link>
                </div>

                <header className="mb-16 space-y-6">
                    {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tagsArray.map((tag: string) => (
                                <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {data.title || slug.replace(/-/g, " ")}
                    </h1>

                    <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium">
                        <time>{formattedDate}</time>
                        <span>•</span>
                        <span>Vatsal Vora</span>
                    </div>
                </header>

                <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-lg">
                    <CopyCodeButtons />
                    <MDXRemote
                        source={content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
                            }
                        }}
                        components={{
                            img: (props) => {
                                const src = props.src as string;
                                const alt = props.alt as string;
                                return (
                                    <div className="relative w-full h-[300px] sm:h-[450px] my-10 rounded-xl overflow-hidden shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                                        <Image
                                            src={src || ""}
                                            alt={alt || "Article image"}
                                            fill
                                            className="object-cover"
                                            unoptimized={src?.startsWith("http")}
                                        />
                                    </div>
                                );
                            }
                        }}
                    />
                </article>
            </div>
        </div>
    );
}
