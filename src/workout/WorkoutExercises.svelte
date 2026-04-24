<script lang="ts">
  import EmojiRpe from "../common/components/EmojiRpe.svelte";
  import type { Training } from "../common/types";

  const { training = [] }: { training?: Training[] } = $props();

  const groupByExercise = $derived(Object.groupBy(training, (e) => e.name));
</script>

<div class="flex flex-col gap-0.5 overflow-hidden">
  {#each Object.entries(groupByExercise) as [name, group], index (name)}
    <p class="capitalize truncate font-semibold">
      <span class="badge size-1 p-0 mr-2"></span>
      {name}
    </p>
    <ul class="flex gap-1 content items-center overflow-scroll ml-4 mb-4">
      {#each group as trainingExercise}
        <li class="pt-4 pr-4">
          <div class="indicator">
            <span
              class="indicator-item rounded-full ring size-7 p-0 flex items-center justify-center"
            >
              <EmojiRpe level={trainingExercise.rpe} class="size-8" />
            </span>
            <div
              class="bg-primary/10 border-primary grid place-items-center rounded-md border px-2"
            >
              <span class="icon-[boxicons--dumbbell] text-2xl leading-none"
              ></span>
              <span class="leading-none">{trainingExercise.weight}kg</span>
              <span class="leading-6">x {trainingExercise.reps}</span>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/each}
</div>
