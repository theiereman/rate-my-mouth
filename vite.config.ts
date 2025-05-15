import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), RubyPlugin()],
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "./app/javascript/layouts"),
      "@pages": path.resolve(__dirname, "./app/javascript/pages"),
      "@components": path.resolve(__dirname, "./app/javascript/components"),
      "@customTypes": path.resolve(__dirname, "./app/javascript/types"),
      "@helpers": path.resolve(__dirname, "./app/javascript/helpers"),
      "@const": path.resolve(__dirname, "./app/javascript/const"),
      "@contexts": path.resolve(__dirname, "./app/javascript/contexts"),
      "@hooks": path.resolve(__dirname, "./app/javascript/hooks"),
    },
  },
});
