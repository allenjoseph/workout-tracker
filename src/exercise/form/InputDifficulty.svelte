<script lang="ts">
  import EmojiRpe from "../../common/components/EmojiRpe.svelte";
  import { RPE } from "../../common/types";

  interface Props {
    value: RPE;
  }

  let { value = $bindable() }: Props = $props();
</script>

<div class="flex justify-center gap-4 overflow-x-auto">
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyEasy">
      <EmojiRpe level={RPE.easy} class="text-6xl" />
      <span class="block text-sm">easy</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyEasy"
      value={RPE.easy}
      bind:group={value}
    />
  </div>
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyMedium">
      <EmojiRpe level={RPE.medium} class="text-6xl" />
      <span class="block text-sm">medium</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyMedium"
      value={RPE.medium}
      bind:group={value}
    />
  </div>
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyHard">
      <EmojiRpe level={RPE.hard} class="text-6xl" />
      <span class="block text-sm">hard</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyHard"
      value={RPE.hard}
      bind:group={value}
    />
  </div>
</div>
