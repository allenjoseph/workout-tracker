<script lang="ts">
  import { onMount } from "svelte";
  import SignInWithGoogle from "./lib/components/SignInWithGoogle.svelte";
  import Home from "./lib/pages/Home.svelte";
  import WorkoutExercise from "./lib/pages/WorkoutExercise.svelte";
  import WorkoutMuscle from "./lib/pages/WorkoutMuscle.svelte";
  import { store } from "./store.svelte";

  const route = $derived(store.currentPage);

  onMount(() => {
    const workouts = localStorage.getItem("workouts");
    if (typeof workouts === "string" && workouts.match(/^\{.*\}$/)) {
      store.workouts = JSON.parse(workouts);
    }
  });
</script>

<section>
  {#if !store.user}
    <SignInWithGoogle />
  {:else if route === "home"}
    <Home />
  {:else if route === "workout-muscle"}
    <WorkoutMuscle />
  {:else if route === "workout-exercise"}
    <WorkoutExercise />
  {:else}
    <h1>Not Found</h1>
  {/if}
</section>
