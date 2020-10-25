import * as Redux from "redux"
import { BeginSetup, type as setupType } from "./actions/beginSetup"
import { Load, type as load } from "./actions/load"
import { StartWorkout, type as startWorkout } from "./actions/startWorkout"
import { StopWorkout, type as stopWorkout } from "./actions/stopWorkout"
import { CurrentExercise, DEFAULT_REST, Exercise, State } from "./state"

export function isAction<T extends Redux.Action<unknown>>(type: string, action: Redux.Action<unknown>): action is T {
  return action.type === type
}

export const currentExercise: Redux.Reducer<CurrentExercise> = (value, action) => {
  if (isAction<StartWorkout>(startWorkout, action)) {
    return 0
  }
  if (isAction<StopWorkout>(stopWorkout, action)) {
    return null
  }
  return value || null
}

export const defaultWeight: Redux.Reducer<number> = (value, action) => {
  if (isAction<Load>(load, action)) {
    return action.defaultWeight || 0
  }
  return value || 0
}

export const exercises: Redux.Reducer<Exercise[]> = (value, action) => {
  if (isAction<Load>(load, action)) {
    return action.exercises || []
  }
  return value || []
}

export const restTime: Redux.Reducer<number> = (value, action) => {
  if (isAction<Load>(load, action)) {
    return action.restTime || DEFAULT_REST
  }
  if (value === undefined) {
    return DEFAULT_REST
  }
  return value
}

export const setup: Redux.Reducer<boolean> = (value, action) => {
  if (isAction<BeginSetup>(setupType, action)) {
    return true
  }
  return value || false
}

export const rootReducer = Redux.combineReducers<State>({
  currentExercise,
  defaultWeight,
  exercises,
  restTime,
  setup,
})

export default rootReducer
