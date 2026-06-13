<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        DEFAULT_ATTRIBUTES,
        calculateStaffRatings,
        FM26_LEVELS,
        type StaffAttributes,
        type FM26Level,
    } from "$lib/logic/staff-evaluation";

    let attributes = $state<StaffAttributes>({ ...DEFAULT_ATTRIBUTES });
    let ratings = $derived(calculateStaffRatings(attributes));

    function reset() {
        attributes = { ...DEFAULT_ATTRIBUTES };
    }

    function hexA(hex: string, a: number): string {
        const h = hex.replace("#", "");
        const r = parseInt(h.substring(0, 2), 16);
        const g = parseInt(h.substring(2, 4), 16);
        const b = parseInt(h.substring(4, 6), 16);
        return `rgba(${r},${g},${b},${a})`;
    }

    const labelKey: Record<keyof StaffAttributes, string> = {
        fitness: "staff.fitness",
        setPieces: "staff.set_pieces",
        defending: "staff.defending",
        mental: "staff.mental_attr",
        attacking: "staff.attacking",
        tactical: "staff.tactical",
        technical: "staff.technical",
        motivating: "staff.motivating",
        determination: "staff.determination",
        discipline: "staff.discipline",
        gkShotStopping: "staff.gk_shot_stopping",
        gkHandling: "staff.gk_handling",
        gkDistribution: "staff.gk_distribution",
        tacticalKnowledge: "staff.tactical_knowledge",
    };

    const groups: {
        titleKey: string;
        icon: string;
        attrs: (keyof StaffAttributes)[];
    }[] = [
        { titleKey: "staff.training", icon: "ball", attrs: ["fitness", "setPieces", "defending", "mental", "attacking", "tactical", "technical"] },
        { titleKey: "staff.mental", icon: "target", attrs: ["motivating", "determination", "discipline"] },
        { titleKey: "staff.gk_training", icon: "gk", attrs: ["gkShotStopping", "gkHandling", "gkDistribution"] },
        { titleKey: "staff.knowledge", icon: "clip", attrs: ["tacticalKnowledge"] },
    ];

    let results = $derived([
        { catKey: "staff.goalkeeper", subKey: "staff.shot_stopping", icon: "gk", level: ratings.goalkeeper.shotStopping },
        { catKey: "staff.goalkeeper", subKey: "staff.handling", icon: "gk", level: ratings.goalkeeper.handling },
        { catKey: "staff.defense", subKey: "staff.tactical", icon: "shield", level: ratings.defense.tactical },
        { catKey: "staff.defense", subKey: "staff.technical", icon: "shield", level: ratings.defense.technical },
        { catKey: "staff.offensive", subKey: "staff.tactical", icon: "ball", level: ratings.offensive.tactical },
        { catKey: "staff.offensive", subKey: "staff.technical", icon: "ball", level: ratings.offensive.technical },
        { catKey: "staff.possession", subKey: "staff.tactical", icon: "target", level: ratings.possession.tactical },
        { catKey: "staff.possession", subKey: "staff.technical", icon: "target", level: ratings.possession.technical },
        { catKey: "staff.physical", subKey: "staff.power", icon: "power", level: ratings.physical.power },
        { catKey: "staff.physical", subKey: "staff.quickness", icon: "power", level: ratings.physical.quickness },
        { catKey: "staff.set_pieces", subKey: "", icon: "corner", level: ratings.setPieces },
    ]);
</script>

<svelte:head>
    <title>{$_("staff.title")} — FM·TOOLS</title>
</svelte:head>

