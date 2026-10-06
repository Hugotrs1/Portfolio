type IconProps = { className?: string };

export function ArrowUpRight({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ArrowDown({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M8 2.5v11M3.5 9l4.5 4.5L12.5 9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
