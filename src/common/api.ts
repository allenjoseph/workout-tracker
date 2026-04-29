import type { Exercise, Training } from './types';

export async function getExercisesFromImages(muscle?: string) {
  if (!muscle) return [];

  return fetch(`/private/exercises/${muscle}`)
    .then((res) => res.json())
    .then((data: { exercises: string[] }) =>
      data.exercises.map((image) => ({
        image: `/private/images/${image}`,
        name: image
          .replace(`${muscle}/`, '')
          .replace('.webp', '')
          .replaceAll('_', ' '),
      })),
    )
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function saveTraining(workoutId: string, training: Training) {
  return fetch('/private/workouts/training', {
    method: 'post',
    body: JSON.stringify({
      workout: workoutId,
      muscle: training.muscle,
      name: training.name,
      reps: training.reps,
      weight: training.weight,
      rpe: training.rpe,
    }),
  }).then<Training>((res) => res.json());
}

export async function saveExercise(exercise: Exercise) {
  await fetch('/private/exercises', {
    method: 'post',
    body: JSON.stringify({
      muscle: exercise.muscle,
      name: exercise.name,
      image: exercise.image,
    }),
  }).catch(console.log);
}

export async function getExercises(muscle: string) {
  return fetch(`/private/exercises?muscle=${muscle}`).then<Exercise[]>((res) =>
    res.json(),
  );
}
