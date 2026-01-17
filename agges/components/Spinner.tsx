export default function Spinner() {
  return (
    <div
      className="
        h-10 w-10 animate-spin rounded-full
        bg-[conic-gradient(var(--color-primary),_var(--color-white),_transparent_70%)]
      "
      style={{
        WebkitMask: 'radial-gradient(farthest-side, transparent 60%, #000 61%)',
        mask: 'radial-gradient(farthest-side, transparent 60%, #000 61%)',
      }}
    />
  )
}
