<script lang="ts">
  import clsx from "clsx";
  const { matrix }: { matrix: (boolean | number)[][] } = $props();
</script>

<div class="flex flex-col gap-1 rounded-lg bg-gray-700/25 p-2 shadow-2xl shadow-slate-900 will-change-auto">
  {#each matrix as row, i}
    <div class="flex gap-1">
      {#each row as active, j}
        <div
          style:transition-delay={`${i * 50 + j * 10}ms`}
          class={clsx(
            "border-glow-green-500 size-4 scale-0 rounded-xs bg-green-500 transition-all duration-300 ease-in-out",
            active && "scale-100",
          )}
        ></div>
      {/each}
    </div>
  {/each}
</div>
