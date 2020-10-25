import { State } from "./state"
import { useSelector } from "react-redux"
import React from "react"
import Setup from "./setup"
import WorkingOut from "./workingOut"

export function TimerApp(): JSX.Element {
  const workout = useSelector<State, boolean>((state) => {
    return !!state.currentExercise || state.currentExercise === 0
  })

  if (workout) {
    return <WorkingOut />
  }
  return <Setup />
}

export default TimerApp
