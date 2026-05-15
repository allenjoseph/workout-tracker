<script lang="ts">
  const { onAccept, onCancel, children, loading = false } = $props();
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
  <div class="bg-white p-4 rounded-md">
    {@render children()}
    <div class="mt-4 flex gap-2">
      <button
        type="button"
        class="flex-1"
        onclick={onCancel}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="button"
        class="flex-1 btn btn-soft btn-primary dark:btn-success"
        onclick={onAccept}
        disabled={loading}
      >
        Accept
      </button>
    </div>
  </div>
</div>
