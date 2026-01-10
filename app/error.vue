<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-background p-4 font-sans text-foreground-primary relative overflow-hidden"
    >
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none select-none"
        >
            <span class="text-[20rem] font-black font-sans text-primary"
                >OOPS</span
            >
        </div>

        <div
            class="w-full max-w-lg border-2 border-separator bg-white p-8 md:p-12 text-center relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
        >
            <div class="flex justify-center mb-8">
                <div
                    class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100"
                >
                    <AlertTriangle
                        class="w-10 h-10 text-red-500"
                        stroke-width="2"
                    />
                </div>
            </div>

            <h1
                class="text-7xl font-black mb-2 text-foreground-primary tracking-tighter"
            >
                {{ error?.statusCode || "500" }}
            </h1>

            <p
                class="font-handwriting text-2xl text-primary mb-6 rotate-[-2deg]"
            >
                {{
                    error?.statusCode === 404
                        ? "Plate not found?"
                        : "Muscle failure."
                }}
            </p>

            <p
                class="font-mono text-sm text-foreground-text mb-10 leading-relaxed border-y border-separator py-4"
            >
                {{
                    error?.message ||
                    "Something went wrong. Re-rack your weights and try again."
                }}
            </p>

            <button
                @click="handleError"
                class="w-full bg-foreground-primary text-white h-16 rounded-xl font-bold text-lg hover:bg-primary transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-wider group"
            >
                <span>Back to Grind</span>
                <ArrowRight
                    class="w-5 h-5 group-hover:-rotate-45 transition-transform"
                />
            </button>
        </div>

        <div class="mt-12 text-center">
            <p class="text-xs font-mono opacity-50 uppercase tracking-widest">
                SYSTEM FAILURE // BODYLOG
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AlertTriangle, ArrowRight } from "lucide-vue-next";

const props = defineProps({
    error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
