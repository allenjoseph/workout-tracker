<script lang="ts">
  import type { Exercise } from "../utils/types";
  import EmojiDifficulty from "./EmojiDifficulty.svelte";

  const { exercises }: { exercises: Exercise[] } = $props();

  const muscles = $derived(Object.groupBy(exercises, (e) => e.muscle));
</script>

{#each Object.entries(muscles) as [muscle, exercises] (muscle)}
  {@const groupByExercise = Object.groupBy(exercises!, (e) => e.name)}
  <details>
    <summary class="cursor-pointer">
      <span class="pl-1 capitalize font-semibold">
        [{Object.keys(groupByExercise).length}]
        {muscle}
      </span>
    </summary>
    <div class="flex flex-col gap-0.5 overflow-hidden">
      {#each Object.entries(groupByExercise) as [name, exercises]}
        <p class="capitalize truncate">
          <span class="badge size-2 p-0 ml-0.5 mr-2"></span>{name}
        </p>
        <ul
          class="flex gap-1 content items-center overflow-scroll divide-x divide-dashed ml-4 pb-1"
        >
          {#each exercises as exercise}
            <li class="text-nowrap inline-flex items-center gap-1 pl-1 pr-2">
              <EmojiDifficulty level={exercise.rpe} />
              <span>
                {exercise.weight}kg x {exercise.reps}
              </span>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  </details>
{/each}
