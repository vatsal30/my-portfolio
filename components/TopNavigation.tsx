"use client";

import { Home, Briefcase, FileText, Heart, Wrench, User, BookOpen } from "lucide-react";
import { FloatingNav } from "./ui/floating-navbar";

export function TopNavigation() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <User className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <Briefcase className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "Articles",
      link: "/articles",
      icon: <BookOpen className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "Notes",
      link: "/notes",
      icon: <FileText className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "Interests",
      link: "/interests",
      icon: <Heart className="h-4 w-4 text-zinc-600" />,
    },
    {
      name: "Toolkit",
      link: "/toolkit",
      icon: <Wrench className="h-4 w-4 text-zinc-600" />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
