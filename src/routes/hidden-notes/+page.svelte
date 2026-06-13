<script lang="ts">
    import { _ } from "svelte-i18n";
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

    let determination = $state(10);
    let selectedPersonality = $state<string | null>(null);
    let selectedMedia = $state<string | null>(null);

    let projects = $state<PlayerProjects>({
        shortTermPlaytime: false,
        longTermPlaytime: false,
        trophy: false,
        captain: false,
    });

    let compatibleMedia = $derived(getCompatibleMedia(selectedPersonality));

    $effect(() => {
        if (selectedMedia && !compatibleMedia.includes(selectedMedia)) {
            selectedMedia = null;
        }
    });

    let baseResult = $derived(
        calculateHiddenAttributes(selectedPersonality, selectedMedia, determination),
    );

    let finalData = $derived(applyProjects(baseResult, projects));
    let result = $derived(finalData.result);
    let minDetermination = $derived(finalData.minDetermination);

    let detMin = $derived(Math.max(baseResult.detMin, minDetermination));
    let detMax = $derived(baseResult.detMax);

    $effect(() => {
        if (determination < detMin) determination = detMin;
        if (determination > detMax) determination = detMax;
    });

    let visibleProjects = $derived(getVisibleProjects(baseResult, determination));

    const attrMap: Record<
        string,
        { min: keyof CalculationResult; mid: keyof CalculationResult; max: keyof CalculationResult }
    > = {
        professionalism: { min: "minPro", mid: "midPro", max: "maxPro" },
        pressure: { min: "minPre", mid: "midPre", max: "maxPre" },
        temperament: { min: "minTemp", mid: "midTemp", max: "maxTemp" },
        ambition: { min: "minAmb", mid: "midAmb", max: "maxAmb" },
        loyalty: { min: "minFid", mid: "midFid", max: "maxFid" },
        sportsmanship: { min: "minFp", mid: "midFp", max: "maxFp" },
        controversy: { min: "minPol", mid: "midPol", max: "maxPol" },
    };
    const attributeKeys = Object.keys(attrMap);

    function colorVar(state: "success" | "warning" | "error" | "neutral"): string {
        if (state === "success") return "var(--pos)";
        if (state === "error") return "var(--neg)";
        return "var(--neu)";
    }
    function glowVar(state: "success" | "warning" | "error" | "neutral"): string {
        if (state === "success") return "rgba(116,224,107,0.5)";
        if (state === "error") return "rgba(239,98,86,0.5)";
        return "rgba(124,138,131,0.35)";
    }

    let attrRows = $derived(
        attributeKeys.map((key) => {
            const k = attrMap[key];
            const min = result[k.min] as number;
            const max = result[k.max] as number;
            const mid = result[k.mid] as number | null;
            const isControv = key === "controversy";
            const hasMid = mid !== null && mid !== undefined;
            const state = hasMid
                ? getRangeColor(mid as number, mid as number, isControv)
                : getRangeColor(min, max, isControv);
            return {
                key,
                min,
                max,
                mid,
                hasMid,
                barLeft: (((min - 1) / 19) * 100).toFixed(1),
                barWidth: Math.max(4, ((max - min) / 19) * 100).toFixed(1),
                midLeft: hasMid ? ((((mid as number) - 1) / 19) * 100).toFixed(1) : "0",
                color: colorVar(state),
                glow: glowVar(state),
            };
        }),
    );

    let personalityOptions = $derived(
        PERSONALITIES.map((p) => ({ key: p.key, label: $_(`personalities.${p.key}`) })).sort(
            (a, b) => a.label.localeCompare(b.label),
        ),
    );
    let mediaOptions = $derived(
        MEDIA_HANDLINGS.filter((m) => compatibleMedia.includes(m.key)).map((m) => ({
            key: m.key,
            label: $_(`media.${m.key}`),
        })),
    );

    const projectDefs = [
        { key: "shortTermPlaytime", labelKey: "hidden_notes.project_short_term_playtime" },
        { key: "longTermPlaytime", labelKey: "hidden_notes.project_long_term_playtime" },
        { key: "trophy", labelKey: "hidden_notes.project_trophy" },
        { key: "captain", labelKey: "hidden_notes.project_captain" },
    ] as const;

    function resetProjects() {
        projects = { shortTermPlaytime: false, longTermPlaytime: false, trophy: false, captain: false };
    }
    function reset() {
        determination = 10;
        selectedPersonality = null;
        selectedMedia = null;
        resetProjects();
    }
