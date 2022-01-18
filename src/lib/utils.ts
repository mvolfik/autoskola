export interface QuestionData {
  answerId: string;
  question: string;
  answers: Record<string, string>;
  images?: string[];
  video?: string;
  noShuffle?: true;
}
