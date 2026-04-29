<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();

  const timers = $state<{ inc: number; dec: number }>({ inc: 0, dec: 0 });

  const increment = () => {
    value = Math.min(100, value + 1);
  };

  const decrement = () => {
    value = Math.max(0, value - 1);
  };

  const onPointerDown = (btn: "inc" | "dec") => {
    if (timers[btn]) return;
    clearInterval(timers[btn]);
    timers[btn] = setInterval(() => {
      if (btn === "dec") decrement();
      if (btn === "inc") increment();
    }, 100);
  };

  const onPointerUp = (btn: "inc" | "dec") => {
    clearInterval(timers[btn]);
    timers[btn] = 0;
  };
</script>

<div class="flex items-center justify-center">
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="Minus Reps"
    onpointerdown={() => onPointerDown("dec")}
    onpointerup={() => onPointerUp("dec")}
  >
    <span class="icon-[boxicons--minus]"></span>
  </button>
  <span class="btn btn-primary w-20 h-14 mx-6 text-center text-4xl">
    {value}
  </span>
  <button
    type="button"
    class="btn btn-text btn-primary btn-circle text-4xl btn-xl touch-manipulation"
    aria-label="More Reps"
    onpointerdown={() => onPointerDown("inc")}
    onpointerup={() => onPointerUp("inc")}
  >
    <span class="icon-[boxicons--plus]"></span>
  </button>
</div>
