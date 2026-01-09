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

        <form @submit.prevent="saveWorkout" class="divide-y divide-separator">
            <div
                v-for="(exercise, exIdx) in exercises"
                :key="exIdx"
                class="p-6 md:p-8 hover:bg-[#fcfbf7] transition-colors group"
            >
                <div class="flex justify-between items-baseline mb-6">
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
            "Ab Wheel Rollout", // CHANGED FROM: Cable Crunch
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

async function saveWorkout() {
    saving.value = true;
    saveError.value = "";
    try {
        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID");
        const timeStr = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        await $fetch("/api/gym/save", {
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
        saveError.value = error.message || "Failed to save.";
    } finally {
        saving.value = false;
    }
}

watch(() => props.day, initializeExercises, { immediate: true });
</script>
