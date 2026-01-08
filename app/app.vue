<template>
    <div class="min-h-screen flex flex-col">
        <header
            class="fixed inset-x-0 top-0 z-50 border-b border-separator bg-background/90 backdrop-blur-md"
        >
            <nav class="inner flex justify-center py-6">
                <div class="flex items-center gap-2 md:gap-6">
                    <NuxtLink
                        to="/"
                        class="group flex items-center gap-1 rounded-lg px-3 py-1 font-medium text-foreground-text transition-all hover:text-primary"
                    >
                        <span
                            class="mb-0.5 text-xs text-foreground-text opacity-50 font-mono"
                            >00</span
                        >
                        <span
                            class="group-hover:-translate-y-0.5 transition-transform"
                            >Home</span
                        >
                    </NuxtLink>

                    <NuxtLink
                        to="/gym"
                        class="group flex items-center gap-1 rounded-lg px-3 py-1 font-medium text-foreground-text transition-all hover:text-primary"
                    >
                        <span
                            class="mb-0.5 text-xs text-foreground-text opacity-50 font-mono"
                            >01</span
                        >
                        <span
                            class="group-hover:-translate-y-0.5 transition-transform"
                            >Gym Log</span
                        >
                    </NuxtLink>

                    <NuxtLink
                        to="/bulk"
                        class="group flex items-center gap-1 rounded-lg px-3 py-1 font-medium text-foreground-text transition-all hover:text-primary"
                    >
                        <span
                            class="mb-0.5 text-xs text-foreground-text opacity-50 font-mono"
                            >02</span
                        >
                        <span
                            class="group-hover:-translate-y-0.5 transition-transform"
                            >Weigh In</span
                        >
                    </NuxtLink>
                </div>
            </nav>
        </header>

        <main class="flex-1 pt-32 pb-20">
            <NuxtPage />
        </main>

        <footer
            class="py-12 text-center text-foreground-text border-t border-separator bg-background"
        >
            <div class="inner flex flex-col items-center gap-4">
                <p class="font-handwriting text-2xl">
                    Consistency beats intensity.
                </p>
                <div class="h-px w-12 bg-separator"></div>
                <p
                    class="text-xs font-mono opacity-60 uppercase tracking-widest"
                >
                    © 2026 BodyLog
                </p>
            </div>
        </footer>
    </div>
</template>

<style>
/* Transition */
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
