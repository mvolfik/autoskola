<script lang="ts">
  import dataJson from "./data/data.json?url";
  import Practice from "./lib/Practice.svelte";
  import { downloadMediaIndex, type QuestionData } from "./lib/utils";

  const data: Promise<[Record<string, QuestionData>, Record<string, string>]> =
    Promise.all([fetch(dataJson).then((r) => r.json()), downloadMediaIndex()]);
</script>

{#await data}
  <p>Vyčkejte chvilku, stahuji data otázek</p>
{:then [questions, mediaIndex]}
  <Practice {questions} {mediaIndex} />
{:catch e}
  <p>Chyba</p>
  <pre>{e}</pre>
{/await}
