<template>
    <div class="card-japanese">
        <h3 class="text-2xl font-bold mb-6 text-japan-red">
            {{ dayName }} - {{ dayFocus }}
        </h3>

        <form @submit.prevent="saveWorkout" class="space-y-6">
            <div
                v-for="(exercise, exIdx) in exercises"
                :key="exIdx"
                class="bg-gray-800 rounded-lg p-4"
            >
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-lg">{{ exercise.name }}</h4>
                    <span class="text-gray-400 text-sm"
                        >{{ exercise.sets.length }} sets</span
                    >
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(set, setIdx) in exercise.sets"
                        :key="setIdx"
                        class="flex items-center gap-3"
                    >
                        <span class="text-gray-400 w-16"
                            >Set {{ setIdx + 1 }}:</span
                        >
                        <input
                            v-model.number="set.weight"
                            type="number"
                            step="0.5"
                            placeholder="Weight"
                            class="input-japanese flex-1"
                            required
                        />
                        <span class="text-gray-400">×</span>
                        <input
                            v-model.number="set.reps"
                            type="number"
                            placeholder="Reps"
                            class="input-japanese flex-1"
                            required
                        />
                    </div>
                </div>
            </div>

            <div
                class="flex items-center justify-between pt-4 border-t border-gray-800"
            >
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                        v-model="completed"
                        type="checkbox"
                        class="w-5 h-5 rounded border-gray-600 text-japan-red focus:ring-japan-red"
                    />
                    <span>Mark as completed</span>
                </label>

                <button
                    type="submit"
                    :disabled="saving"
                    class="button-primary disabled:opacity-50"
                >
                    {{ saving ? "Saving..." : "Save Workout" }}
                </button>
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
    try {
        await $fetch("/api/gym/save", {
            method: "POST",
            body: {
                week: props.week,
                day: dayName.value,
                date: new Date().toLocaleDateString("id-ID"),
                exercises: exercises.value,
                completed: completed.value,
            },
        });

        alert("Workout saved successfully!");
        emit("saved");
        completed.value = false;
    } catch (error) {
        alert("Failed to save workout");
        console.error(error);
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
