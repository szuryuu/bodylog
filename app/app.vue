<template>
    <div class="min-h-screen">
        <nav
            class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50"
        >
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <NuxtLink to="/" class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-gradient-to-br from-japan-red to-red-700 rounded-lg flex items-center justify-center"
                        >
                            <span class="text-white font-bold text-xl">V</span>
                        </div>
                        <span
                            class="text-xl font-bold bg-gradient-to-r from-japan-red to-red-400 bg-clip-text text-transparent"
                        >
                            V-SHAPE TRACKER
                        </span>
                    </NuxtLink>

                    <div class="flex space-x-6">
                        <NuxtLink
                            to="/gym"
                            class="text-gray-300 hover:text-japan-red transition-colors duration-200 font-medium"
                        >
                            Gym Progress
                        </NuxtLink>
                        <NuxtLink
                            to="/bulk"
                            class="text-gray-300 hover:text-japan-red transition-colors duration-200 font-medium"
                        >
                            Bulk Tracking
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </nav>

        <main class="container mx-auto px-4 py-8">
            <NuxtPage />
        </main>

        <footer class="border-t border-gray-800 mt-16 py-8">
            <div class="container mx-auto px-4 text-center text-gray-500">
                <p>Built with discipline. No excuses.</p>
            </div>
        </footer>
    </div>
</template>
