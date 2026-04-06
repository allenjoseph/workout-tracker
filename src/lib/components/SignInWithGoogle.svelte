<script lang="ts">
  import { onMount } from "svelte";
  import { store } from "../../store.svelte";

  let loading = $state(true);

  const signIn = () => {
    window.location.href = "/auth/signin/google";
  };

  onMount(() => {
    const user = localStorage.getItem("user");
    if (typeof user === "string" && user.match(/^\{.*\}$/)) {
      store.saveUser(JSON.parse(user));
      return;
    }

    fetch("/private/me")
      .then((res) => res.json())
      .then((user) => store.saveUser(user))
      .catch(() => (loading = false));
  });
</script>

<div class="flex items-center justify-center h-screen dark:bg-gray-800">
  <button
    type="button"
    class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
    onclick={signIn}
  >
    <img
      class="w-6 h-6"
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      loading="lazy"
      alt="google logo"
    />
    {#if loading}
      <span class="loading loading-spinner"></span>
    {:else}
      <span>Login with Google</span>
    {/if}
  </button>
</div>
