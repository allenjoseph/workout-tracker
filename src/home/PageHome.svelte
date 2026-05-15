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

  const toggleCollapse = () => {};

  onMount(async () => {
    await getWorkouts();
  });
</script>

<Layout id="home" class="p-4">
  <div class="card">
    <ul class="flex flex-col w-full">
      {#each week as day}
        {@const workout = workouts.find((o) =>
          dayjs(o.timestamp).isSame(day, "day"),
        )}
        <li class="flex flex-col not-last:border-b border-base-content/20 p-4">
          <div class="flex items-center justify-between gap-2">
            <span
              class="text-success flex items-center justify-center rounded-full"
            >
              {#if workout}
                <span
                  class="icon-[boxicons--check-circle-filled] size-7 rtl:rotate-180"
                >
                </span>
              {:else}
                <span
                  class="icon-[boxicons--circle-dashed] size-7 rtl:rotate-180"
                >
                </span>
              {/if}
            </span>
            <span class="flex-1">
              {day.format("dddd, MMMM D, YYYY")}
            </span>
            {#if workout}
              <button
                type="button"
                onclick={toggleCollapse}
                aria-label="collapse"
              >
                <span
                  class="icon-[boxicons--chevron-down] size-7 rtl:rotate-180"
                >
                </span>
              </button>
            {/if}
          </div>
          {#if workout}
            <div class="divider divider-dashed my-2"></div>
            <WorkoutSummary exercises={workout.exercises} />
            {#if today.isSame(workout.timestamp, "day")}
              <button
                type="button"
                class="btn btn-sm btn-success mt-3"
                onclick={() => goToWorkout(workout.uuid)}
              >
                Continue
              </button>
            {:else if today.isBefore(workout.timestamp, "day")}
              <button
                type="button"
                class="btn btn-sm btn-neutral mt-3"
                onclick={() => goToWorkout(workout.uuid)}
              >
                View
              </button>
            {/if}
          {:else if day.isSame(today, "day")}
            <button
              type="button"
              class="btn btn-sm btn-success mt-3"
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
  </div>
</Layout>
