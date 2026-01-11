<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        REPORT_CATEGORIES,
        TRAINING_EFFECTS,
    } from "$lib/logic/reports-data";
    import { fade, fly } from "svelte/transition";

    let activeTab = $state("adaptability");

    // Ajout de l'onglet "hidden_effects" pour les effets sur les notes cachées
    const tabKeys = [...REPORT_CATEGORIES.map((c) => c.key), "hidden_effects"];

    $effect(() => {
        if (!tabKeys.includes(activeTab)) {
            activeTab = "adaptability";
        }
    });

    function getActiveCategory() {
        return REPORT_CATEGORIES.find((c) => c.key === activeTab);
    }

    function getIndicatorColor(indicator: string): string {
        switch (indicator) {
            case "positive":
                return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "negative":
                return "text-red-400 bg-red-400/10 border-red-400/20";
            default:
                return "text-slate-400 bg-slate-400/10 border-slate-400/20";
        }
    }

    function getIndicatorIcon(indicator: string): string {
        switch (indicator) {
            case "positive":
                return "✓";
            case "negative":
                return "✗";
            default:
                return "—";
        }
    }
</script>

<svelte:head>
    <title>{$_("reports.title")} - FMTools</title>
</svelte:head>

<div class="space-y-8 pb-12" in:fade={{ duration: 300 }}>
    <!-- Header -->
    <header class="text-center md:text-left space-y-2">
        <h1
            class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        >
            {$_("reports.title")}
        </h1>
        <p class="text-lg text-white/50 max-w-2xl">
            {$_("reports.description")}
        </p>
    </header>

    <!-- Navigation Tabs (Glass Pills) -->
    <div class="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
        {#each REPORT_CATEGORIES as category}
            <button
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent
                       {activeTab === category.key
                    ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] border-orange-400 scale-105'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/10'}"
                onclick={() => (activeTab = category.key)}
            >
                {$_(`reports.${category.key}`)}
            </button>
        {/each}
        <button
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent
                   {activeTab === 'hidden_effects'
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] border-violet-500 scale-105'
                : 'bg-white/5 text-white/60 hover:bg-violet-500/20 hover:text-violet-200 hover:border-violet-500/30'}"
            onclick={() => (activeTab = "hidden_effects")}
        >
            {$_("reports.hidden_effects")}
        </button>
    </div>

    <!-- Main Content Area -->
    <div class="min-h-[400px]">
        {#if activeTab !== "hidden_effects"}
            <div
                class="card-glass overflow-hidden"
                in:fly={{ y: 20, duration: 400 }}
            >
                <!-- Desktop Header -->
                <div
                    class="hidden md:grid grid-cols-[80px_1fr_150px] gap-4 p-4 border-b border-white/10 bg-black/20 text-xs font-bold uppercase tracking-wider text-white/40"
                >
                    <div class="text-center">Statut</div>
                    <div>{$_("reports.report_text")}</div>
                    <div class="text-center">{$_("reports.note")}</div>
                </div>

                <!-- List Content -->
                <div class="divide-y divide-white/5">
                    {#each getActiveCategory()?.entries || [] as entry}
                        <div
                            class="group grid md:grid-cols-[80px_1fr_150px] gap-4 p-4 items-center hover:bg-white/5 transition-colors"
                        >
                            <!-- Mobile Label & Indicator -->
                            <div
                                class="flex md:block items-center justify-between md:justify-center"
                            >
                                <span
                                    class="md:hidden text-xs font-bold uppercase text-white/40"
                                    >Statut</span
                                >
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center border font-bold text-sm shadow-sm {getIndicatorColor(
                                        entry.indicator,
                                    )}"
                                >
                                    {getIndicatorIcon(entry.indicator)}
                                </div>
                            </div>

                            <!-- Report Text -->
                            <div
                                class="text-white/80 leading-relaxed py-2 md:py-0"
                            >
                                {$_(`reports.${activeTab}_${entry.textKey}`, {
                                    default: entry.textKey,
                                })}
                            </div>

                            <!-- Range Badge -->
                            <div
                                class="flex md:block items-center justify-between md:justify-center"
                            >
                                <span
                                    class="md:hidden text-xs font-bold uppercase text-white/40"
                                    >Estimation</span
                                >
                                <div
                                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold bg-black/30 border border-white/10 text-white shadow-inner"
                                >
                                    <span>{entry.range[0]}</span>
                                    <span class="text-white/20">-</span>
                                    <span>{entry.range[1]}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <!-- Hidden Effects Section -->
            <div class="space-y-6" in:fly={{ y: 20, duration: 400 }}>
                <div
                    class="card-glass p-6 border-l-4 border-violet-500 bg-gradient-to-r from-violet-500/10 to-transparent"
                >
                    <p class="text-violet-100 font-light leading-relaxed">
                        {$_("reports.hidden_effects_intro")}
                    </p>
                </div>

                <div class="grid gap-6">
                    <!-- Positive Effects -->
                    <div class="card-glass overflow-hidden">
                        <div
                            class="p-4 bg-emerald-500/10 border-b border-white/5 flex items-center gap-2"
                        >
                            <span class="text-emerald-400">✅</span>
                            <h3
                                class="font-bold text-emerald-100 uppercase tracking-wider text-sm"
                            >
                                {$_("reports.positive_effects")}
                            </h3>
                        </div>
                        <div class="divide-y divide-white/5">
                            {#each TRAINING_EFFECTS.positive as effect}
                                <div
                                    class="p-4 grid md:grid-cols-[1fr_auto_auto] gap-4 items-center"
                                >
                                    <div class="text-white/90">
                                        {$_(`reports.${effect.messageKey}`)}
                                    </div>
                                    <div
                                        class="flex flex-wrap gap-2 justify-end"
                                    >
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-white/10 bg-white/5 text-white/60"
                                        >
                                            {$_(`reports.${effect.causeKey}`)}
                                        </span>
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-bold"
                                        >
                                            {$_(
                                                `reports.${effect.consequenceKey}`,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Negative Effects -->
                    <div class="card-glass overflow-hidden">
                        <div
                            class="p-4 bg-red-500/10 border-b border-white/5 flex items-center gap-2"
                        >
                            <span class="text-red-400">⚠️</span>
                            <h3
                                class="font-bold text-red-100 uppercase tracking-wider text-sm"
                            >
                                {$_("reports.negative_effects")}
                            </h3>
                        </div>
                        <div class="divide-y divide-white/5">
                            {#each TRAINING_EFFECTS.negative as effect}
                                <div
                                    class="p-4 grid md:grid-cols-[1fr_auto_auto] gap-4 items-center"
                                >
                                    <div class="text-white/90">
                                        {$_(`reports.${effect.messageKey}`)}
                                    </div>
                                    <div
                                        class="flex flex-wrap gap-2 justify-end"
                                    >
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-white/10 bg-white/5 text-white/60"
                                        >
                                            {$_(`reports.${effect.causeKey}`)}
                                        </span>
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-red-500/30 bg-red-500/10 text-red-300 font-bold"
                                        >
                                            {$_(
                                                `reports.${effect.consequenceKey}`,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Neutral Effects -->
                    <div class="card-glass overflow-hidden">
                        <div
                            class="p-4 bg-slate-500/10 border-b border-white/5 flex items-center gap-2"
                        >
                            <span class="text-slate-400">ℹ️</span>
                            <h3
                                class="font-bold text-slate-100 uppercase tracking-wider text-sm"
                            >
                                {$_("reports.neutral_effects")}
                            </h3>
                        </div>
                        <div class="divide-y divide-white/5">
                            {#each TRAINING_EFFECTS.neutral as effect}
                                <div
                                    class="p-4 grid md:grid-cols-[1fr_auto_auto] gap-4 items-center"
                                >
                                    <div class="text-white/90">
                                        {$_(`reports.${effect.messageKey}`)}
                                    </div>
                                    <div
                                        class="flex flex-wrap gap-2 justify-end"
                                    >
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-white/10 bg-white/5 text-white/60"
                                        >
                                            {$_(`reports.${effect.causeKey}`)}
                                        </span>
                                        <span
                                            class="px-2 py-1 rounded text-xs border border-slate-500/30 bg-slate-500/10 text-slate-300 font-bold"
                                        >
                                            {$_(
                                                `reports.${effect.consequenceKey}`,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Custom animations if needed, but Tailwind utilities + svelte/transition cover most */
</style>
