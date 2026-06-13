<script lang="ts">
    import { _ } from "svelte-i18n";

    const cards = [
        {
            n: "01",
            href: "/hidden-notes",
            titleKey: "hidden_notes.title",
            descKey: "hidden_notes.description",
            icon: "search",
            tags: ["Personnalité", "Médias", "Détermination"],
        },
        {
            n: "02",
            href: "/staff-evaluation",
            titleKey: "staff.title",
            descKey: "staff.description",
            icon: "star",
            tags: [],
        },
        {
            n: "03",
            href: "/reports",
            titleKey: "reports.title",
            descKey: "reports.description",
            icon: "clip",
            tags: [],
        },
        {
            n: "04",
            href: "/infrastructure",
            titleKey: "infrastructure.title",
            descKey: "infrastructure.description",
            icon: "stadium",
            tags: [],
        },
    ];
</script>

<svelte:head>
    <title>{$_("app.title")} — {$_("app.subtitle")}</title>
</svelte:head>

<div class="home" style="animation: fmFade .4s ease;">
    <div class="fm-eyebrow" style="margin-bottom:18px;">TABLEAU DE BORD</div>
    <h1 class="fm-h1 hero-title">{$_("app.welcome")}</h1>
    <p class="hero-desc">{$_("app.description")}</p>
    <p class="hero-intro">{$_("app.tools_intro")}</p>

    <div class="cards">
        {#each cards as c}
            <a href={c.href} class="card">
                <div class="card-top">
                    <div class="card-icon">
                        {#if c.icon === "search"}
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-3.6-3.6" /></svg>
                        {:else if c.icon === "star"}
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.6l2.6 5.3 5.8.9-4.2 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.2-4.1 5.8-.9z" /></svg>
                        {:else if c.icon === "clip"}
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4" width="13" height="16.5" rx="2.2" /><path d="M9 4.2h6V7H9z" /><path d="M9 11h6M9 15h4" /></svg>
                        {:else}
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V9l8-5 8 5v11" /><path d="M9 20v-5h6v5" /><path d="M3.2 20h17.6" /></svg>
                        {/if}
                    </div>
                    <span class="card-num fm-mono">{c.n}</span>
                </div>
                <div>
                    <h2 class="card-title fm-display">{$_(c.titleKey)}</h2>
                    <p class="card-desc">{$_(c.descKey)}</p>
                </div>
                {#if c.tags.length}
                    <div class="card-tags">
                        {#each c.tags as t}
                            <span class="card-tag fm-mono">{t}</span>
                        {/each}
                    </div>
                {:else}
                    <div style="flex:1;"></div>
                {/if}
                <div class="card-cta">
                    {$_("home.open_tool", { default: "Ouvrir l'outil" })}
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 6l6 6-6 6" /></svg>
                </div>
            </a>
        {/each}
    </div>

    <!-- credits band -->
    <div class="credits">
        <div>
            <div class="credits-label fm-mono">CRÉDITS</div>
            <div class="credits-text">{$_("app.based_on")}</div>
        </div>
        <div class="credits-links">
            <a
                href="https://youtu.be/9bWkYexbNII"
                target="_blank"
                rel="noopener"
                class="link-video"
            >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                {$_("app.video_presentation")}
            </a>
            <a
                href="https://www.youtube.com/@Kiniitooo"
                target="_blank"
                rel="noopener"
                class="link-social link-yt"
            >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#ff3b3b"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12z" /></svg>
                Kiniitooo
            </a>
            <a
                href="https://www.twitch.tv/kiniitooo"
                target="_blank"
                rel="noopener"
                class="link-social link-tw"
            >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="#a970ff"><path d="M11.6 4.7h1.7v5.1h-1.7zm4.7 0H18v5.1h-1.7zM6 0 1.7 4.3v15.4h5.1V24l4.3-4.3h3.4L22.3 12V0zm14.6 11.1-3.4 3.4h-3.5l-3 3v-3H6.9V1.7h13.7z" /></svg>
                Twitch
            </a>
        </div>
    </div>
</div>

<style>
    .hero-title {
        font-size: 48px;
        max-width: 860px;
        margin-bottom: 22px;
    }

    .hero-desc {
        color: var(--muted);
        font-size: 16px;
        line-height: 1.7;
        max-width: 680px;
        margin: 0 0 8px;
    }

    .hero-intro {
        color: var(--txt);
        font-weight: 600;
        font-size: 15px;
        margin: 0 0 40px;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
    }

    .card {
        text-align: left;
        cursor: pointer;
        background: linear-gradient(160deg, var(--panel2), var(--panel));
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 26px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        color: var(--txt);
        transition:
            border-color .25s,
            transform .25s,
            box-shadow .25s;
    }

    .card:hover {
        border-color: rgba(200, 242, 78, 0.45);
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }

    .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card-icon {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        background: var(--limeDim);
        border: 1px solid rgba(200, 242, 78, 0.22);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--lime);
    }

    .card-num {
        font-size: 13px;
        color: var(--faint);
        font-weight: 700;
    }

    .card-title {
        font-weight: 700;
        font-size: 24px;
        margin: 0 0 6px;
        letter-spacing: .3px;
        color: var(--txt);
    }

    .card-desc {
        color: var(--muted);
        font-size: 13.5px;
        line-height: 1.55;
        margin: 0;
    }

    .card-tags {
        display: flex;
        gap: 7px;
        flex-wrap: wrap;
        margin-top: 2px;
    }

    .card-tag {
        font-size: 10.5px;
        padding: 4px 9px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--muted);
    }

    .card-cta {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--lime);
        font-weight: 600;
        font-size: 13px;
        margin-top: 6px;
    }

    .credits {
        margin-top: 34px;
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
    }

    .credits-label {
        font-size: 10.5px;
        letter-spacing: 2px;
        color: var(--faint);
        margin-bottom: 6px;
    }

    .credits-text {
        font-size: 14px;
        color: var(--txt);
    }

    .credits-links {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    .link-video {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 10px;
        background: var(--lime);
        color: #0a0c0a;
        text-decoration: none;
        font-weight: 700;
        font-size: 13px;
        transition: background .2s;
    }

    .link-video:hover {
        background: var(--lime2);
    }

    .link-social {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 10px 14px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--line);
        color: var(--txt);
        text-decoration: none;
        font-weight: 600;
        font-size: 13px;
        transition: all .2s;
    }

    .link-yt:hover {
        background: rgba(255, 0, 0, 0.14);
        border-color: rgba(255, 0, 0, 0.4);
    }

    .link-tw:hover {
        background: rgba(145, 70, 255, 0.18);
        border-color: rgba(145, 70, 255, 0.5);
    }

    @media (max-width: 760px) {
        .hero-title {
            font-size: 36px;
        }
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>
