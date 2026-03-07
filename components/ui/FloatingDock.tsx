import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type FloatingDockItem = { 
    title: string; 
    icon?: React.ReactNode; 
    href?: string;
    isDivider?: boolean;
};

/**
 * Floating Dock Component
 *
 * An interactive bottom navigation dock.
 * Displays items in a row with hover magnitude scaling.
 */
export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: FloatingDockItem[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: FloatingDockItem[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => {
                            if (item.isDivider) {
                                return <div key={`divider-${idx}`} className="h-[1px] w-8 bg-zinc-200 dark:bg-zinc-800 mx-auto my-1" />;
                            }
                            
                            const href = item.href || "#";
                            const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 10,
                                        transition: {
                                            delay: idx * 0.05,
                                        },
                                    }}
                                    transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                                >
                                    <Link
                                        href={href}
                                        key={item.title}
                                        className={cn("h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center relative", isActive && "bg-purple-100 dark:bg-purple-900/30 text-purple-600")}
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                        {isActive && (
                                            <motion.div
                                                layoutId="dock-indicator-mobile"
                                                className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: FloatingDockItem[];
    className?: string;
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-zinc-50 dark:bg-zinc-900 px-4 pb-3 border border-zinc-200 dark:border-zinc-800",
                className
            )}
        >
            {items.map((item, idx) => {
                if (item.isDivider) {
                    return <div key={`divider-${idx}`} className="w-[1px] h-10 bg-zinc-200 dark:bg-zinc-800 mx-1 self-center" />;
                }
                return <IconContainer mouseX={mouseX} key={item.title} {...item as any} />;
            })}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn("aspect-square rounded-full flex items-center justify-center relative transition-colors duration-300", 
                    isActive ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-zinc-200 dark:bg-zinc-800"
                )}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-zinc-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-zinc-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs z-50 shadow-md font-medium"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    {icon}
                </motion.div>
                {isActive && (
                    <motion.div
                        layoutId="dock-indicator-desktop"
                        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    />
                )}
            </motion.div>
        </Link>
    );
}
