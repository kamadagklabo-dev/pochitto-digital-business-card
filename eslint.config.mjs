import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  globalIgnores(["dist/**", "node_modules/**"]),
]);
