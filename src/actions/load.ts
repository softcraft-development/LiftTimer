import { Action } from "redux"
import { Exercise, State } from "../state"

export const type = "Load"

export interface Load extends Action<string> {
  readonly exercises: Exercise[] | null
  readonly restTime: number | null
  readonly type: typeof type
}

export function load(): Load {
  const exerciseData = window.localStorage.getItem("exercises")
  let exercises: Exercise[] = []
  if (exerciseData) {
    exercises = JSON.parse(exerciseData)
  }

  const restTimeData = window.localStorage.getItem("restTime")
  let restTime: number | null = null
  if (restTimeData) {
    restTime = Number.parseInt(restTimeData, 10)
  }

  return {
    exercises,
    restTime,
    type,
  }
}

let lastExercises: Exercise[] | null = null
let lastRestTime: number | null = null

export function save(state: State): void {
  if (!state) {
    return
  }

  if (lastExercises != state.exercises) {
    lastExercises = state.exercises
    window.localStorage.setItem("exercises", JSON.stringify(lastExercises))
  }

  if (lastRestTime != state.restTime) {
    lastRestTime = state.restTime
    window.localStorage.setItem("restTime", lastRestTime?.toString())
  }
}

export default load
