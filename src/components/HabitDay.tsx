interface HabitProps {
  completed: number
}

export function HabitDay({ completed }: HabitProps) {
  return (
    <div className="bg-zinc-900 border-zinc-800 w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
    </div>
  )
}