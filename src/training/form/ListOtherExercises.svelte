<script lang="ts">
  import { getExercises } from "../../common/api";

  interface Props {
    muscle: string;
    value: string;
  }

  let { muscle, value = $bindable() }: Props = $props();
</script>

{#await getExercises(muscle)}
  <div class="flex justify-center">
    <span class="loading loading-spinner loading-lg text-primary"> </span>
  </div>
{:then otherExercises}
  {#if otherExercises.length > 0}
    <h6 class="text-sm text-base-content mb-1">Other exercises:</h6>
    <ul
      class="border-base-content/25 divide-base-content/25 rounded-box divide-y border *:cursor-pointer"
    >
      {#each otherExercises as exercise}
        <li>
          <label class="flex items-center gap-3 p-3">
            <input
              type="radio"
              name="otherExercise"
              class="radio radio-primary"
              value={exercise.name}
              bind:group={value}
            />
            <span class="label-text text-base">
              {exercise.name}
            </span>
          </label>
        </li>
      {/each}
    </ul>
  {/if}
{/await}
