<template>
    <div class="card-clean">
        <div class="flex justify-between items-start mb-6">
            <div>
                <h3
                    class="text-2xl font-bold text-white uppercase tracking-tight"
                >
                    {{ dayName }}
                </h3>
                <p class="text-zinc-500 text-sm font-mono mt-1">
                    {{ dayFocus }}
                </p>
            </div>
            <div v-if="lastSaved" class="text-right">
                <div class="text-xs text-zinc-600 uppercase tracking-wider">
                    Last Saved
                </div>
                <div class="text-sm text-zinc-400 font-mono">
                    {{ lastSaved }}
                </div>
            </div>
        </div>

        <form @submit.prevent="saveWorkout" class="space-y-6">
            <div
                v-for="(exercise, exIdx) in exercises"
                :key="exIdx"
                class="border border-zinc-800 p-4"
            >
                <div class="flex items-center justify-between mb-3">
                    <h4
                        class="font-bold text-sm uppercase tracking-wider text-white"
                    >
                        {{ exercise.name }}
                    </h4>
                    <span class="text-zinc-600 text-xs font-mono"
                        >{{ exercise.sets.length }} SETS</span
                    >
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(set, setIdx) in exercise.sets"
                        :key="setIdx"
                        class="grid grid-cols-[80px_1fr_20px_1fr] gap-3 items-center"
                    >
                        <span class="text-zinc-600 text-xs font-mono uppercase"
                            >SET {{ setIdx + 1 }}</span
                        >
                        <input
                            v-model.number="set.weight"
                            type="number"
                            step="0.5"
                            placeholder="KG"
                            class="input-clean text-center"
                            required
                        />
                        <span class="text-zinc-600 text-center">×</span>
                        <input
                            v-model.number="set.reps"
                            type="number"
                            placeholder="REPS"
                            class="input-clean text-center"
                            required
                        />
                    </div>
                </div>
            </div>

            <div
                class="flex items-center justify-between pt-4 border-t border-zinc-800"
            >
                <label class="flex items-center space-x-3 cursor-pointer group">
                    <input
                        v-model="completed"
                        type="checkbox"
                        class="w-5 h-5 border-2 border-zinc-700 bg-transparent checked:bg-white checked:border-white"
                    />
                    <span
                        class="text-sm uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors"
                        >COMPLETED</span
                    >
                </label>

                <button
                    type="submit"
                    :disabled="saving"
                    class="button-clean disabled:opacity-50"
                >
                    {{ saving ? "SAVING..." : "SAVE" }}
                </button>
            </div>
        </form>

        <div
            v-if="saveError"
            class="mt-4 border border-red-900 bg-red-950/20 p-3"
        >
            <div class="text-red-400 text-sm font-mono">{{ saveError }}</div>
        </div>
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
            "Cable Crunch",
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

const dayName = computed(() => programTemplates[props.day]?.name || "");
const dayFocus = computed(() => programTemplates[props.day]?.focus || "");

function initializeExercises() {
    const template = programTemplates[props.day];
    if (!template) return;

    exercises.value = template.exercises.map((name) => {
        const numSets = name.includes("Lateral Raise")
            ? 4
            : name.includes("Leg") || name.includes("Pull-Up")
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
        saveError.value =
            error.message || "Failed to save. Check console for details.";
        console.error("Save error:", error);
    } finally {
        saving.value = false;
    }
}

watch(
    () => props.day,
    () => {
        initializeExercises();
    },
    { immediate: true },
);
</script>
