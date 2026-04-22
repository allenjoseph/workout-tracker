<script lang="ts">
  import { store } from "../../store.svelte";

  interface Props {
    onBack?: () => void;
  }

  let { onBack }: Props = $props();
  let openMenu = $state(false);

  const logout = () => {
    fetch("/auth/signout/google", { method: "post" })
      .then((res) => res.ok && store.saveUser(undefined))
      .catch(console.log);
  };
</script>

<nav class="navbar shadow-base-300/20 shadow-sm">
  <div class="navbar-start items-center">
    <header
      class="link text-base-content link-neutral text-xl font-bold no-underline inline-flex items-center gap-2"
    >
      <img src="/logo.svg" alt="Logo" class="min-w-6 size-6" />
      Workout
      {#if store.currentWorkoutMuscle}
        <span class="title capitalize">{store.currentWorkoutMuscle}</span>
      {/if}
    </header>
  </div>
  <div class="navbar-end flex items-center gap-4">
    {#if store.currentPage !== "home"}
      <button
        type="button"
        class="btn btn-circle btn-soft btn-primary dark:text-white/60 text-3xl"
        onclick={onBack}
        aria-label="Go Back"
      >
        <span class="icon-[boxicons--arrow-left-stroke]"></span>
      </button>
    {/if}
    <div class="dropdown relative inline-flex">
      <button
        id="dropdown-menu-icon"
        type="button"
        class="btn btn-circle btn-soft btn-primary text-3xl"
        aria-haspopup="menu"
        aria-expanded={openMenu}
        aria-label="Dropdown"
        onclick={() => (openMenu = !openMenu)}
      >
        <img src={store.user?.picture} alt="Profile" class="rounded-full" />
      </button>
      <ul
        class={[
          "absolute right-0 top-10 dropdown-menu border border-gray-100 p-0",
          openMenu ? "visible opacity-100" : "invisible opacity-0",
        ]}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-menu-icon"
      >
        <li>
          <button type="button" class="dropdown-item" onclick={logout}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .title {
    view-transition-name: workout;
    width: fit-content;
  }
</style>
