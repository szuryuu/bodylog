<template>
    <div class="min-h-screen bg-background pb-20">
        <div
            class="inner border-x border-b border-separator bg-white py-16 md:py-24 relative overflow-hidden"
        >
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none"
            >
                <span class="text-[15rem] font-black font-sans text-primary"
                    >COACH</span
                >
            </div>

            <div class="relative z-10 text-center px-4">
                <span
                    class="font-handwriting text-xl text-primary mb-2 block rotate-2"
                >
                    Free AI Analysis
                </span>
                <h1
                    class="text-3xl md:text-7xl font-black uppercase text-foreground-primary"
                >
                    AI Personal <span class="text-primary">Trainer</span>
                </h1>
                <p
                    class="font-mono text-sm mt-4 text-foreground-text opacity-70 max-w-lg mx-auto"
                >
                    Export your raw data and let Gemini AI analyze your
                    progressive overload and weight trends.
                </p>
            </div>
        </div>

        <div class="inner border-x border-separator bg-white p-8 md:p-12">
            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div
                    class="p-6 border-2 border-dashed border-separator rounded-xl hover:bg-[#fcfbf7] transition-colors"
                >
                    <span class="text-4xl font-black text-separator mb-4 block"
                        >01</span
                    >
                    <h3 class="font-bold text-lg mb-2">Export Data</h3>
                    <p class="text-sm font-mono opacity-60">
                        We compile your Gym & Bulk logs into a single CSV file.
                    </p>
                </div>
                <div
                    class="p-6 border-2 border-dashed border-separator rounded-xl hover:bg-[#fcfbf7] transition-colors"
                >
                    <span class="text-4xl font-black text-separator mb-4 block"
                        >02</span
                    >
                    <h3 class="font-bold text-lg mb-2">Auto-Copy Prompt</h3>
                    <p class="text-sm font-mono opacity-60">
                        We copy the perfect "Personal Trainer" prompt to your
                        clipboard.
                    </p>
                </div>
                <div
                    class="p-6 border-2 border-dashed border-separator rounded-xl hover:bg-[#fcfbf7] transition-colors"
                >
                    <span class="text-4xl font-black text-separator mb-4 block"
                        >03</span
                    >
                    <h3 class="font-bold text-lg mb-2">Paste & Upload</h3>
                    <p class="text-sm font-mono opacity-60">
                        Gemini opens automatically. Just paste the text and
                        attach the file.
                    </p>
                </div>
            </div>

            <div class="max-w-md mx-auto mb-8">
                <label
                    class="block font-mono text-xs uppercase tracking-widest text-foreground-text mb-2 text-center"
                >
                    Your Height (CM)
                </label>
                <div class="relative">
                    <input
                        v-model="userHeight"
                        type="number"
                        placeholder="170"
                        class="w-full bg-transparent border-b-2 border-separator py-4 font-sans text-4xl font-bold text-center text-foreground-primary outline-none focus:border-primary transition-colors"
                    />
                    <span
                        class="absolute right-10 bottom-6 text-xl font-bold text-separator pointer-events-none"
                        >CM</span
                    >
                </div>
                <p
                    class="text-xs text-center mt-2 text-foreground-text opacity-60"
                >
                    Used to calculate BMI & TDEE in the prompt.
                </p>
            </div>

            <div class="text-center">
                <button
                    @click="handleSummonTrainer"
                    :disabled="loading || !userHeight"
                    class="w-full px-12 py-6 bg-foreground-primary text-white text-xl md:text-2xl font-black uppercase tracking-wider rounded-xl hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    <Loader2 v-if="loading" class="w-8 h-8 animate-spin" />
                    <div v-else class="flex items-center gap-3">
                        <Rocket
                            class="w-8 h-8 group-hover:-translate-y-1 transition-transform"
                        />
                        <span>Summon AI Coach</span>
                    </div>
                </button>
            </div>
        </div>

        <transition name="fade">
            <div
                v-if="showSuccessModal"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
                <div
                    class="w-full max-w-sm bg-white border-2 border-foreground-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative animate-bounce-in"
                >
                    <div
                        class="mx-auto w-16 h-16 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <Sparkles class="w-8 h-8 text-green-600" />
                    </div>

                    <h3 class="text-2xl font-black uppercase mb-2">
                        Prompt Copied!
                    </h3>

                    <p
                        class="font-mono text-sm mb-4 text-foreground-text leading-relaxed"
                    >
                        Opening Gemini in
                        <span class="font-bold text-primary text-lg">{{
                            countdown
                        }}</span>
                        seconds...
                    </p>

                    <p
                        class="text-xs text-foreground-text/60 mb-8 bg-gray-50 p-3 rounded border border-separator"
                    >
                        Pop-up blocked? Click the button below to open manually.
                    </p>

                    <div class="flex flex-col gap-3">
                        <button
                            @click="openGemini"
                            class="w-full py-4 bg-foreground-primary text-white border-2 border-foreground-primary font-bold text-lg uppercase hover:bg-primary hover:border-primary transition-all active:scale-[0.98] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
                        >
                            <span>Open Gemini</span>
                            <ExternalLink class="w-4 h-4" />
                        </button>
                        <button
                            @click="showSuccessModal = false"
                            class="w-full py-4 bg-transparent border-2 border-separator text-foreground-text font-bold text-lg uppercase hover:border-foreground-primary hover:text-foreground-primary transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div
                v-if="showLoginModal"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
                <div
                    class="w-full max-w-sm bg-white border-2 border-foreground-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative animate-bounce-in"
                >
                    <div
                        class="mx-auto w-16 h-16 bg-yellow-50 border-2 border-yellow-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <Lock class="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 class="text-2xl font-black uppercase mb-2">
                        Access Denied
                    </h3>
                    <p
                        class="font-mono text-sm mb-8 text-foreground-text leading-relaxed"
                    >
                        You need to login to access your workout data.
                    </p>
                    <div class="flex flex-col gap-3">
                        <button
                            @click="navigateTo('/login')"
                            class="w-full py-4 bg-foreground-primary text-white border-2 border-foreground-primary font-bold text-lg uppercase hover:bg-primary hover:border-primary transition-all"
                        >
                            Go to Login
                        </button>
                        <button
                            @click="showLoginModal = false"
                            class="w-full py-4 bg-transparent border-2 border-separator text-foreground-text font-bold text-lg uppercase hover:border-foreground-primary"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { Loader2, Rocket, Lock, Sparkles, ExternalLink } from "lucide-vue-next";
