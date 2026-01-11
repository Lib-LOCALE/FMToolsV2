<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        EU_LANGUAGES,
        setLanguage,
        getSavedLanguage,
        getFlagCode,
    } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import "flag-icons/css/flag-icons.min.css";
    import { AppBar } from "@skeletonlabs/skeleton";

    let showLangDropdown = $state(false);
    let currentLang = $state("fr");

    const navItems = [
        { path: "/", icon: "🏠", key: "nav.home" },
        { path: "/hidden-notes", icon: "🔍", key: "nav.hidden_notes" },
        { path: "/staff-evaluation", icon: "⭐", key: "nav.staff" },
        { path: "/reports", icon: "📋", key: "nav.reports" },
        { path: "/infrastructure", icon: "🏟️", key: "nav.infrastructure" },
    ];

    onMount(() => {
        currentLang = getSavedLanguage();
        setLanguage(currentLang);
    });

    function handleLangChange(langCode: string) {
        currentLang = langCode;
        setLanguage(langCode);
        showLangDropdown = false;
    }

    function getCurrentFlagCode() {
        return getFlagCode(currentLang);
    }

    function closeLangDropdown() {
        showLangDropdown = false;
    }
</script>

<svelte:window on:click={closeLangDropdown} />

<div class="shadow-md">
    <AppBar
        background="bg-surface-900/90 backdrop-blur-md"
        padding="p-2 md:p-4"
        gridColumns="grid-cols-[auto_1fr_auto]"
        gap="gap-4"
    >
        <svelte:fragment slot="lead">
            <a
                href="/"
                class="flex items-center gap-3 text-xl font-bold hover:opacity-80 transition-opacity"
            >
                <img
                    src="/logo.png"
                    alt="FMToolsV2"
                    class="w-10 h-10 rounded-lg shadow-lg"
                />
                <span
                    class="bg-gradient-to-br from-primary-400 to-secondary-500 bg-clip-text text-transparent hidden md:inline-block"
                >
                    FMToolsV2
                </span>
            </a>
        </svelte:fragment>

        <!-- Navigation (Center on Desktop, scrollable or specific on mobile?) -->
        <!-- Using a simple flex row for now, similar to original -->
        <div
            class="flex justify-center flex-wrap gap-1 md:gap-2 overflow-x-auto no-scrollbar"
        >
            {#each navItems as item}
                <a
                    href={item.path}
                    class="btn btn-sm variant-soft hover:variant-filled-primary transition-all duration-200
                           {$page.url.pathname === item.path
                        ? 'variant-filled-primary shadow-lg scale-105'
                        : 'bg-surface-800'}"
                >
                    <span>{item.icon}</span>
                    <span class="hidden md:inline">{$_(item.key)}</span>
                </a>
            {/each}
        </div>

        <svelte:fragment slot="trail">
            <div class="relative" onclick={(e) => e.stopPropagation()}>
                <button
                    class="btn btn-sm bg-surface-800 hover:variant-soft-primary border border-surface-600 flex items-center gap-2"
                    onclick={() => (showLangDropdown = !showLangDropdown)}
                >
                    <span
                        class="fi fi-{getCurrentFlagCode()} rounded-sm shadow-sm"
                    ></span>
                    <span class="font-bold text-xs"
                        >{currentLang.toUpperCase()}</span
                    >
                    <span class="text-[0.6rem] opacity-70">▼</span>
                </button>

                {#if showLangDropdown}
                    <div
                        class="absolute right-0 top-full mt-2 w-48 max-h-80 overflow-y-auto bg-surface-800 border border-surface-600 rounded-lg shadow-xl p-1 z-[1000]"
                    >
                        {#each EU_LANGUAGES as lang}
                            <button
                                class="w-full flex items-center gap-3 p-2 rounded hover:variant-soft-primary text-left transition-colors
                                       {currentLang === lang.code
                                    ? 'variant-soft-primary'
                                    : ''}"
                                onclick={() => handleLangChange(lang.code)}
                            >
                                <span
                                    class="fi fi-{lang.flagCode} text-lg rounded-sm"
                                ></span>
                                <span class="text-sm font-medium"
                                    >{lang.name}</span
                                >
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </svelte:fragment>
    </AppBar>
</div>
