<script lang="ts">
  interface Props {
    value: number;
    onChange?: (value: number) => void;
  }

  let { onChange, value = $bindable() }: Props = $props();

  const increment = () => {
    value = value + 0.25;
    onChange?.(value);
  };

  const decrement = () => {
    value = value - 0.25;
    onChange?.(value);
  };

  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    value = Math.min(Math.max(value + event.deltaY * 0.25, 0), 100);
    onChange?.(value);
  };
</script>

<div class="flex gap-4 items-center justify-center">
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl"
    aria-label="Minus Lift"
    onclick={decrement}
  >
    <span class="icon-[tabler--minus]"></span>
  </button>
  <span
    class="btn btn-primary w-36 h-14 text-center text-4xl"
    onwheel={onWheel}
  >
    {value.toFixed(2)}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl"
    aria-label="More Lift"
    onclick={increment}
  >
    <span class="icon-[tabler--plus]"></span>
  </button>
</div>
