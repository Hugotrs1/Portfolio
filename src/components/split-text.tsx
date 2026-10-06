"use client";

import { motion } from "framer-motion";

import { easeOutExpo } from "./reveal";

type SplitTextProps = {
  text: string;
  id?: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
  immediate?: boolean;
};

export function SplitText({
  text,
  id,
  className,
  delay = 0,
  stagger = 0.06,
  as = "span",
  immediate = false,
}: SplitTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
          >
            {word}
            {index < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
