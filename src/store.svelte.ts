import dayjs from "dayjs";
import type { Exercise, User, Workout } from "./lib/utils/types";

interface Store {
  user?: User;
  currentPage: "home" | "workout-muscle" | "workout-exercise";
  currentDate: string;
  currentWorkoutMuscle?: string;
  workouts: Workout;
  saveExercise: (exercise: Exercise) => void;
  saveUser: (user: User) => void;
}

export const store = $state<Store>({
  currentPage: "home",
  currentDate: dayjs().format("YYYY-MM-DD"),
  workouts: {},
  saveExercise: (exercise) => {
    store.workouts[store.currentDate] = [
      ...(store.workouts[store.currentDate] ?? []),
      exercise,
    ];
    localStorage.setItem("workouts", JSON.stringify(store.workouts));
  },
  saveUser: (user: User) => {
    store.user = user;
    localStorage.setItem("user", JSON.stringify(store.user));
  },
});
