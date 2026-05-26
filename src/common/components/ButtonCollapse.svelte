<script lang="ts">
  let { collapsed = $bindable() }: { collapsed?: boolean } = $props();
</script>

<button type="button" class="size-7" onclick={() => (collapsed = !collapsed)}>
  {#if collapsed}
    <span class="icon-[boxicons--chevron-up] size-7"> </span>
  {:else}
    <span class="icon-[boxicons--chevron-down] size-7"> </span>
  {/if}
</button>
