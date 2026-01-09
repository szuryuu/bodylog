import type { BulkEntry } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<BulkEntry>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    console.log("Saving bulk entry to sheet:", spreadsheetId);
    console.log("Data:", body);

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

    console.log("Bulk entry saved successfully");

    return { success: true, message: "Weight saved successfully" };
  } catch (error: any) {
    console.error("Failed to save bulk entry:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to save: ${error.message}`,
    });
  }
});
