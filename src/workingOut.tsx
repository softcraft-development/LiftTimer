import React, { useCallback, useState } from "react"
import { Exercise } from "./exercise"
import Timer from "./timer"

export interface Props {
  exercises: Exercise[]
  restTime: number
  setSetup: React.Dispatch<boolean>
}

export enum Style {
  Active = "working-out--active",
  Inactive = "working-out--inactive",
  Transition = "working-out--transition",
}

export function WorkingOut(props: Props): JSX.Element {
  const [style, setStyle] = useState(Style.Inactive)
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(1)
  const [rest, setRest] = useState(true)
  const [on, setOn] = useState(false)

  const onTick = useCallback((timeLeft: number) => {
    if (timeLeft <= 0) {
      setAttempt(1)

      if (rest) {
        setStyle(Style.Active)
        setRest(false)
        return
      }

      setStyle(Style.Inactive)
      if (index >= props.exercises.length) {
        setOn(false)
      }
      setRest(true)
      setIndex(index + 1)
      return
    }

    if (timeLeft <= 4) {
      setStyle(Style.Transition)
      return
    }
  }, [rest, index, props.exercises])

  const go = useCallback(() => {
    setOn(!on)
  }, [on])

  const reset = useCallback(() => {
    if (rest) {
      setStyle(Style.Inactive)
    }
    else {
      setStyle(Style.Active)
    }
    setOn(false)
    setAttempt(attempt + 1)
  }, [attempt, rest])

  const exercise = props.exercises[index]
  let name = "Done!"
  let weight = ""
  if (exercise) {
    name = exercise.name
    weight = exercise.weight.toString()
  }

  let initialTime
  if (rest) {
    if (index === 0) {
      initialTime = 10
    }
    else {
      initialTime = props.restTime
    }
  }
  else {
    if (exercise) {
      initialTime = exercise.time
    }
    else {
      initialTime = 0
    }
  }

  const id = `${index}:${attempt}:${rest}`
  const goText = on ? "Pause" : "Start"
  const className = `working-out ${style}`

  return <div className={className}>
    <div className="working-out__heading">
      <span className="working-out__exercise-name">{name}: </span>
      <span className="working-out__weight">{weight} lbs</span>
    </div>

    <Timer
      id={id}
      initalTime={initialTime}
      on={on}
      onTick={onTick}
    />

    <div className="controls">
      <button className="working-out__go working-out__control" onClick={go}>
        {goText}
      </button>
      <button className="working-out__reset working-out__control" onClick={reset}>
        Reset
      </button>
      <button className="working-out__setup working-out__control" onClick={() => props.setSetup(true)}>
        Setup
      </button>
    </div>
  </div>
}

export default WorkingOut
