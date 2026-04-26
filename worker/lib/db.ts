import { env } from 'cloudflare:workers';

export interface Exercise {
  uuid: string;
  muscle: string;
  name: string;
  image: string | null;
}

export interface Training {
  workout: string;
  muscle: string;
  name: string;
  reps: number;
  weight: number;
  rpe: number;
  failure: boolean;
  notes: string;
}

export async function db_AddWorkout(uuid: string, userId: string) {
  const sql = 'INSERT INTO Workout (uuid,userId,timestamp) VALUES (?,?,?)';
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql)
    .bind(uuid, userId, Date.now())
    .run();
  return result.success;
}

export async function db_GetWorkouts(userId: string) {
  const sql = [
    `SELECT w.uuid, w.timestamp, json_group_array(`,
    `json_object('muscle', e.muscle, 'name', e.name,`,
    `'reps', e.reps, 'weight', e.weight,`,
    `'rpe', e.rpe, 'failure', e.failure,`,
    `'notes', e.notes)) as exercises`,
    `FROM Workout w`,
    `INNER JOIN Training e on e.workout = w.uuid`,
    `WHERE w.userId = ?`,
    `GROUP BY w.uuid`,
    `ORDER BY w.timestamp DESC`,
    `LIMIT 10`,
  ].join(' ');
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql).bind(userId).run();
  result.results.forEach((o) => {
    o.exercises = JSON.parse(o.exercises as string);
  });
  return result;
}

export async function db_AddExercise(exercise: Exercise) {
  const sql =
    'INSERT INTO Exercise (uuid,muscle,name,image,timestamp) VALUES (?,?,?,?,?)';
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql)
    .bind(
      exercise.uuid,
      exercise.muscle,
      exercise.name,
      exercise.image,
      Date.now(),
    )
    .run();
  return result.success;
}

export async function db_GetExercises(muscle: string) {
  const sql = [
    `SELECT e.uuid, e.name, e.image`,
    `FROM Exercise e`,
    `WHERE e.muscle = ?`,
    `ORDER BY e.timestamp DESC`,
  ].join(' ');
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql).bind(muscle).run();
  return result;
}

export async function db_AddTraining(training: Training) {
  const sql =
    'INSERT INTO Training (workout,muscle,name,reps,weight,rpe,failure,notes,timestamp) VALUES (?,?,?,?,?,?,?,?,?)';
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql)
    .bind(
      training.workout,
      training.muscle,
      training.name,
      training.reps,
      training.weight,
      training.rpe,
      training.failure ?? 0,
      training.notes ?? null,
      Date.now(),
    )
    .run();
  return result.success;
}

export async function db_GetWorkoutTraining(workoutId: string) {
  const sql =
    'SELECT muscle, name, reps, weight, rpe, failure, notes FROM Training WHERE workout = ? ORDER BY timestamp DESC';
  const result = await env.WORKOUT_TRACKER_DB.prepare(sql)
    .bind(workoutId)
    .run();
  return result;
}
