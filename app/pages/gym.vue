<template>
    <div class="min-h-screen bg-white">
        <div
            class="inner border-x bg-[#fcfbf7] py-16 md:py-24 border-b border-separator text-center"
        >
            <div class="flex justify-center mb-4">
                <Dumbbell
                    class="w-12 h-12 text-primary rotate-[-15deg]"
                    :stroke-width="1.5"
                />
            </div>

            <span
                class="font-handwriting text-xl text-primary mb-2 block rotate-1"
            >
                Time to grind!
            </span>
            <h1
                class="text-5xl md:text-7xl font-black uppercase text-foreground-primary mb-8"
            >
                Gym Log
            </h1>

            <div class="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                <button
                    v-for="d in days"
                    :key="d.value"
                    @click="selectDay(d.value)"
                    :disabled="isDayCompleted(d.value)"
                    :class="[
                        'px-4 py-2 rounded-lg font-bold text-sm transition-all border border-separator font-mono uppercase tracking-wider relative',
                        selectedDay === d.value
                            ? 'bg-primary text-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5'
                            : isDayCompleted(d.value)
                              ? 'bg-green-50 text-green-700 border-green-200 cursor-not-allowed opacity-60'
                              : 'bg-white text-foreground-text hover:bg-gray-50',
                    ]"
                >
                    {{ d.label }}
                    <span
                        v-if="isDayCompleted(d.value)"
                        class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white"
                    >
                        ✓
                    </span>
                </button>
            </div>

            <div
                class="flex items-center justify-center gap-6 mt-8 select-none"
            >
                <button
                    @click="currentWeek = Math.max(1, currentWeek - 1)"
                    class="group flex items-center gap-1 text-xs font-mono uppercase hover:text-primary transition-colors disabled:opacity-30"
                    :disabled="currentWeek === 1"
                >
                    <ChevronLeft
                        class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                    />
                    Prev
                </button>

                <div class="flex flex-col items-center">
                    <span class="font-black text-2xl leading-none"
                        >WEEK {{ currentWeek }}</span
                    >
                    <span
                        class="text-[10px] font-mono text-foreground-text opacity-60 tracking-widest uppercase"
                        >12 Week Program</span
                    >
                </div>

                <button
                    @click="currentWeek++"
                    class="group flex items-center gap-1 text-xs font-mono uppercase hover:text-primary transition-colors"
                >
                    Next
                    <ChevronRight
                        class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>

            <div
                v-if="weekCompletionStatus"
                class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white border border-separator rounded-full"
            >
                <span class="font-mono text-xs text-foreground-text">
                    Week {{ currentWeek }} Progress:
                </span>
                <span class="font-bold text-primary">
                    {{ weekCompletionStatus }}
                </span>
            </div>
        </div>

        <div class="inner border-x border-separator bg-white">
            <!-- Warning jika hari sudah complete -->
            <div
                v-if="isDayCompleted(selectedDay)"
                class="p-6 bg-yellow-50 border-b border-yellow-200"
            >
                <div class="flex items-center gap-3">
                    <span class="text-2xl">⚠️</span>
                    <div>
                        <p class="font-bold text-yellow-900">
                            This session is already completed
                        </p>
                        <p class="text-sm text-yellow-700 font-mono">
                            Week {{ currentWeek }} - {{ selectedDayName }} has
                            been logged. Select another day or week.
                        </p>
                    </div>
                </div>
            </div>

            <GymWorkoutForm
                v-if="!isDayCompleted(selectedDay)"
                :week="currentWeek"
                :day="selectedDay"
                @saved="handleSaved"
            />

            <div
                v-else
                class="p-8 text-center border-b border-separator bg-background"
            >
                <p class="font-mono text-sm text-foreground-text opacity-60">
                    Workout already logged. View it in Recent Logs below.
                </p>
            </div>
        </div>

        <div class="inner border-x bg-white border-t border-separator">
            <div class="p-8 md:p-12">
                <div class="flex items-center gap-3 mb-8">
                    <History class="w-6 h-6 text-primary" />
                    <h3 class="text-2xl font-black uppercase tracking-tight">
                        Recent Logs
                    </h3>
                </div>

                <div
                    v-if="workoutHistory.length > 0"
                    class="border border-separator rounded-xl overflow-hidden"
                >
                    <div
                        class="grid grid-cols-12 gap-4 bg-background p-4 border-b border-separator font-mono text-xs font-bold uppercase tracking-widest text-foreground-text opacity-70"
                    >
                        <div class="col-span-2 md:col-span-1 text-center">
                            Week
                        </div>
                        <div class="col-span-5 md:col-span-4">Session</div>
                        <div
                            class="col-span-5 md:col-span-4 text-right md:text-left"
                        >
                            Date
                        </div>
                        <div class="hidden md:block md:col-span-3 text-right">
                            Status
                        </div>
                    </div>

                    <div class="divide-y divide-separator">
                        <div
                            v-for="(workout, idx) in workoutHistory.slice(0, 5)"
                            :key="idx"
                            class="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#fcfbf7] transition-colors group"
                        >
                            <div
                                class="col-span-2 md:col-span-1 flex justify-center"
                            >
                                <span
                                    class="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary font-bold font-mono text-xs group-hover:bg-primary group-hover:text-white transition-colors"
                                >
                                    {{ workout[0] }}
                                </span>
                            </div>

                            <div class="col-span-5 md:col-span-4">
                                <span
                                    class="font-bold text-sm md:text-base text-foreground-primary uppercase"
                                    >{{ workout[1] }}</span
                                >
                            </div>

                            <div
                                class="col-span-5 md:col-span-4 text-right md:text-left"
                            >
                                <div
                                    class="flex items-center justify-end md:justify-start gap-2 text-foreground-text"
                                >
                                    <Calendar
                                        class="w-3 h-3 opacity-50 hidden md:block"
                                    />
                                    <span class="font-mono text-xs">{{
                                        workout[2]
                                    }}</span>
                                </div>
                            </div>

                            <div
                                class="hidden md:flex md:col-span-3 justify-end"
                            >
                                <div
                                    class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-100 text-green-700"
                                >
                                    <CheckCircle2 class="w-3 h-3" />
                                    <span
                                        class="text-[10px] font-bold uppercase tracking-wide"
                                        >Done</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-else
                    class="flex flex-col items-center justify-center py-16 border border-dashed border-separator rounded-xl bg-[#fcfbf7]"
                >
                    <Dumbbell
                        class="w-12 h-12 text-separator mb-4 opacity-50"
                    />
                    <p
                        class="font-mono text-sm text-foreground-text opacity-60"
                    >
                        No workouts logged yet.
                    </p>
                    <button
                        @click="currentWeek = 1"
                        class="mt-4 text-primary text-xs font-bold uppercase hover:underline"
                    >
                        Start Week 1
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Dumbbell,
    ChevronLeft,
    ChevronRight,
    History,
    Calendar,
    CheckCircle2,
} from "lucide-vue-next";

