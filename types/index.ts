export interface WorkoutSet {
  weight: number;
  reps: number;
}

export interface Exercise {
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutDay {
  week: number;
  day: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface BulkEntry {
  week: number;
  date: string;
  weight: number;
  notes?: string;
}

export interface GymProgram {
  monday: Exercise[];
  tuesday: Exercise[];
  wednesday: Exercise[];
  friday: Exercise[];
  saturday: Exercise[];
}
