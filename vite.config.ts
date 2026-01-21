import { defineConfig, loadEnv } from "vite";
import { readFileSync, rmSync } from "node:fs";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import { env } from "node:process";
import pkg from "./package.json";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.

  const isServe = command === "serve";
  const isBuild = command === "build";

  const env = loadEnv(mode, process.cwd(), "");

  // Remove this line if you don't want to clean the dist folder on each build.
  rmSync("dist-electron", { recursive: true, force: true });

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: "electron/main/index.ts",
          onstart(args) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App",
              );
            } else {
              args.startup();
            }
          },
          vite: {
            build: {
              // For Debugging with VSCode
              sourcemap: isServe || !!process.env.VSCODE_DEBUG,
              outDir: "dist-electron/main",
              minify: isBuild,
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {},
                ),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.join(__dirname, "electron/preload/index.ts"),
          vite: {
            build: {
              // For Debugging with VSCode
              sourcemap:
                isServe || !!process.env.VSCODE_DEBUG ? "inline" : undefined,
              outDir: "dist-electron/preload",
              minify: isBuild,
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {},
                ),
              },
            },
          },
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer:
          process.env.NODE_ENV === "test"
            ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
              undefined
            : {},
      }),
    ],
    server: {
      proxy: {
        "/kortecx": {
          target: "http://localhost:5678",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/kortecx/, ""),
        },
      },
    },
  };
});
