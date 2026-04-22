<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();

  const timers = $state<{ inc: number; dec: number }>({ inc: 0, dec: 0 });

  const increment = (delta = 0.25) => {
    value = Math.min(200, value + delta);
  };

  const decrement = (delta = 0.25) => {
    value = Math.max(0, value - delta);
  };

  const onPointerDown = (btn: "inc" | "dec") => {
    if (timers[btn]) return;
    clearInterval(timers[btn]);
    timers[btn] = setInterval(() => {
      if (btn === "dec") decrement();
      if (btn === "inc") increment();
    }, 75);
  };

  const onPointerUp = (btn: "inc" | "dec") => {
    clearInterval(timers[btn]);
    timers[btn] = 0;
  };
</script>

<div class="flex items-center justify-center">
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-6xl btn-xl touch-manipulation"
    aria-label="Minus Weight"
    onclick={() => decrement(10)}
  >
    <span class="icon-[boxicons--chevron-left]"></span>
  </button>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="Minus Weight"
    onpointerdown={() => onPointerDown("dec")}
    onpointerup={() => onPointerUp("dec")}
  >
    <span class="icon-[boxicons--minus]"></span>
  </button>
  <span class="btn btn-primary w-36 h-14 text-center text-4xl mx-4">
    {value.toFixed(2)}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="More Weight"
    onpointerdown={() => onPointerDown("inc")}
    onpointerup={() => onPointerUp("inc")}
  >
    <span class="icon-[boxicons--plus]"></span>
  </button>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-6xl btn-xl touch-manipulation"
    aria-label="More Weight"
    onclick={() => increment(10)}
  >
    <span class="icon-[boxicons--chevron-right]"></span>
  </button>
</div>