const { secureFetch } = useAuth();

const loading = ref(false);
const showLoginModal = ref(false);
const showSuccessModal = ref(false);
const userHeight = ref<number | null>(null);

// Countdown State
const countdown = ref(3);
let timer: any = null;

function openGemini() {
    window.open("https://gemini.google.com/app", "_blank");
    // showSuccessModal.value = false;
}

async function handleSummonTrainer() {
    if (!userHeight.value) {
        alert("Please enter your height first!");
        return;
    }

    loading.value = true;

    const AI_PROMPT = `
Act as an elite Personal Trainer and Nutritionist.
I have attached a CSV file containing my "Gym Logs" and "Body Weight Logs" (Bulk progress).

**My Stats:**
- Height: ${userHeight.value} cm

Please analyze my data and provide a concise report with:
1. **Progressive Overload Check**: Am I getting stronger? Point out exercises where I'm stalling.
2. **Bulk Analysis**: Calculate my BMI based on my height (${userHeight.value}cm) and latest weight. Am I gaining too fast/slow (Target: 0.5kg/week)?
3. **Weak Points**: Based on my lifts, what body parts seem lagging?
4. **Action Plan**: Give me 3 specific bullet points on what I should focus on next week.

Be brutal, direct, and data-driven. Don't give generic advice.
`;

    try {
        const [gymRes, bulkRes] = await Promise.all([
            secureFetch("/api/gym/get"),
            secureFetch("/api/bulk/get"),
        ]);

        const gymData = gymRes.data || [];
        const bulkData = bulkRes.data || [];

        let csvContent = "TYPE,WEEK,DATE,METRIC_1,METRIC_2,METRIC_3,NOTES\n";

        // BULK DATA
        bulkData.forEach((row: any[]) => {
            if (row[0] === "Week") return;
            const w = row[2] ? row[2] + "kg" : "-";
            const n = row[3] || "";
            csvContent += `BULK,${row[0]},${row[1]},${w},-,-,${n}\n`;
        });

        // GYM DATA
        gymData.forEach((row: any[]) => {
            if (row[0] === "Week") return;
            const exercise = `"${row[4]}"`;
            const sets = `"${row[5]} | ${row[6]} | ${row[7]}"`;
            csvContent += `GYM,${row[0]},${row[2]},${exercise},${sets},-,${row[1]}\n`;
        });

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `bodylog_export_${new Date().toISOString().slice(0, 10)}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await navigator.clipboard.writeText(AI_PROMPT.trim());

        loading.value = false;
        showSuccessModal.value = true;
        countdown.value = 3;

        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
                clearInterval(timer);
                openGemini();
            }
        }, 1000);
    } catch (error) {
        console.error(error);
        showLoginModal.value = true;
        loading.value = false;
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
@keyframes bounceIn {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
.animate-bounce-in {
    animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
