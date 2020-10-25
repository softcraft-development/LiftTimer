import React, { useEffect, useState } from "react"
import { Exercise } from "./exercise"
import ExerciseInput from "./exerciseInput"

export interface Props {
  exercises: Exercise[],
  setExercises: React.Dispatch<Exercise[]>
  setSetup: React.Dispatch<boolean>
}

export function loadDefaultWeight(): number {
  const defaultWeight = JSON.parse(window.localStorage.getItem("defaultWeight") || "15")
  return defaultWeight
}

export function Setup(props: Props): JSX.Element {
  const [defaultWeight, setDefaultWeight] = useState(loadDefaultWeight())

  useEffect(() => {
    window.localStorage.setItem("defaultWeight", JSON.stringify(defaultWeight))
  }, [defaultWeight])

  useEffect(() => {
    if (props.exercises.length === 0) {
      props.setSetup(true)
      props.setExercises([{
        name: "",
        time: 30,
        weight: defaultWeight
      }])
    }
  }, [props.exercises])

  function startWorkout() {
    const newExercises = props.exercises.reduce((array, exercise) => {
      if (exercise.name) {
        exercise.name = exercise.name.trim()
      }
      if (exercise.name !== "") {
        array.push(exercise)
      }
      return array
    }, new Array<Exercise>())
    props.setExercises(newExercises)
    props.setSetup(false)
  }

  return <div className="setup timer-mode">
    <h1 className="setup__heading">Setup</h1>

    <div className="setup__exercises">
      {
        props.exercises.map((exercise, index) => {
          return <ExerciseInput key={index} exercise={exercise}></ExerciseInput>
        })
      }
    </div>

    <div className="controls">
      <button className="workout__start controls__control" onClick={startWorkout}>Start</button>
    </div>
  </div>
}

export default Setup
