import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"

import { HabitDay } from "./HabitDay"
import { HabitFill } from "./HabitFill";

interface SummaryTableProps {
  summary: {
    id: string;
    date: string;
    completed: number;
    amount: number;
  }[]
}

export function SummaryTable({ summary }: SummaryTableProps) {

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountOfDaysToFill = Math.max((minimumSummaryDatesSize - summaryDates.length), 0)

  return (
    <div className="w-full flex">
      <ul className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((dayWeek, index) => (
          <li
            key={`${weekDays[index]}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {dayWeek}
          </li>
        ))}
      </ul>

      <div className="grid grid-rows-7 grid-flow-col gap-3">

        {
          summaryDates?.map(date => {

            const dayInSummary = summary.find(
              day => dayjs(date).isSame(day.date, 'day')
            )

            const amount = dayInSummary?.amount || 0
            const defaultCompleted = dayInSummary?.completed || 0

            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amount={amount}
                defaultCompleted={defaultCompleted}
              />
            )
          })
        }

        {amountOfDaysToFill && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
          <HabitFill key={index} index={index} />
        ))}

      </div>
    </div>
  )
}