import React, { useCallback, useEffect, useState } from "react"
import { Exercise } from "./exercise"
import ExerciseInput from "./exerciseInput"
import Workout from "./workout"

export interface Props {
  workout: Workout
  setWorkout: React.Dispatch<Workout>
}

export function loadDefaultWeight(): number {
  const defaultWeight = JSON.parse(window.localStorage.getItem("defaultWeight") || "15")
  return defaultWeight
}

export function newExercise(defaultWeight: number): Exercise {
  return {
    name: "",
    time: 30,
    weight: defaultWeight
  }
}

function initialize(exercises: Exercise[], defaultWeight: number): Exercise[] {
  if (exercises.length === 0) {
    return [newExercise(defaultWeight)]
  }
  return exercises
}

export function Setup(props: Props): JSX.Element {
  const [defaultWeight, setDefaultWeight] = useState(loadDefaultWeight())
  const [exercises, setExercises] = useState(initialize(props.workout.exercises, defaultWeight))
  const [restTime, setRestTime] = useState(props.workout.restTime)
  const [leadTime, setLeadTime] = useState(props.workout.leadTime)

  useEffect(() => {
    setExercises(initialize(props.workout.exercises, defaultWeight))
    setRestTime(props.workout.restTime)
    setLeadTime(props.workout.leadTime)
  }, [props.workout])

  const addAt = useCallback((addIndex: number) => {
    const newExercises = exercises.reduce((array, exercise, index) => {
      array.push(exercise)
      if (index === addIndex) {
        array.push(newExercise(defaultWeight))
      }
      return array
    }, new Array<Exercise>())

    setExercises(newExercises)
  }, [exercises, defaultWeight])

  const removeAt = useCallback((removeIndex: number) => {
    const ex = exercises.reduce((array, exercise, index) => {
      if (index !== removeIndex) {
        array.push(exercise)
      }
      return array
    }, new Array<Exercise>())
    if (ex.length === 0) {
      ex.push(newExercise(defaultWeight))
    }
    setExercises(ex)
  }, [exercises, defaultWeight])

  const moveUp = useCallback((index: number) => {
    if (index <= 0) {
      return
    }
    const newExercises = [...exercises]
    newExercises[index] = exercises[index - 1]
    newExercises[index - 1] = exercises[index]
    setExercises(newExercises)
  }, [exercises])

  const moveDown = useCallback((index: number) => {
    if (index >= exercises.length - 1) {
      return
    }
    const newExercises = [...exercises]
    newExercises[index] = exercises[index + 1]
    newExercises[index + 1] = exercises[index]
    setExercises(newExercises)
  }, [exercises])

  const updateExercise = useCallback((exercise: Exercise, index: number) => {
    const newExercises = [...exercises]
    newExercises[index] = exercise
    setExercises(newExercises)
  }, [exercises])

  useEffect(() => {
    window.localStorage.setItem("defaultWeight", JSON.stringify(defaultWeight))
  }, [defaultWeight])

  const startWorkout = useCallback(() => {
    const newExercises = exercises.reduce((array, exercise) => {
      if (exercise.name) {
        exercise.name = exercise.name.trim()
      }
      if (exercise.name !== "") {
        array.push(exercise)
      }
      return array
    }, new Array<Exercise>())
    props.setWorkout({
      exercises: newExercises,
      restTime,
      leadTime,
    })
  }, [exercises, restTime, leadTime])

  return <div className="setup timer-mode">
    <h1 className="setup__heading">Setup Exercises</h1>

    <div className="setup__exercises">
      {
        exercises.map((exercise, index) => {
          return <ExerciseInput
            add={() => addAt(index)}
            down={() => moveDown(index)}
            exercise={exercise}
            id={`${index + 1}`}
            key={index}
            remove={() => removeAt(index)}
            setExercise={(e) => updateExercise(e, index)}
            up={() => moveUp(index)}
          />
        })
      }
    </div>

    <fieldset className="setup__field-set">
      <label className="setup__label">
        Rest Time
      </label>
      <input className="setup__field--number"
        type="number"
        min="0"
        name="rest-time"
        value={restTime}
        onChange={e => setRestTime(Number.parseFloat(e.currentTarget.value))} />
    </fieldset>

    <fieldset className="setup__field-set">
      <label className="setup__label">
        Lead Time
      </label>
      <input className="setup__field--number"
        type="number"
        min="0"
        name="lead-time"
        value={leadTime}
        onChange={e => setLeadTime(Number.parseFloat(e.currentTarget.value))} />
    </fieldset>

    <fieldset className="setup__field-set">
      <label className="setup__label">
        Default Weight
      </label>
      <input className="setup__field--number"
        type="number"
        step="2.5"
        min="0"
        name="weight"
        value={defaultWeight}
        onChange={e => setDefaultWeight(Number.parseFloat(e.currentTarget.value))} />
    </fieldset>

    <div className="controls">
      <button className="workout__start controls__control" onClick={startWorkout}>Start</button>
    </div>
  </div>
}

export default Setup
