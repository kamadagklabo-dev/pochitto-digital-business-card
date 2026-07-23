import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("creates a Cloudflare Pages-ready static build", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>鎌田エリ子 \| ぽちっと電子名刺<\/title>/);
  assert.match(html, /<div id="root"><\/div>/);
  await access(new URL("../dist/_headers", import.meta.url));
  await access(new URL("../dist/_redirects", import.meta.url));
});

test("does not ship ChatGPT Sites runtime references", async () => {
  const [html, page] = await Promise.all([
    readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(html, /chatgpt\.site|signin-with-chatgpt|codex-preview/i);
  assert.doesNotMatch(page, /chatgpt\.site|signin-with-chatgpt|oai-authenticated/i);
  assert.match(page, /VITE_GAS_API_URL/);
});
