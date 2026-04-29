<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { RPE } from "../types";

  const {
    level,
    class: classValue,
    ...rest
  }: HTMLAttributes<Element> & { level: RPE } = $props();
</script>

{#if level === RPE.easy}
  <span class={["icon-[twemoji--slightly-smiling-face]", classValue]} {...rest}>
  </span>
{:else if level === RPE.medium}
  <span class={["icon-[twemoji--neutral-face]", classValue]} {...rest}></span>
{:else if level === RPE.hard}
  <span class={["icon-[twemoji--confounded-face]", classValue]} {...rest}>
  </span>
{/if}