const currentWeek = ref(1);
const selectedDay = ref("monday");
const workoutHistory = ref<any[]>([]);
const completedSessions = ref<Set<string>>(new Set());

const days = [
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
];

const programTemplates: Record<string, { name: string }> = {
    monday: { name: "SENIN" },
    tuesday: { name: "SELASA" },
    wednesday: { name: "RABU" },
    friday: { name: "JUMAT" },
    saturday: { name: "SABTU" },
};

const selectedDayName = computed(
    () => programTemplates[selectedDay.value]?.name || selectedDay.value,
);

const weekCompletionStatus = computed(() => {
    const workoutDays = [
        "monday",
        "tuesday",
        "wednesday",
        "friday",
        "saturday",
    ];
    const completed = workoutDays.filter((day) => isDayCompleted(day)).length;
    return `${completed}/5 sessions`;
});

function isDayCompleted(day: string): boolean {
    const dayName = programTemplates[day]?.name;
    if (!dayName) return false;
    const key = `${currentWeek.value}-${dayName}`;
    return completedSessions.value.has(key);
}

function selectDay(day: string) {
    if (!isDayCompleted(day)) {
        selectedDay.value = day;
    }
}

async function loadHistory() {
    try {
        const { data } = await $fetch("/api/gym/get");

        const sortedData = (data as any[]).sort((a, b) => {
            const weekA = parseInt(a[0]) || 0;
            const weekB = parseInt(b[0]) || 0;
            return weekB - weekA;
        });

        workoutHistory.value = sortedData;

        const sessions = new Set<string>();
        sortedData.forEach((row) => {
            const week = row[0];
            const day = row[1];
            if (week && day) {
                sessions.add(`${week}-${day}`);
            }
        });
        completedSessions.value = sessions;

        detectCurrentWeek();
    } catch (error) {
        console.error("Failed to load history:", error);
    }
}

function detectCurrentWeek() {
    if (workoutHistory.value.length === 0) {
        currentWeek.value = 1;
        return;
    }

    const maxWeek = Math.max(
        ...workoutHistory.value.map((row) => parseInt(row[0]) || 0),
    );

    const workoutDays = ["SENIN", "SELASA", "RABU", "JUMAT", "SABTU"];
    const maxWeekSessions = workoutHistory.value.filter(
        (row) => parseInt(row[0]) === maxWeek,
    );

    const uniqueDaysInMaxWeek = new Set(maxWeekSessions.map((row) => row[1]))
        .size;

    if (uniqueDaysInMaxWeek >= 5) {
        currentWeek.value = maxWeek + 1;
    } else {
        currentWeek.value = maxWeek;
    }

    selectFirstIncompleteDay();
}

function selectFirstIncompleteDay() {
    const workoutDays = [
        "monday",
        "tuesday",
        "wednesday",
        "friday",
        "saturday",
    ];
    for (const day of workoutDays) {
        if (!isDayCompleted(day)) {
            selectedDay.value = day;
            return;
        }
    }
    selectedDay.value = "monday";
}

function handleSaved() {
    loadHistory();

    setTimeout(() => {
        const workoutDays = [
            "monday",
            "tuesday",
            "wednesday",
            "friday",
            "saturday",
        ];
        const completedCount = workoutDays.filter((day) =>
            isDayCompleted(day),
        ).length;

        if (completedCount >= 5) {
            currentWeek.value++;
            selectedDay.value = "monday";
        } else {
            selectFirstIncompleteDay();
        }
    }, 500);
}

watch(currentWeek, () => {
    selectFirstIncompleteDay();
});

onMounted(() => {
    loadHistory();
});
</script>
