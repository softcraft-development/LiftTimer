import React, { useState, useEffect } from "react"
import Setup from "./setup"
import WorkingOut from "./workingOut"
import Workout, { loadWorkout, saveWorkout } from "./workout"


export function TimerApp(): JSX.Element {
  const [workout, setWorkout] = useState<Workout>(loadWorkout())
  const [setup, setSetup] = useState(false)

  useEffect(() => {
    saveWorkout(workout)
    setSetup(workout.exercises.length === 0)
  }, [workout])

  let mode: JSX.Element
  if (setup) {
    mode = <Setup
      setWorkout={setWorkout}
      workout={workout}
    />
  }
  else {
    mode = <WorkingOut
      setSetup={setSetup}
      workout={workout}
    />
  }

  const app = mode

  return app
}

export default TimerApp
