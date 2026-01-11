<script lang="ts">
    import { _ } from "svelte-i18n";
    import Tooltip from "$lib/components/Tooltip.svelte";
    import { RangeSlider } from "@skeletonlabs/skeleton";
    import {
        PERSONALITIES,
        MEDIA_HANDLINGS,
        getCompatibleMedia,
        calculateHiddenAttributes,
        getVisibleProjects,
        applyProjects,
        getRangeColor,
        type PlayerProjects,
        type CalculationResult,
    } from "$lib/logic/hidden-notes";

    let determination = $state(1);
    let selectedPersonality = $state<string | null>(null);
    let selectedMedia = $state<string | null>(null);

    // État des projets
    let projects = $state<PlayerProjects>({
        shortTermPlaytime: false,
        longTermPlaytime: false,
        trophy: false,
        captain: false,
    });

    // Médias compatibles selon la personnalité
    let compatibleMedia = $derived(getCompatibleMedia(selectedPersonality));

    // Reset media when personality changes and media is incompatible
    $effect(() => {
        if (selectedMedia && !compatibleMedia.includes(selectedMedia)) {
            selectedMedia = null;
        }
    });

    // Calcul des attributs de base
    let baseResult = $derived(
        calculateHiddenAttributes(
            selectedPersonality,
            selectedMedia,
            determination,
        ),
    );

    // Clamp determination to valid range
    $effect(() => {
        if (determination < baseResult.detMin) {
            determination = baseResult.detMin;
        }
        if (determination > baseResult.detMax) {
            determination = baseResult.detMax;
        }
    });

    // Projets visibles selon les attributs actuels
    let visibleProjects = $derived(
        getVisibleProjects(baseResult, determination),
    );

    // Attributs finaux après application des projets
    let finalData = $derived(applyProjects(baseResult, projects));
    let result = $derived(finalData.result);
    let minDetermination = $derived(finalData.minDetermination);

    // Effective determination
    let effectiveDetermination = $derived(
        Math.max(determination, minDetermination),
    );

    const attributeKeys = [
        "professionalism",
        "pressure",
        "temperament",
        "ambition",
        "loyalty",
        "sportsmanship",
        "controversy",
    ] as const;

    const attrMap: Record<
        string,
        {
            min: keyof CalculationResult;
            mid: keyof CalculationResult;
            max: keyof CalculationResult;
        }
    > = {
        professionalism: { min: "minPro", mid: "midPro", max: "maxPro" },
        pressure: { min: "minPre", mid: "midPre", max: "maxPre" },
        temperament: { min: "minTemp", mid: "midTemp", max: "maxTemp" },
        ambition: { min: "minAmb", mid: "midAmb", max: "maxAmb" },
        loyalty: { min: "minFid", mid: "midFid", max: "maxFid" },
        sportsmanship: { min: "minFp", mid: "midFp", max: "maxFp" },
        controversy: { min: "minPol", mid: "midPol", max: "maxPol" },
    };

    function getAttrValues(attr: string): {
        min: number;
        mid: number | null;
        max: number;
    } {
        const keys = attrMap[attr];
        return {
            min: result[keys.min] as number,
            mid: result[keys.mid] as number | null,
            max: result[keys.max] as number,
        };
    }

    function getTranslationKey(attr: string): string {
        return `hidden_notes.${attr}`;
    }

    function getDescriptionKey(attr: string): string {
        return `hidden_notes.${attr}_desc`;
    }

    function reset() {
        determination = 1;
        selectedPersonality = null;
        selectedMedia = null;
        projects = {
            shortTermPlaytime: false,
            longTermPlaytime: false,
            trophy: false,
            captain: false,
        };
    }

    function resetProjects() {
        projects = {
            shortTermPlaytime: false,
            longTermPlaytime: false,
            trophy: false,
            captain: false,
        };
    }

    // Helper for color classes
    function getColorClass(
        color: "success" | "warning" | "error" | "neutral",
    ): string {
        switch (color) {
            case "success":
                return "bg-success-500";
            case "warning":
                return "bg-warning-500";
            case "error":
                return "bg-error-500";
            case "neutral":
                return "bg-surface-400";
            default:
                return "bg-surface-400";
        }
    }

    function getBadgeClass(
        color: "success" | "warning" | "error" | "neutral",
    ): string {
        switch (color) {
            case "success":
                return "variant-filled-success";
            case "warning":
                return "variant-filled-warning";
            case "error":
                return "variant-filled-error";
            case "neutral":
                return "variant-filled-surface";
            default:
                return "variant-filled-surface";
        }
    }
</script>

<svelte:head>
    <title>{$_("hidden_notes.title")} - FMTools</title>
</svelte:head>

