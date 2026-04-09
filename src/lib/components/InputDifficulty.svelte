<script lang="ts">
  import type { Difficulty } from "../utils/types";

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
    <label class="label-text text-base" for="radioDifficultyEasy">
      <span class="icon-[twemoji--slightly-smiling-face] text-6xl"></span>
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
    <label class="label-text text-base" for="radioDifficultyMedium">
      <span class="icon-[twemoji--neutral-face] text-6xl"></span>
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
    <label class="label-text text-base" for="radioDifficultyHard">
      <span class="icon-[twemoji--sad-but-relieved-face] text-6xl"></span>
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
