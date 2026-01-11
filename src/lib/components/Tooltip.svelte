<script lang="ts">
    import { portal } from "$lib/actions/portal";

    interface Props {
        text: string;
    }

    let { text }: Props = $props();
    let showTooltip = $state(false);
    let triggerEl: HTMLElement | null = $state(null);
    let coords = $state({ top: 0, left: 0 });

    function handleMouseEnter() {
        if (triggerEl) {
            const rect = triggerEl.getBoundingClientRect();
            coords = {
                top: rect.top - 10, // Position above the element
                left: rect.left + rect.width / 2, // Center horizontally
            };
            showTooltip = true;
        }
    }
</script>

<span
    class="tooltip-container"
    role="tooltip"
    bind:this={triggerEl}
    onmouseenter={handleMouseEnter}
    onmouseleave={() => (showTooltip = false)}
>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <span class="info-icon" aria-label="Information" tabindex="0">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
        </svg>
    </span>

    {#if showTooltip}
        <div
            use:portal
            class="tooltip-popup"
            role="tooltip"
            style="top: {coords.top}px; left: {coords.left}px;"
        >
            <div class="tooltip-content">
                {text}
            </div>
            <div class="tooltip-arrow"></div>
        </div>
    {/if}
</span>

<style>
    .tooltip-container {
        display: inline-flex;
        align-items: center;
        margin-left: 0.5rem;
    }

    .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 0;
        background: rgba(107, 74, 158, 0.3);
        color: var(--color-violet-secondary, #8b6abf);
        cursor: help;
        border-radius: 50%;
        transition: all var(--transition-fast, 0.15s ease);
    }

    .tooltip-container:hover .info-icon,
    .info-icon:focus {
        color: var(--color-accent-primary, #ff6b00);
        background: rgba(255, 107, 0, 0.15);
        transform: scale(1.1);
        outline: none;
    }

    .tooltip-popup {
        position: fixed; /* Fixed relative to viewport to avoid scroll clipping */
        transform: translateX(-50%) translateY(-100%); /* Center and move up */
        z-index: 9999;
        width: max-content;
        max-width: 320px;
        animation: tooltipSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
    }

    .tooltip-content {
        background: linear-gradient(
            145deg,
            var(--color-bg-card, #252550) 0%,
            var(--color-bg-secondary, #1a1a3a) 100%
        );
        border: 1px solid var(--color-violet-primary, #6b4a9e);
        border-radius: 12px;
        padding: 1rem 1.25rem;
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--color-text-secondary, #b8b8d0);
        box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(107, 74, 158, 0.2);
        backdrop-filter: blur(10px);
    }

    .tooltip-arrow {
        position: absolute;
        left: 50%;
        bottom: -7px;
        transform: translateX(-50%) rotate(45deg);
        width: 14px;
        height: 14px;
        background: var(--color-bg-secondary, #1a1a3a);
        border-right: 1px solid var(--color-violet-primary, #6b4a9e);
        border-bottom: 1px solid var(--color-violet-primary, #6b4a9e);
    }

    @keyframes tooltipSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(calc(-100% + 8px))
                scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(-100%) scale(1);
        }
    }

    @media (max-width: 640px) {
        .tooltip-popup {
            max-width: 280px;
            /* On mobile, might need shift logic, but simple centering is often okay 
               unless near edge. For now, rely on centering. */
        }
    }
</style>