<div class="space-y-8 animate-fade-in-down">
    <header class="text-center md:text-left">
        <h1
            class="h1 font-bold bg-gradient-to-br from-primary-400 to-secondary-500 bg-clip-text text-transparent inline-block"
        >
            {$_("hidden_notes.title")}
        </h1>
        <p class="text-surface-400 mt-2 text-lg">
            Découvrez les notes cachées de vos joueurs selon leur personnalité.
        </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Input Card (Sticky on desktop) -->
        <div class="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <div class="card-glass p-6">
                <h3
                    class="h3 font-bold mb-4 text-orange-500 flex items-center gap-2"
                >
                    <span>⚙️</span> Configuration
                </h3>

                <div class="space-y-6">
                    <!-- Determination Input -->
                    <div class="space-y-2">
                        <div
                            class="flex justify-between items-center text-white/90"
                        >
                            <label class="font-bold" for="determination">
                                {$_("hidden_notes.determination")}
                            </label>
                            <span
                                class="px-2 py-1 rounded bg-orange-500/20 text-orange-400 font-mono text-base border border-orange-500/30"
                                >{determination}</span
                            >
                        </div>

                        <RangeSlider
                            name="determination"
                            bind:value={determination}
                            min={Math.max(baseResult.detMin, minDetermination)}
                            max={baseResult.detMax}
                            step={1}
                            ticked
                            accent="bg-orange-500"
                        />

                        {#if minDetermination > 1 || baseResult.detMin > 1 || baseResult.detMax < 20}
                            <div class="text-xs text-white/50 text-center">
                                Plage valide : <span
                                    class="text-orange-400 font-bold"
                                    >{Math.max(
                                        baseResult.detMin,
                                        minDetermination,
                                    )} - {baseResult.detMax}</span
                                >
                            </div>
                        {/if}
                    </div>

                    <hr class="border-white/10" />

                    <!-- Personality Select -->
                    <label class="block space-y-2">
                        <span class="font-bold text-white/90"
                            >{$_("hidden_notes.personality")}</span
                        >
                        <select
                            class="input-glass w-full"
                            bind:value={selectedPersonality}
                            onchange={resetProjects}
                        >
                            <option value={null}>{$_("common.select")}</option>
                            {#each PERSONALITIES as p}
                                <option value={p.key}
                                    >{$_(`personalities.${p.key}`)}</option
                                >
                            {/each}
                        </select>
                    </label>

                    <!-- Media Handling Select -->
                    <label class="block space-y-2">
                        <span class="font-bold text-white/90"
                            >{$_("hidden_notes.media_handling")}</span
                        >
                        <select
                            class="input-glass w-full disabled:opacity-50"
                            bind:value={selectedMedia}
                            onchange={resetProjects}
                            disabled={!selectedPersonality}
                        >
                            <option value={null}>{$_("common.select")}</option>
                            {#each MEDIA_HANDLINGS.filter( (m) => compatibleMedia.includes(m.key), ) as m}
                                <option value={m.key}
                                    >{$_(`media.${m.key}`)}</option
                                >
                            {/each}
                        </select>
                    </label>

                    <button
                        class="btn w-full mt-4 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white/80 hover:text-red-300 transition-all"
                        onclick={reset}
                    >
                        <span>↺</span>
                        <span>{$_("common.reset")}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Results Column -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Attributes Card -->
            <div class="card-glass p-6">
                <h2
                    class="h2 font-bold mb-6 flex items-center gap-3 text-orange-500"
                >
                    <span>📊</span>
                    {$_("hidden_notes.attributes")}
                </h2>

                <div class="overflow-x-auto">
                    <table class="table w-full bg-transparent">
                        <thead>
                            <tr
                                class="text-white/60 uppercase text-xs tracking-wider border-b border-white/10"
                            >
                                <th class="pb-3 text-left">Attribut</th>
                                <th class="pb-3 text-center w-16">Min</th>
                                <th
                                    class="pb-3 text-center w-full min-w-[150px]"
                                    >Plage</th
                                >
                                <th class="pb-3 text-center w-16">Max</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            {#each attributeKeys as attr}
                                {@const values = getAttrValues(attr)}
                                {@const isControversy = attr === "controversy"}
                                {@const colorState =
                                    values.mid !== null
                                        ? getRangeColor(
                                              values.mid,
                                              values.mid,
                                              isControversy,
                                          )
                                        : getRangeColor(
                                              values.min,
                                              values.max,
                                              isControversy,
                                          )}
                                {@const colorClass = getColorClass(colorState)}
                                {@const badgeClass = getBadgeClass(colorState)}

                                <tr
                                    class="group hover:bg-white/5 transition-colors"
                                >
                                    <td
                                        class="font-medium flex items-center gap-2 py-4 text-white/90"
                                    >
                                        {$_(getTranslationKey(attr))}
                                        <Tooltip
                                            text={$_(getDescriptionKey(attr))}
                                        />
                                    </td>

                                    {#if values.mid !== null}
                                        <td
                                            class="text-center font-mono font-bold"
                                            colspan="3"
                                        >
                                            <span
                                                class="badge {badgeClass} min-w-[3rem] shadow text-white"
                                                >{values.mid}</span
                                            >
                                        </td>
                                    {:else}
                                        <td
                                            class="text-center font-mono text-white/70 group-hover:text-white"
                                            >{values.min}</td
                                        >
                                        <td class="px-4 align-middle">
                                            <!-- Visual Range Bar -->
                                            <div
                                                class="h-3 w-full bg-black/40 rounded-full relative overflow-hidden shadow-inner border border-white/5"
                                            >
                                                <!-- Background track markers (guidelines) -->
                                                <div
                                                    class="absolute inset-0 grid grid-cols-20 opacity-10"
                                                >
                                                    {#each Array(20) as _}
                                                        <div
                                                            class="border-l border-white h-full"
                                                        ></div>
                                                    {/each}
                                                </div>

                                                <!-- The Fill -->
                                                <div
                                                    class="absolute h-full rounded-full {colorClass} shadow-[0_0_10px_currentColor] transition-all duration-500 ease-out"
                                                    style="left: {((values.min -
                                                        1) /
                                                        19) *
                                                        100}%; width: {Math.max(
                                                        5,
                                                        ((values.max -
                                                            values.min) /
                                                            19) *
                                                            100,
                                                    )}%"
                                                ></div>
                                            </div>
                                        </td>
                                        <td
                                            class="text-center font-mono text-white/70 group-hover:text-white"
                                            >{values.max}</td
                                        >
                                    {/if}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Projects Section -->
            {#if visibleProjects.anyVisible}
                <div
                    class="card-glass p-6 animate-fade-in border-l-4 border-emerald-500"
                >
                    <header class="mb-4">
                        <h3
                            class="h3 font-bold text-emerald-400 flex items-center gap-2"
                        >
                            🚀 {$_("hidden_notes.projects_title")}
                        </h3>
                        <p class="text-sm text-white/60">
                            {$_("hidden_notes.projects_subtitle")}
                        </p>
                    </header>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {#if visibleProjects.shortTermPlaytime}
                            <label
                                class="flex items-center space-x-3 p-4 rounded-lg border border-surface-500/30 hover:bg-surface-700/50 cursor-pointer transition-colors"
                            >
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={projects.shortTermPlaytime}
                                />
                                <span
                                    >{$_(
                                        "hidden_notes.project_short_term_playtime",
                                    )}</span
                                >
                            </label>
                        {/if}

                        {#if visibleProjects.longTermPlaytime}
                            <label
                                class="flex items-center space-x-3 p-4 rounded-lg border border-surface-500/30 hover:bg-surface-700/50 cursor-pointer transition-colors"
                            >
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={projects.longTermPlaytime}
                                />
                                <span
                                    >{$_(
                                        "hidden_notes.project_long_term_playtime",
                                    )}</span
                                >
                            </label>
                        {/if}

                        {#if visibleProjects.trophy}
                            <label
                                class="flex items-center space-x-3 p-4 rounded-lg border border-surface-500/30 hover:bg-surface-700/50 cursor-pointer transition-colors"
                            >
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={projects.trophy}
                                />
                                <span>{$_("hidden_notes.project_trophy")}</span>
                            </label>
                        {/if}

                        {#if visibleProjects.captain}
                            <label
                                class="flex items-center space-x-3 p-4 rounded-lg border border-surface-500/30 hover:bg-surface-700/50 cursor-pointer transition-colors"
                            >
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={projects.captain}
                                />
                                <span>{$_("hidden_notes.project_captain")}</span
                                >
                            </label>
                        {/if}
                    </div>
                </div>
            {:else if selectedPersonality}
                <div
                    class="card p-4 variant-ghost-surface text-center italic text-surface-400"
                >
                    {$_("hidden_notes.projects_subtitle")} (Aucun projet disponible
                    pour cette configuration)
                </div>
            {/if}

            <!-- Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <a
                    href="https://youtu.be/9bWkYexbNII"
                    target="_blank"
                    rel="noopener"
                    class="btn variant-filled-secondary"
                >
                    🎥 {$_("hidden_notes.video_guide")}
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom utility if strict strict tailwind isn't enough for the specific animation */
    /* Usually provided by plugin but adding fallback */
    @keyframes fade-in-down {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-down {
        animation: fade-in-down 0.5s ease-out;
    }
</style>
