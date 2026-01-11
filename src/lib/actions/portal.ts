export function portal(node: HTMLElement, target: HTMLElement | string = 'body') {
    async function update() {
        const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
        if (targetEl) {
            targetEl.appendChild(node);
            node.hidden = false;
        }
    }

    update();

    return {
        update,
        destroy() {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    };
}
