<template>
    <div class="min-h-screen bg-background">
        <div
            class="inner border-x bg-white py-16 md:py-24 border-b border-separator relative overflow-hidden"
        >
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none"
            >
                <span class="text-[15rem] font-black font-sans">BULK</span>
            </div>

            <div class="relative z-10 text-center">
                <span
                    class="font-handwriting text-xl text-primary mb-2 block -rotate-1"
                >
                    Tracking Progress
                </span>
                <h1
                    class="text-5xl md:text-7xl font-black uppercase text-foreground-primary"
                >
                    Weigh In
                </h1>
                <p
                    class="font-mono text-sm mt-4 text-foreground-text opacity-70 max-w-lg mx-auto"
                >
                    Target: +0.5-1KG per week. Eat big to get big.
                </p>
            </div>
        </div>

        <div class="inner border-x border-separator bg-white">
            <BulkWeightForm @saved="handleSaved" />
        </div>

        <div class="inner border-x bg-[#fcfbf7] border-t border-separator">
            <div
                class="grid grid-cols-3 divide-x divide-separator border-b border-separator"
            >
                <div class="p-8 text-center">
                    <span
                        class="font-mono text-xs uppercase tracking-widest text-foreground-text block mb-2"
                        >Start</span
                    >
                    <span
                        class="text-3xl md:text-4xl font-black text-foreground-text opacity-50"
                        >{{ startWeight }}</span
                    >
                </div>
                <div class="p-8 text-center bg-white">
                    <span
                        class="font-mono text-xs uppercase tracking-widest text-primary block mb-2 font-bold"
                        >Current</span
                    >
                    <span
                        class="text-3xl md:text-4xl font-black text-primary"
                        >{{ currentWeight }}</span
                    >
                </div>
                <div class="p-8 text-center">
                    <span
                        class="font-mono text-xs uppercase tracking-widest text-foreground-text block mb-2"
                        >Gained</span
                    >
                    <span
                        class="text-3xl md:text-4xl font-black text-foreground-primary"
                    >
                        {{ totalGained > 0 ? "+" : "" }}{{ totalGained }}
                    </span>
                </div>
            </div>

            <div class="p-8 md:p-12">
                <h3 class="text-2xl font-bold uppercase mb-6 font-handwriting">
                    Progress Log
                </h3>

                <div v-if="weightData.length > 0" class="space-y-2">
                    <div
                        v-for="(entry, idx) in weightData
                            .slice(1)
                            .reverse()
                            .slice(0, 10)"
                        :key="idx"
                        class="flex items-center justify-between p-4 border-b border-separator last:border-0 hover:bg-white transition-colors"
                    >
                        <div class="flex items-center gap-4">
                            <span
                                class="font-bold font-mono text-foreground-primary bg-primary/10 px-2 py-1 rounded text-xs"
                                >W{{ entry[0] }}</span
                            >
                            <span
                                class="text-sm text-foreground-text font-mono"
                                >{{ entry[1] }}</span
                            >
                        </div>

                        <div class="text-right">
                            <span class="font-black text-xl block"
                                >{{ entry[2] }} KG</span
                            >

                            <span
                                v-if="entry[3]"
                                class="text-xs text-foreground-text font-handwriting"
                                >{{ entry[3] }}</span
                            >
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8 opacity-50 italic">
                    No data logged yet.
                </div>
            </div>
        </div>

        <div
            class="inner border-x border-separator h-12 bg-background border-b"
        ></div>
    </div>
</template>

<script setup lang="ts">
const weightData = ref<any[]>([]);

const currentWeight = computed(() => {
    if (weightData.value.length <= 1) return 0;
    const lastEntry = weightData.value[weightData.value.length - 1];
    return lastEntry[2] || 0;
});

const startWeight = computed(() => {
    return weightData.value[1]?.[2] || "-";
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
