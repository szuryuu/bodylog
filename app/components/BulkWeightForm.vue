<template>
    <div class="card-japanese">
        <h3 class="text-2xl font-bold mb-6 text-japan-red">
            Log Weekly Weight
        </h3>

        <form @submit.prevent="saveWeight" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2"
                    >Week Number</label
                >
                <input
                    v-model.number="week"
                    type="number"
                    min="1"
                    max="12"
                    class="input-japanese w-full"
                    required
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-2"
                    >Bodyweight (kg)</label
                >
                <input
                    v-model.number="weight"
                    type="number"
                    step="0.1"
                    class="input-japanese w-full"
                    required
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-2"
                    >Notes (optional)</label
                >
                <textarea
                    v-model="notes"
                    class="input-japanese w-full"
                    rows="3"
                    placeholder="Energy levels, sleep quality, appetite, etc."
                />
            </div>

            <button
                type="submit"
                :disabled="saving"
                class="button-primary w-full disabled:opacity-50"
            >
                {{ saving ? "Saving..." : "Save Weight Entry" }}
            </button>
        </form>

        <div
            class="mt-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg"
        >
            <div class="flex items-start gap-2">
                <span class="text-yellow-500 text-xl">⚠️</span>
                <div class="text-yellow-200 text-sm">
                    <strong>Bulking Tip:</strong> If weight stalls for 2+ weeks,
                    increase calories by 200-300. Target: +0.5-1kg per week for
                    clean bulk.
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

async function saveWeight() {
    saving.value = true;
    try {
        await $fetch("/api/bulk/save", {
            method: "POST",
            body: {
                week: week.value,
                date: new Date().toLocaleDateString("id-ID"),
                weight: weight.value,
                notes: notes.value,
            },
        });

        alert("Weight saved successfully!");
        emit("saved");
        notes.value = "";
        week.value++;
    } catch (error) {
        alert("Failed to save weight");
        console.error(error);
    } finally {
        saving.value = false;
    }
}
</script>
