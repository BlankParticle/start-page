<script lang="ts">
  const { matrix }: { matrix: (boolean | number)[][] } = $props();
</script>

<div class="flex flex-col gap-1 rounded-lg bg-gray-700/25 p-2 shadow-2xl shadow-slate-900 will-change-auto">
  {#each matrix as row, i}
    <div class="flex gap-1">
      {#each row as active, j}
        <div style:transition-delay={`${i * 50 + j * 10}ms`} class={`led${!active ? " scale-0" : ""}`}></div>
      {/each}
    </div>
  {/each}
</div>
