import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/bunny.ts"), // Punto de entrada
      name: "bunny",
      fileName: (format) => `bunny.${format}.js`,
      formats: ["es", "umd"], // Genera ESM y UMD
    },
    minify: "esbuild",
    rollupOptions: {
      output: [
        {
          format: "es",
          entryFileNames: "bunny.es.js",
        },
        {
          format: "umd",
          entryFileNames: "bunny.umd.js",
          name: "bunny",
          exports: "default",
        },
      ],
    },
  },
});
