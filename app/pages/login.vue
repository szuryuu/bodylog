<template>
    <div
        class="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none"
        >
            <span class="text-[20rem] font-black font-sans text-primary"
                >LOCK</span
            >
        </div>

        <div class="inner max-w-md w-full relative z-10">
            <div
                class="bg-white border-2 border-separator rounded-2xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
            >
                <div class="text-center mb-10">
                    <div
                        class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group"
                    >
                        <Key
                            class="w-10 h-10 text-primary group-hover:rotate-12 transition-transform duration-300"
                            :stroke-width="2"
                        />
                    </div>

                    <span
                        class="font-handwriting text-xl text-primary mb-2 block -rotate-2"
                    >
                        Members Only
                    </span>

                    <h1
                        class="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-foreground-primary mb-3 tracking-tight break-words"
                    >
                        Authentication
                    </h1>
                    <p
                        class="text-sm text-foreground-text font-mono opacity-80"
                    >
                        Enter password to access gym logs
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-8">
                    <div class="group">
                        <label
                            class="block font-mono text-xs uppercase tracking-widest text-foreground-text mb-2 group-hover:text-primary transition-colors"
                        >
                            Password
                        </label>
                        <div class="relative">
                            <input
                                v-model="passwordInput"
                                type="password"
                                placeholder="••••••••"
                                class="input-pow text-center tracking-widest text-2xl"
                                autofocus
                                required
                            />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <button
                            type="submit"
                            :disabled="loading"
                            class="w-full h-16 bg-foreground-primary text-white rounded-xl font-bold text-xl hover:bg-primary transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            <span v-if="loading">Verifying...</span>
                            <span v-else>Unlock Access</span>
                            <ArrowRight v-if="!loading" class="w-5 h-5" />
                        </button>

                        <div
                            v-if="error"
                            class="p-3 bg-red-50 border border-red-100 rounded-lg text-red-500 text-sm text-center font-bold font-mono animate-pulse"
                        >
                            {{ error }}
                        </div>
                    </div>

                    <div class="pt-6 border-t border-separator">
                        <p
                            class="text-[10px] text-foreground-text text-center font-mono uppercase tracking-widest opacity-60"
                        >
                            Session valid for 30 days
                        </p>
                    </div>
                </form>
            </div>

            <div class="text-center mt-8">
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-2 text-sm text-foreground-text hover:text-primary font-mono uppercase tracking-wider font-bold transition-colors group"
                >
                    <ArrowLeft
                        class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                    />
                    Back to Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Key, ArrowRight, ArrowLeft } from "lucide-vue-next";
const { login } = useAuth();
const router = useRouter();

const passwordInput = ref("");
const loading = ref(false);
const error = ref("");

async function handleLogin() {
    loading.value = true;
    error.value = "";

    try {
        const response = await $fetch("/api/auth/verify", {
            method: "POST",
            headers: {
                "X-App-Password": passwordInput.value,
            },
        });

        login(passwordInput.value);
        router.push("/gym");
    } catch (e: any) {
        error.value = "Invalid password";
    } finally {
        loading.value = false;
    }
}

const { isAuthenticated } = useAuth();
onMounted(() => {
    if (isAuthenticated.value) {
        router.push("/gym");
    }
});
</script>
