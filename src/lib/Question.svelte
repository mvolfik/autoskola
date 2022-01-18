<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { QuestionData } from "./utils";

  export let data: { answerId: string; data: QuestionData };
  export let answered: boolean;

  const dispatch = createEventDispatcher();
  $: shuffledAnswers = [...Object.entries(data.data.answers)].sort(() =>
    Math.random() > 0.5 ? 1 : -1
  );

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
  <p>{data.data.question}</p>
  {#if data.data.image !== undefined}
    <div class="media">
      <img
        src={"https://etesty2.mdcr.cz" + data.data.image}
        alt="Question detail"
      />
    </div>
  {/if}
  {#if data.data.video !== undefined}
    <div class="media">
      <video
        autoplay
        loop
        muted
        src={"https://etesty2.mdcr.cz" + data.data.video}
      />
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
