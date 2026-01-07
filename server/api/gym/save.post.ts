import type { WorkoutDay } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkoutDay>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    console.log("Saving workout to sheet:", spreadsheetId);
    console.log("Data:", body);

    // Get existing data to check if we need header
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "GYM!A1:J1",
    });

    const rows: any[][] = [];

    // Add header if sheet is empty
    if (!existing.data.values || existing.data.values.length === 0) {
      rows.push([
        "Week",
        "Day",
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
        body.day,
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
      range: "GYM!A:J",
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    // Get the row where data was appended
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "GYM!A:A",
    });
    const startRow = (response.data.values?.length ?? 0) - rows.length;

    // Style the table
    await styleWorkoutTable(
      sheets,
      spreadsheetId,
      "GYM",
      startRow,
      rows.length,
      10,
    );

    console.log("Workout saved successfully");

    return { success: true, message: "Workout saved successfully" };
  } catch (error: any) {
    console.error("Failed to save workout:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to save: ${error.message}`,
    });
  }
});
