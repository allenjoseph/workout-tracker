<script lang="ts">
  import { store } from "../../store.svelte";
  import EmojiDifficulty from "../components/EmojiDifficulty.svelte";
  import FormExercise from "../components/FormExercise.svelte";
  import Layout from "../components/Layout.svelte";
  import type { Exercise } from "../utils/types";

  let selectedExercise = $state<{ name: string; image: string }>();
  const exercises = $state<Exercise[]>([]);
  const groupByName = $derived(Object.groupBy(exercises, (i) => i.name));

  const onCompleteExercise = () => {
    if (exercises.length === 0) return;

    onBack();
  };

  const onBack = () => {
    store.currentWorkoutMuscle = undefined;
    store.currentPage = "workout-muscle";
  };
</script>

<Layout id="workout-exercise" class="px-6 py-4 space-y-4" {onBack}>
  <FormExercise onSubmit={(exercise) => exercises.push(exercise)} />

  <div class="flex flex-col gap-4">
    {#each Object.entries(groupByName) as [name, exercises]}
      <div class="divider capitalize">{name}</div>
      <ul class="list-inside list-decimal marker:text-primary flex-1">
        {#each exercises as s}
          <li>
            <span class="inline-flex gap-2 items-center">
              <EmojiDifficulty level={s.rpe} class="text-xl" />
              <span>{s.weight}kg x {s.reps}</span>
            </span>
          </li>
        {/each}
      </ul>
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