<div style="animation: fmFade .4s ease;">
    <header class="page-head">
        <div class="fm-eyebrow">MODULE 02</div>
        <h1 class="fm-h1">{$_("staff.title")}</h1>
        <p class="page-sub">{$_("staff.description")}</p>
    </header>

    <!-- legend -->
    <div class="legend-box">
        <div class="legend-label fm-mono">{$_("staff.attribute_level")} · FM26</div>
        <div class="legend-items">
            {#each FM26_LEVELS as lv}
                <span
                    class="legend-chip"
                    style="background:{hexA(lv.color, 0.13)}; border-color:{hexA(lv.color, 0.3)};"
                >
                    <span class="chip-label" style="color:{lv.color};">{$_(lv.labelKey)}</span>
                    <span class="chip-range fm-mono">{lv.min === lv.max ? lv.min : `${lv.min}-${lv.max}`}</span>
                </span>
            {/each}
        </div>
    </div>

    <div class="layout">
        <!-- inputs -->
        <div class="inputs">
            {#each groups as g}
                <div class="fm-panel input-card">
                    <div class="input-head">
                        <span class="input-icon">
                            {#if g.icon === "ball"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4" /><path d="M12 7.5l3.2 2.3-1.2 3.7h-4l-1.2-3.7z" /></svg>
                            {:else if g.icon === "target"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4" /><circle cx="12" cy="12" r="3.4" /></svg>
                            {:else if g.icon === "gk"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.6V11c0 4.6-3 7.6-7 9.4C8 18.6 5 15.6 5 11V5.6z" /></svg>
                            {:else}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4" width="13" height="16.5" rx="2.2" /><path d="M9 4.2h6V7H9zM9 11h6M9 15h4" /></svg>
                            {/if}
                        </span>
                        <span class="fm-panel-title" style="font-size:17px;">{$_(g.titleKey)}</span>
                    </div>
                    <div class="input-rows">
                        {#each g.attrs as attr}
                            <div class="input-row">
                                <label class="row-label" for="sel-{attr}">{$_(labelKey[attr])}</label>
                                <select id="sel-{attr}" class="fm-select row-select" bind:value={attributes[attr]}>
                                    {#each FM26_LEVELS as level}
                                        <option value={level.key}>{$_(level.labelKey)}</option>
                                    {/each}
                                </select>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
            <button class="fm-reset-btn" onclick={reset}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.2 5.7" /><path d="M3 21v-5h5" /></svg>
                {$_("staff.reset")}
            </button>
        </div>

        <!-- results -->
        <div class="fm-panel results">
            <div class="results-head">
                <span class="fm-panel-title" style="font-size:19px;">{$_("staff.evaluation")}</span>
                <span class="fm26-tag fm-mono">FM26</span>
            </div>
            <div>
                {#each results as r}
                    <div class="result-row">
                        <span class="result-icon">
                            {#if r.icon === "gk"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.6V11c0 4.6-3 7.6-7 9.4C8 18.6 5 15.6 5 11V5.6z" /></svg>
                            {:else if r.icon === "shield"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.6V11c0 4.6-3 7.6-7 9.4C8 18.6 5 15.6 5 11V5.6z" /></svg>
                            {:else if r.icon === "ball"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4" /><path d="M12 7.5l3.2 2.3-1.2 3.7h-4l-1.2-3.7z" /></svg>
                            {:else if r.icon === "target"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4" /><circle cx="12" cy="12" r="3.4" /></svg>
                            {:else if r.icon === "power"}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3l-8 10h6l-1 8 8-10h-6z" /></svg>
                            {:else}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M6 4h11l-2.5 3.5L17 11H6" /></svg>
                            {/if}
                        </span>
                        <div class="result-text">
                            <div class="result-cat">{$_(r.catKey)}</div>
                            <div class="result-sub fm-mono">{r.subKey ? $_(r.subKey) : "—"}</div>
                        </div>
                        <span
                            class="level-tag"
                            style="background:{hexA(r.level.color, 0.14)}; border:1px solid {hexA(r.level.color, 0.32)}; color:{r.level.color};"
                        >
                            {$_(r.level.labelKey)}
                        </span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .page-head {
        margin-bottom: 24px;
    }
    .fm-eyebrow {
        margin-bottom: 12px;
    }
    .page-sub {
        color: var(--muted);
        font-size: 15px;
        margin: 0;
        max-width: 660px;
        line-height: 1.6;
    }

    .legend-box {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 14px 18px;
        margin-bottom: 22px;
    }
    .legend-label {
        font-size: 10px;
        letter-spacing: 2px;
        color: var(--faint);
        margin-bottom: 11px;
    }
    .legend-items {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .legend-chip {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 5px 11px;
        border-radius: 8px;
        border: 1px solid;
    }
    .chip-label {
        font-weight: 700;
        font-size: 12px;
    }
    .chip-range {
        font-size: 10px;
        color: var(--faint);
    }

    .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px;
        align-items: start;
    }
    .inputs {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .input-card {
        border-radius: 14px;
        padding: 18px 20px;
    }
    .input-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 16px;
    }
    .input-icon {
        color: var(--lime);
        display: flex;
    }
    .input-rows {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .input-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
    }
    .row-label {
        font-size: 13px;
        color: var(--muted);
        flex: 1;
    }
    .row-select {
        width: 165px;
        padding: 8px 10px;
        font-size: 12.5px;
        border-radius: 9px;
    }

    .results {
        position: sticky;
        top: 0;
        overflow: hidden;
    }
    .results-head {
        padding: 16px 22px;
        border-bottom: 1px solid var(--line2);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fm26-tag {
        font-size: 11px;
        color: var(--lime);
        border: 1px solid rgba(200, 242, 78, 0.3);
        padding: 3px 9px;
        border-radius: 7px;
    }
    .result-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 22px;
        border-bottom: 1px solid var(--line2);
    }
    .result-icon {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        background: rgba(255, 255, 255, 0.04);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--muted);
        flex-shrink: 0;
    }
    .result-text {
        flex: 1;
    }
    .result-cat {
        font-size: 14px;
        font-weight: 600;
        color: var(--txt);
    }
    .result-sub {
        font-size: 11.5px;
        color: var(--faint);
    }
    .level-tag {
        font-weight: 700;
        font-size: 12.5px;
        padding: 5px 12px;
        border-radius: 8px;
    }

    @media (max-width: 860px) {
        .layout {
            grid-template-columns: 1fr;
        }
        .results {
            position: static;
        }
        .row-select {
            width: 150px;
        }
    }
</style>
