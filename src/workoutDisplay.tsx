import React from "react"
import { SetHook } from "./setHook"

function Workout({ setWorkout }: { setWorkout: SetHook<boolean> }): JSX.Element {
  return <div className="workout">
    <h1 className="workout__heading">Workout</h1>
    <button className="workout__off" onClick={() => setWorkout(false)}>Off</button>
  </div>
}

export default Workout
