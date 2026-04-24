<script lang="ts">
    import { onMount } from "svelte";
    import { saveExercise } from "../../common/api";

    const { muscle, onSave }: { muscle: string; onSave: () => void } = $props();

    let inputNewExercise: HTMLInputElement;
    let name = $state<string>();
    let loading = $state(false);

    const saveNewExercise = async () => {
        if (!muscle || !name) return;

        loading = true;
        await saveExercise({ muscle, name });
        loading = false;
        onSave();
    };

    onMount(() => {
        inputNewExercise.focus();
    });
</script>

<div
    class="relative border border-base-200 bg-base-100 w-full rounded-lg shadow-lg"
>
    <div class="p-4 w-full flex flex-col gap-2 items-end">
        <div class="input">
            <label class="label-text my-auto me-3 p-0" for="input-new-exercise"
                >Name</label
            >
            <input
                type="text"
                class="grow"
                placeholder="New exercise"
                id="input-new-exercise"
                bind:value={name}
                bind:this={inputNewExercise}
            />
        </div>
        <button
            type="button"
            class="btn btn-soft btn-primary dark:btn-success"
            onclick={saveNewExercise}
        >
            Save
        </button>
    </div>
    {#if loading}
        <div
            class="absolute top-0 size-[stretch] flex items-center justify-center z-30 bg-base-100/80"
        >
            <span class="loading loading-spinner loading-lg text-primary"
            ></span>
        </div>
    {/if}
</div>
