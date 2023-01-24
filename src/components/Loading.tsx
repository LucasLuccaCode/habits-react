import clsx from "clsx"

interface LoadingProps {
  size: string
}

export function Loading({ size }: LoadingProps) {
  return (
    <div className={
      clsx("border-4 border-t-violet-600 border-l-zinc-700 border-r-zinc-700 border-b-zinc-700 animate-spin ease-linear rounded-full",
        {
          "w-8 h-8": size !== "small",
          "w-6 h-6": size === "small"
        }
      )} />
  )
}