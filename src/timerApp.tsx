import { State } from "./state"
import { useSelector } from "react-redux"
import React from "react"
import Setup from "./setup"
import WorkingOut from "./workingOut"

export function TimerApp(): JSX.Element {
  const setup = useSelector<State, boolean>((state) => {
    return state?.setup ||
      !state?.exercises ||
      state.exercises.length === 0
  })

  if (setup) {
    return <Setup />
  }
  return <WorkingOut />
}

export default TimerApp
