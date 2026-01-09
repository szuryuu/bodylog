import type { WorkoutDay } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<WorkoutDay>(event);
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    const sheetName = `GYM-${body.day}`;

    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:J`,
    });

    const rawRows = existingResponse.data.values || [];
    const header =
      rawRows.length > 0
        ? rawRows[0]
        : [
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
          ];

    let dataRows = rawRows.slice(1).filter((row) => row[0] && row[4]);

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

      const existingRowIndex = dataRows.findIndex(
        (row) => row[0] == body.week && row[4] == exercise.name,
      );

      if (existingRowIndex >= 0) {
        dataRows[existingRowIndex] = newRow;
      } else {
        dataRows.push(newRow);
      }
    });

    const dayOrder: Record<string, number> = {
      SENIN: 1,
      SELASA: 2,
      RABU: 3,
      KAMIS: 4,
      JUMAT: 5,
      SABTU: 6,
      MINGGU: 7,
    };

    dataRows.sort((a, b) => {
      const weekA = parseInt(a[0]) || 0;
      const weekB = parseInt(b[0]) || 0;
      if (weekA !== weekB) return weekA - weekB;

      const dayA = dayOrder[a[1]] || 8;
      const dayB = dayOrder[b[1]] || 8;
      return dayA - dayB;
    });

    const finalRows = [header];
    let prevWeek = -1;

    dataRows.forEach((row) => {
      const currentWeek = parseInt(row[0]) || 0;

      if (prevWeek !== -1 && currentWeek !== prevWeek) {
        finalRows.push(new Array(10).fill(""));
      }

      finalRows.push(row);
      prevWeek = currentWeek;
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: finalRows },
    });

    try {
      await styleWorkoutTable(
        sheets,
        spreadsheetId,
        sheetName,
        finalRows.length,
        10,
      );
    } catch (e) {
      // ignore
    }

    return { success: true, message: "Workout synced successfully" };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
