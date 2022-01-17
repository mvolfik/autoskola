<script lang="ts">
  import type { Questions } from "./utils";
  import Question from "./Question.svelte";
  import { onMount } from "svelte";
  import { Writable, writable } from "svelte/store";

  export let questions: Questions;

  $: keys = [...Object.keys(questions)].sort();
  let stats: Writable<Record<string, number>>;

  function drawQuestion() {
    return keys[Math.floor(Math.random() * keys.length)];
  }

  let currentKey: string;
  $: currentQuestion = questions[currentKey];

  onMount(() => {
    let value: Record<string, number>;
    try {
      value = JSON.parse(localStorage.getItem("stats") ?? "{");
    } catch {
      value = {};
    }
    stats = writable(value);
    stats.subscribe((v) => {
      console.log(v);
      localStorage.setItem("stats", JSON.stringify(v));
    });
  });

  let answered = false;

  function next() {
    answered = false;
    currentKey = drawQuestion();
  }

  let statsView = {};
  $: {
    if (!stats) break $;
    statsView = keys.reduce((d, k) => {
      const i = $stats[k] ?? 0;
      if (d[i] === undefined) d[i] = 0;
      d[i] += 1;
      return d;
    }, {});
  }
</script>

<svelte:window
  on:keyup={(e) => {
    if (answered && (e.code === "Enter" || e.code === "NumpadEnter")) {
      next();
    }
  }}
/>

<div class="stats">
  <ul>
    {#each [...Object.entries(statsView)] as [i, n] (i)}<li>{i}: {n}</li>{/each}
  </ul>
  <p>
    <button
      on:click={() => {
        if (confirm("Opravdu resetovat statistiky?")) {
          $stats = {};
        }
      }}>Resetovat statistiku</button
    >
    <button
      on:click={async () => {
        try {
          await navigator.clipboard.writeText(JSON.stringify($stats));
          alert("Copied");
        } catch (e) {
          alert(e);
        }
      }}>Export</button
    >
    <button
      on:click={async () => {
        try {
          $stats = JSON.parse(prompt("Import"));
        } catch (e) {
          alert(e);
        }
      }}>Import</button
    >
  </p>
</div>

{#if currentQuestion}
  <Question
    on:answer={({ detail }) => {
      if (detail) {
        if ($stats[currentKey] === undefined) {
          $stats[currentKey] = 0;
        }
        $stats[currentKey] += 1;
      } else {
        delete $stats[currentKey];
      }
      answered = true;
    }}
    data={currentQuestion}
    {answered}
  />
{:else}
  <button on:click={next}>Start</button>
{/if}
{#if answered}
  <p>
    Bucket: {$stats[currentKey]}.
    <button on:click={next}>Continue (press enter)</button>
  </p>
{/if}
