<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();
  let pointerTimer = $state<number>();

  const increment = () => {
    clearInterval(pointerTimer);
    value = Math.min(100, value + 1);
  };

  const decrement = () => {
    clearInterval(pointerTimer);
    value = Math.max(0, value - 1);
  };

  const onPointerDown = (btn: "minus" | "plus") => {
    pointerTimer = setInterval(() => {
      if (btn === "minus") value = Math.max(0, value - 1);
      if (btn === "plus") value = Math.min(100, value + 1);
    }, 100);
  };

  const onPointerUp = () => {
    clearInterval(pointerTimer);
  };
</script>

<div class="flex gap-4 items-center justify-center">
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="Minus Reps"
    onclick={decrement}
    onpointerdown={() => onPointerDown("minus")}
    onpointerup={onPointerUp}
  >
    <span class="icon-[tabler--minus]"></span>
  </button>
  <span class="btn btn-primary w-20 h-14 text-center text-4xl">
    {value}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="More Reps"
    onclick={increment}
    onpointerdown={() => onPointerDown("plus")}
    onpointerup={onPointerUp}
  >
    <span class="icon-[tabler--plus]"></span>
  </button>
</div>
