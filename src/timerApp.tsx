import Setup from "./setup"
import WorkingOut from "./workingOut"
import React from "react"

export function TimerApp(): JSX.Element {
  const [workout, setWorkout] = React.useState(false)

  if (workout) {
    return <WorkingOut setWorkout={setWorkout} />
  }
  return <Setup setWorkout={setWorkout} />
}

export default TimerApp
