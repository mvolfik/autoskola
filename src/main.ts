import "./lib/global.scss";
import App from "./App.svelte";

new App({
  target: document.body,
});

(async () => {
  if (localStorage.getItem("worker-info") === "y") return;
  alert(
    (await navigator?.serviceWorker?.register?.("/autoskola/sw.js", {
      scope: "/autoskola/",
    }))
      ? "Service Worker byl stažen, znovu načtěte stránku a poté bude možné aplikaci používat plně offline"
      : "Nepodařilo se stáhnout Service Worker - obrázky a seznam otázek tak mohou být stahovány opakovaně"
  );
  localStorage.setItem("worker-info", "y");
})();
