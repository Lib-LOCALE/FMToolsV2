<script lang="ts">
    import "../app.css";
    import "$lib/i18n/i18n";
    import { waitLocale, _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { AppShell } from "@skeletonlabs/skeleton";
    import Navbar from "$lib/components/Navbar.svelte";

    let ready = $state(false);

    onMount(async () => {
        await waitLocale();
        ready = true;
    });
</script>

{#if ready}
    <!-- AppShell with transparent background to let body background show through -->
    <AppShell
        slotSidebarLeft="bg-transparent"
        slotPageHeader="bg-transparent"
        regionPage="bg-transparent"
    >
        <svelte:fragment slot="header">
            <Navbar />
        </svelte:fragment>

        <div class="container mx-auto p-4 md:p-8 max-w-7xl">
            <slot />
        </div>

        <svelte:fragment slot="pageFooter">
            <div
                class="bg-violet-900/40 backdrop-blur-md border-t border-white/5 p-6 text-center text-sm text-white/50"
            >
                <p>
                    {$_("footer.copyright")}
                    <span class="mx-2">•</span>
                    <a
                        href="https://github.com/Gilgiltsu/FMTools"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                    >
                        {$_("footer.based_on")}
                    </a>
                </p>
                <div class="mt-4">
                    <a
                        href="https://liberapay.com/TonyBoySUPER/donate"
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
                    >
                        <img
                            alt="Donate using Liberapay"
                            src="https://liberapay.com/assets/widgets/donate.svg"
                            class="h-5"
                        />
                        <span class="font-medium text-white/80"
                            >Soutenir le projet</span
                        >
                    </a>
                </div>
            </div>
        </svelte:fragment>
    </AppShell>
{:else}
    <div class="h-screen w-full flex items-center justify-center bg-slate-900">
        <div
            class="w-12 h-12 rounded-full border-2 border-surface-600 border-t-primary-500 animate-spin"
        ></div>
    </div>
{/if}
