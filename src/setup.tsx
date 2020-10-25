import React from "react"
import { useDispatch } from "react-redux"
import startWorkout from "./actions/startWorkout"

export function Setup(): JSX.Element {
  const dispatch = useDispatch()

  return <div className="setup timer-mode">
    <h1 className="setup__heading">Setup</h1>
    <button className="workout__start" onClick={() => dispatch(startWorkout())}>Start</button>
  </div>
}

export default Setup
