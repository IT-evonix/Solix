// Request-body size guard. Kept free of framework imports so it can be unit-tested with `node --test`.

// Largest request body each endpoint accepts: its upload caps plus room for the text fields.
export const FORM_OVERHEAD_BYTES = 256 * 1024;
export const MAX_JSON_BYTES = 256 * 1024;

export const TOO_LARGE = "too-large" as const;

// Reads the body without ever holding more than `maxBytes`, so an oversized or endless
// upload is cut off instead of being buffered whole by request.formData().
export async function readBody(request: Request, maxBytes: number): Promise<Uint8Array | typeof TOO_LARGE> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return TOO_LARGE;
  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return TOO_LARGE;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
