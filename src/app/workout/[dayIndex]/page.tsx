"use client";

import { FC, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Clock, Play, Pause, RefreshCw, ArrowLeft } from "lucide-react";
import { StrengthProgram, WorkoutDay, Exercise } from "@/types/events";

interface WorkoutPageProps {
    program: StrengthProgram;
}

interface ExerciseState {
    isExpanded: boolean;
    currentSet: number;
    timer: number;
    isResting: boolean;
    running: boolean;
}

const DEFAULT_EXERCISE_TIME = 30;

const WorkoutPage: FC<WorkoutPageProps> = ({ program }) => {
    const router = useRouter();
    const params = useParams();
    const dayIndexParam = Number(params.dayIndex ?? 0);

    //  const workout: WorkoutDay = program.workouts[dayIndexParam] || program.workouts[0];

    const workout =
    {
        "dayIndex": 1,
        "dayName": "Monday",
        "focus": "Push",
        "title": "Chest + Shoulders + Triceps",
        "durationMinutes": 45,
        "exercises": [
            { "name": "Barbell Bench Press", "sets": 4, "reps": "6-8", "restSeconds": 120 },
            { "name": "Incline Dumbbell Press", "sets": 3, "reps": "8-10", "restSeconds": 90 },
            { "name": "Seated Shoulder Press", "sets": 3, "reps": "8-10", "restSeconds": 90 },
            { "name": "Lateral Raises", "sets": 3, "reps": "12-15", "restSeconds": 60 },
            { "name": "Cable Tricep Pushdown", "sets": 3, "reps": "10-12", "restSeconds": 60 }
        ]
    };

    const [exercisesState, setExercisesState] = useState<ExerciseState[]>(
        workout.exercises.map(() => ({
            isExpanded: false,
            currentSet: 1,
            timer: DEFAULT_EXERCISE_TIME,
            isResting: false,
            running: false,
        }))
    );

    // Timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            setExercisesState((prev) =>
                prev.map((ex, idx) => {
                    if (!ex.running) return ex;

                    if (ex.timer > 0) {
                        return { ...ex, timer: ex.timer - 1 };
                    } else {
                        const exData: Exercise = workout.exercises[idx];

                        if (!ex.isResting) {
                            // Start rest timer
                            return { ...ex, timer: exData.restSeconds, isResting: true };
                        } else if (ex.currentSet < exData.sets) {
                            // Next set
                            return {
                                ...ex,
                                timer: DEFAULT_EXERCISE_TIME,
                                currentSet: ex.currentSet + 1,
                                isResting: false,
                            };
                        } else {
                            // Done all sets
                            return { ...ex, running: false, timer: 0 };
                        }
                    }
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [workout.exercises]);

    const toggleExpand = (i: number) => {
        setExercisesState((prev) =>
            prev.map((ex, idx) => (idx === i ? { ...ex, isExpanded: !ex.isExpanded } : ex))
        );
    };

    const toggleStart = (i: number) => {
        setExercisesState((prev) =>
            prev.map((ex, idx) => (idx === i ? { ...ex, running: !ex.running } : ex))
        );
    };

    const resetExercise = (i: number) => {
        setExercisesState((prev) =>
            prev.map((ex, idx) =>
                idx === i
                    ? { ...ex, timer: DEFAULT_EXERCISE_TIME, currentSet: 1, isResting: false, running: false }
                    : ex
            )
        );
    };

    return (
        <main className="min-h-screen bg-black text-white p-6">
            {/* Back Button */}
            <button
                className="mb-4 text-sm flex items-center gap-1 text-emerald-400"
                onClick={() => router.back()}
            >
                <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-2xl font-bold mb-2">{workout.title}</h2>
            <p className="text-gray-400 mb-4">
                {workout.focus} • {workout.durationMinutes} min
            </p>

            <div className="space-y-4">
                {workout.exercises.map((ex, i) => {
                    const state = exercisesState[i];
                    return (
                        <div
                            key={i}
                            className="bg-zinc-900 p-4 rounded-2xl shadow flex flex-col gap-2"
                        >
                            {/* Header */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleExpand(i)}
                            >
                                <p className="font-medium">{ex.name}</p>
                                {state.isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </div>

                            {/* Expanded View */}
                            {state.isExpanded && (
                                <div className="pt-4 flex flex-col items-center gap-4">

                                    {/* WORK / REST Badge */}
                                    <div
                                        className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide
        ${state.isResting ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"}
      `}
                                    >
                                        {state.isResting ? "REST" : "WORK"}
                                    </div>

                                    {/* Large Circular Timer */}
                                    <div className="relative flex items-center justify-center w-44 h-44 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner border border-zinc-700">

                                        {/* Animated Pulse Ring */}
                                        <div className="absolute w-full h-full rounded-full animate-pulse bg-emerald-500/5" />

                                        {/* Timer Content */}
                                        <div className="flex flex-col items-center z-10">
                                            <Clock size={28} className="mb-2 text-gray-400" />
                                            <span className="text-5xl font-bold tracking-wider">
                                                {state.timer}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">seconds</span>
                                        </div>
                                    </div>

                                    {/* Sets Info */}
                                    <div className="text-sm text-gray-400">
                                        Set {state.currentSet} of {ex.sets} • {ex.reps}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-4 mt-2">

                                        {/* Start / Pause */}
                                        <button
                                            onClick={() => toggleStart(i)}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition
          ${state.running
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-emerald-500 hover:bg-emerald-600"
                                                }
        `}
                                        >
                                            {state.running ? <Pause size={20} /> : <Play size={20} />}
                                            {state.running ? "Pause" : "Start"}
                                        </button>

                                        {/* Reset */}
                                        <button
                                            onClick={() => resetExercise(i)}
                                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition"
                                        >
                                            <RefreshCw size={20} />
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default WorkoutPage;
