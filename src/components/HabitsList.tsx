import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { api } from "../lib/axios"
import { Loading } from "./Loading";

interface HabitsListProps {
  date: Date,
  handleCompleted: (id: number) => void;
}

interface QueryResponse {
  data: {
    completedHabits: string[],
    possibleHabits: {
      id: string,
      title: string,
      created_at: string
    }[]
  }
}

export function HabitsList({ date, handleCompleted }: HabitsListProps) {
  const queryClient = useQueryClient()

  const { data } = useQuery<QueryResponse>([`${date.toISOString()}`], () => api.get('/day', {
    params: {
      date: date.toISOString()
    }
  }), {
    staleTime: Infinity,
    retry: false,
    onSuccess(data) {
      handleCompleted(data.data.completedHabits.length)
    }
  })
  const habitsInfo = data?.data

  const { mutate, isLoading } = useMutation(
    (habitId: string) => api.patch(`/habits/${habitId}/toggle`, { date }),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`${date.toISOString()}`] })
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  // Para desativar opção de completar / des-completar um hábito quando não for o dia atual
  // const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-4">
        <Loading size="small" />
      </div>
    )
  }

  if (!habitsInfo?.possibleHabits.length) {
    return <p className="mt-4 font-semibold text-center text-zinc-500">Nenhum hábito disponível</p>
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {
        habitsInfo?.possibleHabits.map(habit => {
          return (
            <Checkbox.Root
              key={habit.id}
              className='flex items-center gap-3 group'
              checked={habitsInfo.completedHabits.includes(habit.id)}
              onCheckedChange={() => mutate(habit.id)}
            // disabled={isDateInPast}
            >
              <div className='w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:text-zinc-400'>
                {habit.title}
              </span>
            </Checkbox.Root>
          )

        })
      }
    </div>
  )
}