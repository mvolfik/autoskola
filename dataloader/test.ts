import { dlOne } from "./common";

async function genTest(): Promise<number[]> {
  const r = await fetch("https://etesty2.mdcr.cz/Test/GenerateTest", {
    method: "POST",
    body: "testTypeExamID=16",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const data: { Questions: { QuestionID: number }[] } = await r.json();
  return data.Questions.map(({ QuestionID }) => QuestionID);
}

(async () => {
  const r = await fetch("http://localhost:8678/data.json");
  const knownQuestions = new Set(
    [...Object.keys(await r.json())].map((x) => parseInt(x))
  );
  console.info(
    "Downloaded stored questions, now generating 100 tests and checking..."
  );
  const foundQuestions = new Set(
    (await Promise.all([...new Array(1000).values()].map(genTest))).flat()
  );
  const notFound = [...knownQuestions]
    .filter((q) => !foundQuestions.has(q))
    .sort((a, b) => a - b);
  if (notFound.length > 0)
    console.warn(
      "The following questions were never generated in tests (this might be just due to randomness):",
      notFound
    );

  for (const q of [...foundQuestions].sort((a, b) => a - b)) {
    if (!knownQuestions.has(q))
      console.error(`Found new question ${q}:`, await dlOne(q));
  }
  console.info(
    "Done testing. If no errors were printed, then no new questions were found"
  );
})();
