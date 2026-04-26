<script lang="ts">
  import EmojiRpe from "../common/components/EmojiRpe.svelte";
  import type { Training } from "../common/types";

  const { training = [] }: { training?: Training[] } = $props();

  const groupByExercise = $derived(Object.groupBy(training, (e) => e.name));
</script>

<div class="flex flex-col gap-1 overflow-hidden">
  {#each Object.entries(groupByExercise) as [name, group] (name)}
    <p class="capitalize truncate">
      {name}
    </p>
    <ul class="flex gap-2 content items-center overflow-scroll">
      {#each group as trainingExercise}
        <li
          class="bg-primary/10 border-primary rounded-md border p-2 flex flex-col gap-0.5 items-center"
        >
          <!-- <span class="icon-[boxicons--dumbbell] text-2xl leading-none"> -->
          <!-- </span> -->
          <EmojiRpe level={trainingExercise.rpe} class="size-8" />
          <span class="leading-none">
            {trainingExercise.weight}kg x {trainingExercise.reps}
          </span>
        </li>
      {/each}
    </ul>
  {/each}
</div>
