"use client";

import { Home, Briefcase, FileText, Heart, Wrench, User } from "lucide-react";
import { FloatingNav } from "./ui/floating-navbar";

export function TopNavigation() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-zinc-500" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <User className="h-4 w-4 text-zinc-500" />,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <Briefcase className="h-4 w-4 text-zinc-500" />,
    },
    {
      name: "Notes",
      link: "/notes",
      icon: <FileText className="h-4 w-4 text-zinc-500" />,
    },
    {
      name: "Interests",
      link: "/interests",
      icon: <Heart className="h-4 w-4 text-zinc-500" />,
    },
    {
      name: "Toolkit",
      link: "/toolkit",
      icon: <Wrench className="h-4 w-4 text-zinc-500" />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
