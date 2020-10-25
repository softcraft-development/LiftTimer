import React from "react"
import { useDispatch, useSelector } from "react-redux"
import startWorkout from "./actions/startWorkout"
import { DEFAULT_EXERCISE, Exercise, State } from "./state"
import ExerciseInput from "./exerciseInput"

export function Setup(): JSX.Element {
  const dispatch = useDispatch()


  let exercises = useSelector<State, Exercise[]>((state) => state.exercises)
  if (exercises.length === 0) {
    const defaultWeight = useSelector<State, number>((state) => state.defaultWeight)
    exercises = [
      {
        name: "",
        time: DEFAULT_EXERCISE,
        weight: defaultWeight
      }
    ]
  }

  return <div className="setup timer-mode">
    <h1 className="setup__heading">Setup</h1>

    <div className="setup__exercises">
      {
        exercises.map((exercise, index) => {
          return <ExerciseInput key={index} exercise={exercise}></ExerciseInput>
        })
      }
    </div>

    <div className="controls">
      <button className="workout__start controls__control" onClick={() => dispatch(startWorkout())}>Start</button>
    </div>
  </div>
}

export default Setup
