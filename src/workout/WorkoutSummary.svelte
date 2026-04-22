<script lang="ts">
  import EmojiRpe from "../common/components/EmojiRpe.svelte";
  import type { Exercise } from "../common/types";
  import WorkoutExercises from "./WorkoutExercises.svelte";

  const { exercises }: { exercises: Exercise[] } = $props();

  const muscles = $derived(Object.groupBy(exercises, (e) => e.muscle));
</script>

{#each Object.entries(muscles) as [muscle, exercises] (muscle)}
  {@const groupByExercise = Object.groupBy(exercises!, (e) => e.name)}
  <div>
    <div class="divider divider-start capitalize text-lg">
      {muscle}
    </div>
    <WorkoutExercises {exercises} />
  </div>
{/each}
