"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { person } from "@/data/profile";

import { Container } from "./container";
import { ArrowDown } from "./icons";
import { easeOutExpo } from "./reveal";
import { SplitText } from "./split-text";

const highlights = [
  { term: "Actuellement", detail: "Alternance chez Agelid" },
  { term: "Projet phare", detail: "GarezVous, en production sur iOS, Android et web" },
  { term: "Formation", detail: "Bac+2 obtenu, Bachelor (Bac+3) en cours au CESI" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: easeOutExpo },
  });

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
      <Container>
        <motion.div {...fadeIn(0.1)} className="label flex flex-wrap items-center gap-x-8 gap-y-2 text-muted">
          <span className="inline-flex items-center gap-2 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {person.status}
          </span>
          <span>{person.location}</span>
          <span>Bachelor CESI Rouen</span>
        </motion.div>

        <div className="relative mt-10">
          <motion.h1 style={{ y: titleY }} className="font-serif leading-[0.85] tracking-[-0.02em]">
            <SplitText
              immediate
              delay={0.2}
              text={person.firstName}
              className="block text-[clamp(4.5rem,17vw,16rem)]"
            />
            <SplitText
              immediate
              delay={0.35}
              text={person.lastName}
              className="block pl-[8vw] text-[clamp(4.5rem,17vw,16rem)] italic text-accent"
            />
          </motion.h1>

          <motion.dl
            {...fadeIn(0.85)}
            className="mt-12 lg:absolute lg:right-0 lg:top-6 lg:mt-0 lg:w-[30%]"
          >
            {highlights.map((item) => (
              <div key={item.term} className="border-t border-line py-4 last:border-b">
                <dt className="label text-muted">{item.term}</dt>
                <dd className="mt-1.5">{item.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.p {...fadeIn(0.6)} className="max-w-md text-lg leading-relaxed text-ink-soft lg:col-span-5">
            <span className="text-ink">
              {person.role} — {person.stack}.
            </span>{" "}
            {person.introduction}
          </motion.p>

          <motion.div
            {...fadeIn(0.75)}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <a
              href="#projets"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors duration-300 hover:bg-accent"
            >
              Voir les projets
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
            <a href={`mailto:${person.email}`} className="link-underline text-sm">
              {person.email}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
