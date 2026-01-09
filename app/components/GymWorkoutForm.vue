<template>
    <div class="inner border-x border-separator bg-white min-h-[60vh]">
        <div
            class="p-8 border-b border-separator flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
            <div>
                <span class="font-handwriting text-primary text-xl"
                    >Today's Session</span
                >
                <h2 class="text-4xl md:text-5xl font-black uppercase mt-1">
                    {{ dayName }}
                </h2>
                <p class="font-mono text-sm mt-2 text-foreground-text">
                    Focus: {{ dayFocus }}
                </p>
            </div>

            <div
                v-if="lastSaved"
                class="px-4 py-2 border border-separator rounded-full bg-background flex items-center gap-2"
            >
                <span
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                ></span>
                <span class="font-mono text-xs uppercase tracking-widest"
                    >Saved: {{ lastSaved }}</span
                >
            </div>
        </div>

        <div
            v-if="exercises.length === 0"
            class="flex flex-col items-center justify-center py-24 text-center p-8"
        >
            <div
                class="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
            >
                <span class="text-4xl">😴</span>
            </div>
            <h3 class="text-2xl font-bold uppercase mb-2">Rest & Recover</h3>
            <p class="font-mono text-foreground-text opacity-60 max-w-md">
                No workouts scheduled for today. Take a break, eat well, and get
                ready for the next grind!
            </p>
        </div>

        <form
            v-else
            @submit.prevent="saveWorkout"
            class="divide-y divide-separator"
        >
            <div
                v-for="(exercise, exIdx) in exercises"
                :key="exIdx"
                class="p-6 md:p-8 hover:bg-[#fcfbf7] transition-colors group"
            >
                <div class="flex justify-between items-baseline mb-3">
                    <h4
                        class="text-2xl font-bold group-hover:text-primary transition-colors uppercase"
                    >
                        {{ exercise.name }}
                    </h4>
                    <span
                        class="font-mono text-xs border border-separator px-2 py-1 rounded bg-white"
                    >
                        {{ exercise.sets.length }} SETS
                    </span>
                </div>

                <div
                    v-if="lastWeekData[exIdx]"
                    class="mb-4 p-3 bg-background rounded border border-separator"
                >
                    <span
                        class="font-mono text-xs uppercase tracking-wider text-foreground-text opacity-70"
                    >
                        Last Week (W{{ week - 1 }}):
                    </span>
                    <div class="flex gap-2 mt-1 flex-wrap">
                        <span
                            v-for="(set, idx) in lastWeekData[exIdx]"
                            :key="idx"
                            class="font-mono text-xs bg-white px-2 py-1 rounded border border-separator"
                        >
                            {{ set }}
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div
                        v-for="(set, setIdx) in exercise.sets"
                        :key="setIdx"
                        class="flex items-center gap-2"
                    >
                        <span class="font-mono text-xs text-primary w-6 pt-1"
                            >S{{ setIdx + 1 }}</span
                        >

                        <div class="relative w-full">
                            <input
                                v-model.number="set.weight"
                                type="number"
                                step="0.5"
                                placeholder="KG"
                                class="w-full bg-transparent border-b border-separator py-1 font-bold text-center focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <span class="text-separator text-sm">×</span>

                        <div class="relative w-full">
                            <input
                                v-model.number="set.reps"
                                type="number"
                                placeholder="REPS"
                                class="w-full bg-transparent border-b border-separator py-1 font-bold text-center focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-8 bg-background">
                <div
                    class="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            v-model="completed"
                            class="peer hidden"
                        />
                        <div
                            class="w-6 h-6 border-2 border-border rounded flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary"
                        >
                            <span
                                class="text-white text-sm opacity-0 peer-checked:opacity-100"
                                >✓</span
                            >
                        </div>
                        <span
                            class="font-bold text-foreground-primary group-hover:text-primary transition-colors"
                            >Session Completed</span
                        >
                    </label>

                    <button
                        type="submit"
                        :disabled="saving"
                        class="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-foreground-primary transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {{ saving ? "Saving..." : "Save Workout" }}
                    </button>
                </div>

                <div
                    v-if="saveError"
                    class="mt-4 text-red-500 font-bold text-center border border-red-200 bg-red-50 p-2 rounded"
                >
                    {{ saveError }}
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Exercise } from "~/types";

const props = defineProps<{
    week: number;
    day: string;
}>();

const emit = defineEmits(["saved"]);

const exercises = ref<Exercise[]>([]);
const completed = ref(false);
const saving = ref(false);
const lastSaved = ref("");
const saveError = ref("");
const lastWeekData = ref<Record<number, string[]>>({});

const programTemplates: Record<
    string,
    { name: string; focus: string; exercises: string[] }
