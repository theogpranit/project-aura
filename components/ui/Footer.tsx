export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative py-8 px-6 md:px-12"
      style={{ borderTop: '1px solid rgba(0,212,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full border border-cyan/30 flex items-center justify-center"
          >
            <span className="text-cyan text-[9px] font-bold font-mono">P</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest">
            PRANIT — {year}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {['AURA-X', 'AURA-GX', 'CONTACT'].map((item, i) => (
            <button
              key={item}
              onClick={() =>
                document
                  .querySelector(`#${item.toLowerCase().replace('-', '-')}`)
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-[10px] font-mono tracking-widest text-muted-foreground/40 hover:text-cyan transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest">
          BUILDING THE FUTURE
        </span>
      </div>
    </footer>
  )
}
