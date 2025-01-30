<script lang="ts">
  const getGreetings = (hour: number) => {
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
</script>

<div class="rounded-lg bg-gray-900/60 p-4 text-center text-4xl font-bold text-white">
  {getGreetings(new Date().getHours())}, Blank
</div>
