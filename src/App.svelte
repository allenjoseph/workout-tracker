<script lang="ts">
  import { onMount } from "svelte";
  import PageExercise from "./exercise/PageExercise.svelte";
  import PageHome from "./home/PageHome.svelte";
  import PageLogin from "./home/PageLogin.svelte";
  import { store } from "./store.svelte";
  import PageWorkout from "./workout/PageWorkout.svelte";

  const route = $derived(store.currentPage);

  onMount(() => {
    if (store.user) {
      fetch("/private/me").then((res) => {
        if (!res.ok && res.status === 401) {
          store.saveUser(undefined);
        }
      });
    }
  });
</script>

<section>
  {#if !store.user}
    <PageLogin />
  {:else if route === "home"}
    <PageHome />
  {:else if route === "workout"}
    <PageWorkout />
  {:else if route === "exercise"}
    <PageExercise />
  {:else}
    <h1>Not Found</h1>
  {/if}
</section>
