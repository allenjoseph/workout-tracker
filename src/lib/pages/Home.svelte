<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { store } from "../../store.svelte";
  import DetailsWorkout from "../components/DetailsWorkout.svelte";
  import Layout from "../components/Layout.svelte";
  import type { Workout } from "../utils/types";

  const today = $state(dayjs());
  const week = $derived(
    Array.from({ length: 5 }).map((_, i) => today.subtract(i, "day")),
  );

  let loading = $state(false);
  let workouts = $state<Workout[]>([]);

  const goToWorkout = (workoutId: string) => {
    store.currentPage = "workout-muscle";
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

<Layout id="home" class="px-6 py-4">
  <ul class="flex flex-col gap-4 w-full">
    {#each week as day}
      {@const workout = workouts.find((o) =>
        dayjs(o.timestamp).isSame(day, "day"),
      )}
      <li class="flex flex-col">
        <p>
          {#if day.isSame(today, "day")}
            <span class="badge badge-secondary size-4.5 rounded-full p-0">
              <span class="badge badge-secondary size-3 rounded-full p-0">
              </span>
            </span>
          {:else}
            <span class="badge badge-primary size-4.5 rounded-full p-0">
              <span class="icon-[tabler--check] text-primary-content size-3.5">
              </span>
            </span>
          {/if}
          <span class="text-sm mt-2">
            {day.format("dddd, MMMM D, YYYY")}
          </span>
        </p>
        {#if workout}
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
          <div class="px-6">
            <DetailsWorkout exercises={workout.exercises} />
          </div>
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
