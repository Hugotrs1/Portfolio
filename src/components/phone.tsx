import Image from 'next/image';
import type { Ref } from 'react';

type PhoneProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

// Téléphone vu de face, avec une capture d'écran de l'application.
export function Phone({ src, alt, sizes, priority, className = '', ref }: PhoneProps) {
  return (
    <div
      ref={ref}
      className={`rounded-[1.75rem] bg-[#0b0b0a] p-1.5 shadow-[0_24px_48px_-16px_rgba(6,9,26,0.55)] ring-1 ring-white/15 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={1237}
        sizes={sizes}
        priority={priority}
        className="aspect-[600/1237] w-full rounded-[1.375rem] object-cover object-top"
      />
    </div>
  );
}
