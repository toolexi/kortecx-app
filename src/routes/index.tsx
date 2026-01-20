import { createFileRoute } from '@tanstack/react-router'
import InteractiveDots from '../components/Dots'
import { AiFillQuestionCircle } from "react-icons/ai";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <InteractiveDots />
    </div>
  )
}