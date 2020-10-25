import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Exercise, State } from "./state"

interface Props {
  index: number
}

export function ExerciseInput(props: Props): JSX.Element {
  const dispatch = useDispatch()

  const exercise = useSelector<State, Exercise>((state) => {
    return state.exercises[props.index] || {}
  })

  const defaultWeight = useSelector<State, number>((state) => {
    return state.defaultWeight
  })

  const [name, setName] = useState(exercise.name || "")
  const [weight, setWeight] = useState(exercise.weight || defaultWeight)

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
      <input className="setup-exercise__number" type="number" step="2.5" min="0" name="weight" value={weight} onChange={(e) => setWeight(Number.parseFloat(e.currentTarget.value))}></input>
    </fieldset>
  </div>
}

export default ExerciseInput
