"use client";

import { FC, useState } from "react";
import { Flame, Clock, Trophy } from "lucide-react";
import { StrengthProgram } from "@/types/events";
import { useRouter } from "next/navigation";



type Mode = "intermediate" | "strength";

export const EventDashboard: FC<{
    imWorkout: StrengthProgram;
    strWorkout: StrengthProgram;
}> = ({ imWorkout, strWorkout }) => {
    const [mode, setMode] = useState<Mode>("intermediate");
    const router = useRouter();

    const program = mode === "intermediate" ? imWorkout : strWorkout;

    const today = new Date();
    const dayIndex = today.getDay();
    const workoutIndex = dayIndex === 0 ? 0 : dayIndex - 1;
    const todayWorkout = program.workouts.find(it => it.dayIndex === dayIndex) || program.workouts[0];

    return (
        <main className="min-h-screen bg-black text-white p-6">
            {/* Difficulty Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setMode("intermediate")}
                    className={`px-3 py-1 rounded-full text-sm ${mode === "intermediate"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-800"
                        }`}
                >
                    Intermediate
                </button>

                <button
                    onClick={() => setMode("strength")}
                    className={`px-3 py-1 rounded-full text-sm ${mode === "strength" ? "bg-yellow-500 text-black" : "bg-zinc-800"
                        }`}
                >
                    Strength
                </button>
            </div>

            {/* Today's Workout */}
            <section className="mb-6">
                <h2 className="text-lg text-gray-300 mb-3">Today's Workout</h2>


                <div className="bg-zinc-900 p-5 rounded-2xl shadow-lg" onClick={() => router.push(`/workout/${todayWorkout.dayIndex}`)}>
                    <h3 className="text-2xl font-semibold mb-1">
                        {todayWorkout.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                        {todayWorkout.focus} workout
                    </p>

                    <div className="flex gap-6 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{todayWorkout.durationMinutes} min</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Flame size={16} />
                            <span>{todayWorkout.exercises.length} exercises</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900 p-5 rounded-2xl flex flex-col items-center justify-center">
                    <Trophy className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-semibold">
                        {program.workouts.length}
                    </p>
                    <p className="text-gray-400 text-sm">Weekly Workouts</p>
                </div>

                <div className="bg-zinc-900 p-5 rounded-2xl flex flex-col items-center justify-center">
                    <Clock className="text-emerald-500 mb-2" />
                    <p className="text-2xl font-semibold">
                        {program.workouts.reduce(
                            (acc, w) => acc + w.durationMinutes,
                            0
                        )}{" "}
                        min
                    </p>
                    <p className="text-gray-400 text-sm">Weekly Time</p>
                </div>
            </section>

            {/* This Week */}
            <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg">This Week</h3>
                    <span className="text-emerald-400 text-sm">
                        {program.workouts.length}/{program.daysPerWeek} workouts
                    </span>
                </div>

                <div className="flex justify-between bg-zinc-900 p-4 rounded-2xl">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div
                            key={i}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${i === dayIndex ? "bg-emerald-500 text-black" : "bg-zinc-800"
                                }`}
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </section>

            {/* More Workouts */}
            <section>
                <h3 className="text-lg mb-3">More Workouts</h3>

                <div className="space-y-3">
                    {program.workouts.map((w, i) => (
                        <div onClick={() => router.push(`/workout/${w.dayIndex - 1}`)}
                            key={i}
                            className="bg-zinc-900 p-4 rounded-2xl flex items-center gap-4"
                        >
                            <div className="w-16 h-16 bg-zinc-800 rounded-xl" />

                            <div className="flex-1">
                                <p className="font-medium">{w.title}</p>
                                <p className="text-gray-400 text-sm">
                                    {w.durationMinutes} min • {program.difficulty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};
