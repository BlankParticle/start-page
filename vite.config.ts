import { join } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { readFileSync, writeFileSync } from "node:fs";

const removeInlineScript = (directory: string) => {
  const hash = (value: string | number[]) => {
    let hash = 5381;
    let i = value.length;
    if (typeof value === "string") {
      while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
    } else {
      while (i) hash = (hash * 33) ^ value[--i];
    }
    return (hash >>> 0).toString(36);
  };

  const scriptRegex = /<script>([\s\S]+)<\/script>/;
  const files = ["./index.html"];
  files
    .map((f) => join(directory, f))
    .forEach((file) => {
      const f = readFileSync(file, { encoding: "utf-8" });

      const script = f.match(scriptRegex);
      if (script && script[1]) {
        const inlineContent = script[1]
          .replace("__sveltekit", "const __sveltekit")
          .replace("document.currentScript.parentElement", "document.body.firstElementChild");
        const fn = `/script-${hash(inlineContent)}.js`;
        const newHtml = f.replace(scriptRegex, `<script type="module" src="${fn}"></script>`);
        writeFileSync(file, newHtml);
        writeFileSync(`${directory}${fn}`, inlineContent);
        console.log(`Inline script extracted and saved at: ${directory}${fn}`);
      }
    });
};

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    {
      name: "Inline Script Extractor",
      closeBundle: () => removeInlineScript("./build"),
    },
  ],
});
