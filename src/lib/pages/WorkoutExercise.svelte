<script lang="ts">
  import dayjs from "dayjs";
  import { store } from "../../store.svelte";
  import InputDifficulty from "../components/InputDifficulty.svelte";
  import InputLift from "../components/InputLift.svelte";
  import InputRep from "../components/InputRep.svelte";
  import Layout from "../components/Layout.svelte";
  import type { Serie } from "../utils/types";

  let loading = $state(true);
  let exercises = $state<{ name: string; image: string }[]>([]);
  let selectedExercise = $state<{ name: string; image: string }>();
  let zoomInExercise = $state(false);
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
      name: selectedExercise.name,
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

  const onToggleZoom = (zoom: boolean, targetId: string) => {
    if (!document.startViewTransition) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    if (zoom) {
      target.style.viewTransitionName = "exercise-image-fullscreen";
    }
    document.startViewTransition(() => {
      target.style.viewTransitionName = "";
      zoomInExercise = zoom;
      if (!zoom) {
        target.style.viewTransitionName = "exercise-image-fullscreen";
      }
    });
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
              .replace(".webp", "")
              .replaceAll("_", " "),
          }));
        })
        .catch(console.log)
        .finally(() => (loading = false));
    }
  });
</script>

<Layout id="workout-exercise" class="px-6 py-4 space-y-4" {onBack}>
  <form class="flex flex-col gap-4" onsubmit={onCompleteSerie}>
    <div
      class="flex gap-2 items-center justify-start h-38 pb-4 overflow-y-hidden snap-x"
    >
      {#if loading}
        <div class="skeleton skeleton-animated size-32"></div>
        <div class="skeleton skeleton-animated size-32"></div>
        <div class="skeleton skeleton-animated size-32"></div>
      {/if}
      {#each exercises as item}
        <div
          class={[
            "snap-start scroll-ml-2 border-4 outline rounded-lg size-32 flex-shrink-0 overflow-hidden relative m-1 skeleton skeleton-animated",
            selectedExercise?.name === item.name
              ? "border-primary dark:border-success outline-primary dark:outline-success"
              : disableExerciseSelector
                ? "opacity-30 border-gray-300 outline-gray-300"
                : "border-transparent outline-gray-300 hover:border-primary dark:hover:border-success",
          ]}
        >
          <button
            type="button"
            class="size-full"
            onclick={() => (selectedExercise = item)}
            disabled={disableExerciseSelector ||
              selectedExercise?.name === item.name}
          >
            <figure>
              <img
                id={item.name}
                src={item.image}
                alt="Exercise"
                class={[
                  "size-32 object-cover",
                  selectedExercise?.name === item.name && "opacity-60",
                ]}
              />
            </figure>
          </button>
          {#if selectedExercise?.name === item.name}
            <button
              type="button"
              aria-label="zoom"
              class="absolute inset-0 text-6xl text-primary dark:text-white"
              onclick={() => onToggleZoom(true, item.name)}
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
  {#if selectedExercise && zoomInExercise}
    <div
      class="fixed w-screen h-screen top-0 left-0 bg-black/80 flex flex-col justify-between items-center overflow-hidden"
    >
      <h1 class="text-gray-100 text-2xl z-10 mt-8 rounded-lg text-center">
        <span class="bg-black/50 px-2 box-decoration-clone">
          {selectedExercise.name}
        </span>
      </h1>
      <figure class="absolute">
        <img
          src={selectedExercise.image}
          alt="Exercise Zoomed"
          class="exercise-image-fullscreen w-screen h-screen object-contain"
        />
      </figure>
      <button
        type="button"
        class="inline-flex rounded-full bg-black/50 text-gray-100 text-8xl z-10 mb-8"
        aria-label="Close"
        onclick={() => onToggleZoom(false, selectedExercise!.name)}
      >
        <span class="icon-[tabler--playstation-x]"></span>
      </button>
    </div>
  {/if}
</Layout>

<style>
  .exercise-image-fullscreen {
    view-transition-name: exercise-image-fullscreen;
  }
</style>
