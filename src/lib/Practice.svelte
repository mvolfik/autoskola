<script lang="ts">
  import type { QuestionData } from "./utils";
  import Question from "./Question.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";

  export let questions: Record<string, QuestionData>;
  export let mediaIndex: Record<string, string>;

  $: keys = [...Object.keys(questions)].sort();
  let stats: Writable<Record<string, number>>;

  function drawQuestion() {
    let sum = 0;
    const weights = [];
    for (const [i, ks] of statsView.entries()) {
      const w = ks.length / Math.pow(2, i);
      sum += w;
      weights.push(w);
    }
    const r = Math.random() * sum;
    let ps = 0;
    let i = 0;
    while (r >= ps) {
      ps += weights[i++];
    }
    let bucket = statsView[i - 1];

    return bucket[Math.floor(Math.random() * bucket.length)];
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
      localStorage.setItem("stats", JSON.stringify(v));
    });
  });

  let answered = false;
  let correctAnswer: boolean | null = null;

  function next() {
    answered = false;
    correctAnswer = null;
    currentKey = drawQuestion();
  }

  let statsView: string[][] = [];
  $: {
    if (!stats) break $;
    statsView = keys.reduce((d: string[][], k) => {
      const i = $stats[k] ?? 0;
      while (i >= d.length) d.push([]);
      d[i].push(k);
      return d;
    }, []);
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
    {#each [...statsView.entries()] as [i, ks] (i)}
      <li>{i}: {ks.length}</li>
    {/each}
  </ul>
  <div class="buttons">
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
          const data = prompt("Import");
          if (data === null) return;
          $stats = JSON.parse(data);
        } catch (e) {
          alert(e);
        }
      }}>Import</button
    >
  </div>
</div>

{#if currentQuestion}
  <Question
    {mediaIndex}
    on:answer={({ detail }) => {
      if (detail) {
        if ($stats[currentKey] === undefined) {
          $stats[currentKey] = 0;
        }
        $stats[currentKey] += 1;
      } else {
        delete $stats[currentKey];
      }
      correctAnswer = detail;
      answered = true;
    }}
    data={currentQuestion}
    {answered}
  >
    <div class="info">
      <span>Otázka {currentKey}</span>
      <span style:color={!answered ? "unset" : correctAnswer ? "#191" : "#911"}>
        {#if !answered}
          Vyberte odpověď
        {:else if correctAnswer}
          Správná odpověď ({$stats[currentKey]}.)
        {:else}
          Nesprávná odpověď
        {/if}
      </span>
      <button
        disabled={!answered}
        on:click={next}
        style="width: 100%; margin-top: 1rem;">&lt;Enter&gt;: Pokračovat</button
      >
    </div>
  </Question>
{:else}
  <div class="start">
    <button on:click={next}>Start</button>
  </div>
{/if}

<style lang="scss">
  .buttons {
    display: flex;
    gap: 1rem;

    & > * {
      flex-grow: 1;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .start {
    padding: 1.5rem;

    & > button {
      width: 100%;
      height: 3rem;
    }
  }
</style>
