export interface QuestionData {
  question: string;
  answers: Record<string, string>;
  image?: string;
  video?: string;
}

export type Questions = Record<
  string,
  { answerId: string; data: QuestionData }
>;
