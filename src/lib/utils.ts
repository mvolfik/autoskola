import mediaBundle from "../data/media-bundle.bin?url";

export interface QuestionData {
  answerId: string;
  question: string;
  answers: Record<string, string>;
  images?: string[];
  video?: string;
  noShuffle?: true;
}

export async function downloadMediaIndex(): Promise<Record<string, string>> {
  const r = await fetch(mediaBundle);
  const decoder = new TextDecoder();
  const data = await r.arrayBuffer();
  const dataView = new DataView(data);
  const output: Record<string, string> = {};
  let i = 0;
  while (i < data.byteLength) {
    const nameLength = dataView.getUint16(i);
    i += Uint16Array.BYTES_PER_ELEMENT;
    const name = decoder.decode(new Uint8Array(data, i, nameLength));
    i += nameLength;
    const dataLength = dataView.getUint32(i);
    i += Uint32Array.BYTES_PER_ELEMENT;
    const blob = new Blob([new Uint8Array(data, i, dataLength)]);
    i += dataLength;
    output[name] = URL.createObjectURL(blob);
  }
  return output;
}
