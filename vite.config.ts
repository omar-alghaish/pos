import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],
  build: {
    minify: "terser",
  },
});
