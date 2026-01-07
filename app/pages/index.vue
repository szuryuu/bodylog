<template>
    <div class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <div class="mb-20">
            <div class="grid-accent border border-zinc-800 p-12 mb-8">
                <h1
                    class="text-6xl font-bold mb-4 text-white uppercase tracking-tight"
                >
                    V-SHAPE<br />PROGRAM
                </h1>
                <p class="text-lg text-zinc-400 mb-8 font-mono">
                    12 WEEKS / ZERO TOLERANCE / MAXIMUM RESULTS
                </p>
            </div>

            <div class="flex gap-4">
                <NuxtLink to="/gym" class="button-clean flex-1 text-center">
                    START TRACKING
                </NuxtLink>
                <NuxtLink
                    to="/bulk"
                    class="button-secondary flex-1 text-center"
                >
                    BULK LOG
                </NuxtLink>
            </div>
        </div>

        <!-- Program Overview -->
        <div class="grid md:grid-cols-2 gap-6 mb-12">
            <div class="card-clean">
                <h3
                    class="text-xl font-bold mb-6 text-white uppercase tracking-wider"
                >
                    STRUCTURE
                </h3>
                <div class="space-y-4 text-zinc-300 font-mono text-sm">
                    <div class="border-l-2 border-zinc-700 pl-4">
                        <div class="text-white font-bold">5 DAYS / WEEK</div>
                        <div class="text-zinc-500">Mon–Sat, Rest Thu & Sun</div>
                    </div>
                    <div class="border-l-2 border-zinc-700 pl-4">
                        <div class="text-white font-bold">BACK 2X</div>
                        <div class="text-zinc-500">
                            Width (Mon) + Thickness (Fri)
                        </div>
                    </div>
                    <div class="border-l-2 border-zinc-700 pl-4">
                        <div class="text-white font-bold">LATERAL DELTS 3X</div>
                        <div class="text-zinc-500">
                            12 sets total (V-taper key)
                        </div>
                    </div>
                    <div class="border-l-2 border-zinc-700 pl-4">
                        <div class="text-white font-bold">LEGS 1X</div>
                        <div class="text-zinc-500">Non-negotiable</div>
                    </div>
                </div>
            </div>

            <div class="card-clean">
                <h3
                    class="text-xl font-bold mb-6 text-white uppercase tracking-wider"
                >
                    RULES
                </h3>
                <div class="space-y-4 text-zinc-300 font-mono text-sm">
                    <div class="border-l-2 border-white pl-4">
                        <div class="text-white font-bold">
                            DOUBLE PROGRESSION
                        </div>
                        <div class="text-zinc-500">Reps first, then weight</div>
                    </div>
                    <div class="border-l-2 border-white pl-4">
                        <div class="text-white font-bold">TRACK EVERYTHING</div>
                        <div class="text-zinc-500">
                            Weight × reps, exact numbers
                        </div>
                    </div>
                    <div class="border-l-2 border-white pl-4">
                        <div class="text-white font-bold">STUCK 2 WEEKS?</div>
                        <div class="text-zinc-500">Deload 10% and rebuild</div>
                    </div>
                    <div class="border-l-2 border-zinc-700 pl-4">
                        <div class="text-zinc-500 font-bold">
                            NO "KADANG GA SELESAI"
                        </div>
                        <div class="text-zinc-600">Adjust weight properly</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Weekly Schedule -->
        <div class="card-clean">
            <h3
                class="text-xl font-bold mb-6 text-white uppercase tracking-wider"
            >
                SCHEDULE
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div
                    class="border border-zinc-800 p-4 hover:border-white transition-colors"
                >
                    <div class="text-white font-bold text-sm mb-1">SENIN</div>
                    <div class="text-zinc-500 text-xs font-mono">
                        Back Width
                    </div>
                </div>
                <div
                    class="border border-zinc-800 p-4 hover:border-white transition-colors"
                >
                    <div class="text-white font-bold text-sm mb-1">SELASA</div>
                    <div class="text-zinc-500 text-xs font-mono">Push</div>
                </div>
                <div
                    class="border border-zinc-800 p-4 hover:border-white transition-colors"
                >
                    <div class="text-white font-bold text-sm mb-1">RABU</div>
                    <div class="text-zinc-500 text-xs font-mono">Legs</div>
                </div>
                <div class="border border-zinc-700 p-4 opacity-50">
                    <div class="text-zinc-600 font-bold text-sm mb-1">
                        KAMIS
                    </div>
                    <div class="text-zinc-700 text-xs font-mono">Rest</div>
                </div>
                <div
                    class="border border-zinc-800 p-4 hover:border-white transition-colors"
                >
                    <div class="text-white font-bold text-sm mb-1">JUMAT</div>
                    <div class="text-zinc-500 text-xs font-mono">
                        Back Thickness
                    </div>
                </div>
                <div
                    class="border border-zinc-800 p-4 hover:border-white transition-colors"
                >
                    <div class="text-white font-bold text-sm mb-1">SABTU</div>
                    <div class="text-zinc-500 text-xs font-mono">
                        Shoulders + Arms
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
