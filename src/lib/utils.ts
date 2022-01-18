export interface QuestionData {
  answerId: string;
  question: string;
  answers: Record<string, string>;
  images?: string[];
  video?: string;
  noShuffle?: true;
}

export function checkedNumberToArray<
  T = Uint8Array | Uint16Array | Uint32Array
>(
  n: number,
  ArrayType: { BYTES_PER_ELEMENT: number; from(p: [number]): T }
): T {
  if (n >= Math.pow(2, ArrayType.BYTES_PER_ELEMENT * 8)) {
    throw new Error(
      `Path too long, can't store ${n} in ${ArrayType.BYTES_PER_ELEMENT} bytes`
    );
  }
  return ArrayType.from([n]);
}
