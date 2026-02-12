import { StrengthProgram } from "@/types/events";

export async function getIntermediateWorkout(): Promise<StrengthProgram> {
  const res = await fetch(`https://myfitness-six.vercel.app/api/intermediate`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch intermediate workouts");
  }

  return res.json();
}

export async function getStrengthWorkout(): Promise<StrengthProgram> {
  const res = await fetch(`https://myfitness-six.vercel.app/api/strength`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch strength workouts");
  }

  return res.json();
}