</script>

<svelte:head>
    <title>{$_("hidden_notes.title")} — FM·TOOLS</title>
</svelte:head>

<div style="animation: fmFade .4s ease;">
    <header class="page-head">
        <div class="fm-eyebrow">MODULE 01</div>
        <h1 class="fm-h1">{$_("hidden_notes.title")}</h1>
        <p class="page-sub">{$_("hidden_notes.description")}</p>
    </header>

    <div class="layout">
        <!-- config -->
        <div class="fm-panel config">
            <div class="fm-panel-head">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--lime)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 2.6 14H2.5a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4 7.3l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V2.5a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 17 4a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1h.1a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.4 1z" /></svg>
                <span class="fm-panel-title" style="font-size:17px;"
                    >{$_("home.config", { default: "Configuration" })}</span
                >
            </div>
            <div class="config-body">
                <!-- determination -->
                <div>
                    <div class="field-head">
                        <label for="det">{$_("hidden_notes.determination")}</label>
                        <span class="det-value fm-mono">{determination}</span>
                    </div>
                    <input
                        id="det"
                        type="range"
                        min={detMin}
                        max={detMax}
                        step="1"
                        bind:value={determination}
                        class="range"
                    />
                    <div class="range-legend fm-mono">
                        <span>min {detMin}</span>
                        <span>{$_("home.valid_range", { default: "Plage valide" })}</span>
                        <span>max {detMax}</span>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- personality -->
                <div>
                    <label class="field-label" for="pers">{$_("hidden_notes.personality")}</label>
                    <select
                        id="pers"
                        class="fm-select"
                        bind:value={selectedPersonality}
                        onchange={resetProjects}
                    >
                        <option value={null}>{$_("common.select")}…</option>
                        {#each personalityOptions as opt}
                            <option value={opt.key}>{opt.label}</option>
                        {/each}
                    </select>
                </div>

                <!-- media -->
                <div>
                    <label class="field-label" for="media">{$_("hidden_notes.media_handling")}</label>
                    <select
                        id="media"
                        class="fm-select"
                        bind:value={selectedMedia}
                        onchange={resetProjects}
                        disabled={!selectedPersonality}
                    >
                        <option value={null}>{$_("common.select")}…</option>
                        {#each mediaOptions as opt}
                            <option value={opt.key}>{opt.label}</option>
                        {/each}
                    </select>
                </div>

                <button class="fm-reset-btn" onclick={reset}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.2 5.7" /><path d="M3 21v-5h5" /></svg>
                    {$_("common.reset")}
                </button>
            </div>
        </div>

        <!-- results -->
        <div class="results">
            <div class="fm-panel">
                <div class="fm-panel-head attrs-head">
                    <span class="fm-panel-title" style="font-size:19px;"
                        >{$_("home.deduced_attrs", { default: "Attributs déduits" })}</span
                    >
                    <div class="legend fm-mono">
                        <span><span class="dot" style="background:var(--pos);"></span>{$_("home.strong", { default: "FORT" })}</span>
                        <span><span class="dot" style="background:var(--neu);"></span>{$_("home.neutral", { default: "NEUTRE" })}</span>
                        <span><span class="dot" style="background:var(--neg);"></span>{$_("home.weak", { default: "FAIBLE" })}</span>
                    </div>
                </div>
                <div class="attrs-body">
                    {#each attrRows as row}
                        <div class="attr-row">
                            <div class="attr-label">
                                <span>{$_(`hidden_notes.${row.key}`)}</span>
                                <span class="attr-info" title={$_(`hidden_notes.${row.key}_desc`)}>i</span>
                            </div>
                            <span class="attr-num fm-mono">{row.min}</span>
                            <div class="track">
                                <div class="track-mid"></div>
                                <div
                                    class="track-fill"
                                    style="left:{row.barLeft}%; width:{row.barWidth}%; background:{row.color}; box-shadow:0 0 12px {row.glow};"
                                ></div>
                                {#if row.hasMid}
                                    <div
                                        class="mid-badge fm-mono"
                                        style="left:{row.midLeft}%; background:{row.color};"
                                    >
                                        {row.mid}
                                    </div>
                                {/if}
                            </div>
                            <span class="attr-num fm-mono">{row.max}</span>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- projects -->
            {#if visibleProjects.anyVisible}
                <div class="fm-panel projects">
                    <div class="projects-title fm-display">
                        {$_("hidden_notes.projects_title")}
                    </div>
                    <p class="projects-sub">{$_("hidden_notes.projects_subtitle")}</p>
                    <div class="projects-grid">
                        {#each projectDefs as p}
                            {#if visibleProjects[p.key]}
                                <button
                                    class="project"
                                    class:checked={projects[p.key]}
                                    onclick={() => (projects[p.key] = !projects[p.key])}
                                >
                                    <span class="checkbox">
                                        {#if projects[p.key]}
                                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#0a0c0a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6" /></svg>
                                        {/if}
                                    </span>
                                    <span class="project-label">{$_(p.labelKey)}</span>
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .page-head {
        margin-bottom: 30px;
    }
    .fm-eyebrow {
        margin-bottom: 12px;
    }
    .page-sub {
        color: var(--muted);
        font-size: 15px;
        margin: 0;
        max-width: 620px;
        line-height: 1.6;
    }

    .layout {
        display: grid;
        grid-template-columns: 268px 1fr;
        gap: 18px;
        align-items: start;
    }

    .config {
        position: sticky;
        top: 0;
        overflow: hidden;
    }
    .config-body {
        padding: 22px 20px;
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    .field-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    .field-head label {
        font-size: 13px;
        font-weight: 600;
        color: var(--txt);
    }
    .det-value {
        font-weight: 700;
        font-size: 15px;
        color: var(--lime);
        background: var(--limeDim);
        border: 1px solid rgba(200, 242, 78, 0.25);
        padding: 2px 11px;
        border-radius: 8px;
    }
    .field-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: var(--txt);
        margin-bottom: 9px;
    }

    .range {
        width: 100%;
        accent-color: var(--lime);
        cursor: pointer;
        height: 6px;
    }
    .range-legend {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: var(--faint);
        margin-top: 7px;
    }
    .divider {
        height: 1px;
        background: var(--line2);
    }

    .results {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .attrs-head {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
    }
    .legend {
        display: flex;
        gap: 11px;
        font-size: 9.5px;
        color: var(--faint);
    }
    .legend span {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .attrs-body {
        padding: 6px 22px 16px;
    }
    .attr-row {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px 0;
        border-bottom: 1px solid var(--line2);
    }
    .attr-label {
        width: 108px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        color: var(--txt);
    }
    .attr-info {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1px solid var(--line);
        color: var(--faint);
        font-size: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: help;
        font-family: var(--font-mono);
    }
    .attr-num {
        width: 18px;
        flex-shrink: 0;
        font-size: 12px;
        color: var(--faint);
        text-align: center;
    }
    .track {
        flex: 1;
        position: relative;
        height: 8px;
        background: rgba(0, 0, 0, 0.45);
        border-radius: 6px;
        border: 1px solid var(--line2);
    }
    .track-mid {
        position: absolute;
        top: -3px;
        bottom: -3px;
        left: 47.3%;
        width: 1px;
        background: rgba(255, 255, 255, 0.16);
    }
    .track-fill {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 6px;
        transition: all .45s cubic-bezier(.2, .8, .2, 1);
    }
    .mid-badge {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #0a0c0a;
        font-weight: 700;
        font-size: 11px;
        padding: 2px 7px;
        border-radius: 6px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .projects {
        border-left: 3px solid var(--lime);
        padding: 20px 22px;
    }
    .projects-title {
        font-weight: 700;
        font-size: 18px;
        color: var(--lime);
        margin-bottom: 4px;
    }
    .projects-sub {
        color: var(--muted);
        font-size: 12.5px;
        margin: 0 0 16px;
    }
    .projects-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .project {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px;
        border-radius: 11px;
        cursor: pointer;
        color: var(--txt);
        font-family: var(--font-body);
        text-align: left;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.02);
        transition: all .2s;
    }
    .project.checked {
        border-color: rgba(200, 242, 78, 0.4);
        background: var(--limeDim);
    }
    .checkbox {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        background: transparent;
    }
    .project.checked .checkbox {
        border-color: var(--lime);
        background: var(--lime);
    }
    .project-label {
        font-size: 13px;
        line-height: 1.35;
    }

    @media (max-width: 860px) {
        .layout {
            grid-template-columns: 1fr;
        }
        .config {
            position: static;
        }
        .attr-label {
            width: 92px;
        }
    }
</style>
