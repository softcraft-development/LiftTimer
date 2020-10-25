import Setup from "./setup"
import Workout from "./workoutDisplay"
import React from "react"

export function TimerApp(): JSX.Element {
  const [workout, setWorkout] = React.useState(false)

  if (workout) {
    return <Workout setWorkout={setWorkout} />
  }
  return <Setup setWorkout={setWorkout} />
}

export default TimerApp
