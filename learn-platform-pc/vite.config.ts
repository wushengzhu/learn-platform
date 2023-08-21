import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import WindiCSS from "vite-plugin-windicss";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default ({ mode }) =>
    defineConfig({
        plugins: [
            react(),
            eslint(),
            WindiCSS(),
            visualizer({
                open: true, // 注意这里要设置为true，否则无效
                gzipSize: true, // 打包压缩
                brotliSize: true, // 收集 brotli 大小并将其显示
            }) as Plugin,
        ],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: path.resolve("./src"),
                },
            ],
        },
        server: {
            host: "0.0.0.0",
            port: 1396,
            https: false,
            hmr: true,
            proxy: {
                "/graphql": `http://${
                    mode === "development" ? "localhost" : "120.24.5.14"
                }:1024`,
            },
        },
    });
