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
<div class="outer">
  <p>{data.data.question}</p>
  {#if data.data.image !== undefined}
    <div class="img">
      <img
        src={"https://etesty2.mdcr.cz" + data.data.image}
        alt="Question detail"
      />
    </div>
  {/if}
  {#if data.data.video !== undefined}
    <div class="vid">
      <video
        autoplay
        loop
        muted
        src={"https://etesty2.mdcr.cz" + data.data.video}
      />
    </div>
  {/if}
  <div class="answers" class:answered>
    {#each shuffledAnswers as [ansId, answer] (ansId)}
      <p
        class:correct={answered && ansId === data.answerId}
        on:click={() => {
          choose(ansId);
        }}
      >
        {answer}
      </p>
    {/each}
  </div>
  {#if !answered}
    <p class="info">Vyberte odpověď kliknutím nebo stiskem kláves 1/2/3</p>
  {/if}
</div>

<style lang="scss">
  .answers > p {
    border: 1px solid #222;
    cursor: pointer;

    &.correct {
      background-color: #9f9;
    }
  }
  .info {
    color: #777;
  }
</style>
