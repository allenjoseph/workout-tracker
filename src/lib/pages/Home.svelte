<script lang="ts">
  import dayjs from "dayjs";
  import { store } from "../../store.svelte";
  import Layout from "../components/Layout.svelte";

  const currentWorkout = $derived(store.workouts[store.currentDate]);
</script>

<Layout id="home" class="flex flex-col gap-6 px-6 py-4">
  <div class="flex justify-between items-center">
    <h1 class="text-xl capitalize!">
      {dayjs(store.currentDate).format("dddd, MMMM D, YYYY")}
    </h1>
    <button
      type="button"
      class={["btn", currentWorkout ? "btn-success" : "btn-primary"]}
      onclick={() => (store.currentPage = "workout-muscle")}
      >{currentWorkout ? "Continue" : "Start"}</button
    >
  </div>
  <div class="divider">Last Workouts</div>
</Layout>
