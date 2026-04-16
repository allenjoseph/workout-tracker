<script lang="ts">
    import { store } from "../../store.svelte";
    import { getExercises } from "../utils/api";

    let { value = $bindable() } = $props();

    let selectedExercise = $state<{ name: string; image: string }>();
    let zoomImage = $state(false);

    const onSelectHandler = (item: { name: string; image: string }) => {
        selectedExercise = item;
        value = item.name;
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
            zoomImage = zoom;
        });
    };
</script>

<div
    class="flex gap-2 items-center justify-start h-36 overflow-y-hidden snap-x"
>
    {#await getExercises(store.currentWorkoutMuscle)}
        <div class="skeleton skeleton-animated size-32"></div>
        <div class="skeleton skeleton-animated size-32"></div>
        <div class="skeleton skeleton-animated size-32"></div>
    {:then exercises}
        {#each exercises as item}
            <div
                class={[
                    "snap-start scroll-ml-2 border-4 outline rounded-lg size-32 flex-shrink-0 overflow-hidden relative skeleton skeleton-animated",
                    selectedExercise?.name === item.name
                        ? "border-primary dark:border-success outline-primary dark:outline-success"
                        : "border-transparent outline-gray-300 hover:border-primary dark:hover:border-success",
                ]}
            >
                <button
                    type="button"
                    class="size-full"
                    onclick={() => onSelectHandler(item)}
                    disabled={selectedExercise?.name === item.name}
                >
                    <figure>
                        <img
                            id={item.name}
                            src={item.image}
                            alt="Exercise"
                            class={[
                                "size-32 object-cover",
                                selectedExercise?.name === item.name &&
                                    "opacity-60",
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
    {/await}
</div>
{#if selectedExercise && zoomImage}
    <div
        class="fixed w-screen h-screen top-0 left-0 bg-black/80 flex flex-col justify-between items-center overflow-hidden z-50"
    >
        <h1 class="text-gray-100 text-2xl z-10 mt-8 rounded-lg text-center">
            <span class="bg-black/80 px-2 box-decoration-clone">
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

<style>
    .exercise-image-fullscreen {
        view-transition-name: exercise-image-fullscreen;
    }
</style>
