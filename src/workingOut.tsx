import React, { useCallback, useContext, useState } from "react"
import SoundContext from "./soundContext"
import Timer from "./timer"
import Workout from "./workout"

export interface Props {
  workout: Workout
  setSetup: React.Dispatch<boolean>
}

export enum Style {
  Active = "working-out--active",
  Inactive = "working-out--inactive",
  Transition = "working-out--transition",
}

export interface Stage {
  attempt: number,
  index: number,
  rest: boolean
  style: Style,
}

export function WorkingOut(props: Props): JSX.Element {
  const [stage, setStage] = useState({
    attempt: 1,
    index: 0,
    rest: true,
    style: Style.Inactive
  })
  const [on, setOn] = useState(false)

  const sounds = useContext(SoundContext)

  const onTick = useCallback((timeLeft, lastTimeLeft) => {
    const secondsLeft = Math.floor(timeLeft)
    const lastSecondsLeft = Math.floor(lastTimeLeft)
    if (secondsLeft < lastSecondsLeft) {
      if (secondsLeft < 3 && secondsLeft >= 0) {
        sounds.play("low")
      }
    }

    if (timeLeft === 0) {
      sounds.play("high")
      const nextStage = {
        ...stage,
        attempt: 1
      }
      if (stage.rest) {
        nextStage.style = Style.Active
        nextStage.rest = false
        setStage(nextStage)
        return
      }

      nextStage.index = stage.index + 1
      nextStage.style = Style.Inactive
      if (nextStage.index >= props.workout.exercises.length) {
        setOn(false)
      }
      else {
        nextStage.rest = true
      }
      setStage(nextStage)
      return
    }

    if (timeLeft <= 3) {
      setStage({
        ...stage,
        style: Style.Transition
      })
      return
    }
  }, [stage, props.workout.exercises, sounds])

  const go = useCallback(() => {
    setOn(!on)
  }, [on])

  const reset = useCallback(() => {
    const nextStage = {
      ...stage,
      attempt: stage.attempt + 1,
    }
    if (stage.rest) {
      nextStage.style = Style.Inactive
    }
    else {
      nextStage.style = Style.Active
    }
    setStage(nextStage)
    setOn(false)
  }, [stage])

  const exercise = props.workout.exercises[stage.index]
  let name = "Done!"
  let weight = 0
  if (exercise) {
    name = exercise.name
    if (stage.rest) {
      name = `Rest: ${name}`
    }

    weight = exercise.weight
  }

  let initialTime
  if (stage.rest) {
    if (stage.index === 0) {
      initialTime = props.workout.leadTime
    }
    else {
      initialTime = props.workout.restTime
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

  const id = `${stage.index}:${stage.attempt}:${stage.rest}`
  const goText = on ? "Pause" : "Start"
  const className = `working-out ${stage.style}`
  const weightDisplay = (weight > 0) ? `${weight} lbs` : "\u00A0"

  return <div className={className}>
    <div className="working-out__content">
      <div className="working-out__heading">
        <div className="working-out__exercise-name">{name}</div>
        <div className="working-out__weight">{weightDisplay}</div>
      </div>

      <Timer
        id={id}
        initalTime={initialTime}
        on={on}
        onTick={onTick}
      />

      <div className="working-out__controls">
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
  </div>
}

export default WorkingOut
