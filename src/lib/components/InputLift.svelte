<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();
  let pointerTimer = $state<number>();

  const increment = () => {
    clearInterval(pointerTimer);
    value = Math.min(200, value + 0.25);
  };

  const decrement = () => {
    clearInterval(pointerTimer);
    value = Math.max(0, value - 0.25);
  };

  const onPointerDown = (btn: "minus" | "plus") => {
    pointerTimer = setInterval(() => {
      if (btn === "minus") value = Math.max(0, value - 0.25);
      if (btn === "plus") value = Math.min(200, value + 0.25);
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
    aria-label="Minus Lift"
    onclick={decrement}
    onpointerdown={() => onPointerDown("minus")}
    onpointerup={onPointerUp}
  >
    <span class="icon-[boxicons--minus]"></span>
  </button>
  <span class="btn btn-primary w-36 h-14 text-center text-4xl">
    {value.toFixed(2)}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="More Lift"
    onclick={increment}
    onpointerdown={() => onPointerDown("plus")}
    onpointerup={onPointerUp}
  >
    <span class="icon-[boxicons--plus]"></span>
  </button>
</div>
