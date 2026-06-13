<script lang="ts">
    import "../app.css";
    import "$lib/i18n/i18n";
    import { waitLocale } from "svelte-i18n";
    import { onMount } from "svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";

    let { children } = $props();
    let ready = $state(false);

    onMount(async () => {
        await waitLocale();
        ready = true;
    });
</script>

{#if ready}
    <div class="app-shell">
        <!-- ambient glow -->
        <div class="glow glow-lime"></div>
        <div class="glow glow-blue"></div>

        <Sidebar />

        <main class="main">
            <div class="main-inner">
                {@render children?.()}
            </div>
        </main>
    </div>
{:else}
    <div class="loader-wrap">
        <div class="loader"></div>
    </div>
{/if}

<style>
    .app-shell {
        display: flex;
        height: 100vh;
        width: 100%;
        background: var(--ink);
        color: var(--txt);
        overflow: hidden;
        position: relative;
    }

    .glow {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
    }

    .glow-lime {
        top: -280px;
        left: -120px;
        width: 680px;
        height: 680px;
        background: radial-gradient(
            circle,
            rgba(200, 242, 78, 0.1),
            transparent 65%
        );
        filter: blur(8px);
        animation: fmGlow 9s ease-in-out infinite;
    }

    .glow-blue {
        bottom: -300px;
        right: -160px;
        width: 620px;
        height: 620px;
        background: radial-gradient(
            circle,
            rgba(95, 176, 232, 0.07),
            transparent 65%
        );
    }

    .main {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        position: relative;
        z-index: 1;
    }

    .main-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 36px 64px;
    }

    @media (max-width: 860px) {
        .main-inner {
            padding: 28px 20px 48px;
        }
    }

    .loader-wrap {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ink);
    }

    .loader {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 3px solid var(--line);
        border-top-color: var(--lime);
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
