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
    <div class="card">
      <ul>
        {#each otherExercises as exercise}
          <li class="not-last:border-b border-base-content/20">
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
    </div>
  {/if}
{/await}