> = {
    monday: {
        name: "SENIN",
        focus: "Back Width",
        exercises: [
            "Weighted Pull-Up / Lat Pulldown",
            "Lat Pulldown (Close Grip)",
            "Straight Arm Pulldown",
            "Rear Delt Fly",
            "Hanging Leg Raise",
        ],
    },
    tuesday: {
        name: "SELASA",
        focus: "Push (Chest/Shoulders)",
        exercises: [
            "Barbell Bench Press",
            "Overhead Press",
            "Incline Dumbbell Press",
            "Lateral Raise",
            "Tricep Pushdown",
            "Tricep Overhead Extension",
        ],
    },
    wednesday: {
        name: "RABU",
        focus: "Legs",
        exercises: [
            "Leg Press / Squat",
            "Leg Curl",
            "Leg Extension",
            "Calf Raise",
            "Hanging Leg Raise",
        ],
    },
    friday: {
        name: "JUMAT",
        focus: "Back Thickness",
        exercises: [
            "Pull-Up",
            "T-Bar Row / Barbell Row",
            "Seated Cable Row (Wide)",
            "Straight Arm Pulldown",
            "Lateral Raise",
            "Hammer Curl",
        ],
    },
    saturday: {
        name: "SABTU",
        focus: "Shoulders + Arms",
        exercises: [
            "Lateral Raise",
            "Face Pull",
            "Barbell Curl",
            "Skull Crushers",
            "Hanging Knee Raise",
        ],
    },
};

const dayName = computed(() => programTemplates[props.day]?.name || "REST DAY");
const dayFocus = computed(
    () => programTemplates[props.day]?.focus || "Recover",
);

function initializeExercises() {
    const template = programTemplates[props.day];
    if (!template) {
        exercises.value = [];
        return;
    }
    exercises.value = template.exercises.map((name) => {
        const numSets =
            name.includes("Lateral Raise") ||
            name.includes("Leg") ||
            name.includes("Pull-Up")
                ? 4
                : 3;
        return {
            name,
            sets: Array(numSets)
                .fill(null)
                .map(() => ({ weight: 0, reps: 0 })),
        };
    });
}

async function loadLastWeekData() {
    if (props.week <= 1) {
        lastWeekData.value = {};
        return;
    }

    try {
        const dayNameValue = dayName.value;
        if (dayNameValue === "REST DAY") return;

        const { data } = await $fetch(`/api/gym/get?day=${dayNameValue}`);

        const lastWeekWorkouts = data.filter(
            (row: any) => parseInt(row[0]) === props.week - 1,
        );

        if (lastWeekWorkouts.length > 0) {
            const template = programTemplates[props.day];
            const dataMap: Record<number, string[]> = {};

            template?.exercises.forEach((exerciseName, idx) => {
                const exerciseRow = lastWeekWorkouts.find(
                    (row: any) => row[4] === exerciseName,
                );
                if (exerciseRow) {
                    const sets = [
                        exerciseRow[5],
                        exerciseRow[6],
                        exerciseRow[7],
                        exerciseRow[8],
                    ].filter((s) => s && s !== "-" && s !== undefined);
                    dataMap[idx] = sets;
                }
            });

            lastWeekData.value = dataMap;
        }
    } catch (error) {
        console.error("Failed to load last week data:", error);
    }
}

async function loadCurrentSession() {
    try {
        const dayNameValue = dayName.value;
        if (dayNameValue === "REST DAY") return;

        const { data } = await $fetch(`/api/gym/get?day=${dayNameValue}`);

        const currentSessionRows = data.filter(
            (row: any) => parseInt(row[0]) === props.week,
        );

        if (currentSessionRows.length > 0) {
            exercises.value.forEach((exercise) => {
                const savedRow = currentSessionRows.find(
                    (row: any) => row[4] === exercise.name,
                );

                if (savedRow) {
                    exercise.sets.forEach((set, idx) => {
                        const setString = savedRow[5 + idx];
                        if (setString && setString !== "-") {
                            const parts = setString.split("×");
                            if (parts.length === 2) {
                                set.weight =
                                    parseFloat(
                                        parts[0].replace("kg", "").trim(),
                                    ) || 0;
                                set.reps = parseFloat(parts[1].trim()) || 0;
                            }
                        }
                    });
                }
            });

            if (currentSessionRows[0][9] === "YES") {
                completed.value = true;
            }
        }
    } catch (error) {
        console.error("Failed to load current session:", error);
    }
}

async function saveWorkout() {
    if (dayName.value === "REST DAY") return;

    const { isAuthenticated, secureFetch } = useAuth();

    if (!isAuthenticated.value) {
        navigateTo("/login");
        return;
    }

    saving.value = true;
    saveError.value = "";

    try {
        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID");
        const timeStr = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        await secureFetch("/api/gym/save", {
            method: "POST",
            body: {
                week: props.week,
                day: dayName.value,
                date: dateStr,
                time: timeStr,
                exercises: exercises.value,
                completed: completed.value,
            },
        });

        lastSaved.value = `${dateStr} ${timeStr}`;
        emit("saved");
        completed.value = false;
    } catch (error: any) {
        if (error.statusCode === 401) {
            saveError.value = "Session expired. Please login again.";
            setTimeout(() => navigateTo("/login"), 2000);
        } else {
            saveError.value = error.message || "Failed to save.";
        }
    } finally {
        saving.value = false;
    }
}

watch(
    () => props.day,
    async () => {
        initializeExercises();

        if (dayName.value !== "REST DAY") {
            await Promise.all([loadLastWeekData(), loadCurrentSession()]);
        }
    },
    { immediate: true },
);

watch(
    () => props.week,
    () => {
        if (dayName.value !== "REST DAY") {
            loadLastWeekData();
            loadCurrentSession();
        }
    },
);
</script>
