<script lang="ts">
  import { saveTraining } from "../../common/api";
  import type { Training } from "../../common/types";
  import { store } from "../../store.svelte";
  import InputDifficulty from "./InputDifficulty.svelte";
  import InputExercise from "./InputExercise.svelte";
  import InputRep from "./InputRep.svelte";
  import InputWeight from "./InputWeight.svelte";
  import ListOtherExercises from "./ListOtherExercises.svelte";
  import NewExercise from "./NewExercise.svelte";

  const { onSubmit }: { onSubmit: (training: Training) => void } = $props();

  let openNewExercise = $state(false);
  let loading = $state(false);

  let training: Training = $state({
    muscle: store.currentWorkoutMuscle!,
    reps: 15,
    weight: 20,
    name: undefined as never,
    rpe: undefined as never,
  });

  let invalid = $derived.by(
    () =>
      !training.muscle ||
      !training.name ||
      !training.reps ||
      !training.weight ||
      !training.rpe,
  );

  const onSubmitHandler = async (e: Event) => {
    e.preventDefault();
    if (!store.currentWorkout || invalid) return;
    loading = true;
    try {
      const result = await saveTraining(store.currentWorkout, training);

      onSubmit(result);
      training.rpe = undefined as never;
    } catch (ex) {
      console.log(ex);
    } finally {
      loading = false;
    }
  };
</script>

<form class="flex flex-col gap-4" onsubmit={onSubmitHandler}>
  <div class="relative space-y-2">
    <h3 class="font-semibold">Exercise:</h3>
    <div
      class="absolute right-0 top-0 z-10 w-full flex flex-col items-end gap-1"
    >
      <button
        type="button"
        class="btn-text btn-success float-right flex items-center gap-1"
        onclick={() => (openNewExercise = !openNewExercise)}
      >
        <span class="icon-[boxicons--plus]"></span>
        New
      </button>
      {#if openNewExercise}
        <NewExercise
          muscle={store.currentWorkoutMuscle!}
          onClose={() => (openNewExercise = false)}
        />
      {/if}
    </div>
    <InputExercise bind:value={training.name} />
    <ListOtherExercises
      muscle={store.currentWorkoutMuscle!}
      bind:value={training.name}
    />
  </div>
  <div class="space-y-2">
    <h3 class="font-semibold">Weight (Kg):</h3>
    <InputWeight bind:value={training.weight} />
  </div>
  <div class="space-y-2">
    <h3 class="font-semibold">Repetitions:</h3>
    <InputRep bind:value={training.reps} />
  </div>
  <div class="space-y-2">
    <h3 class="font-semibold">Difficulty:</h3>
    <InputDifficulty bind:value={training.rpe} />
  </div>
  <button
    type="submit"
    disabled={invalid || loading}
    class="btn btn-soft btn-primary dark:btn-success"
  >
    {#if loading}
      <span class="loading loading-spinner"></span>
    {:else}
      DONE
    {/if}
  </button>
</form>
