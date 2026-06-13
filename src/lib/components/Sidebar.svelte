<script lang="ts">
    import { _ } from "svelte-i18n";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { portal } from "$lib/actions/portal";
    import {
        EU_LANGUAGES,
        setLanguage,
        getSavedLanguage,
        getFlagCode,
    } from "$lib/i18n/i18n";
    import "flag-icons/css/flag-icons.min.css";

    const navItems = [
        { path: "/", key: "nav.home", icon: "home" },
        { path: "/hidden-notes", key: "nav.hidden_notes", icon: "search" },
        { path: "/staff-evaluation", key: "nav.staff", icon: "star" },
        { path: "/reports", key: "nav.reports", icon: "clip" },
        { path: "/infrastructure", key: "nav.infrastructure", icon: "stadium" },
    ];

    let currentLang = $state("fr");
    let showLangDropdown = $state(false);
    let langButtonEl: HTMLElement | null = $state(null);
    let dropdownCoords = $state({ bottom: 0, left: 0 });

    onMount(() => {
        currentLang = getSavedLanguage();
        setLanguage(currentLang);
    });

    function handleLangChange(code: string) {
        currentLang = code;
        setLanguage(code);
        showLangDropdown = false;
    }

    function toggleLangDropdown() {
        if (!showLangDropdown && langButtonEl) {
            const rect = langButtonEl.getBoundingClientRect();
            dropdownCoords = {
                bottom: window.innerHeight - rect.top + 8,
                left: rect.left,
            };
            showLangDropdown = true;
        } else {
            showLangDropdown = false;
        }
    }
</script>

<svelte:window on:click={() => (showLangDropdown = false)} />

