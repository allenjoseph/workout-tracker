<script lang="ts">
  import type { Exercise } from "../utils/types";
  import EmojiDifficulty from "./EmojiDifficulty.svelte";

  const { exercises }: { exercises: Exercise[] } = $props();

  const muscles = $derived(Object.groupBy(exercises, (e) => e.muscle));
</script>

{#each Object.entries(muscles) as [muscle, exercises] (muscle)}
  {@const groupByExercise = Object.groupBy(exercises!, (e) => e.name)}
  <details>
    <summary class="cursor-pointer capitalize font-semibold text-xl">
      {muscle}
    </summary>
    <div class="flex flex-col gap-0.5 overflow-hidden">
      {#each Object.entries(groupByExercise) as [name, exercises], index (name)}
        <p class="capitalize truncate">
          {index + 1}. {name}
        </p>
        <ul class="flex gap-1 content items-center overflow-scroll ml-4 mb-4">
          {#each exercises as exercise}
            <li class="pt-4 pr-4">
              <div class="indicator">
                <span
                  class="indicator-item rounded-full ring size-7 p-0 flex items-center justify-center"
                >
                  <EmojiDifficulty level={exercise.rpe} class="size-8" />
                </span>
                <div
                  class="bg-primary/10 border-primary grid place-items-center rounded-md border px-2"
                >
                  <span class="icon-[boxicons--dumbbell] text-2xl leading-none"
                  ></span>
                  <span class="leading-none">{exercise.weight}kg</span>
                  <span class="leading-6">x {exercise.reps}</span>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  </details>
{/each}
