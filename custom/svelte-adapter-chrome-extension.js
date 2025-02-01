/**
 * This file is a JavaScript as svelte doesn't support TypeScript directly.
 */

import { join } from "path";
import glob from "tiny-glob";
import { transformWithEsbuild } from "vite";
import { readFile, writeFile } from "fs/promises";
import staticAdapter from "@sveltejs/adapter-static";

const SCRIPT_REGEX = /<script>([\s\S]+)<\/script>/;

/**
 * @param {string} value
 */
const fileHash = (value) => {
  let hash = 5381;
  let i = value.length;
  while (i--) hash = (hash * 33) ^ value.charCodeAt(i);
  return (hash >>> 0).toString(36);
};

/**
 * @param {string} directory
 */
const removeInlineScript = async (directory) => {
  await Promise.all(
    (await glob("./**/*.html", { cwd: directory, filesOnly: true, dot: true }))
      .map((f) => join(directory, f))
      .map(async (file) => {
        const f = await readFile(file, { encoding: "utf-8" });
        const script = f.match(SCRIPT_REGEX);
        if (script && script[1]) {
          const inlineContent = script[1]
            .replace("__sveltekit", "const __sveltekit")
            .replace("document.currentScript.parentElement", "document.body.firstElementChild");
          const inlineScript = `/inline.${fileHash(inlineContent)}.js`;
          const newHtml = f.replace(SCRIPT_REGEX, `<script type="module" src="${inlineScript}"></script>`);
          await writeFile(file, newHtml);
          await transformWithEsbuild(inlineContent, inlineScript).then(({ code }) =>
            writeFile(join(directory, inlineScript), code),
          );
          console.info(`  Inline script extracted and saved at: ${join(directory, inlineScript)}`);
        }
      }),
  );
};

/**
 * @param {import("@sveltejs/adapter-static").AdapterOptions} options
 * @returns {import("@sveltejs/kit").Adapter}
 */
export const adapter = (options) => ({
  name: "sveltekit-chrome-extension-adapter",
  adapt: async (builder) => {
    await staticAdapter(options).adapt(builder);
    await removeInlineScript(options?.assets ?? options?.pages ?? "build");
  },
});
