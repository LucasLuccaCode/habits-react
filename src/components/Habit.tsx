interface HabitProps {
  completed: number
}

export function Habit({ completed }: HabitProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 rounded flex items-center justify-center mt-4 text-white">{completed}</div>
  )
}