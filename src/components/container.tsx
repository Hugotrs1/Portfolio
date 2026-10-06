import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{ className?: string }>;

export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
