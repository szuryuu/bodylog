import { google } from "googleapis";
import type { sheets_v4 } from "googleapis";

export async function getGoogleSheetsClient() {
  const config = useRuntimeConfig();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.googleServiceAccount.clientEmail,
      private_key: config.googleServiceAccount.privateKey,
      project_id: config.googleServiceAccount.projectId,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function getSpreadsheetId() {
  const config = useRuntimeConfig();
  return config.spreadsheetId;
}

export async function styleWorkoutTable(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  startRow: number,
  numRows: number,
  numCols: number,
) {
  const sheetId = await getSheetId(sheets, spreadsheetId, sheetName);

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        // Header row styling
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: startRow,
              endRowIndex: startRow + 1,
              startColumnIndex: 0,
              endColumnIndex: numCols,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                textFormat: {
                  bold: true,
                  foregroundColor: { red: 1, green: 1, blue: 1 },
                },
                horizontalAlignment: "CENTER",
              },
            },
            fields:
              "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
          },
        },
        // Add borders
        {
          updateBorders: {
            range: {
              sheetId,
              startRowIndex: startRow,
              endRowIndex: startRow + numRows,
              startColumnIndex: 0,
              endColumnIndex: numCols,
            },
            top: {
              style: "SOLID",
              width: 1,
              color: { red: 0.5, green: 0.5, blue: 0.5 },
            },
            bottom: {
              style: "SOLID",
              width: 1,
              color: { red: 0.5, green: 0.5, blue: 0.5 },
            },
            left: {
              style: "SOLID",
              width: 1,
              color: { red: 0.5, green: 0.5, blue: 0.5 },
            },
            right: {
              style: "SOLID",
              width: 1,
              color: { red: 0.5, green: 0.5, blue: 0.5 },
            },
            innerHorizontal: {
              style: "SOLID",
              width: 1,
              color: { red: 0.3, green: 0.3, blue: 0.3 },
            },
            innerVertical: {
              style: "SOLID",
              width: 1,
              color: { red: 0.3, green: 0.3, blue: 0.3 },
            },
          },
        },
        // Auto-resize columns
        {
          autoResizeDimensions: {
            dimensions: {
              sheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: numCols,
            },
          },
        },
      ],
    },
  });
}

async function getSheetId(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<number> {
  const response = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = response.data.sheets?.find(
    (s) => s.properties?.title === sheetName,
  );
  return sheet?.properties?.sheetId ?? 0;
}
