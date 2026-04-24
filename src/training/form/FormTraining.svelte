<script lang="ts">
    import { saveTraining } from "../../common/api";
    import type { Training } from "../../common/types";
    import { store } from "../../store.svelte";
    import InputDifficulty from "./InputDifficulty.svelte";
    import InputExercise from "./InputExercise.svelte";
    import InputRep from "./InputRep.svelte";
    import InputWeight from "./InputWeight.svelte";
    import NewExercise from "./NewExercise.svelte";

    const { onSubmit }: { onSubmit: (training: Training) => void } = $props();

    let openNewExercise = $state(false);

    let training: Training = $state({
        muscle: store.currentWorkoutMuscle!,
        reps: 15,
        weight: 20,
        name: undefined as never,
        rpe: undefined as never,
    });

    let invalid = $derived.by(
        () =>
            !training.muscle ||
            !training.name ||
            !training.reps ||
            !training.weight ||
            !training.rpe,
    );

    const onSubmitHandler = async (e: Event) => {
        e.preventDefault();
        if (!store.currentWorkout || invalid) return;

        await saveTraining(store.currentWorkout, training);

        onSubmit({ ...training });
        training.rpe = undefined as never;
    };
</script>

<form class="flex flex-col gap-6" onsubmit={onSubmitHandler}>
    <div class="relative">
        <h4 class="text-center font-semibold">Exercise</h4>
        <div
            class="absolute right-0 top-0 z-10 w-full flex flex-col items-end gap-1"
        >
            <button
                type="button"
                class="btn-text btn-success float-right flex items-center gap-1"
                onclick={() => (openNewExercise = !openNewExercise)}
            >
                <span class="icon-[boxicons--plus]"></span>
                New
            </button>
            {#if openNewExercise}
                <NewExercise
                    muscle={store.currentWorkoutMuscle!}
                    onSave={() => (openNewExercise = false)}
                />
            {/if}
        </div>
        <InputExercise bind:value={training.name} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Repetitions</h4>
        <InputRep bind:value={training.reps} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Weight (Kg)</h4>
        <InputWeight bind:value={training.weight} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Difficulty</h4>
        <InputDifficulty bind:value={training.rpe} />
    </div>
    <button
        type="submit"
        disabled={invalid}
        class="btn btn-soft btn-primary dark:btn-success mt-4"
    >
        DONE
    </button>
</form>
