export type DifficultyLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Strength";

export type TrainingFocus =
  | "Upper Push"
  | "Upper Pull"
  | "Lower Body"
  | "Push"
  | "Pull"
  | "Legs"
  | "Full Body";

export type CycleType = "weekly-repeat";

export type IntensityUnit = "%1RM" | "RPE" | "Bodyweight" | "Custom";


export interface Exercise {
  id?: string; 
  name: string;

  sets: number;

  /**
   * Examples:
   * "5"
   * "3-5"
   * "6-8"
   * "8/leg"
   * "45s"
   */
  reps: string;

  restSeconds: number;

  /**
   * Optional strength-specific fields
   */
  intensity?: string; // "80-85% 1RM"
  tempo?: string; // "2-1-1"
  notes?: string;
}


export interface WorkoutDay {
  dayIndex: number; // 1–6
  dayName:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

  focus: TrainingFocus;

  title: string;

  durationMinutes: number;

  exercises: Exercise[];
}


export interface StrengthProgram {
  programId: string;
  programName: string;

  difficulty: DifficultyLevel;

  trainingStyle: string; // "Low Rep / Heavy Load"

  daysPerWeek: number;

  restDay: WorkoutDay["dayName"];

  progressionModel: string; // "Progressive Overload"

  repRangeFocus: string; // "3-6 reps"

  averageRestSeconds: number;

  cycle: CycleType;

  workouts: WorkoutDay[];
}



export interface Intensity {
  value: number; // 80
  max?: number;  // 85 (for range)
  unit: IntensityUnit;
}

