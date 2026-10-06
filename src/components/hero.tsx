"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { person } from "@/data/profile";
import { asset } from "@/lib/base-path";

import { Container } from "./container";
import { ArrowDown } from "./icons";
import { easeOutExpo } from "./reveal";
import { SplitText } from "./split-text";

const highlights = [
  { term: "Actuellement", detail: "Alternance chez Agelid, depuis oct. 2025" },
  { term: "Projet phare", detail: "GarezVous, en production sur iOS & Android" },
  { term: "Formation", detail: "Bachelor CDA, CESI Rouen" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
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
          <span>CESI Rouen</span>
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

          <motion.figure
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.6, delay: 0.5, ease: easeOutExpo }}
            className="mt-12 lg:absolute lg:right-0 lg:top-2 lg:mt-0 lg:w-[30%]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
              <motion.div style={{ y: imageY }} className="absolute inset-[-10%_0]">
                <Image
                  src={asset("/images/photos/normandy.webp")}
                  alt="Falaises de la côte d'Albâtre, en Normandie"
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover grayscale-[0.35]"
                />
              </motion.div>
            </div>
            <figcaption className="label mt-3 flex justify-between gap-4 text-muted">
              <span>Côte d&apos;Albâtre, Normandie</span>
              <span>49.7° N</span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-10 lg:col-span-5">
            <motion.p {...fadeIn(0.6)} className="max-w-md text-lg leading-relaxed text-ink-soft">
              <span className="text-ink">
                {person.role} — {person.stack}.
              </span>{" "}
              {person.introduction}
            </motion.p>

            <motion.div {...fadeIn(0.75)} className="flex flex-wrap items-center gap-x-6 gap-y-4">
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

          <motion.dl {...fadeIn(0.85)} className="self-end lg:col-span-5 lg:col-start-8">
            {highlights.map((item) => (
              <div key={item.term} className="grid grid-cols-3 gap-4 border-t border-line py-4 last:border-b">
                <dt className="label pt-0.5 text-muted">{item.term}</dt>
                <dd className="col-span-2">{item.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  );
}
