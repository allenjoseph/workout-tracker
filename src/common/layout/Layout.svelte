<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Navbar from "./Navbar.svelte";

  type Props = HTMLAttributes<Element> & {
    onBack?: () => void;
  };

  const { children, onBack, ...rest }: Props = $props();
</script>

<main class="min-h-screen">
  <Navbar {onBack} />
  <section {...rest}>
    {@render children?.()}
  </section>
</main>
