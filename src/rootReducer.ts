import * as Redux from "redux"
import { Load, type as load } from "./actions/load"
import { StartWorkout, type as startWorkout } from "./actions/startWorkout"
import { StopWorkout, type as stopWorkout } from "./actions/stopWorkout"
import { CurrentExercise, Exercise, State } from "./state"

export const DEFAULT_REST = 30

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

export const rootReducer = Redux.combineReducers<State>({
  currentExercise,
  exercises,
  restTime,
})

export default rootReducer
