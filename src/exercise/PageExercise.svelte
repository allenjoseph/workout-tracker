<script lang="ts">
  import Layout from "../common/layout/Layout.svelte";
  import type { Exercise } from "../common/types";
  import { store } from "../store.svelte";
  import WorkoutExercises from "../workout/WorkoutExercises.svelte";
  import FormExercise from "./form/FormExercise.svelte";

  const exercises = $state<Exercise[]>([]);
  const groupByName = $derived(Object.groupBy(exercises, (i) => i.name));

  const onCompleteExercise = () => {
    if (exercises.length === 0) return;

    onBack();
  };

  const onBack = () => {
    store.currentWorkoutMuscle = undefined;
    store.currentPage = "workout";
  };
</script>

<Layout id="exercise" class="px-6 py-4 space-y-4" {onBack}>
  <FormExercise onSubmit={(exercise) => exercises.push(exercise)} />

  <div class="flex flex-col gap-4">
    {#each Object.entries(groupByName) as [name, exercises]}
      <WorkoutExercises {exercises} />
    {/each}
    <button
      type="button"
      class="btn btn-success"
      aria-label="Complete Exercise"
      onclick={onCompleteExercise}
      disabled={!Object.keys(groupByName).length}
    >
      COMPLETE
    </button>
  </div>
</Layout>
