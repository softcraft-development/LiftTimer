import { Action } from "redux"
import { Exercise, State } from "../state"

export const type = "Load"

export interface Load extends Action<string> {
  readonly defaultWeight: number | null
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


  const restTime = JSON.parse(window.localStorage.getItem("restTime") || "null")
  const defaultWeight = JSON.parse(window.localStorage.getItem("defaultWeight") || "null")

  return {
    defaultWeight,
    exercises,
    restTime,
    type,
  }
}

let lastExercises: Exercise[] | null = null
let lastRestTime: number | null = null
let lastDefaultWeight: number | null = null

export function saveWhenChanged<T>(key: string, last: T | null, current: T | null): T | null {
  if (last != current) {
    window.localStorage.setItem(key, JSON.stringify(current))
    return current
  }
  return last
}


export function save(state: State): void {
  if (!state) {
    return
  }

  lastExercises = saveWhenChanged("exercises", lastExercises, state.exercises)
  lastRestTime = saveWhenChanged("restTime", lastRestTime, state.restTime)
  lastDefaultWeight = saveWhenChanged("defaultWeight", lastDefaultWeight, state.defaultWeight)
}

export default load
