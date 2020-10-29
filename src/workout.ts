import { Exercise } from "./exercise"

export interface Workout {
  exercises: Exercise[],
  restTime: number,
  leadTime: number
}

export function loadWorkout(): Workout {
  const exerciseData = window.localStorage.getItem("exercises")
  let exercises: Exercise[] = []
  if (exerciseData) {
    exercises = JSON.parse(exerciseData)
  }

  const restTime = JSON.parse(window.localStorage.getItem("restTime") || "30")
  const leadTime = JSON.parse(window.localStorage.getItem("leadTime") || "10")
  return {
    exercises,
    leadTime,
    restTime
  }
}

export function saveWorkout(workout: Workout): void {
  window.localStorage.setItem("exercises", JSON.stringify(workout.exercises))
  window.localStorage.setItem("restTime", JSON.stringify(workout.restTime))
  window.localStorage.setItem("leadTime", JSON.stringify(workout.leadTime))
}

export default Workout