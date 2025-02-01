import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { adapter } from "./custom/svelte-adapter-chrome-extension.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    appDir: "app",
    adapter: adapter(),
  },
};

export default config;
