import type { Exercise } from './types';

export async function getExercises(muscle?: string) {
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

export async function saveExercise(workoutId: string, exercise: Exercise) {
  await fetch('/private/workouts/exercises', {
    method: 'post',
    body: JSON.stringify({
      workout: workoutId,
      muscle: exercise.muscle,
      name: exercise.name,
      reps: exercise.reps,
      weight: exercise.weight,
      rpe: exercise.rpe,
    }),
  }).catch(console.log);
}
