<script lang="ts">
  import dayjs from "dayjs";
  import { store } from "../../store.svelte";
  import Layout from "../components/Layout.svelte";

  const muscles = [
    { name: "abs", image: "elevaciones_del_tronco_en_el_suelo.webp" },
    { name: "adductors", image: "aductores_en_polea_baja.webp" },
    { name: "back", image: "polea_al_pecho.webp" },
    { name: "biceps", image: "curl_de_biceps_alternos_con_supinacion.webp" },
    { name: "calves", image: "elevacion_de_talones_de_pie_en_maquina.webp" },
    { name: "delts", image: "elevaciones_laterales_con_mancuernas.webp" },
    {
      name: "forearms",
      image: "curl_de_antebrazos_con_barra_agarre_en_supinacion.webp",
    },
    {
      name: "glutes",
      image:
        "extension_de_la_cadera_en_el_suelo_o_patadas_de_gluteos_en_el_suelo.webp",
    },
    { name: "hamstrings", image: "curl_de_piernas_acostado_o_leg_curl.webp" },
    { name: "pecs", image: "aperturas_con_mancuernas_en_banco_inclinado.webp" },
    {
      name: "quads",
      image: "extension_de_rodillas_en_maquina_o_leg_extension.webp",
    },
    { name: "traps", image: "encogimiento_de_hombros_con_barra.webp" },
    { name: "triceps", image: "extensiones_de_triceps_en_polea_alta.webp" },
  ];

  const currentWorkout = $derived(store.workouts[store.currentDate] ?? []);
  const groupByMuscle = $derived(
    Object.groupBy(currentWorkout, (exercise) => exercise.muscle),
  );

  const onClickMuscle = (e: MouseEvent, muscle: string) => {
    if (!document.startViewTransition) return;

    const target = e.target as HTMLElement;
    target.style.viewTransitionName = "workout-muscle";

    document.startViewTransition(() => {
      target.style.viewTransitionName = "";
      store.currentPage = "workout-exercise";
      store.currentWorkoutMuscle = muscle.toLowerCase();
    });
  };
</script>

<Layout
  id="workout-muscle"
  class="px-6 py-4 space-y-4"
  onBack={() => (store.currentPage = "home")}
>
  <h1 class="font-semibold capitalize! text-center">
    {dayjs(store.currentDate).format("dddd, MMMM D, YYYY")}
  </h1>
  <div class="flex flex-col gap-2">
    {#each Object.entries(groupByMuscle) as [muscle, exercises]}
      <div class="flex flex-col gap-1">
        <div class="divider font-semibold text-primary">{muscle}</div>
        <div class="flex-1 flex flex-col gap-1 overflow-hidden">
          {#each exercises as exercise}
            <p class="text-sm truncate">
              ({exercise.series.length}) {exercise.name}
            </p>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div class="divider">Muscle to train</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {#each muscles as muscle}
      <button
        type="button"
        class="card dark:border dark:border-gray-400 image-full min-w-36 min-h-64"
        onclick={(event) => onClickMuscle(event, muscle.name)}
      >
        <figure>
          <img
            src={`/private/images/${muscle.name}/${muscle.image}`}
            alt="Muscle"
          />
        </figure>
        <div class="card-body px-0">
          <h2 class="text-2xl font-bold text-center w-32 truncate mx-auto">
            {muscle.name}
          </h2>
        </div>
      </button>
    {/each}
  </div>
</Layout>
