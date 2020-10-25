import React from "react"
import { useDispatch } from "react-redux"
import stopWorkout from "./actions/stopWorkout"


function WorkingOut(): JSX.Element {
  const dispatch = useDispatch()

  return <div className="working-out working-out--active timer-mode">
    <h1 className="working-out__heading">Workout</h1>
    <button className="working-out__off" onClick={() => dispatch(stopWorkout)}>Stop</button>
  </div>
}

export default WorkingOut
