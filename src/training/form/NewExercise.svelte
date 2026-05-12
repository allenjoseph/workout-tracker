<script lang="ts">
  import { onMount } from "svelte";
  import { saveExercise } from "../../common/api";
  import Modal from "../../common/components/Modal.svelte";

  const { muscle, onClose }: { muscle: string; onClose: () => void } = $props();

  let inputNewExercise: HTMLInputElement;
  let name = $state<string>();
  let loading = $state(false);

  const saveNewExercise = async () => {
    if (!muscle || !name) return;

    loading = true;
    await saveExercise({ muscle, name });
    loading = false;
    onClose();
  };

  onMount(() => {
    inputNewExercise.focus();
  });
</script>

<Modal onAccept={saveNewExercise} onCancel={onClose}>
  <div class="input">
    <label class="label-text my-auto me-3 p-0" for="input-new-exercise">
      Name
    </label>
    <input
      type="text"
      class="grow"
      placeholder="New exercise"
      id="input-new-exercise"
      bind:value={name}
      bind:this={inputNewExercise}
    />
  </div>
  {#if loading}
    <div
      class="absolute top-0 size-[stretch] flex items-center justify-center z-30 bg-base-100/80"
    >
      <span class="loading loading-spinner loading-lg text-primary"> </span>
    </div>
  {/if}
</Modal>
