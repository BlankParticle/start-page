<script lang="ts">
  import Clock from "../components/Clock.svelte";
  import Greeting from "../components/Greeting.svelte";
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-gray-900/40 backdrop-blur-[1px]">
  <div class="flex flex-col items-center justify-center gap-4">
    <Clock />
    <Greeting />
  </div>
</div>
