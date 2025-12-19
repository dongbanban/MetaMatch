/*
 * @file: /Users/i104/MetaMatch/vite.config.ts
 * @author: dongyang
 */
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MetaMatch",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "axios",
        "chalk",
        "dotenv",
        // Node.js 内置模块
        "url",
        "path",
        "fs",
        "fs/promises",
        "http",
        "https",
        "stream",
        "util",
        "events",
        "buffer",
        "crypto",
        "os",
        "process",
        "tty",
        "net",
      ],
      output: {
        exports: "named",
      },
    },
    target: "node20",
    minify: false,
    sourcemap: true,
  },
});
