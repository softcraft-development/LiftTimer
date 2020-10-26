import React, { useState, useMemo, useEffect } from "react"
import Setup from "./setup"
import WorkingOut from "./workingOut"
import { Exercise } from "./exercise"


export function loadExercises(): Exercise[] {
  const exerciseData = window.localStorage.getItem("exercises")
  let exercises: Exercise[] = []
  if (exerciseData) {
    exercises = JSON.parse(exerciseData)
  }
  return exercises
}

export function loadRestTime(): number {
  const restTime = JSON.parse(window.localStorage.getItem("restTime") || "30")
  return restTime
}


export function TimerApp(): JSX.Element {
  const [exercises, setExercises] = useState<Exercise[]>(loadExercises())
  const [setup, setSetup] = useState(false)
  const [restTime, setRestTime] = useState(loadRestTime())

  useEffect(() => {
    window.localStorage.setItem("exercises", JSON.stringify(exercises))
  }, [exercises])

  useEffect(() => {
    window.localStorage.setItem("restTime", JSON.stringify(restTime))
  }, [restTime])

  const shouldSetup = useMemo(() => {
    return setup || exercises.length === 0
  }, [setup, exercises])

  let mode: JSX.Element
  if (shouldSetup) {
    mode = <Setup
      exercises={exercises}
      restTime={restTime}
      setExercises={setExercises}
      setRestTime={setRestTime}
      setSetup={setSetup}
    />
  }
  else {
    mode = <WorkingOut setSetup={setSetup} />
  }

  const app = mode

  return app
}

export default TimerApp
