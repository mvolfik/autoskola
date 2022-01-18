<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { QuestionData } from "./utils";

  export let data: QuestionData;
  export let answered: boolean;

  const dispatch = createEventDispatcher();
  let shuffledAnswers: [number, string, string][];
  $: {
    const ans = [...Object.entries(data.answers)];
    if (!data.noShuffle) ans.sort(() => (Math.random() > 0.5 ? 1 : -1));
    shuffledAnswers = ans.map(([k, v], i) => [i + 1, k, v]);
  }

  function choose(id: string) {
    if (answered) return;
    const correct = id === data.answerId;
    dispatch("answer", correct);
    answered = true;
  }
</script>

<svelte:window
  on:keyup={(e) => {
    for (let i = 1; i <= shuffledAnswers.length; i++) {
      if (e.code === `Digit${i}` || e.code === `Numpad${i}`) {
        choose(shuffledAnswers[i - 1][1]);
      }
    }
  }}
/>
<div>
  <p>{data.question}</p>
  {#if data.images !== undefined}
    <div class="media">
      {#each data.images as imgPath}
        <img src={"https://etesty2.mdcr.cz" + imgPath} alt="Question detail" />
      {/each}
    </div>
  {/if}
  {#if data.video !== undefined}
    <div class="media">
      <video autoplay loop muted src={"https://etesty2.mdcr.cz" + data.video} />
    </div>
  {/if}
  <div class="answers">
    {#each shuffledAnswers as [i, ansId, answer] (ansId)}
      <div>
        <button
          class="answer"
          disabled={answered}
          class:correct={answered && ansId === data.answerId}
          on:click={() => {
            choose(ansId);
          }}
        >
          &lt;{i}&gt;: {answer}
        </button>
      </div>
    {/each}
    <div style="grid-column: 2;">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .media > * {
    max-width: 100%;
  }

  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;

    & > div {
      & > button.answer {
        width: 100%;
        height: 100%;

        &.correct {
          background-color: #9f9;
        }
      }
    }
  }
</style>
