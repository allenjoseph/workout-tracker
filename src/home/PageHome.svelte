<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import Layout from "../common/layout/Layout.svelte";
  import type { Workout } from "../common/types";
  import { store } from "../store.svelte";
  import WorkoutSummary from "../workout/WorkoutSummary.svelte";

  const today = $state(dayjs());
  const week = $derived(
    Array.from({ length: 14 }).map((_, i) => today.subtract(i, "day")),
  );

  let loading = $state(false);
  let workouts = $state<Workout[]>([]);

  const goToWorkout = (workoutId: string) => {
    store.currentPage = "workout";
    store.currentWorkout = workoutId;
  };

  const startWorkout = async () => {
    loading = true;
    await fetch("/private/workouts", { method: "post" })
      .then((res) => res.json())
      .then(({ uuid }: { uuid: string }) => goToWorkout(uuid))
      .catch(console.log);
    loading = false;
  };

  const getWorkouts = async () => {
    loading = true;
    await fetch("/private/workouts")
      .then((res) => res.json())
      .then((data) => (workouts = data))
      .catch(console.log);
    loading = false;
  };

  onMount(async () => {
    await getWorkouts();
  });
</script>

<Layout id="home" class="py-4">
  <ul class="flex flex-col w-full">
    {#each week as day}
      {@const workout = workouts.find((o) =>
        dayjs(o.timestamp).isSame(day, "day"),
      )}
      <li class="flex flex-col border-b border-base-content/20 pt-1 pb-3 px-4">
        <p class="text-sm mt-2">
          {day.format("dddd, MMMM D, YYYY")}
        </p>
        {#if workout}
          <WorkoutSummary exercises={workout.exercises} />
          {#if today.isSame(workout.timestamp, "day")}
            <button
              type="button"
              class="btn btn-sm btn-success self-end"
              onclick={() => goToWorkout(workout.uuid)}
            >
              Continue
            </button>
          {:else if today.isBefore(workout.timestamp, "day")}
            <button
              type="button"
              class="btn btn-sm btn-neutral self-end"
              onclick={() => goToWorkout(workout.uuid)}
            >
              View
            </button>
          {/if}
        {:else if day.isSame(today, "day")}
          <button
            type="button"
            class="btn btn-sm btn-success self-end"
            onclick={startWorkout}
            disabled={loading}
          >
            {#if loading}
              <span class="loading loading-spinner"></span>
            {/if}
            Start
          </button>
        {/if}
      </li>
    {/each}
  </ul>
</Layout>
