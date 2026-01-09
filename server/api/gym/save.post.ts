import type { WorkoutDay } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkoutDay>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    const sheetName = `GYM-${body.day}`;

    console.log("Saving workout to sheet:", sheetName);
    console.log("Data:", body);

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:I1`,
    });

    const rows: any[][] = [];

    if (!existing.data.values || existing.data.values.length === 0) {
      rows.push([
        "Week",
        "Date",
        "Time",
        "Exercise",
        "Set 1",
        "Set 2",
        "Set 3",
        "Set 4",
        "Completed",
      ]);
    }

    // Add workout data
    body.exercises.forEach((exercise) => {
      const setData = exercise.sets.map((s) => `${s.weight}kg × ${s.reps}`);
      while (setData.length < 4) setData.push("-");

      rows.push([
        body.week,
        body.date,
        body.time || "-",
        exercise.name,
        ...setData,
        body.completed ? "YES" : "NO",
      ]);
    });

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:I`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    // Get the row where data was appended
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    });
    const startRow = (response.data.values?.length ?? 0) - rows.length;

    // Style the table
    await styleWorkoutTable(
      sheets,
      spreadsheetId,
      sheetName,
      startRow,
      rows.length,
      9,
    );

    console.log("Workout saved successfully to", sheetName);

    return { success: true, message: "Workout saved successfully" };
  } catch (error: any) {
    console.error("Failed to save workout:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to save: ${error.message}`,
    });
  }
});
