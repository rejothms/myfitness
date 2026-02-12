declare module '*.css';

import { StrengthProgram } from "@/types/events";

declare global {
  // eslint-disable-next-line no-var
  var workoutStore:
    | {
        imWorkout: StrengthProgram;
        stWorkout: StrengthProgram;
      }
    | undefined;
}

export {};