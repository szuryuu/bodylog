<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden"
    >
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none select-none"
        >
            <span class="text-[20rem] font-black font-sans text-primary"
                >LOGIN</span
            >
        </div>

        <div
            class="w-full max-w-md bg-white border-2 border-separator p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10"
        >
            <div class="text-center mb-10">
                <span
                    class="font-handwriting text-xl text-primary mb-2 block -rotate-2"
                    >Welcome Back!</span
                >
                <h1
                    class="text-4xl font-black uppercase text-foreground-primary tracking-tighter"
                >
                    ACCESS LOGS
                </h1>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div class="group">
                    <label
                        class="block font-mono text-xs uppercase tracking-widest text-foreground-text mb-2 group-focus-within:text-primary transition-colors"
                    >
                        Enter Password
                    </label>
                    <div class="relative">
                        <input
                            v-model="password"
                            type="password"
                            class="input-pow pr-12"
                            placeholder="••••••••"
                            required
                            autofocus
                        />
                        <div
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-separator"
                        >
                            <Lock class="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div
                    v-if="errorMsg"
                    class="p-3 bg-red-50 border border-red-100 text-red-500 text-sm font-bold text-center rounded"
                >
                    {{ errorMsg }}
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full h-16 bg-foreground-primary text-white rounded-xl font-bold text-lg hover:bg-primary transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span v-if="loading">Unlocking...</span>
                    <span v-else class="flex items-center gap-2">
                        Access Dashboard
                        <ArrowRight
                            class="w-5 h-5 group-hover:-rotate-45 transition-transform"
                        />
                    </span>
                </button>
            </form>

            <div class="mt-12 pt-8 border-t border-separator text-center">
                <p
                    class="font-mono text-[10px] uppercase tracking-widest text-foreground-text mb-4 opacity-60"
                >
                    Not your app?
                </p>

                <div class="flex flex-col gap-4">
                    <a
                        href="https://github.com/szuryuu/bodylog"
                        target="_blank"
                        class="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground-primary hover:text-primary transition-colors group"
                    >
                        <Github class="w-4 h-4" />
                        <span>Deploy Your Own</span>
                        <ArrowUpRight
                            class="w-3 h-3 text-separator group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                    </a>

                    <a
                        :href="mailtoLink"
                        class="flex items-center justify-center gap-2 text-xs font-mono text-foreground-text hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                        <Mail class="w-3 h-3" />
                        <span>I want this app (Help me setup)</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight, Lock, Github, ArrowUpRight, Mail } from "lucide-vue-next";

const { login } = useAuth();
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

// Template Email
const email = "ilham09dzaky@gmail.com";
const subject = encodeURIComponent("Help setting up BodyLog");
const body = encodeURIComponent(
    "Hi Ilham,\n\nI found your BodyLog website and I'm interested in using it for my own training.\n\nI'm not a developer, so I don't know how to set it up. Can you help me deploy my own instance?\n\nThanks!",
);
const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

async function handleLogin() {
    loading.value = true;
    errorMsg.value = "";

    try {
        const success = await login(password.value);
        if (success) {
            navigateTo("/");
        } else {
            errorMsg.value = "Invalid password. Access denied.";
        }
    } catch (e) {
        errorMsg.value = "Login failed. Please try again.";
    } finally {
        loading.value = false;
    }
}
</script>
