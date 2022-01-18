<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { QuestionData } from "./utils";

  export let data: QuestionData;
  export let answered: boolean;

  const dispatch = createEventDispatcher();
  let shuffledAnswers: [string, string][];
  $: {
    shuffledAnswers = [...Object.entries(data.answers)];
    if (!data.noShuffle)
      shuffledAnswers.sort(() => (Math.random() > 0.5 ? 1 : -1));
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
        choose(shuffledAnswers[i - 1][0]);
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
    {#each shuffledAnswers as [ansId, answer] (ansId)}
      <div>
        <button
          class="answer"
          disabled={answered}
          class:correct={answered && ansId === data.answerId}
          on:click={() => {
            choose(ansId);
          }}
        >
          {answer}
        </button>
      </div>
    {/each}
    <div style="grid-column: 2;">
      <slot />
    </div>
  </div>
  {#if !answered}
    <p style="color: #777;">
      Vyberte odpověď kliknutím nebo stiskem kláves 1/2/3
    </p>
  {/if}
</div>

<style lang="scss">
  .media > * {
    max-width: 100%;
  }

  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
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
