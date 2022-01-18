<script lang="ts">
  import Practice from "./lib/Practice.svelte";
  import type { QuestionData } from "./lib/utils";

  const data: Promise<Record<string, QuestionData>> = fetch("/data.json").then(
    (r) => r.json()
  );
</script>

{#await data}
  <p>Vyčkejte chvilku, stahuji data otázek</p>
{:then questions}
  <Practice {questions} />
{:catch e}
  <p>Chyba</p>
  <pre>{e}</pre>
{/await}
