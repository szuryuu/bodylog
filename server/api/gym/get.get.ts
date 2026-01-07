export default defineEventHandler(async (event) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = await getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "GYM!A:I",
    });

    return { data: response.data.values || [] };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
