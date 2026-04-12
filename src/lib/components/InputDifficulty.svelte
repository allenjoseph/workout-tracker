<script lang="ts">
  import { RPE } from "../utils/types";
  import EmojiDifficulty from "./EmojiDifficulty.svelte";

  interface Props {
    value: RPE;
    onChange?: (value: RPE) => void;
  }

  let { onChange, value = $bindable() }: Props = $props();

  $effect(() => {
    onChange?.(value);
  });
</script>

<div class="flex justify-center gap-4 overflow-x-auto">
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyEasy">
      <EmojiDifficulty level={RPE.easy} class="text-6xl" />
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
      <EmojiDifficulty level={RPE.medium} class="text-6xl" />
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
      <EmojiDifficulty level={RPE.hard} class="text-6xl" />
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
