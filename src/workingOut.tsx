import React from "react"
import { SetHook } from "./setHook"

function WorkingOut({ setWorkout }: { setWorkout: SetHook<boolean> }): JSX.Element {
  return <div className="working-out working-out--active timer-mode">
    <h1 className="working-out__heading">Workout</h1>
    <button className="working-out__off" onClick={() => setWorkout(false)}>Off</button>
  </div>
}

export default WorkingOut
