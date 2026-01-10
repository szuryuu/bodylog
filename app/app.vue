<template>
    <div
        class="min-h-screen flex flex-col font-sans text-foreground-primary overflow-x-hidden"
    >
        <header
            class="fixed inset-x-0 top-0 z-50 border-b border-separator bg-background/95 backdrop-blur-sm"
        >
            <nav
                class="inner flex justify-between items-center h-20 px-4 md:px-0"
            >
                <NuxtLink
                    to="/"
                    class="font-black text-2xl tracking-tighter hover:text-primary transition-colors shrink-0"
                >
                    BODYLOG
                </NuxtLink>

                <div class="hidden md:flex items-center gap-8">
                    <NuxtLink
                        to="/"
                        class="flex items-center gap-1 text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors"
                    >
                        <span class="font-mono text-primary text-[10px] -mt-3"
                            >00</span
                        >
                        Home
                    </NuxtLink>
                    <NuxtLink
                        to="/gym"
                        class="flex items-center gap-1 text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors"
                    >
                        <span class="font-mono text-primary text-[10px] -mt-3"
                            >01</span
                        >
                        Gym Log
                    </NuxtLink>
                    <NuxtLink
                        to="/bulk"
                        class="flex items-center gap-1 text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors"
                    >
                        <span class="font-mono text-primary text-[10px] -mt-3"
                            >02</span
                        >
                        Weigh In
                    </NuxtLink>
                    <NuxtLink
                        to="/coach"
                        class="flex items-center gap-1 text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors text-primary"
                    >
                        <span class="font-mono text-primary text-[10px] -mt-3"
                            >03</span
                        >
                        AI Coach
                    </NuxtLink>
                </div>

                <div class="flex items-center gap-4">
                    <div class="hidden md:block">
                        <div
                            v-if="isAuthenticated"
                            class="flex items-center gap-3"
                        >
                            <span
                                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                            ></span>
                            <button
                                @click="handleLogoutClick"
                                class="text-xs font-mono hover:text-red-500 uppercase tracking-wider"
                            >
                                Logout
                            </button>
                        </div>
                        <NuxtLink
                            v-else
                            to="/login"
                            class="px-4 py-2 border border-black rounded font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors"
                        >
                            Login
                        </NuxtLink>
                    </div>

                    <button
                        @click="isMenuOpen = !isMenuOpen"
                        class="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors focus:outline-none"
                    >
                        <Menu v-if="!isMenuOpen" class="w-8 h-8" />
                        <X v-else class="w-8 h-8" />
                    </button>
                </div>
            </nav>

            <transition name="menu">
                <div
                    v-if="isMenuOpen"
                    class="md:hidden absolute top-20 left-0 w-full bg-background border-b border-separator h-[calc(100vh-5rem)] overflow-y-auto z-40"
                >
                    <div class="inner py-8 flex flex-col gap-6 px-4">
                        <NuxtLink
                            to="/"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors block"
                        >
                            <span
                                class="text-primary text-sm font-mono mb-1 block"
                                >00</span
                            >
                            HOME
                        </NuxtLink>
                        <NuxtLink
                            to="/gym"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors block"
                        >
                            <span
                                class="text-primary text-sm font-mono mb-1 block"
                                >01</span
                            >
                            GYM LOG
                        </NuxtLink>
                        <NuxtLink
                            to="/bulk"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors block"
                        >
                            <span
                                class="text-primary text-sm font-mono mb-1 block"
                                >02</span
                            >
                            WEIGH IN
                        </NuxtLink>
                        <NuxtLink
                            to="/coach"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors block text-primary"
                        >
                            <span
                                class="text-primary text-sm font-mono mb-1 block"
                                >03</span
                            >
                            AI COACH
                        </NuxtLink>

                        <div class="h-px bg-separator my-4"></div>

                        <div v-if="isAuthenticated">
                            <button
                                @click="handleLogoutClick"
                                class="text-4xl font-black uppercase text-red-500 hover:text-red-600 transition-colors w-full text-left"
                            >
                                LOGOUT
                            </button>
                        </div>
                        <NuxtLink
                            v-else
                            to="/login"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors block"
                        >
                            LOGIN
                        </NuxtLink>
                    </div>
                </div>
            </transition>
        </header>

        <main class="flex-1 pt-20 w-full max-w-[100vw] overflow-x-hidden">
            <NuxtPage />
        </main>

        <footer
            class="py-12 text-center text-foreground-text border-t border-separator bg-background"
        >
            <div class="inner flex flex-col items-center gap-4">
                <p class="font-handwriting text-2xl">
                    Consistency beats intensity.
                </p>
                <p
                    class="text-xs font-mono opacity-60 uppercase tracking-widest"
                >
                    © 2026 BodyLog
                </p>
            </div>
        </footer>

        <transition name="fade">
            <div
                v-if="showLogoutModal"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
                <div
                    class="w-full max-w-sm bg-white border-2 border-foreground-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative animate-bounce-in"
                >
                    <div
                        class="mx-auto w-16 h-16 bg-red-50 border-2 border-red-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <LogOut class="w-8 h-8 text-red-500" />
                    </div>
                    <h3 class="text-3xl font-black uppercase mb-2">
                        Logging Out?
                    </h3>
                    <p
                        class="font-mono text-sm mb-8 text-foreground-text leading-relaxed"
                    >
                        Your session will be ended. Make sure you've saved your
                        gains.
                    </p>
                    <div class="flex flex-col gap-3">
                        <button
                            @click="confirmLogout"
                            class="w-full py-4 bg-foreground-primary text-white border-2 border-foreground-primary font-bold text-lg uppercase hover:bg-red-600 hover:border-red-600 transition-all active:scale-[0.98] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                        >
                            Yes, I'm Done
                        </button>
                        <button
                            @click="showLogoutModal = false"
                            class="w-full py-4 bg-transparent border-2 border-separator text-foreground-text font-bold text-lg uppercase hover:border-foreground-primary hover:text-foreground-primary transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { Menu, X, LogOut } from "lucide-vue-next";
const { isAuthenticated, logout } = useAuth();

const isMenuOpen = ref(false);
const showLogoutModal = ref(false);

function handleLogoutClick() {
    isMenuOpen.value = false;
    showLogoutModal.value = true;
}

function confirmLogout() {
    logout();
    showLogoutModal.value = false;
    navigateTo("/");
}
</script>

<style scoped>
/* Transition */
.menu-enter-active,
.menu-leave-active {
    transition: all 0.3s ease-in-out;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

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
