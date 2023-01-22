import './styles/global.css'

import { Habit } from "./components/Habit"

function App() {
  return (
    <div className="App">
      <Habit completed={1} />
      <Habit completed={4} />
      <Habit completed={6} />
      <Habit completed={8} />
    </div>
  )
}

export default App
