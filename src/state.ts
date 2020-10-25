export interface Exercise {
  name: string
  time: number
  weight: number
}

export type CurrentExercise = number | null

export interface State {
  exercises: Exercise[]
  restTime: number,
  currentExercise: CurrentExercise
}
