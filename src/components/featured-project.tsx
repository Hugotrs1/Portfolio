"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { asset } from "@/lib/base-path";
import type { Picture, Project } from "@/types";

import { ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

export function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const offsets = [
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    useTransform(scrollYProgress, [0, 1], [140, -140]),
    useTransform(scrollYProgress, [0, 1], [90, -90]),
  ];

  return (
    <article ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="label text-accent">Projet professionnel — en production</p>
          <h3 className="mt-4 font-serif text-6xl leading-none sm:text-7xl">{project.title}</h3>
          <p className="mt-6 leading-relaxed text-ink-soft">{project.description}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 space-y-6 border-t border-line pt-6 text-sm leading-relaxed">
            {project.role ? (
              <div>
                <dt className="label text-muted">Rôle</dt>
                <dd className="mt-1.5">{project.role}</dd>
              </div>
            ) : null}
            {project.highlight ? (
              <div>
                <dt className="label text-muted">Ce dont je suis fier</dt>
                <dd className="mt-1.5">{project.highlight}</dd>
              </div>
            ) : null}
            <div>
              <dt className="label text-muted">Stack</dt>
              <dd className="mt-1.5">{project.tags.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink px-4 py-2 text-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {link.label}
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden bg-ink lg:col-span-8">
        <motion.div style={{ y: coverY }} className="absolute inset-[-10%_0] opacity-40">
          <Image
            src={asset(project.cover.src)}
            alt=""
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover grayscale"
          />
        </motion.div>
        <div className="relative flex min-h-[34rem] items-center justify-center gap-4 px-6 py-16 sm:gap-8 sm:py-24">
          {project.screens?.map((screen, index) => (
            <Phone
              key={screen.src}
              screen={screen}
              y={offsets[index % offsets.length]}
              className={index === 1 ? "w-[34%] max-w-60" : "w-[28%] max-w-48"}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function Phone({ screen, y, className }: { screen: Picture; y: MotionValue<number>; className: string }) {
  return (
    <motion.div style={{ y }} className={className}>
      <div className="rounded-[1.6rem] bg-[#0b0b0a] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <Image
          src={asset(screen.src)}
          alt={screen.alt}
          width={600}
          height={1300}
          sizes="(min-width: 1024px) 240px, 30vw"
          className="h-auto w-full rounded-[1.25rem]"
        />
      </div>
    </motion.div>
  );
}
