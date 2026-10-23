// Builds the .xlsx files for the admin exports. Kept free of React and browser globals
// at import time so it can be unit-tested with `node --test`.

export type WorkbookSpec = {
  sheetName: string;
  headings: string[];
  rows: unknown[][];
  widths: number[];
};

// Cell text that starts with one of these is read as a formula when the cell is edited or
// the sheet is re-saved as CSV. Registrant-supplied text must never be able to do that.
const FORMULA_START = /^[\s]*[=+\-@]|^[\t\r]/;

export function safeCell(value: unknown) {
  if (typeof value !== "string") return value;
  return FORMULA_START.test(value) ? `'${value}` : value;
}

export async function buildWorkbookBuffer({ sheetName, headings, rows, widths }: WorkbookSpec) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);
  sheet.columns = headings.map((header, index) => ({ header, width: widths[index] ?? 16 }));
  for (const row of rows) sheet.addRow(row.map(safeCell));
  return workbook.xlsx.writeBuffer();
}

export async function downloadWorkbook(spec: WorkbookSpec, fileName: string) {
  const buffer = await buildWorkbookBuffer(spec);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
