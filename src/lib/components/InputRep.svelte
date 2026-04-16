<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();

  const increment = () => {
    value = value + 1;
  };

  const decrement = () => {
    value = value - 1;
  };

  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    value = Math.min(Math.max(value + event.deltaY, 0), 100);
  };
</script>

<div class="flex gap-4 items-center justify-center">
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="Minus Reps"
    onclick={decrement}
  >
    <span class="icon-[tabler--minus]"></span>
  </button>
  <span
    class="btn btn-primary w-20 h-14 text-center text-4xl"
    onwheel={onWheel}
  >
    {value}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="More Reps"
    onclick={increment}
  >
    <span class="icon-[tabler--plus]"></span>
  </button>
</div>
