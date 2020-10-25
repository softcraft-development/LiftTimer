import React from "react"
import { SetHook } from "./setHook"


function Setup({ setWorkout }: { setWorkout: SetHook<boolean> }): JSX.Element {
  return <div className="setup timer-mode">
    <h1 className="setup__heading">Setup</h1>
    <button className="workout__start" onClick={() => setWorkout(true)}>Start</button>
  </div>
}

export default Setup
