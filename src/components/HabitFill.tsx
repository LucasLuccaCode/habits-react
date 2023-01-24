interface HabitFillProps {
  index: number
}

export function HabitFill({ index }: HabitFillProps) {
  return (
    <div
      key={index}
      className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
    />
  )
}