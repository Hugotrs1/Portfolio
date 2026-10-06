const words = ["Flutter", "Java", "Dart", "JSP", "JavaScript", "PHP", "SQL", "Python", "Git"];

export function Marquee() {
  const sequence = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {sequence.map((word, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="px-8 font-serif text-4xl italic sm:text-5xl">{word}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
