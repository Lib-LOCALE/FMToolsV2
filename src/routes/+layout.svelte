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
                class="bg-slate-900/50 backdrop-blur-sm border-t border-surface-500/30 p-4 text-center text-sm text-surface-400"
            >
                <p>
                    {$_("footer.copyright")}
                    <a
                        href="https://github.com/Gilgiltsu/FMTools"
                        target="_blank"
                        rel="noopener"
                        class="text-primary-500 hover:text-primary-400 hover:underline"
                    >
                        {$_("footer.based_on")}
                    </a>
                </p>
                <a
                    href="https://liberapay.com/TonyBoySUPER/donate"
                    target="_blank"
                    rel="noopener"
                    class="inline-block mt-2 hover:scale-105 transition-transform"
                >
                    <img
                        alt="Donate using Liberapay"
                        src="https://liberapay.com/assets/widgets/donate.svg"
                        class="h-6"
                    />
                </a>
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
