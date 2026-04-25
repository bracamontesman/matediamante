import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

const repositorioGitHub = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const urlSitio = process.env.URL_SITIO ?? "https://matediamante.com";
const usaRutaRepositorio = process.env.GITHUB_ACTIONS === "true" && urlSitio.includes("github.io");
const rutaBase =
  process.env.BASE_PATH ?? (usaRutaRepositorio && repositorioGitHub ? `/${repositorioGitHub}` : "/");

export default defineConfig({
  site: urlSitio,
  base: rutaBase,
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        "@componentes": fileURLToPath(new URL("./src/componentes", import.meta.url)),
        "@datos": fileURLToPath(new URL("./src/datos", import.meta.url)),
        "@disenos": fileURLToPath(new URL("./src/disenos", import.meta.url)),
        "@estilos": fileURLToPath(new URL("./src/estilos", import.meta.url)),
        "@utilidades": fileURLToPath(new URL("./src/utilidades", import.meta.url))
      }
    },
    build: {
      target: "es2022"
    }
  }
});
