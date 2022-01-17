import type { Questions, QuestionData } from "./src/lib/utils";

async function fetchAll() {
  const questions: Questions = {};
  await Promise.all(
    [24, 16, 25, 14, 17, 19, 21, 22, 20].map(async (areaId) => {
      const items = await fetchLecture(areaId);
      await Promise.all(
        items.map(async ({ id, answerId }) => {
          if (questions[id] !== undefined) {
            console.warn(`ID ${id} was already seen`);
          } else {
            const x = { answerId, data: await dlOne(id) };
            questions[id] = x;
          }
        })
      );
    })
  );
  return questions;
}

async function fetchLecture(
  id: number
): Promise<{ id: number; answerId: string }[]> {
  const r = await fetch("https://etesty2.mdcr.cz/Test/GeneratePractise", {
    method: "POST",
    body: `lectureID=${id}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const data: {
    Questions: { QuestionID: number; Code: string; CorrectAnswers: number[] }[];
  } = (await r.json()) as any;
  return data.Questions.map((data) => ({
    id: data.QuestionID,
    answerId: data.CorrectAnswers[0].toString(),
  }));
}

// async function genTest(): Promise<number[]> {
//   const r = await fetch("https://etesty2.mdcr.cz/Test/GenerateTest", {
//     method: "POST",
//     body: "testTypeExamID=16",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   });
//   const data: { Questions: { QuestionID: number }[] } = (await r.json()) as any;
//   return data.Questions.map(({ QuestionID }) => QuestionID);
// }

const parser = new DOMParser();

async function dlOne(id: number): Promise<any> {
  const r = await fetch("https://etesty2.mdcr.cz/Test/RenderQuestion", {
    method: "POST",
    body: `id=${id}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const text = await r.text();
  const tree = parser.parseFromString(text, "text/html");

  const data: QuestionData = {
    question: [...tree.querySelectorAll("p.question-text")]
      .map((el) => el.innerText.trim())
      .filter((x) => x.length > 3)
      .join(";"),
    answers: {},
  };
  tree
    .querySelectorAll("div.answer-container > div")
    .forEach((node: HTMLDivElement) => {
      const id = node.dataset.answerid;
      data.answers[id] = node.querySelector("p").innerText.trim();
    });

  const image = tree.querySelector("div.image-frame img");
  if (image !== null) {
    data.image = image.getAttribute("src");
  }
  const video = tree.querySelector("div.image-frame video source");
  if (video !== null) {
    data.video = video.getAttribute("src");
  }
  return data;
}

(async () => {
  try {
    const data = JSON.stringify(await fetchAll(), null, 2);
    window.open("data:application/json," + encodeURIComponent(data));
  } catch (e) {
    console.log(e);
  }
})();
