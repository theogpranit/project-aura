interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-mono text-cyan/60 tracking-widest">{number}</span>
      <div className="w-8 h-px bg-cyan/30" />
      <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}
