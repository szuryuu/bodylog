<template>
    <div class="max-w-6xl mx-auto">
        <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 text-japan-red">
                Gym Progress Tracker
            </h1>
            <p class="text-gray-400">
                Track every set, chase numbers, build discipline.
            </p>
        </div>

        <!-- Week Selector -->
        <div class="card-japanese mb-8">
            <div class="flex items-center justify-between">
                <button
                    @click="currentWeek = Math.max(1, currentWeek - 1)"
                    :disabled="currentWeek === 1"
                    class="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    ← Previous
                </button>

                <div class="text-center">
                    <div class="text-3xl font-bold">Week {{ currentWeek }}</div>
                    <div class="text-gray-400 text-sm">/ 12 weeks</div>
                </div>

                <button
                    @click="currentWeek = Math.min(12, currentWeek + 1)"
                    :disabled="currentWeek === 12"
                    class="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next →
                </button>
            </div>
        </div>

        <!-- Day Selector -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <button
                v-for="day in workoutDays"
                :key="day.value"
                @click="selectedDay = day.value"
                :class="[
                    'p-4 rounded-lg border-2 transition-all',
                    selectedDay === day.value
                        ? 'border-japan-red bg-japan-red/20'
                        : 'border-gray-700 hover:border-gray-600',
                ]"
            >
                <div class="font-bold">{{ day.label }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ day.focus }}</div>
            </button>
        </div>

        <!-- Workout Form -->
        <GymWorkoutForm
            :week="currentWeek"
            :day="selectedDay"
            @saved="handleSaved"
        />

        <!-- Progress History -->
        <div class="card-japanese mt-8" v-if="workoutHistory.length > 0">
            <h3 class="text-2xl font-bold mb-4 text-japan-red">
                Recent Workouts
            </h3>
            <div class="space-y-2">
                <div
                    v-for="(workout, idx) in workoutHistory.slice(0, 5)"
                    :key="idx"
                    class="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
                >
                    <div>
                        <span class="font-bold">Week {{ workout[0] }}</span>
                        <span class="text-gray-400 mx-2">•</span>
                        <span>{{ workout[1] }}</span>
                        <span class="text-gray-500 ml-2 text-sm">{{
                            workout[2]
                        }}</span>
                    </div>
                    <span class="text-sm text-gray-500">{{ workout[3] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const currentWeek = ref(1);
const selectedDay = ref("monday");
const workoutHistory = ref<any[]>([]);

const workoutDays = [
    { value: "monday", label: "SENIN", focus: "Back Width" },
    { value: "tuesday", label: "SELASA", focus: "Push" },
    { value: "wednesday", label: "RABU", focus: "Legs" },
    { value: "friday", label: "JUMAT", focus: "Back Thickness" },
    { value: "saturday", label: "SABTU", focus: "Shoulders/Arms" },
];

async function loadHistory() {
    try {
        const { data } = await $fetch("/api/gym/get");
        workoutHistory.value = data as any[];
    } catch (error) {
        console.error("Failed to load history:", error);
    }
}

function handleSaved() {
    loadHistory();
}

onMounted(() => {
    loadHistory();
});
</script>
