import intermediateWorkouts from "@/mock/intermediate.json";
import strengthWorkout from "@/mock/strength.json";
import { StrengthProgram } from "@/types/events";


let imWorkout: StrengthProgram = intermediateWorkouts as StrengthProgram;
let stWorkout: StrengthProgram = strengthWorkout as StrengthProgram;


if (!global.workoutStore) {
  global.workoutStore = {imWorkout, stWorkout};
}

export function getIntermediate() {
  return global.workoutStore?.imWorkout;
}

export function getStrength() {
  return global.workoutStore?.stWorkout;
}

export function addEvent(event: StrengthProgram) {
  //global.workoutStore.push(event);
  //console.log(global.workoutStore);
}

export function updateEvent(id: string, data: Partial<StrengthProgram>) {
/*   const index = global.eventsStore.findIndex((e) => e.id === id);
  if (index === -1) return null;

  global.eventsStore[index] = {
    ...global.eventsStore[index],
    ...data,
    //updatedAt: new Date().toISOString(),
  }; */

  return global?.workoutStore?.imWorkout;
}

export function deleteEvent(id: string) {
  /* console.log(global.eventsStore);
  const index = global.eventsStore.findIndex((e) => e.id === id);
  if (index === -1) return null;

  return global.eventsStore.splice(index, 1)[0]; */
  return '';
}

declare global {
  var eventsStore: StrengthProgram[];
}