"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "demo", label: "Live Demo" },
  { id: "how-it-works", label: "How It Works" },
  { id: "science", label: "Science" },
  { id: "integration", label: "Integration" },
];

export function ProgressNav() {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3"
        >
          <motion.div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-indigo-500 scale-125"
                : "bg-gray-300 group-hover:bg-gray-400"
            }`}
          />
          <span
            className={`text-xs font-medium transition-all duration-300 ${
              activeSection === id
                ? "text-indigo-600 opacity-100"
                : "text-gray-400 opacity-0 group-hover:opacity-100"
            }`}
          >
            {label}
          </span>
        </a>
      ))}
    </motion.div>
  );
}
