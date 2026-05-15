<script lang="ts">
  import { getExercisesFromImages } from "../../common/api";
  import { store } from "../../store.svelte";

  let { value = $bindable() } = $props();

  let zoomImage = $state(false);
  let selectedImage = $state<{ name: string; image: string }>();

  const onToggleZoom = (
    zoom: boolean,
    item: { name: string; image: string },
  ) => {
    if (!document.startViewTransition) return;

    const target = document.getElementById(item.name);
    if (!target) return;

    if (zoom) {
      selectedImage = item;
      target.style.viewTransitionName = "exercise-image-fullscreen";
    }
    document.startViewTransition(() => {
      target.style.viewTransitionName = "";
      zoomImage = zoom;
    });
  };
</script>

<div class="card">
  {#await getExercisesFromImages(store.currentWorkoutMuscle)}
    {@render skeleton()}
  {:then exercises}
    <ul>
      {#each exercises as item}
        <li
          class="not-last:border-b border-base-content/20 flex items-center gap-1 px-3 py-1"
        >
          <label class="flex-1 flex items-center gap-3">
            <input
              type="radio"
              name="otherExercise"
              class="radio radio-primary"
              value={item.name}
              bind:group={value}
            />
            <span class="label-text text-base">
              {item.name}
            </span>
          </label>
          <button
            type="button"
            class="border border-base-content/20 m-1 rounded"
            onclick={() => onToggleZoom(true, item)}
          >
            <figure>
              <img
                id={item.name}
                src={item.image}
                alt="Exercise"
                class="size-12 object-cover"
              />
            </figure>
          </button>
        </li>
      {/each}
    </ul>
  {/await}
</div>

<div
  class="fixed w-screen h-screen top-0 left-0 bg-black/80 flex flex-col justify-between items-center overflow-hidden z-50"
  hidden={!zoomImage || !selectedImage}
>
  <h1 class="text-gray-100 text-2xl z-10 mt-8 rounded-lg text-center">
    <span class="bg-black/80 px-2 box-decoration-clone">
      {selectedImage?.name}
    </span>
  </h1>
  <figure class="absolute">
    <img
      src={selectedImage?.image}
      alt="Exercise Zoomed"
      class="exercise-image-fullscreen w-screen h-screen object-contain"
    />
  </figure>
  <button
    type="button"
    class="inline-flex rounded-full bg-black/50 text-gray-100 text-6xl z-10 mb-8"
    aria-label="Close"
    onclick={() => onToggleZoom(false, selectedImage!)}
  >
    <span class="icon-[boxicons--x-circle]"></span>
  </button>
</div>

{#snippet skeleton()}
  <ul>
    <li
      class="not-last:border-b border-base-content/20 flex items-center gap-4 px-4 py-2"
    >
      <div class="skeleton skeleton-animated h-6 flex-1"></div>
      <div class="skeleton skeleton-animated size-12"></div>
    </li>
    <li
      class="not-last:border-b border-base-content/20 flex items-center gap-4 px-4 py-2"
    >
      <div class="skeleton skeleton-animated h-6 flex-1"></div>
      <div class="skeleton skeleton-animated size-12"></div>
    </li>
    <li
      class="not-last:border-b border-base-content/20 flex items-center gap-4 px-4 py-2"
    >
      <div class="skeleton skeleton-animated h-6 flex-1"></div>
      <div class="skeleton skeleton-animated size-12"></div>
    </li>
  </ul>
{/snippet}

<style>
  .exercise-image-fullscreen {
    view-transition-name: exercise-image-fullscreen;
  }
</style>
