interface HabitsProps {
  completed: number;
}
export function Habit(props: HabitsProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 text-center items-center justify-center">Teste: { props.completed }</div>
  )
}
