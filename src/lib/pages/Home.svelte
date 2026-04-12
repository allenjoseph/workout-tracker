<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { store } from "../../store.svelte";
  import DetailsWorkout from "../components/DetailsWorkout.svelte";
  import Layout from "../components/Layout.svelte";
  import type { Workout } from "../utils/types";

  let today = $state(dayjs());
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
  <ul
    class="timeline timeline-snap-icon timeline-compact timeline-vertical w-full"
  >
    {#each workouts as workout}
      {@const muscles = Object.groupBy(workout.exercises, (e) => e.muscle)}
      <span class="text-sm">
        {dayjs(workout.timestamp).format("dddd, MMMM D, YYYY")}
      </span>
      <li>
        <div class="timeline-middle">
          <span class="badge badge-primary size-4.5 rounded-full p-0">
            <span class="icon-[tabler--check] text-primary-content size-3.5">
            </span>
          </span>
        </div>
        <div class="timeline-end ms-2 m-3 w-full rounded-lg">
          <div class="flex justify-between">
            <p class="font-medium">
              {Object.keys(muscles).length} trained muscles
            </p>
            {#if today.isSame(workout.timestamp, "day")}
              <button
                type="button"
                class="btn btn-sm btn-success"
                onclick={() => goToWorkout(workout.uuid)}
              >
                Continue
              </button>
            {:else if today.isBefore(workout.timestamp, "day")}
              <button
                type="button"
                class="btn btn-sm btn-neutral"
                onclick={() => goToWorkout(workout.uuid)}
              >
                View
              </button>
            {:else}
              <button
                type="button"
                class="btn btn-sm btn-primary"
                onclick={startWorkout}
                disabled={loading}
              >
                {#if loading}
                  <span class="loading loading-spinner"></span>
                {:else}
                  Start
                {/if}
              </button>
            {/if}
          </div>
          <div class="space-y-1">
            <DetailsWorkout exercises={workout.exercises} />
          </div>
        </div>
        <hr class="bg-primary" />
      </li>
    {/each}
  </ul>
</Layout>

<style>

</style>
