export default function Footer() {
  return (
    <footer
      className="mx-auto max-w-5xl px-6 pb-10 pt-10 md:px-10"
      style={{ borderTop: '1px solid var(--divider)' }}
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          Pranit Hole — Nagpur, India
        </span>
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          AURA System Direction
        </span>
      </div>
    </footer>
  )
}
