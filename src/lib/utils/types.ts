export type Difficulty = "easy" | "medium" | "hard";

export interface Serie {
  reps: number;
  lift: number;
  difficulty: Difficulty;
}

export interface Exercise {
  name: string;
  muscle: string;
  series: Serie[];
  timestamp: string;
}

export type Workout = Record<string, Exercise[]>;

export interface User {
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
}
