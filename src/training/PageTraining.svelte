<script lang="ts">
  import Layout from "../common/layout/Layout.svelte";
  import type { Training } from "../common/types";
  import { store } from "../store.svelte";
  import WorkoutExercises from "../workout/WorkoutExercises.svelte";
  import FormTraining from "./form/FormTraining.svelte";

  const training = $state<Training[]>([]);
  const groupByName = $derived(Object.groupBy(training, (i) => i.name));

  const onCompleteExercise = () => {
    if (training.length === 0) return;

    onBack();
  };

  const onBack = () => {
    store.currentWorkoutMuscle = undefined;
    store.currentPage = "workout";
  };
</script>

<Layout id="training" class="px-6 py-4 space-y-4" {onBack}>
  <FormTraining onSubmit={(item) => training.push(item)} />

  <div class="flex flex-col gap-4">
    {#each Object.values(groupByName) as exercises}
      <WorkoutExercises training={exercises} deletable />
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
