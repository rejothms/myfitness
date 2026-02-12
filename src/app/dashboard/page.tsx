
import { EventDashboard } from "@/components/EventDashboard/EventDashboard";
import { getIntermediateWorkout, getStrengthWorkout } from "@/lib/fitnessApi";

export default async function DashboardPage() {
  const intermediate = await getIntermediateWorkout();
  const strength = await getStrengthWorkout();

  return <EventDashboard imWorkout={intermediate} strWorkout={strength} />;
}

