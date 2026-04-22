<script lang="ts">
    import { saveExercise } from "../../common/api";
    import type { Exercise } from "../../common/types";
    import { store } from "../../store.svelte";
    import InputDifficulty from "./InputDifficulty.svelte";
    import InputExercise from "./InputExercise.svelte";
    import InputRep from "./InputRep.svelte";
    import InputWeight from "./InputWeight.svelte";

    const { onSubmit }: { onSubmit: (exercise: Exercise) => void } = $props();

    let exercise: Exercise = $state({
        muscle: store.currentWorkoutMuscle!,
        reps: 15,
        weight: 20,
        name: undefined as never,
        rpe: undefined as never,
    });

    let invalid = $derived.by(
        () =>
            !exercise.muscle ||
            !exercise.name ||
            !exercise.reps ||
            !exercise.weight ||
            !exercise.rpe,
    );

    const onSubmitHandler = async (e: Event) => {
        e.preventDefault();
        if (!store.currentWorkout || invalid) return;

        await saveExercise(store.currentWorkout, exercise);

        onSubmit({ ...exercise });
        reset();
    };

    const reset = () => {
        exercise.reps = 15;
        exercise.weight = 20;
        exercise.name = undefined as never;
        exercise.rpe = undefined as never;
    };
</script>

<form class="flex flex-col gap-6" onsubmit={onSubmitHandler}>
    <div>
        <h4 class="text-center font-semibold">Exercise</h4>
        <InputExercise bind:value={exercise.name} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Repetitions</h4>
        <InputRep bind:value={exercise.reps} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Weight (Kg)</h4>
        <InputWeight bind:value={exercise.weight} />
    </div>
    <div class="space-y-2">
        <h4 class="text-center font-semibold">Difficulty</h4>
        <InputDifficulty bind:value={exercise.rpe} />
    </div>
    <button
        type="submit"
        disabled={invalid}
        class="btn btn-soft btn-primary dark:btn-success mt-4"
    >
        DONE
    </button>
</form>
