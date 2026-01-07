import type { WorkoutDay } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkoutDay>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    // Prepare data rows
    const rows: any[][] = [
      [
        "Week",
        "Day",
        "Date",
        "Exercise",
        "Set 1",
        "Set 2",
        "Set 3",
        "Set 4",
        "Completed",
      ],
    ];

    body.exercises.forEach((exercise) => {
      const setData = exercise.sets.map((s) => `${s.weight}kg × ${s.reps}`);
      while (setData.length < 4) setData.push("-");

      rows.push([
        body.week,
        body.day,
        body.date,
        exercise.name,
        ...setData,
        body.completed ? "Yes" : "No",
      ]);
    });

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "GYM!A:I",
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
      9,
    );

    return { success: true, message: "Workout saved successfully" };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
