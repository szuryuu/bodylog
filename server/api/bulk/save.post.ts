import type { BulkEntry } from "~/types";

// Handle bulk entry event
export default defineEventHandler(async (event) => {
  try {
    // Read request body
    const body = await readBody<BulkEntry>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    // Sheet name constant
    const sheetName = "BULK";
    console.log("Saving bulk entry to sheet:", sheetName);

    // Get existing sheet values
    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:D`,
    });

    // Get raw rows array
    const rawRows = existingResponse.data.values || [];

    // Add header if empty
    if (rawRows.length === 0) {
      rawRows.push(["Week", "Date", "Weight (kg)", "Notes"]);
    }

    // Exclude header row
    const dataRows = rawRows.slice(1);

    // Prepare new row data
    const newRow = [
      body.week.toString(),
      body.date,
      body.weight.toString(),
      body.notes || "",
    ];

    // Find existing week index
    const existingRowIndex = dataRows.findIndex((row) => row[0] == body.week);

    // Update or add row
    if (existingRowIndex >= 0) {
      dataRows[existingRowIndex] = newRow;
    } else {
      dataRows.push(newRow);
    }

    // Sort by week ascending
    dataRows.sort((a, b) => {
      const weekA = parseInt(a[0]) || 0;
      const weekB = parseInt(b[0]) || 0;
      return weekA - weekB;
    });

    // Combine header and data
    const finalRows = [rawRows[0], ...dataRows];

    // Update sheet values
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: finalRows },
    });

    try {
      // Style workout table
      await styleWorkoutTable(
        sheets,
        spreadsheetId,
        sheetName,
        finalRows.length,
        4,
      );
    } catch (e) {
      // Ignore styling error
      console.error("Styling error (ignored):", e);
    }

    console.log("Bulk entry saved successfully");

    // Return success response
    return { success: true, message: "Weight saved successfully" };
  } catch (error: any) {
    // Log and throw error
    console.error("Failed to save bulk entry:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to save: ${error.message}`,
    });
  }
});
