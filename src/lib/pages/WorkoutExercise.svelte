<script lang="ts">
  import dayjs from "dayjs";
  import { store } from "../../store.svelte";
  import InputDifficulty from "../components/InputDifficulty.svelte";
  import InputLift from "../components/InputLift.svelte";
  import InputRep from "../components/InputRep.svelte";
  import Layout from "../components/Layout.svelte";
  import type { Serie } from "../utils/types";

  let exercises = $state<{ name: string; image: string }[]>([]);
  let selectedExercise = $state<string>();
  let serie = $state<Serie>({ reps: 15, lift: 20 } as Serie);
  const series = $state<Serie[]>([]);

  const disableExerciseSelector = $derived(
    !!selectedExercise && series.length > 0,
  );

  const onCompleteSerie = (e: Event) => {
    e.preventDefault();
    if (!selectedExercise || !serie.lift || !serie.reps || !serie.difficulty)
      return;

    series.push({ ...serie } as Serie);
    serie = { ...serie, difficulty: undefined as never };
  };

  const onCompleteExercise = () => {
    if (!store.currentWorkoutMuscle || !selectedExercise || series.length === 0)
      return;

    store.saveExercise({
      name: selectedExercise,
      muscle: store.currentWorkoutMuscle,
      series: [...series],
      timestamp: dayjs().toISOString(),
    });
    onBack();
  };

  const onBack = () => {
    store.currentWorkoutMuscle = undefined;
    store.currentPage = "workout-muscle";
  };

  $effect(() => {
    if (store.currentWorkoutMuscle) {
      fetch(`/private/exercises/${store.currentWorkoutMuscle}`)
        .then((res) => res.json())
        .then((data: { exercises: string[] }) => {
          exercises = data.exercises.map((image) => ({
            image: `/private/images/${image}`,
            name: image
              .replace(`${store.currentWorkoutMuscle}/`, "")
              .replace(".webp", ""),
          }));
        })
        .catch(console.log);
    }
  });
</script>

<Layout id="workout-exercise" class="px-6 py-4 space-y-4" {onBack}>
  <form class="flex flex-col gap-4" onsubmit={onCompleteSerie}>
    <div class="flex gap-2 items-center justify-start overflow-y-hidden pb-4">
      {#each exercises as item}
        <div
          class={[
            "border-4 outline rounded-lg size-32 flex-shrink-0 overflow-hidden relative m-1",
            selectedExercise === item.name
              ? "border-primary dark:border-success outline-primary dark:outline-success"
              : disableExerciseSelector
                ? "opacity-30 border-gray-300 outline-gray-300"
                : "border-transparent outline-gray-600",
          ]}
        >
          <button
            type="button"
            class="size-full"
            onclick={() => (selectedExercise = item.name)}
            disabled={disableExerciseSelector || selectedExercise === item.name}
          >
            <figure>
              <img
                src={item.image}
                alt="Exercise"
                class={[
                  "size-32 object-cover",
                  selectedExercise === item.name && "opacity-60",
                ]}
              />
            </figure>
          </button>
          {#if selectedExercise === item.name}
            <button
              type="button"
              aria-label="zoom"
              class="absolute inset-0 text-6xl text-primary dark:text-white"
            >
              <span class="icon-[tabler--zoom-in-area]"></span>
            </button>
          {/if}
        </div>
      {/each}
    </div>
    <div class="card">
      <div class="card-body gap-6">
        <h5 class="card-title">{series.length + 1}º Serie</h5>
        <div class="space-y-4">
          <h4 class="text-center font-semibold">Repetitions</h4>
          <InputRep
            value={serie.reps}
            onChange={(value) => (serie.reps = value)}
          />
        </div>
        <div class="space-y-4">
          <h4 class="text-center font-semibold">Lift (Kg)</h4>
          <InputLift
            value={serie.lift}
            onChange={(value) => (serie.lift = value)}
          />
        </div>
        <div class="space-y-4 text-center">
          <h4 class="text-center font-semibold">Difficulty</h4>
          <button
            type="submit"
            disabled={!selectedExercise || !serie.reps || !serie.lift}
          >
            <InputDifficulty
              value={serie.difficulty}
              onChange={(value) => (serie.difficulty = value)}
            />
          </button>
        </div>
      </div>
    </div>
  </form>
  {#if series.length > 0}
    <div class="divider">series</div>
    <ul class="list-inside list-decimal marker:text-primary flex-1">
      {#each series as s}
        <li class="lowercase!">
          {s.reps} reps with {s.lift}kg feels {s.difficulty}.
        </li>
      {/each}
    </ul>
    <div class="flex justify-center">
      <button
        type="button"
        class="btn btn-success btn-wide"
        aria-label="Complete Exercise"
        onclick={onCompleteExercise}
      >
        Complete Exercise
      </button>
    </div>
  {/if}
</Layout>
