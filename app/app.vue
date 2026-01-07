<template>
    <div class="min-h-screen">
        <nav
            class="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-50"
        >
            <div class="container mx-auto px-6">
                <div class="flex items-center justify-between h-16">
                    <NuxtLink to="/" class="flex items-center space-x-3">
                        <div
                            class="w-8 h-8 border-2 border-white flex items-center justify-center"
                        >
                            <span class="text-white font-bold text-sm">V</span>
                        </div>
                        <span
                            class="text-sm font-bold text-white uppercase tracking-widest"
                        >
                            V-SHAPE
                        </span>
                    </NuxtLink>

                    <div class="flex space-x-8">
                        <NuxtLink
                            to="/gym"
                            class="text-zinc-400 hover:text-white transition-colors duration-150 font-medium uppercase text-xs tracking-wider"
                        >
                            GYM
                        </NuxtLink>
                        <NuxtLink
                            to="/bulk"
                            class="text-zinc-400 hover:text-white transition-colors duration-150 font-medium uppercase text-xs tracking-wider"
                        >
                            BULK
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </nav>

        <main class="container mx-auto px-6 py-12">
            <NuxtPage />
        </main>

        <footer class="border-t border-zinc-800 mt-20 py-8">
            <div
                class="container mx-auto px-6 text-center text-zinc-600 text-xs uppercase tracking-wider"
            >
                <p>DISCIPLINE. NO EXCUSES.</p>
            </div>
        </footer>
    </div>
</template>
