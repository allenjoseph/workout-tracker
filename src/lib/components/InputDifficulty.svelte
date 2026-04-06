<script lang="ts">
  import type { Difficulty } from "../utils/types";

  interface Props {
    value?: Difficulty;
    onChange?: (value: Difficulty) => void;
  }

  let { onChange, value = $bindable() }: Props = $props();

  const setDifficulty = (difficulty: Difficulty) => {
    value = difficulty;
    onChange?.(difficulty);
  };
</script>

<div class="flex gap-4 justify-center">
  <button
    type="button"
    class={[
      "btn btn-circle btn-text text-black/30 dark:text-white/60 size-20",
      value === "easy" && "text-primary",
    ]}
    aria-label="Easy Button"
    onclick={() => setDifficulty("easy")}
  >
    <span class="icon-[system-uicons--face-sad] size-full"></span></button
  >
  <button
    type="button"
    class={[
      "btn btn-circle btn-text text-black/30 dark:text-white/60 size-20",
      value === "medium" && "text-primary",
    ]}
    aria-label="Medium Button"
    onclick={() => setDifficulty("medium")}
  >
    <span class="icon-[system-uicons--face-neutral] size-full stroke-1"
    ></span></button
  >
  <button
    type="button"
    class={[
      "btn btn-circle btn-text text-black/30 dark:text-white/60 size-20",
      value === "hard" && "text-primary",
    ]}
    aria-label="Hard Button"
    onclick={() => setDifficulty("hard")}
  >
    <span class="icon-[system-uicons--face-happy] size-full"></span></button
  >
</div>
