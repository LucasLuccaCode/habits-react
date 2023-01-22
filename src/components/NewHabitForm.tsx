import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-4">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        className="p-2 text-1xl rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        placeholder="ex: Exercícios, dormir bem, etc..."
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <button type="submit" className="mt-4 rounded-lg p-2 flex items-center justify-center gap-3 font-semibold text-1xl bg-green-600 hover:bg-green-500">
        <Check size={18} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}