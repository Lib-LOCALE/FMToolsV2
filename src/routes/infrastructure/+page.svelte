<script lang="ts">
    import { _ } from "svelte-i18n";
    import { INFRASTRUCTURE_CATEGORIES } from "$lib/logic/infrastructure-data";

    const iconByKey: Record<string, string> = {
        training_center: "gym",
        facilities: "stadium",
        coaching: "clip",
        youth_recruitment: "youth",
    };

    function hexA(hex: string, a: number): string {
        const h = hex.replace("#", "");
        const r = parseInt(h.substring(0, 2), 16);
        const g = parseInt(h.substring(2, 4), 16);
        const b = parseInt(h.substring(4, 6), 16);
        return `rgba(${r},${g},${b},${a})`;
    }

    function levelColor(i: number, total: number): string {
        const t = i / (total - 1);
        if (t <= 0.27) return "#7fe46f";
        if (t <= 0.55) return "#b6f23d";
        if (t <= 0.75) return "#e6cf3a";
        return "#9aa39c";
    }
</script>

<svelte:head>
    <title>{$_("infrastructure.title")} — FM·TOOLS</title>
</svelte:head>

<div style="animation: fmFade .4s ease;">
    <header class="page-head">
        <div class="fm-eyebrow">MODULE 04</div>
        <h1 class="fm-h1">{$_("infrastructure.title")}</h1>
        <p class="page-sub">{$_("infrastructure.description")}</p>
    </header>

    <div class="grid">
        {#each INFRASTRUCTURE_CATEGORIES as cat}
            <div class="fm-panel">
                <div class="fm-panel-head">
                    <span class="cat-icon">
                        {#if iconByKey[cat.key] === "gym"}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12" /></svg>
                        {:else if iconByKey[cat.key] === "stadium"}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="5.2" /><path d="M7 11.6a5 2.6 0 0 1 10 0" /></svg>
                        {:else if iconByKey[cat.key] === "clip"}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4" width="13" height="16.5" rx="2.2" /><path d="M9 4.2h6V7H9zM9 11h6M9 15h4" /></svg>
                        {:else}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c4-3 7-5.6 7-10a7 7 0 0 0-14 0c0 .8.1 1.6.3 2.3" /><path d="M12 21V9M12 12l3.2-2M12 15l-3.2-2" /></svg>
                        {/if}
                    </span>
                    <span class="fm-panel-title">{$_(`infrastructure.${cat.key}`)}</span>
                </div>
                <div class="levels">
                    {#each cat.levels as level, i}
                        {@const color = levelColor(i, cat.levels.length)}
                        <div class="level-row">
                            <span class="level-name">
                                <span class="level-dot" style="background:{color};"></span>
                                <span style="color:{i < 3 ? 'var(--txt)' : 'var(--muted)'};"
                                    >{$_(`infrastructure.levels.${level.key}`)}</span
                                >
                            </span>
                            <span
                                class="level-range fm-mono"
                                style="color:{color}; background:{hexA(color, 0.12)};"
                            >
                                {level.range[0] === level.range[1]
                                    ? level.range[0]
                                    : `${level.range[0]}-${level.range[1]}`}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .page-head {
        margin-bottom: 28px;
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

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
    }

    .cat-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: var(--limeDim);
        border: 1px solid rgba(200, 242, 78, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--lime);
    }

    .levels {
        padding: 4px 20px 10px;
    }
    .level-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 0;
        border-bottom: 1px solid var(--line2);
    }
    .level-name {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13.5px;
    }
    .level-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .level-range {
        font-weight: 600;
        font-size: 12px;
        padding: 3px 10px;
        border-radius: 7px;
    }

    @media (max-width: 860px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>
