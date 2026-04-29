<script lang="ts">
  import type { Training } from "../common/types";
  import WorkoutExercises from "./WorkoutExercises.svelte";

  interface Props {
    exercises: Training[];
    deletable?: boolean;
  }

  const { exercises, deletable = false }: Props = $props();

  const muscles = $derived(Object.groupBy(exercises, (e) => e.muscle));
</script>

<div class="space-y-3 py-2">
  {#each Object.entries(muscles) as [muscle, training] (muscle)}
    <div>
      <p class="uppercase text-sm font-semibold">
        {muscle}
      </p>
      <WorkoutExercises {training} {deletable} />
    </div>
  {/each}
</div>
