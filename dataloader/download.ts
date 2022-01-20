import type { QuestionData } from "../src/lib/utils";
import { dlOne } from "./common";

export function checkLength(
  v: ArrayBufferLike,
  ArrayType: { BYTES_PER_ELEMENT: number }
) {
  if (v.byteLength >= Math.pow(2, ArrayType.BYTES_PER_ELEMENT * 8)) {
    throw new Error(
      `Can't store ${v.byteLength} in ${ArrayType.BYTES_PER_ELEMENT} bytes`
    );
  }
}

async function fetchAll(): Promise<Record<string, QuestionData>> {
  let questionIds = (
    await Promise.all([24, 16, 25, 14, 17, 19, 21, 22, 20].map(fetchLecture))
  ).flat();
  questionIds.push({ id: 2916, answerId: "28467" });
  questionIds.push({ id: 2930, answerId: "28572" });
  questionIds.sort(({ id }, { id: id2 }) => id - id2);
  let i = 1;
  while (i < questionIds.length) {
    if (questionIds[i - 1].id === questionIds[i].id) {
      console.warn(`Question was duplicated: ${questionIds[i].id}`);
      questionIds = [...questionIds.slice(0, i - 1), ...questionIds.slice(i)];
    } else {
      i += 1;
    }
  }

  console.info("Fetched question IDs, fetching details...");

  return Object.fromEntries(
    await Promise.all(
      questionIds.map(async ({ id, answerId }) => [
        id.toString(),
        { answerId, ...(await dlOne(id)) },
      ])
    )
  );
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
  } = await r.json();
  return data.Questions.map((data) => ({
    id: data.QuestionID,
    answerId: data.CorrectAnswers[0].toString(),
  }));
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

  console.info("Listed all media, downloading...");

  const encoder = new TextEncoder();
  const output: ArrayBuffer[] = await Promise.all(
    [...toDownload].sort().map(async (path) => {
      const nameArray = encoder.encode(path);
      checkLength(nameArray, Uint16Array);
      const r = await fetch("https://etesty2.mdcr.cz" + path);
      const imgData = await r.arrayBuffer();
      checkLength(imgData, Uint32Array);
      const out = new ArrayBuffer(
        Uint16Array.BYTES_PER_ELEMENT +
          nameArray.byteLength +
          Uint32Array.BYTES_PER_ELEMENT +
          imgData.byteLength
      );
      new DataView(out, 0, Uint16Array.BYTES_PER_ELEMENT).setUint16(
        0,
        nameArray.byteLength
      );
      new Uint8Array(out).set(nameArray, Uint16Array.BYTES_PER_ELEMENT);
      new DataView(
        out,
        Uint16Array.BYTES_PER_ELEMENT + nameArray.byteLength,
        Uint32Array.BYTES_PER_ELEMENT
      ).setUint32(0, imgData.byteLength);
      new Uint8Array(out).set(
        new Uint8Array(imgData),
        Uint16Array.BYTES_PER_ELEMENT +
          nameArray.byteLength +
          Uint32Array.BYTES_PER_ELEMENT
      );
      return out;
    })
  );

  console.info("Downloaded all media, concatenating into one bundle...");

  const totalLength = output.reduce((s, buf) => s + buf.byteLength, 0);
  const outBuf = new Uint8Array(totalLength);
  let i = 0;
  for (const buf of output) {
    outBuf.set(new Uint8Array(buf), i);
    i += buf.byteLength;
  }
  return outBuf;
}

(async () => {
  try {
    const data = await fetchAll();
    console.info("Fetched all questions, uploading...");
    const r = await fetch("http://localhost:8678/data.json", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if ((await r.text()) !== "ok") throw new Error("Unexpected response");
    console.info("Successfully uploaded question data");

    const imgData = await buildImageIndex(data);
    console.info("Built media bundle, uploading...");
    const r2 = await fetch("http://localhost:8678/media-bundle.bin", {
      method: "POST",
      body: imgData,
    });
    if ((await r2.text()) !== "ok") throw new Error("Unexpected response");
    console.info("Successfully uploaded media bundle");
    console.info("All done");
  } catch (e) {
    console.error(e);
  }
})();
