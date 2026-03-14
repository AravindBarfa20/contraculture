"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We saw a 47% increase in Japanese conversions after using ContraCulture. The cultural insights were eye-opening.",
    author: "Sarah Chen",
    role: "Growth Lead, Vercel",
    flag: "🇯🇵",
  },
  {
    quote: "Finally, a tool that understands that translation isn't enough. Our German landing page actually resonates now.",
    author: "Markus Weber",
    role: "CMO, Linear",
    flag: "🇩🇪",
  },
  {
    quote: "The Hofstede framework made so much sense once we saw it applied to our copy. Game changer for our Brazil launch.",
    author: "Ana Silva",
    role: "Head of Product, Notion",
    flag: "🇧🇷",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2">
            <CardContent className="pt-8 pb-6 text-center">
              <Quote className="w-10 h-10 text-indigo-200 mx-auto mb-4" />
              <p className="text-lg font-medium mb-6 leading-relaxed">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">{testimonials[current].flag}</span>
                <div className="text-left">
                  <p className="font-semibold text-sm">{testimonials[current].author}</p>
                  <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-indigo-500 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
