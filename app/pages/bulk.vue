<template>
    <div class="max-w-4xl mx-auto">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold mb-2 text-white uppercase tracking-tight"
            >
                BULK TRACKER
            </h1>
            <p class="text-zinc-500 font-mono text-sm">
                TARGET: +0.5-1KG PER WEEK
            </p>
        </div>

        <BulkWeightForm @saved="handleSaved" />

        <!-- Weight Chart -->
        <div class="card-clean mt-8" v-if="weightData.length > 0">
            <h3
                class="text-xl font-bold mb-4 text-white uppercase tracking-wider"
            >
                PROGRESS
            </h3>
            <div class="space-y-2">
                <div
                    v-for="(entry, idx) in weightData
                        .slice(1)
                        .reverse()
                        .slice(0, 10)"
                    :key="idx"
                    class="border border-zinc-800 p-4 flex justify-between items-center hover:border-zinc-600 transition-colors"
                >
                    <div class="font-mono text-sm">
                        <span class="text-white font-bold"
                            >W{{ entry[0] }}</span
                        >
                        <span class="text-zinc-600 mx-3">/</span>
                        <span class="text-zinc-500 text-xs">{{
                            entry[1]
                        }}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-white font-mono">
                            {{ entry[2] }}
                        </div>
                        <div
                            class="text-xs text-zinc-600 font-mono"
                            v-if="entry[3]"
                        >
                            {{ entry[3] }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div
                class="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800"
            >
                <div class="text-center">
                    <div
                        class="text-zinc-600 text-xs uppercase tracking-wider mb-1"
                    >
                        START
                    </div>
                    <div class="text-2xl font-bold font-mono text-zinc-400">
                        {{ weightData[1]?.[2] || "-" }}
                    </div>
                </div>
                <div class="text-center">
                    <div
                        class="text-zinc-600 text-xs uppercase tracking-wider mb-1"
                    >
                        CURRENT
                    </div>
                    <div class="text-2xl font-bold font-mono text-white">
                        {{ currentWeight }}
                    </div>
                </div>
                <div class="text-center">
                    <div
                        class="text-zinc-600 text-xs uppercase tracking-wider mb-1"
                    >
                        GAINED
                    </div>
                    <div class="text-2xl font-bold font-mono text-white">
                        +{{ totalGained }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const weightData = ref<any[]>([]);

const currentWeight = computed(() => {
    if (weightData.value.length <= 1) return 0;
    const lastEntry = weightData.value[weightData.value.length - 1];
    return lastEntry[2] || 0;
});

const totalGained = computed(() => {
    if (weightData.value.length <= 1) return 0;
    const start = parseFloat(weightData.value[1]?.[2]) || 0;
    const current = parseFloat(currentWeight.value) || 0;
    return (current - start).toFixed(1);
});

async function loadWeightData() {
    try {
        const { data } = await $fetch("/api/bulk/get");
        weightData.value = data as any[];
    } catch (error) {
        console.error("Failed to load weight data:", error);
    }
}

function handleSaved() {
    loadWeightData();
}

onMounted(() => {
    loadWeightData();
});
</script>
