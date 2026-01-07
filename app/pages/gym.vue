<template>
    <div class="max-w-6xl mx-auto">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold mb-2 text-white uppercase tracking-tight"
            >
                GYM TRACKER
            </h1>
            <p class="text-zinc-500 font-mono text-sm">
                TRACK EVERY SET / CHASE NUMBERS
            </p>
        </div>

        <!-- Week Selector -->
        <div class="card-clean mb-8">
            <div class="flex items-center justify-between">
                <button
                    @click="currentWeek = Math.max(1, currentWeek - 1)"
                    :disabled="currentWeek === 1"
                    class="px-4 py-2 border border-zinc-700 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-mono"
                >
                    ← PREV
                </button>

                <div class="text-center">
                    <div class="text-3xl font-bold font-mono text-white">
                        WEEK {{ currentWeek }}
                    </div>
                    <div class="text-zinc-600 text-xs font-mono">/ 12</div>
                </div>

                <button
                    @click="currentWeek = Math.min(12, currentWeek + 1)"
                    :disabled="currentWeek === 12"
                    class="px-4 py-2 border border-zinc-700 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-mono"
                >
                    NEXT →
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
                    'p-4 border transition-all text-left',
                    selectedDay === day.value
                        ? 'border-white bg-white text-black'
                        : 'border-zinc-800 hover:border-zinc-600',
                ]"
            >
                <div class="font-bold text-sm uppercase tracking-wider">
                    {{ day.label }}
                </div>
                <div class="text-xs mt-1 font-mono opacity-60">
                    {{ day.focus }}
                </div>
            </button>
        </div>

        <!-- Workout Form -->
        <GymWorkoutForm
            :week="currentWeek"
            :day="selectedDay"
            @saved="handleSaved"
        />

        <!-- Progress History -->
        <div class="card-clean mt-8" v-if="workoutHistory.length > 0">
            <h3
                class="text-xl font-bold mb-4 text-white uppercase tracking-wider"
            >
                RECENT
            </h3>
            <div class="space-y-2">
                <div
                    v-for="(workout, idx) in workoutHistory.slice(0, 5)"
                    :key="idx"
                    class="border border-zinc-800 p-3 flex justify-between items-center hover:border-zinc-600 transition-colors"
                >
                    <div class="font-mono text-sm">
                        <span class="text-white font-bold"
                            >W{{ workout[0] }}</span
                        >
                        <span class="text-zinc-600 mx-2">/</span>
                        <span class="text-zinc-400">{{ workout[1] }}</span>
                    </div>
                    <div class="text-zinc-600 text-xs font-mono">
                        {{ workout[2] }}
                    </div>
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
