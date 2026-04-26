<script lang="ts">
  import type { Training } from "../common/types";
  import WorkoutExercises from "./WorkoutExercises.svelte";

  const { exercises }: { exercises: Training[] } = $props();

  const muscles = $derived(Object.groupBy(exercises, (e) => e.muscle));
</script>

{#each Object.entries(muscles) as [muscle, exercises] (muscle)}
  <div class="pt-3">
    <p class="uppercase text-sm font-semibold">
      {muscle}
    </p>
    <WorkoutExercises training={exercises} />
  </div>
{/each}
