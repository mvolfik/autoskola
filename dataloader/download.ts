import { checkedNumberToArray, type QuestionData } from "../src/lib/utils";

async function fetchAll(): Promise<Record<string, QuestionData>> {
  const questions: Record<string, QuestionData> = {};
  await Promise.all(
    [24, 16, 25, 14, 17, 19, 21, 22, 20].map(async (areaId) => {
      const items = await fetchLecture(areaId);
      await Promise.all(
        items.map(async ({ id, answerId }) => {
          if (questions[id] !== undefined) {
            console.warn(`ID ${id} was already seen`);
          } else {
            const x = { answerId, ...(await dlOne(id)) };
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

async function dlOne(id: number): Promise<Omit<QuestionData, "answerId">> {
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

async function buildImageIndex(
  data: Record<string, QuestionData>
): Promise<ArrayBuffer> {
  const toDownload = new Set<string>();
  for (const { images, video } of Object.values(data)) {
    if (images) {
      for (const img of images) {
        toDownload.add(img);
      }
    }
    if (video) {
      toDownload.add(video);
    }
  }

  const encoder = new TextEncoder();
  const output: ArrayBuffer[] = [];
  for (const path of toDownload) {
    const nameArray = encoder.encode(path);
    output.push(checkedNumberToArray(nameArray.byteLength, Uint16Array));
    output.push(nameArray);
    const r = await fetch("https://etesty2.mdcr.cz" + path);
    const buffer = await r.arrayBuffer();
    output.push(checkedNumberToArray(buffer.byteLength, Uint32Array));
    output.push(buffer);
  }

  const totalLength = output.reduce((s, buf) => s + buf.byteLength, 0);
  const outBuf = new Uint8Array(totalLength);
  let i = 0;
  for (const buf of output) {
    outBuf.set(new Uint8Array(buf), i);
    i += buf.byteLength;
  }
  return outBuf;
}

// const B64_ALPHABET =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// function b64e(a: Uint8Array) {
//   let [out, leftover] = a.reduce<[string, number[]]>(
//     ([out, leftover], nextByte) => {
//       leftover.push(nextByte);
//       if (leftover.length === 3) {
//         out += B64_ALPHABET[leftover[0] >> 2];
//         out += B64_ALPHABET[(leftover[0] % 4 << 4) + (leftover[1] >> 4)];
//         out += B64_ALPHABET[(leftover[1] % 16 << 4) + (leftover[2] >> 6)];
//         out += B64_ALPHABET[leftover[2] % 64];
//         leftover = [];
//       }
//       return [out, leftover];
//     },
//     ["", []]
//   );
//   if (leftover.length === 1) {
//     out += B64_ALPHABET[leftover[0] >> 2];
//     out += B64_ALPHABET[leftover[0] % 4 << 4];
//     out += "==";
//   } else if (leftover.length === 2) {
//     out += B64_ALPHABET[leftover[0] >> 2];
//     out += B64_ALPHABET[(leftover[0] % 4 << 4) + (leftover[1] >> 4)];
//     out += B64_ALPHABET[leftover[1] % 16 << 4];
//     out += "=";
//   }
//   return out;
// }

(async () => {
  try {
    const data = await fetchAll();
    const r = await fetch("http://localhost:8678/data.json", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if ((await r.text()) !== "ok") throw new Error("Unexpected response");
    const imgData = await buildImageIndex(data);
    const r2 = await fetch("http://localhost:8678/media-bundle.bin", {
      method: "POST",
      body: imgData,
    });
    if ((await r2.text()) !== "ok") throw new Error("Unexpected response");
  } catch (e) {
    console.log(e);
  }
})();
