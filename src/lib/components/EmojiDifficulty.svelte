<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { Difficulty } from "../utils/types";

    const {
        level,
        class: classValue,
        ...rest
    }: HTMLAttributes<Element> & { level: Difficulty } = $props();
</script>

{#if level === "easy"}
    <span
        class={["icon-[twemoji--slightly-smiling-face]", classValue]}
        {...rest}
    ></span>
{:else if level === "medium"}
    <span class={["icon-[twemoji--grinning-face]", classValue]} {...rest}
    ></span>
{:else if level === "hard"}
    <span
        class={["icon-[twemoji--face-holding-back-tears]", classValue]}
        {...rest}
    ></span>
{/if}
