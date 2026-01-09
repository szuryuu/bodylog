import type { WorkoutDay } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkoutDay>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    const sheetName = `GYM-${body.day}`;
    console.log("Processing workout for:", sheetName);

    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:J`,
    });

    let rows = existingResponse.data.values || [];

    if (rows.length === 0) {
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

    body.exercises.forEach((exercise) => {
      const setData = exercise.sets.map((s) =>
        s.weight > 0 || s.reps > 0 ? `${s.weight}kg × ${s.reps}` : "-",
      );
      while (setData.length < 4) setData.push("-");

      const newRow = [
        body.week.toString(),
        body.day,
        body.date,
        body.time || "-",
        exercise.name,
        ...setData,
        body.completed ? "YES" : "NO",
      ];

      const existingRowIndex = rows.findIndex(
        (row) => row[0] == body.week && row[4] == exercise.name,
      );

      if (existingRowIndex > 0) {
        rows[existingRowIndex] = newRow;
      } else {
        rows.push(newRow);
      }
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    try {
      await styleWorkoutTable(
        sheets,
        spreadsheetId,
        sheetName,
        rows.length - body.exercises.length,
        body.exercises.length,
        10,
      );
    } catch (e) {}

    return { success: true, message: "Workout synced successfully" };
  } catch (error: any) {
    console.error("Failed to save workout:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to save: ${error.message}`,
    });
  }
});
