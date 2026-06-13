<script lang="ts">
    import { _ } from "svelte-i18n";
    import { REPORT_CATEGORIES, TRAINING_EFFECTS } from "$lib/logic/reports-data";

    let activeTab = $state("adaptability");

    let activeCategory = $derived(
        REPORT_CATEGORIES.find((c) => c.key === activeTab) || REPORT_CATEGORIES[0],
    );

    function indColor(ind: string): string {
        return ind === "positive" ? "var(--pos)" : ind === "negative" ? "var(--neg)" : "var(--neu)";
    }
    function indBg(ind: string): string {
        return ind === "positive"
            ? "rgba(116,224,107,0.15)"
            : ind === "negative"
              ? "rgba(239,98,86,0.15)"
              : "rgba(124,138,131,0.15)";
    }

    const effectGroups = [
        {
            titleKey: "reports.positive_effects",
            color: "var(--pos)",
            headBg: "rgba(116,224,107,0.07)",
            tagBg: "rgba(116,224,107,0.13)",
            items: TRAINING_EFFECTS.positive,
        },
        {
            titleKey: "reports.negative_effects",
            color: "var(--neg)",
            headBg: "rgba(239,98,86,0.07)",
            tagBg: "rgba(239,98,86,0.13)",
            items: TRAINING_EFFECTS.negative,
        },
    ];
</script>

<svelte:head>
    <title>{$_("reports.title")} — FM·TOOLS</title>
</svelte:head>

<div style="animation: fmFade .4s ease;">
    <header class="page-head">
        <div class="fm-eyebrow">MODULE 03</div>
        <h1 class="fm-h1">{$_("reports.title")}</h1>
        <p class="page-sub">{$_("reports.description")}</p>
    </header>

    <!-- tabs -->
    <div class="tabs">
        {#each REPORT_CATEGORIES as cat}
            <button
                class="tab"
                class:active={activeTab === cat.key}
                onclick={() => (activeTab = cat.key)}
            >
                {$_(`reports.${cat.key}`)}
            </button>
        {/each}
    </div>

    <!-- table -->
    <div class="fm-panel table-panel">
        <div class="table-head fm-mono">
            <span>{$_("reports.report_text")}</span>
            <span class="right">{$_("reports.note")}</span>
        </div>
        {#each activeCategory.entries as entry}
            <div class="table-row">
                <div class="row-left">
                    <span class="ind-icon" style="background:{indBg(entry.indicator)}; color:{indColor(entry.indicator)};">
                        {#if entry.indicator === "positive"}
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6" /></svg>
                        {:else if entry.indicator === "negative"}
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                        {:else}
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 12h12" /></svg>
                        {/if}
                    </span>
                    <span class="row-text">
                        {$_(`reports.${activeTab}_${entry.textKey}`, { default: entry.textKey })}
                    </span>
                </div>
                <span class="row-range fm-mono" style="color:{indColor(entry.indicator)};">
                    {entry.range[0] === entry.range[1]
                        ? entry.range[0]
                        : `${entry.range[0]} – ${entry.range[1]}`}
                </span>
            </div>
        {/each}
    </div>

    <!-- hidden effects -->
    <div class="effects-intro">
        <h2 class="effects-title fm-display">{$_("reports.hidden_effects")}</h2>
        <p class="page-sub" style="max-width:760px;">{$_("reports.hidden_effects_intro")}</p>
    </div>

    <div class="effects-grid">
        {#each effectGroups as grp}
            <div class="fm-panel effect-card">
                <div class="effect-head" style="background:{grp.headBg};">
                    <span class="dot" style="background:{grp.color};"></span>
                    <span class="fm-display effect-card-title" style="color:{grp.color};">{$_(grp.titleKey)}</span>
                </div>
                <div class="effect-body">
                    {#each grp.items as item}
                        <div class="effect-item">
                            <div class="effect-msg">{$_(`reports.${item.messageKey}`)}</div>
                            <div class="effect-tags">
                                <span class="effect-tag fm-mono">{$_(`reports.${item.causeKey}`)}</span>
                                <span class="effect-tag fm-mono" style="background:{grp.tagBg}; color:{grp.color};">
                                    → {$_(`reports.${item.consequenceKey}`)}
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
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
        max-width: 640px;
        line-height: 1.6;
    }

    .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
    }
    .tab {
        padding: 9px 16px;
        border-radius: 10px;
        cursor: pointer;
        font-family: var(--font-body);
        font-weight: 600;
        font-size: 13.5px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
        color: var(--muted);
        transition: all .2s;
    }
    .tab:hover {
        color: var(--txt);
        border-color: rgba(200, 242, 78, 0.25);
    }
    .tab.active {
        border-color: rgba(200, 242, 78, 0.4);
        background: var(--lime);
        color: #0a0c0a;
    }

    .table-panel {
        overflow: hidden;
        margin-bottom: 26px;
    }
    .table-head {
        display: grid;
        grid-template-columns: 1fr 110px;
        gap: 14px;
        padding: 14px 24px;
        border-bottom: 1px solid var(--line2);
        background: rgba(0, 0, 0, 0.25);
        font-size: 10px;
        letter-spacing: 1.5px;
        color: var(--faint);
    }
    .table-head .right {
        text-align: right;
    }
    .table-row {
        display: grid;
        grid-template-columns: 1fr 110px;
        gap: 14px;
        padding: 15px 24px;
        border-bottom: 1px solid var(--line2);
        align-items: center;
    }
    .row-left {
        display: flex;
        align-items: center;
        gap: 13px;
    }
    .ind-icon {
        width: 24px;
        height: 24px;
        border-radius: 7px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .row-text {
        font-size: 14px;
        color: var(--txt);
        line-height: 1.4;
    }
    .row-range {
        font-weight: 700;
        font-size: 14px;
        text-align: right;
    }

    .effects-intro {
        margin-bottom: 14px;
    }
    .effects-title {
        font-weight: 700;
        font-size: 26px;
        margin: 0 0 8px;
        color: var(--txt);
    }
    .effects-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .effect-card {
        border-radius: 14px;
        overflow: hidden;
    }
    .effect-head {
        padding: 13px 18px;
        border-bottom: 1px solid var(--line2);
        display: flex;
        align-items: center;
        gap: 9px;
    }
    .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
    }
    .effect-card-title {
        font-weight: 700;
        font-size: 16px;
    }
    .effect-body {
        padding: 6px 18px 12px;
    }
    .effect-item {
        padding: 13px 0;
        border-bottom: 1px solid var(--line2);
    }
    .effect-msg {
        font-size: 13px;
        color: var(--txt);
        line-height: 1.45;
        margin-bottom: 9px;
    }
    .effect-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    .effect-tag {
        font-size: 10.5px;
        padding: 3px 9px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--muted);
    }

    @media (max-width: 860px) {
        .effects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