<aside class="sidebar">
    <!-- brand -->
    <div class="brand">
        <div class="brand-mark">
            <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#0a0c0a"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><rect x="3" y="3" width="18" height="18" rx="5" /><circle
                    cx="12"
                    cy="12"
                    r="3.2"
                /><path d="M12 3v3.2M12 17.8V21" /></svg
            >
        </div>
        <div class="brand-text">
            <div class="brand-name">FM<span class="lime">TOOLS</span></div>
            <div class="brand-sub">FOOTBALL MANAGER 26</div>
        </div>
    </div>

    <!-- nav -->
    <nav class="nav">
        <div class="nav-label">NAVIGATION</div>
        {#each navItems as item}
            <a
                href={item.path}
                class="nav-item"
                class:active={$page.url.pathname === item.path}
            >
                <span class="nav-icon">
                    {#if item.icon === "home"}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.4V20h14V9.4" /></svg>
                    {:else if item.icon === "search"}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-3.6-3.6" /></svg>
                    {:else if item.icon === "star"}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.6l2.6 5.3 5.8.9-4.2 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.2-4.1 5.8-.9z" /></svg>
                    {:else if item.icon === "clip"}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4" width="13" height="16.5" rx="2.2" /><path d="M9 4.2h6V7H9z" /><path d="M9 11h6M9 15h4" /></svg>
                    {:else}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V9l8-5 8 5v11" /><path d="M9 20v-5h6v5" /><path d="M3.2 20h17.6" /></svg>
                    {/if}
                </span>
                <span class="nav-text">{$_(item.key)}</span>
            </a>
        {/each}
    </nav>

    <!-- footer -->
    <div class="side-footer">
        <a
            href="https://liberapay.com/TonyBoySUPER/donate"
            target="_blank"
            rel="noopener"
            class="donate"
        >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.3-9.2C1.2 7.6 3 4.8 6 4.8c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3 0 4.8 2.8 3.3 6C19 15.6 12 20 12 20z" /></svg>
            <span class="nav-text"
                >{$_("footer.support", { default: "Soutenir le projet" })}</span
            >
        </a>
        <div class="footer-row">
            <span class="copyright fm-mono">© 2026 · v2</span>
            <button
                bind:this={langButtonEl}
                class="lang-pill"
                onclick={(e) => {
                    e.stopPropagation();
                    toggleLangDropdown();
                }}
            >
                <span class="fi fi-{getFlagCode(currentLang)} flag"></span>
                <span class="fm-mono">{currentLang.toUpperCase()}</span>
            </button>
        </div>
    </div>
</aside>

{#if showLangDropdown}
    <div
        use:portal
        class="lang-menu"
        style="bottom:{dropdownCoords.bottom}px; left:{dropdownCoords.left}px;"
        onclick={(e) => e.stopPropagation()}
        role="menu"
        tabindex="-1"
        onkeydown={() => {}}
        transition:fade={{ duration: 100 }}
    >
        {#each EU_LANGUAGES as lang}
            <button
                class="lang-option"
                class:selected={currentLang === lang.code}
                onclick={() => handleLangChange(lang.code)}
            >
                <span class="fi fi-{lang.flagCode} flag"></span>
                <span>{lang.name}</span>
            </button>
        {/each}
    </div>
{/if}

<style>
    .sidebar {
        width: 252px;
        flex-shrink: 0;
        height: 100%;
        background: linear-gradient(180deg, #0c0f0e, #090b0a);
        border-right: 1px solid var(--line);
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
    }

    .brand {
        padding: 24px 22px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--line2);
    }

    .brand-mark {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--lime);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 18px rgba(200, 242, 78, 0.28);
        flex-shrink: 0;
    }

    .brand-text {
        line-height: 1;
    }

    .brand-name {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 25px;
        letter-spacing: .5px;
        color: var(--txt);
    }

    .lime {
        color: var(--lime);
    }

    .brand-sub {
        font-family: var(--font-mono);
        font-size: 9.5px;
        letter-spacing: 2.5px;
        color: var(--faint);
        margin-top: 3px;
    }

    .nav {
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
    }

    .nav-label {
        font-family: var(--font-mono);
        font-size: 9.5px;
        letter-spacing: 2px;
        color: var(--faint);
        padding: 6px 12px 10px;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 13px;
        width: 100%;
        padding: 11px 13px;
        border-radius: 11px;
        cursor: pointer;
        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 600;
        text-align: left;
        text-decoration: none;
        color: var(--muted);
        border: 1px solid transparent;
        transition: all .2s;
    }

    .nav-item:hover {
        color: var(--txt);
        background: rgba(255, 255, 255, 0.03);
    }

    .nav-item.active {
        background: var(--limeDim);
        color: var(--lime);
        border-color: rgba(200, 242, 78, 0.22);
    }

    .nav-icon {
        display: flex;
        flex-shrink: 0;
    }

    .side-footer {
        padding: 16px 18px;
        border-top: 1px solid var(--line2);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .donate {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px;
        border-radius: 10px;
        background: var(--limeDim);
        border: 1px solid rgba(200, 242, 78, 0.25);
        color: var(--lime);
        text-decoration: none;
        font-weight: 600;
        font-size: 13px;
        transition: background .2s;
    }

    .donate:hover {
        background: rgba(200, 242, 78, 0.2);
    }

    .footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .copyright {
        font-size: 10px;
        letter-spacing: 1px;
        color: var(--faint);
    }

    .lang-pill {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 9px;
        border-radius: 7px;
        border: 1px solid var(--line);
        background: transparent;
        font-size: 11px;
        color: var(--muted);
        font-weight: 700;
        cursor: pointer;
        transition: all .2s;
    }

    .lang-pill:hover {
        border-color: rgba(200, 242, 78, 0.3);
        color: var(--txt);
    }

    .flag {
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    }

    .lang-menu {
        position: fixed;
        width: 190px;
        max-height: 60vh;
        overflow-y: auto;
        background: var(--panel2);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 6px;
        z-index: 9999;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }

    .lang-option {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 8px;
        background: transparent;
        border: none;
        color: var(--muted);
        font-family: var(--font-body);
        font-size: 13px;
        text-align: left;
        cursor: pointer;
        transition: all .15s;
    }

    .lang-option:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--txt);
    }

    .lang-option.selected {
        background: var(--limeDim);
        color: var(--lime);
    }

    /* Icon rail on narrow widths */
    @media (max-width: 860px) {
        .sidebar {
            width: 70px;
        }
        .brand {
            padding: 20px 0;
            justify-content: center;
        }
        .brand-text,
        .nav-text,
        .nav-label,
        .copyright {
            display: none;
        }
        .nav-item {
            justify-content: center;
            padding: 11px 0;
        }
        .donate {
            padding: 10px 0;
        }
        .footer-row {
            justify-content: center;
        }
    }
</style>
