import { Action } from "redux"

export const type = "Start Workout"

export interface StartWorkout extends Action<string> {
  readonly type: typeof type
}

export function startWorkout(): StartWorkout {
  return { type }
}

export default startWorkout
