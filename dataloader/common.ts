import type { QuestionData } from "src/lib/utils";

const parser = new DOMParser();

export async function dlOne(
  id: number
): Promise<Omit<QuestionData, "answerId">> {
  const r = await fetch("https://etesty2.mdcr.cz/Test/RenderQuestion", {
    method: "POST",
    body: `id=${id}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const text = await r.text();
  const tree = parser.parseFromString(text, "text/html");

  const data: Omit<QuestionData, "answerId"> = {
    question: [
      ...tree.querySelectorAll<HTMLParagraphElement>("p.question-text"),
    ]
      .map((el) => el.innerText.trim())
      .filter((x) => x.length > 3)
      .join(";"),
    answers: {},
  };
  tree
    .querySelectorAll<HTMLDivElement>("div.answer-container > div")
    .forEach((node: HTMLDivElement, i: number) => {
      const id = node.dataset.answerid as string;

      const text = (
        node.querySelector("p") as HTMLParagraphElement
      ).innerText.trim();
      if (text === ".") {
        data.answers[id] = `${i + 1}.`;
        data.noShuffle = true;
      } else {
        data.answers[id] = text;
      }
    });
  const sortedAnswers = [...Object.values(data.answers)].sort();
  if (
    sortedAnswers.length === 2 &&
    sortedAnswers[0] === "Ano." &&
    sortedAnswers[1] === "Ne."
  ) {
    data.noShuffle = true;
  }

  const images = [
    ...tree.querySelectorAll<HTMLImageElement>("div.image-frame img"),
  ].map((node: HTMLImageElement) => node.getAttribute("src") as string);
  if (images.length > 0) {
    data.images = images;
  }
  const video = tree.querySelector<HTMLSourceElement>(
    "div.image-frame video source"
  );
  if (video !== null) {
    data.video = video.getAttribute("src") as string;
  }
  return data;
}
