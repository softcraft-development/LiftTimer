import React from "react"
import { useDispatch } from "react-redux"
import beginSetup from "./actions/beginSetup"
import stopWorkout from "./actions/stopWorkout"


function WorkingOut(): JSX.Element {
  const dispatch = useDispatch()

  return <div className="working-out working-out--active timer-mode">
    <h1 className="working-out__heading">Workout</h1>
    <div className="controls">
      <button className="working-out__off controls__control" onClick={() => dispatch(stopWorkout())}>Stop</button>
      <button className="working-out__setup controls__control" onClick={() => dispatch(beginSetup())}>Setup</button>
    </div>
  </div>
}

export default WorkingOut
