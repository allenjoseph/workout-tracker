<script lang="ts">
  import EmojiRpe from "../common/components/EmojiRpe.svelte";
  import type { Training } from "../common/types";

  interface Props {
    training?: Training[];
    deletable?: boolean;
  }

  const { training = [], deletable = false }: Props = $props();

  const groupByExercise = $derived(Object.groupBy(training, (e) => e.name));

  let itemSelected = $state<Training>();

  const onSelectItem = (item: Training) => {
    if (item.id === itemSelected?.id) {
      itemSelected = undefined;
    } else {
      itemSelected = item;
    }
  };

  $inspect(training);
</script>

<div class="space-y-3">
  {#each Object.entries(groupByExercise) as [name, group] (name)}
    <div class="flex flex-col gap-2 overflow-hidden">
      <p class="capitalize truncate">
        {name}
      </p>
      <ul class="flex gap-2 items-center flex-nowrap overflow-x-scroll">
        {#each group as item}
          <li
            class={[
              "bg-primary/10 border-primary rounded-md border p-2",
              itemSelected?.id === item.id
                ? "bg-red-500 text-white border-red-500"
                : "bg-primary/10 border-primary",
            ]}
          >
            <button
              type="button"
              class="flex flex-col gap-0.5 items-center"
              onclick={() => onSelectItem(item)}
              disabled={!deletable}
            >
              {#if item.id === itemSelected?.id}
                <span class="icon-[boxicons--trash] size-8"></span>
              {:else}
                <EmojiRpe level={item.rpe} class="size-8" />
              {/if}
              <span class="leading-none">
                {item.weight}kg
              </span>
              <span class="leading-none">
                x{item.reps}
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
