<template>
    <div class="card-clean">
        <h3 class="text-2xl font-bold mb-6 text-white uppercase tracking-wider">
            LOG WEIGHT
        </h3>

        <form @submit.prevent="saveWeight" class="space-y-4">
            <div>
                <label
                    class="block text-xs font-bold mb-2 text-zinc-500 uppercase tracking-wider"
                    >WEEK</label
                >
                <input
                    v-model.number="week"
                    type="number"
                    min="1"
                    max="12"
                    class="input-clean w-full"
                    required
                />
            </div>

            <div>
                <label
                    class="block text-xs font-bold mb-2 text-zinc-500 uppercase tracking-wider"
                    >WEIGHT (KG)</label
                >
                <input
                    v-model.number="weight"
                    type="number"
                    step="0.1"
                    class="input-clean w-full"
                    required
                />
            </div>

            <div>
                <label
                    class="block text-xs font-bold mb-2 text-zinc-500 uppercase tracking-wider"
                    >NOTES</label
                >
                <textarea
                    v-model="notes"
                    class="input-clean w-full font-mono text-sm"
                    rows="3"
                    placeholder="Energy, sleep, appetite..."
                />
            </div>

            <button
                type="submit"
                :disabled="saving"
                class="button-clean w-full disabled:opacity-50"
            >
                {{ saving ? "SAVING..." : "SAVE ENTRY" }}
            </button>
        </form>

        <div v-if="lastSaved" class="mt-4 border border-zinc-800 p-3">
            <div class="text-xs text-zinc-600 uppercase tracking-wider">
                Last Saved
            </div>
            <div class="text-sm text-zinc-400 font-mono mt-1">
                {{ lastSaved }}
            </div>
        </div>

        <div
            v-if="saveError"
            class="mt-4 border border-red-900 bg-red-950/20 p-3"
        >
            <div class="text-red-400 text-sm font-mono">{{ saveError }}</div>
        </div>

        <div class="mt-6 border border-zinc-800 p-4">
            <div class="flex items-start gap-3">
                <span class="text-zinc-600 text-xl">⚠</span>
                <div class="text-zinc-500 text-xs font-mono">
                    <strong class="text-zinc-400">BULKING TIP:</strong> If
                    weight stalls 2+ weeks, add 200-300 cal/day.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["saved"]);

const week = ref(1);
const weight = ref(0);
const notes = ref("");
const saving = ref(false);
const lastSaved = ref("");
const saveError = ref("");

async function saveWeight() {
    saving.value = true;
    saveError.value = "";

    try {
        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID");
        const timeStr = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        await $fetch("/api/bulk/save", {
            method: "POST",
            body: {
                week: week.value,
                date: dateStr,
                time: timeStr,
                weight: weight.value,
                notes: notes.value,
            },
        });

        lastSaved.value = `${dateStr} ${timeStr}`;
        emit("saved");
        notes.value = "";
        week.value++;
    } catch (error: any) {
        saveError.value = error.message || "Failed to save. Check console.";
        console.error("Save error:", error);
    } finally {
        saving.value = false;
    }
}
</script>
