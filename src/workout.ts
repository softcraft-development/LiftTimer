import { Exercise } from "./exercise"

export interface Workout {
  exercises: Exercise[]
  restTime: number
  leadTime: number
  sets: number
}

export function loadWorkout(): Workout {
  const exerciseData = window.localStorage.getItem("exercises")
  let exercises: Exercise[] = []
  if (exerciseData) {
    exercises = JSON.parse(exerciseData)
  }

  const restTime = JSON.parse(window.localStorage.getItem("restTime") || "30")
  const leadTime = JSON.parse(window.localStorage.getItem("leadTime") || "10")
  const sets = JSON.parse(window.localStorage.getItem("sets") || "3")
  return {
    exercises,
    leadTime,
    restTime,
    sets
  }
}

export function saveWorkout(workout: Workout): void {
  window.localStorage.setItem("exercises", JSON.stringify(workout.exercises))
  window.localStorage.setItem("restTime", JSON.stringify(workout.restTime))
  window.localStorage.setItem("leadTime", JSON.stringify(workout.leadTime))
  window.localStorage.setItem("sets", JSON.stringify(workout.sets))
}

export default Workout