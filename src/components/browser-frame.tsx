import type { ReactNode } from 'react';

// Fenêtre de navigateur autour d'une capture d'écran.
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="ring-line overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(14,20,49,0.06)] ring-1">
      <div className="bg-paper-deep flex h-10 items-center gap-1.5 px-4" aria-hidden>
        <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-ink/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-paper text-muted ml-4 flex h-6 max-w-64 flex-1 items-center rounded px-3 text-[0.8125rem]">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
