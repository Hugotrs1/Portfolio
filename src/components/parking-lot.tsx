import type { CSSProperties, ReactNode } from 'react';

type Bay = { key: string; blue?: boolean; content?: ReactNode };

// Sol d'un parking vu d'en haut : une rangée de places, et la rangée d'en face derrière elle.
export function ParkingLot({ bays, className }: { bays: Bay[]; className: string }) {
  return (
    <div className={`lot ${className}`} style={{ '--cols': bays.length } as CSSProperties}>
      {bays.map((bay) => (
        <div key={bay.key} className="lot-bay back" aria-hidden />
      ))}
      {bays.map((bay) => (
        <div key={bay.key} className={`lot-bay front ${bay.blue ? 'blue' : ''}`}>
          {bay.content}
        </div>
      ))}
    </div>
  );
}
