<script lang="ts">
  import Practice from "./lib/Practice.svelte";

  const data = fetch("/data.json").then((r) => r.json());
</script>

{#await data}
  <p>Vyčkejte chvilku, stahuji data otázek</p>
{:then questions}
  <Practice {questions} />
{:catch e}
  <p>Chyba</p>
  <pre>{e}</pre>
{/await}
