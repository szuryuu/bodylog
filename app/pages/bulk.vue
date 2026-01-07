<template>
    <div class="max-w-4xl mx-auto">
        <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2 text-japan-red">
                Bulk Progress Tracker
            </h1>
            <p class="text-gray-400">Target: +0.5-1kg per week</p>
        </div>

        <BulkWeightForm @saved="handleSaved" />

        <!-- Weight Chart -->
        <div class="card-japanese mt-8" v-if="weightData.length > 0">
            <h3 class="text-2xl font-bold mb-4 text-japan-red">
                Weight Progress
            </h3>
            <div class="space-y-3">
                <div
                    v-for="(entry, idx) in weightData
                        .slice(1)
                        .reverse()
                        .slice(0, 10)"
                    :key="idx"
                    class="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                    <div>
                        <span class="font-bold text-lg"
                            >Week {{ entry[0] }}</span
                        >
                        <span class="text-gray-400 mx-3">•</span>
                        <span class="text-gray-500 text-sm">{{
                            entry[1]
                        }}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-japan-red">
                            {{ entry[2] }} kg
                        </div>
                        <div class="text-xs text-gray-500" v-if="entry[3]">
                            {{ entry[3] }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div
                class="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800"
            >
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Starting Weight</div>
                    <div class="text-2xl font-bold">
                        {{ weightData[1]?.[2] || "-" }} kg
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Current Weight</div>
                    <div class="text-2xl font-bold text-japan-red">
                        {{ currentWeight }} kg
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Total Gained</div>
                    <div class="text-2xl font-bold text-green-500">
                        +{{ totalGained }} kg
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
