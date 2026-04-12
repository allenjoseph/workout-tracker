<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { RPE } from "../utils/types";

  const {
    level,
    class: classValue,
    ...rest
  }: HTMLAttributes<Element> & { level: RPE } = $props();
</script>

{#if level === RPE.easy}
  <span class={["icon-[twemoji--slightly-smiling-face]", classValue]} {...rest}
  ></span>
{:else if level === RPE.medium}
  <span class={["icon-[twemoji--grinning-face]", classValue]} {...rest}></span>
{:else if level === RPE.hard}
  <span
    class={["icon-[twemoji--face-holding-back-tears]", classValue]}
    {...rest}
  ></span>
{/if}
