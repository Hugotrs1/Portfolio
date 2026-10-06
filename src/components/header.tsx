"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { person } from "@/data/profile";
import { asset } from "@/lib/base-path";

import { Container } from "./container";
import { easeOutExpo } from "./reveal";

const navItems = [
  { label: "Profil", href: "#profil" },
  { label: "Projets", href: "#projets" },
  { label: "Compétences", href: "#competences" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    setHidden(current > previous && current > 240);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "border-b border-line bg-paper/85 backdrop-blur-md" : ""
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="font-serif text-2xl leading-none" onClick={() => setOpen(false)}>
            Hugo Troussel
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="link-underline text-sm text-ink-soft hover:text-ink">
                {item.label}
              </a>
            ))}
            <a
              href={asset(person.cvPath)}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-ink px-4 py-1.5 text-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              CV
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="label relative z-10 md:hidden"
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-paper pb-12 md:hidden"
          >
            <Container>
              <nav aria-label="Navigation mobile" className="flex flex-col border-t border-line">
                {[...navItems, { label: "CV", href: asset(person.cvPath) }].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + index * 0.05, ease: easeOutExpo }}
                    className="flex items-baseline justify-between border-b border-line py-4 font-serif text-4xl"
                  >
                    {item.label}
                    <span className="label text-muted">0{index + 1}</span>
                  </motion.a>
                ))}
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
