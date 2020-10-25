export const DEFAULT_EXERCISE = 30
export const DEFAULT_REST = DEFAULT_EXERCISE

export interface Exercise {
  name: string
  time: number
  weight: number
}

export type CurrentExercise = number | null

export interface State {
  currentExercise: CurrentExercise,
  defaultWeight: number,
  exercises: Exercise[]
  restTime: number
  setup: boolean
}
