// Upload content checks. Kept free of framework imports so it can be unit-tested with `node --test`.

// File signatures. The MIME type and name come from the client, so the bytes decide.
const signatures: Record<string, (head: Uint8Array) => boolean> = {
  jpg: (h) => startsWith(h, [0xff, 0xd8, 0xff]),
  png: (h) => startsWith(h, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  webp: (h) => startsWith(h, [0x52, 0x49, 0x46, 0x46]) && startsWith(h, [0x57, 0x45, 0x42, 0x50], 8),
  pdf: (h) => startsWith(h, [0x25, 0x50, 0x44, 0x46, 0x2d]),
  zip: (h) => startsWith(h, [0x50, 0x4b, 0x03, 0x04]),
  docx: (h) => startsWith(h, [0x50, 0x4b, 0x03, 0x04]),
  pptx: (h) => startsWith(h, [0x50, 0x4b, 0x03, 0x04]),
  doc: (h) => startsWith(h, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  ppt: (h) => startsWith(h, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
};

export function startsWith(head: Uint8Array, bytes: number[], offset = 0) {
  return bytes.every((byte, index) => head[offset + index] === byte);
}

export function matchesExtension(head: Uint8Array, extension: string) {
  return signatures[extension]?.(head) ?? false;
}

export type UploadCheck = { file: File | null; extension: string; label: string };

// Message for the first upload whose bytes do not match its claimed type, or null when all match.
// Run before anything is written so a bad file never creates a row.
export async function firstBadUpload(uploads: UploadCheck[]) {
  for (const { file, extension, label } of uploads) {
    if (!file) continue;
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (!matchesExtension(head, extension)) {
      return `${label} is not a valid ${extension.toUpperCase()} file.`;
    }
  }
  return null;
}
