"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { asset } from "@/lib/base-path";
import type { Project } from "@/types";

import { ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

export function ProjectList({ projects, start = 1 }: { projects: Project[]; start?: number }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26 });
  const springY = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left);
        y.set(event.clientY - bounds.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul>
        {projects.map((project, index) => (
          <li key={project.title} className="border-t border-line last:border-b">
            <Reveal delay={index * 0.08}>
              <a
                href={project.links[0]?.url}
                target="_blank"
                rel="noreferrer noopener"
                onPointerEnter={() => setActive(index)}
                className="group grid items-baseline gap-3 py-8 transition-colors duration-500 hover:text-accent sm:grid-cols-12 sm:gap-8"
              >
                <span className="label text-muted sm:col-span-1">{String(start + index).padStart(2, "0")}</span>
                <span className="font-serif text-4xl leading-none transition-transform duration-700 ease-out-expo group-hover:translate-x-3 sm:col-span-5 sm:text-5xl">
                  {project.title}
                </span>
                <span className="text-sm leading-relaxed text-ink-soft sm:col-span-4">{project.description}</span>
                <span className="label flex items-center justify-between gap-2 text-muted sm:col-span-2 sm:justify-end">
                  {project.tags.join(" · ")}
                  <ArrowUpRight className="h-4 w-4 text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute"
            >
              <div className="relative h-52 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl">
                <Image
                  src={asset(projects[active].cover.src)}
                  alt=""
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
