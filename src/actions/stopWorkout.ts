import { Action } from "redux"

export const type = "Stop Workout"

export interface StopWorkout extends Action<string> {
  readonly type: typeof type
}

export function stopWorkout(): StopWorkout {
  return { type }
}

export default stopWorkout