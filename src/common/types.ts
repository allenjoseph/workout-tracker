export enum RPE {
  easy = 1,
  medium = 5,
  hard = 8,
}

export interface Serie {
  reps: number;
  weight: number;
  difficulty: RPE;
}

export interface Exercise {
  muscle: string;
  name: string;
  reps: number;
  weight: number;
  rpe: RPE;
  failure?: boolean;
  notes?: string;
}

export interface Workout {
  uuid: string;
  timestamp: string;
  exercises: Exercise[];
}

export interface User {
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
}
