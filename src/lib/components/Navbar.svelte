<script lang="ts">
  import { store } from "../../store.svelte";

  interface Props {
    onBack?: () => void;
  }

  let { onBack }: Props = $props();
</script>

<nav class="navbar shadow-base-300/20 shadow-sm">
  <div class="navbar-start items-center">
    <header
      class="link text-base-content link-neutral text-xl font-bold no-underline inline-flex items-center gap-2"
    >
      <img src="/logo.svg" alt="Logo" class="min-w-6 size-6" />
      Workout
      {#if store.currentWorkoutMuscle}
        <span class="title capitalize">{store.currentWorkoutMuscle}</span>
      {/if}
    </header>
  </div>
  <div class="navbar-end flex items-center gap-4">
    {#if store.currentPage !== "home"}
      <button
        type="button"
        class="btn btn-circle btn-soft btn-primary dark:text-white/60 text-3xl"
        onclick={onBack}
        aria-label="Go Back"
      >
        <span class="icon-[tabler--arrow-left]"></span>
      </button>
    {/if}
    <button
      type="button"
      class="btn btn-circle btn-soft btn-primary text-3xl"
      onclick={() => null}
      aria-label="Profile"
    >
      <img src={store.user?.picture} alt="Profile" class="rounded-full" />
    </button>
  </div>
</nav>

<style>
  .title {
    view-transition-name: workout-muscle;
    width: fit-content;
  }
</style>
