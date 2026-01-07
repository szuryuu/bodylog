<template>
    <div class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16">
            <h1
                class="text-5xl font-bold mb-4 bg-gradient-to-r from-japan-red via-red-500 to-orange-500 bg-clip-text text-transparent"
            >
                V-SHAPE PROGRAM
            </h1>
            <p class="text-xl text-gray-400 mb-8">
                12 Weeks. Zero Tolerance. Maximum Results.
            </p>
            <div class="flex justify-center space-x-4">
                <NuxtLink to="/gym" class="button-primary">
                    Start Gym Tracking
                </NuxtLink>
                <NuxtLink
                    to="/bulk"
                    class="button-primary bg-gray-700 hover:bg-gray-600 border-gray-700"
                >
                    Track Bulk Progress
                </NuxtLink>
            </div>
        </div>

        <!-- Program Overview -->
        <div class="grid md:grid-cols-2 gap-6 mb-12">
            <div class="card-japanese">
                <h3 class="text-2xl font-bold mb-4 text-japan-red">
                    Program Structure
                </h3>
                <ul class="space-y-3 text-gray-300">
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">•</span>
                        <span
                            ><strong>5 days/week</strong> - Senin to Sabtu,
                            Kamis & Minggu rest</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">•</span>
                        <span
                            ><strong>Back 2x/week</strong> - Width (Senin) +
                            Thickness (Jumat)</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">•</span>
                        <span
                            ><strong>Lateral Delts 3x/week</strong> - 12 sets
                            total (V-taper key)</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">•</span>
                        <span
                            ><strong>Legs 1x/week</strong> - Non-negotiable, no
                            futsal substitutes</span
                        >
                    </li>
                </ul>
            </div>

            <div class="card-japanese">
                <h3 class="text-2xl font-bold mb-4 text-japan-red">
                    Progression Rules
                </h3>
                <ul class="space-y-3 text-gray-300">
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">✓</span>
                        <span
                            ><strong>Double Progression:</strong> Reps first,
                            then weight</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">✓</span>
                        <span
                            ><strong>Track Everything:</strong> Weight × reps,
                            exact numbers</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-japan-red mr-2">✓</span>
                        <span
                            ><strong>Stuck 2 weeks?</strong> Deload 10% and
                            rebuild</span
                        >
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-400 mr-2">✗</span>
                        <span
                            ><strong>No "kadang ga selesai"</strong> - adjust
                            weight properly</span
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
