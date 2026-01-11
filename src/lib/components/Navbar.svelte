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

<div class="relative z-50">
    <AppBar
        background="bg-violet-900/60 backdrop-blur-md border-b border-white/10 shadow-lg"
        padding="p-2 md:p-4"
        gridColumns="grid-cols-[auto_1fr_auto]"
        gap="gap-4"
    >
        <svelte:fragment slot="lead">
            <a href="/" class="flex items-center gap-3 text-xl font-bold group">
                <div class="relative">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    ></div>
                    <img
                        src="/logo.png"
                        alt="FMToolsV2"
                        class="relative w-10 h-10 rounded-lg shadow-lg border border-white/10"
                    />
                </div>
                <span
                    class="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent hidden md:inline-block font-extrabold tracking-tight"
                >
                    FMToolsV2
                </span>
            </a>
        </svelte:fragment>

        <!-- Navigation -->
        <div
            class="flex justify-center flex-wrap gap-1 md:gap-3 overflow-x-auto no-scrollbar py-1"
        >
            {#each navItems as item}
                <a
                    href={item.path}
                    class="btn btn-sm transition-all duration-300 border border-transparent
                           {$page.url.pathname === item.path
                        ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] border-orange-400'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white hover:border-white/10'}"
                >
                    <span>{item.icon}</span>
                    <span class="hidden md:inline font-medium"
                        >{$_(item.key)}</span
                    >
                </a>
            {/each}
        </div>

        <svelte:fragment slot="trail">
            <div class="relative" onclick={(e) => e.stopPropagation()}>
                <button
                    class="btn btn-sm bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    onclick={() => (showLangDropdown = !showLangDropdown)}
                >
                    <span
                        class="fi fi-{getCurrentFlagCode()} rounded-sm shadow-sm opacity-90"
                    ></span>
                    <span class="font-bold text-xs tracking-wider"
                        >{currentLang.toUpperCase()}</span
                    >
                    <span class="text-[0.6rem] opacity-50">▼</span>
                </button>

                {#if showLangDropdown}
                    <div
                        class="absolute right-0 top-full mt-2 w-48 max-h-80 overflow-y-auto card-glass p-1 z-[1000] border-t border-white/20"
                    >
                        {#each EU_LANGUAGES as lang}
                            <button
                                class="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 text-left transition-colors
                                       {currentLang === lang.code
                                    ? 'bg-orange-500/20 text-orange-200'
                                    : 'text-white/80'}"
                                onclick={() => handleLangChange(lang.code)}
                            >
                                <span
                                    class="fi fi-{lang.flagCode} text-lg rounded-sm shadow-sm"
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
