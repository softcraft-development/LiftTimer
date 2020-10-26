import React, { useEffect, useState } from "react"
import { Exercise } from "./exercise"
import { useDebouncedCallback } from "use-debounce"

interface Props {
  add: () => void
  down: () => void
  exercise: Exercise
  id: string
  remove: () => void
  setExercise: (exercise: Exercise) => void
  up: () => void
}

export function ExerciseInput(props: Props): JSX.Element {
  const [name, setName] = useState(props.exercise.name)
  const [weight, setWeight] = useState(props.exercise.weight.toString())
  const [time, setTime] = useState(props.exercise.time.toString())

  useEffect(() => {
    setName(props.exercise.name)
    setWeight(props.exercise.weight.toString())
    setTime(props.exercise.time.toString())
  }, [props.exercise])

  const updateExercise = useDebouncedCallback(() => {
    console.log("Updating!")
    props.setExercise({
      name,
      time: Number.parseFloat(time),
      weight: Number.parseFloat(time),
    })
  }, 500)

  const nameId = `setup-exercise-name-${props.id}`
  const weightId = `setup-exercise-weight-${props.id}`
  const timeId = `setup-exercise-time-${props.id}`

  return <div className="setup__exercise">
    <div className="setup-exercise__id">
      {props.id}.
    </div>

    <fieldset className="setup__field-set">
      <label className="setup__label" htmlFor={nameId}>
        Name
      </label>
      <input
        id={nameId}
        className="setup-exercise__name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => { setName(e.currentTarget.value); updateExercise.callback() }}
      />
    </fieldset>

    <fieldset className="setup__field-set">
      <label className="setup__label" htmlFor={weightId}>
        Weight
      </label>
      <input
        id={weightId}
        className="setup__weight"
        type="number"
        step="2.5"
        min="0"
        name="weight"
        value={weight}
        onChange={e => { setWeight(e.currentTarget.value); updateExercise.callback() }}
      />
    </fieldset>

    <fieldset className="setup__field-set">
      <label className="setup__label" htmlFor={timeId}>
        Time
      </label>
      <input
        id={timeId}
        className="setup__weight"
        type="number"
        min="0"
        name="time"
        value={time}
        onChange={e => { setTime(e.currentTarget.value); updateExercise.callback() }}
      />
    </fieldset>

    <button className="setup__quantity-button setup__quantity-button--add" onClick={props.add}>➕</button>
    <button className="setup__quantity-button setup__quantity-button--subtract" onClick={props.remove}>➖</button>
    <button className="setup__quantity-button setup__quantity-button--up" onClick={props.up}>🔼</button>
    <button className="setup__quantity-button setup__quantity-button--down" onClick={props.down}>🔽</button>
  </div>
}

export default ExerciseInput
