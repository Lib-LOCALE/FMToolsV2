<script lang="ts">
    import { _ } from "svelte-i18n";
    import Tooltip from "$lib/components/Tooltip.svelte";
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
</script>

<svelte:head>
    <title>{$_("hidden_notes.title")} - FMTools</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <h1 class="page-title">{$_("hidden_notes.title")}</h1>
    </header>

    <div class="content-grid">
        <!-- Formulaire de saisie -->
        <div class="card input-card">
            <div class="form-group">
                <label class="form-label" for="determination">
                    {$_("hidden_notes.determination")}
                </label>
                <input
                    type="number"
                    id="determination"
                    class="form-input"
                    min={Math.max(baseResult.detMin, minDetermination)}
                    max={baseResult.detMax}
                    bind:value={determination}
                />
                {#if minDetermination > 1 || baseResult.detMin > 1 || baseResult.detMax < 20}
                    <span class="det-hint">
                        ({Math.max(baseResult.detMin, minDetermination)} - {baseResult.detMax})
                    </span>
                {/if}
            </div>

            <div class="form-group">
                <label class="form-label" for="personality">
                    {$_("hidden_notes.personality")}
                </label>
                <select
                    id="personality"
                    class="form-select"
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
            </div>

            <div class="form-group">
                <label class="form-label" for="media">
                    {$_("hidden_notes.media_handling")}
                </label>
                <select
                    id="media"
                    class="form-select"
                    bind:value={selectedMedia}
                    onchange={resetProjects}
                >
                    <option value={null}>{$_("common.select")}</option>
                    {#each MEDIA_HANDLINGS.filter( (m) => compatibleMedia.includes(m.key), ) as m}
                        <option value={m.key}>{$_(`media.${m.key}`)}</option>
                    {/each}
                </select>
            </div>

            <button class="btn btn-secondary" onclick={reset}>
                {$_("common.reset")}
            </button>
        </div>

        <!-- Résultats -->
        <div class="card results-card">
            <h2 class="card-title">{$_("hidden_notes.attributes")}</h2>

            <table class="table attributes-table">
                <thead>
                    <tr>
                        <th>Attribut</th>
                        <th class="text-center">Min</th>
                        <th></th>
                        <th class="text-center">Max</th>
                    </tr>
                </thead>
                <tbody>
                    {#each attributeKeys as attr}
                        {@const values = getAttrValues(attr)}
                        {@const isControversy = attr === "controversy"}
                        {@const color =
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
                        <tr>
                            <td class="attr-name">
                                {$_(getTranslationKey(attr))}
                                <Tooltip text={$_(getDescriptionKey(attr))} />
                            </td>
                            {#if values.mid !== null}
                                <td class="text-center" colspan="3">
                                    <span class="badge badge-{color}"
                                        >{values.mid}</span
                                    >
                                </td>
                            {:else}
                                <td class="text-center">
                                    <span class="badge badge-{color}"
                                        >{values.min}</span
                                    >
                                </td>
                                <td class="range-bar-cell">
                                    <div class="range-bar">
                                        <div
                                            class="range-fill range-{color}"
                                            style="left: {((values.min - 1) /
                                                19) *
                                                100}%; width: {((values.max -
                                                values.min) /
                                                19) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span class="badge badge-{color}"
                                        >{values.max}</span
                                    >
                                </td>
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>

            <!-- Section Projets -->
            {#if visibleProjects.anyVisible}
                <div class="projects-section">
                    <h3 class="projects-title">
                        {$_("hidden_notes.projects_title")}
                        <Tooltip text={$_("hidden_notes.projects_subtitle")} />
                    </h3>
                    <p class="projects-subtitle">
                        {$_("hidden_notes.projects_subtitle")}
                    </p>

                    <div class="projects-list">
                        {#if visibleProjects.shortTermPlaytime}
                            <label class="project-item">
                                <input
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
                            <label class="project-item">
                                <input
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
                            <label class="project-item">
                                <input
                                    type="checkbox"
                                    bind:checked={projects.trophy}
                                />
                                <span>{$_("hidden_notes.project_trophy")}</span>
                            </label>
                        {/if}

                        {#if visibleProjects.captain}
                            <label class="project-item">
                                <input
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
                <p class="no-projects-info">
                    <i>{$_("hidden_notes.projects_subtitle")}</i>
                </p>
            {/if}
        </div>
    </div>

    <!-- Liens utiles -->
    <div class="links-section">
        <h3>{$_("hidden_notes.learn_more")}</h3>
        <div class="links-grid">
            <a
                href="https://youtu.be/9bWkYexbNII"
                target="_blank"
                rel="noopener"
                class="link-card"
            >
                🎥 {$_("hidden_notes.video_guide")}
            </a>
        </div>
    </div>
</div>

<style>
    .page-container {
        animation: fadeIn 0.4s ease;
    }

    .page-header {
        margin-bottom: 2rem;
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 2rem;
        align-items: start;
    }

    .input-card {
        position: sticky;
        top: 100px;
    }

    .det-hint {
        font-size: 0.75rem;
        color: var(--color-accent-primary);
        margin-left: 0.5rem;
    }

    .results-card .card-title {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
    }

    .attributes-table {
        width: 100%;
    }

    .attr-name {
        font-weight: 500;
        color: var(--color-text-secondary);
        display: flex;
        align-items: center;
    }

    .range-bar-cell {
        width: 200px;
        padding: 0.5rem 1rem;
    }

    .range-bar {
        height: 8px;
        background: var(--color-bg-secondary);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
    }

    .range-fill {
        position: absolute;
        top: 0;
        height: 100%;
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .range-success {
        background: var(--color-success);
    }
    .range-warning {
        background: var(--color-warning);
    }
    .range-error {
        background: var(--color-error);
    }
    .range-neutral {
        background: var(--color-accent-secondary);
    }

    /* Projects Section */
    .projects-section {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--color-border);
    }

    .projects-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-accent-primary);
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    }

    .projects-subtitle {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        font-style: italic;
        margin-bottom: 1rem;
    }

    .projects-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .project-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .project-item:hover {
        border-color: var(--color-accent-primary);
        background: rgba(20, 184, 166, 0.05);
    }

    .project-item input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--color-accent-primary);
        cursor: pointer;
    }

    .project-item span {
        color: var(--color-text-secondary);
        font-size: 0.95rem;
    }

    .no-projects-info {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);
        text-align: center;
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }

    .links-section {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-border);
    }

    .links-section h3 {
        font-size: 1rem;
        color: var(--color-text-secondary);
        margin-bottom: 1rem;
    }

    .links-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .link-card {
        padding: 0.75rem 1.25rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-primary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .link-card:hover {
        border-color: var(--color-accent-primary);
        transform: translateY(-2px);
    }

    @media (max-width: 900px) {
        .content-grid {
            grid-template-columns: 1fr;
        }

        .input-card {
            position: static;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
