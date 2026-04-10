<script lang="ts">
  import type { Difficulty } from "../utils/types";
  import EmojiDifficulty from "./EmojiDifficulty.svelte";

  interface Props {
    value?: Difficulty;
    onChange?: (value: Difficulty) => void;
  }

  let { onChange, value = $bindable() }: Props = $props();

  $effect(() => {
    onChange?.(value as Difficulty);
  });
</script>

<div class="flex justify-center gap-4 overflow-x-auto">
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyEasy">
      <EmojiDifficulty level="easy" class="text-6xl" />
      <span class="block text-sm">easy</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyEasy"
      value="easy"
      bind:group={value}
    />
  </div>
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyMedium">
      <EmojiDifficulty level="medium" class="text-6xl" />
      <span class="block text-sm">medium</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyMedium"
      value="medium"
      bind:group={value}
    />
  </div>
  <div class="flex flex-col items-center">
    <label class="label-text text-base text-center" for="radioDifficultyHard">
      <EmojiDifficulty level="hard" class="text-6xl" />
      <span class="block text-sm">hard</span>
    </label>
    <input
      type="radio"
      name="difficulty"
      class="radio radio-primary dark:radio-success"
      id="radioDifficultyHard"
      value="hard"
      bind:group={value}
    />
  </div>
</div>
