<template>
    <div class="min-h-screen flex flex-col font-sans text-foreground-primary">
        <header
            class="fixed inset-x-0 top-0 z-50 border-b border-separator bg-background/95 backdrop-blur-sm"
        >
            <nav class="inner flex justify-between items-center h-20">
                <NuxtLink
                    to="/"
                    class="font-black text-2xl tracking-tighter hover:text-primary transition-colors"
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
                                @click="handleLogout"
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
                        class="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                    >
                        <Menu v-if="!isMenuOpen" class="w-8 h-8" />
                        <X v-else class="w-8 h-8" />
                    </button>
                </div>
            </nav>

            <transition name="menu">
                <div
                    v-if="isMenuOpen"
                    class="md:hidden absolute top-20 left-0 w-full bg-background border-b border-separator h-[calc(100vh-5rem)] overflow-y-auto"
                >
                    <div class="inner py-8 flex flex-col gap-6">
                        <NuxtLink
                            to="/"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors"
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
                            class="text-4xl font-black uppercase hover:text-primary transition-colors"
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
                            class="text-4xl font-black uppercase hover:text-primary transition-colors"
                        >
                            <span
                                class="text-primary text-sm font-mono mb-1 block"
                                >02</span
                            >
                            WEIGH IN
                        </NuxtLink>

                        <div class="h-px bg-separator my-4"></div>

                        <div v-if="isAuthenticated">
                            <button
                                @click="handleLogout"
                                class="text-4xl font-black uppercase text-red-500 hover:text-red-600 transition-colors"
                            >
                                LOGOUT
                            </button>
                        </div>
                        <NuxtLink
                            v-else
                            to="/login"
                            @click="isMenuOpen = false"
                            class="text-4xl font-black uppercase hover:text-primary transition-colors"
                        >
                            LOGIN
                        </NuxtLink>
                    </div>
                </div>
            </transition>
        </header>

        <main class="flex-1 pt-20">
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
    </div>
</template>

<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
const { isAuthenticated, logout } = useAuth();
const isMenuOpen = ref(false);

function handleLogout() {
    if (confirm("Are you sure you want to logout?")) {
        logout();
        isMenuOpen.value = false;
        navigateTo("/");
    }
}
</script>

<style scoped>
/* Menu Transition */
.menu-enter-active,
.menu-leave-active {
    transition: all 0.3s ease-in-out;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
