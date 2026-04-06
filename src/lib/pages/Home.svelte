<script lang="ts">
  import dayjs from "dayjs";
  import { store } from "../../store.svelte";
  import Layout from "../components/Layout.svelte";
</script>

<Layout id="home" class="flex flex-col gap-6 px-6 py-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl capitalize!">
      {dayjs(store.currentDate).format("dddd, MMMM D, YYYY")}
    </h1>
    <button
      type="button"
      class="btn btn-primary"
      onclick={() => (store.currentPage = "workout-muscle")}
      >{store.workouts[store.currentDate] ? "Continue" : "Start"}</button
    >
  </div>
  <div class="divider">Last Workouts</div>
</Layout>
