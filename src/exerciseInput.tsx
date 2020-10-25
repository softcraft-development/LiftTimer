import React, { useEffect, useState } from "react"
import { Exercise } from "./exercise"

interface Props {
  exercise: Exercise
}

export function ExerciseInput(props: Props): JSX.Element {
  const [name, setName] = useState(props.exercise.name)
  const [weight, setWeight] = useState(props.exercise.weight.toString())
  useEffect(() => {
    props.exercise.name = name
    props.exercise.weight = Number.parseFloat(weight)
  }, [name, weight])

  return <div className="setup__exercise">
    <fieldset className="setup-exericse__field-set setup-exericse__name">
      <label className="setup-exercise__label">
        Exercise Name
      </label>
      <input className="setup-exercise__text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} ></input>
    </fieldset>

    <fieldset className="setup-exericse__field-set setup-exericse__weight">
      <label className="setup-exercise__label">
        Weight
      </label>
      <input className="setup-exercise__number" type="number" step="2.5" min="0" name="weight" value={weight} onChange={e => setWeight(e.currentTarget.value)}></input>
    </fieldset>
  </div>
}

export default ExerciseInput
