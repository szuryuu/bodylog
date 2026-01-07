import type { BulkEntry } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<BulkEntry>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    // Check if header exists
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "BULK!A1:D1",
    });

    const rows: any[][] = [];

    if (!existing.data.values || existing.data.values.length === 0) {
      rows.push(["Week", "Date", "Weight (kg)", "Notes"]);
    }

    rows.push([body.week, body.date, body.weight, body.notes || ""]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "BULK!A:D",
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    // Style table
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "BULK!A:A",
    });
    const startRow = 0;
    const totalRows = response.data.values?.length ?? 0;

    await styleWorkoutTable(
      sheets,
      spreadsheetId,
      "BULK",
      startRow,
      totalRows,
      4,
    );

    return { success: true, message: "Weight saved successfully" };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
