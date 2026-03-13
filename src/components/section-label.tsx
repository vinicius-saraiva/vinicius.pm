type SectionLabelProps = {
  children: string;
  variant?: "accent" | "warm";
};

export function SectionLabel({ children, variant = "accent" }: SectionLabelProps) {
  const color = variant === "accent" ? "bg-accent text-accent" : "bg-warm text-warm";
  const [bgColor, textColor] = color.split(" ");

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className={`w-8 h-px ${bgColor}`} />
      <span className={`font-mono text-base ${textColor} tracking-[0.1em]`}>
        {children}
      </span>
    </div>
  );
}
