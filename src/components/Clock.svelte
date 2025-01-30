<script lang="ts">
  import { LED_MATRIX_FONT_HIGH as FONT } from "../lib/led-matrix";
  import Display from "./Display.svelte";

  const toMatrix = (str: string) =>
    str
      .toUpperCase()
      .split("")
      .map((char) => FONT[char as keyof typeof FONT] ?? FONT[" "]);

  const formatTime = (date: Date) =>
    date
      .toLocaleTimeString("en-IN", {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replaceAll(":", date.getSeconds() % 2 ? ":" : " ");

  let leds = $state(toMatrix("########"));

  $effect(() => {
    const interval = setInterval(() => {
      leds = toMatrix(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="flex items-center justify-center gap-2 rounded-lg bg-gray-900/50 p-2">
  {#each leds as matrix}
    <Display {matrix} />
  {/each}
</div>
