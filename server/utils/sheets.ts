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
  return google.sheets({ version: "v4", auth });
}

export async function getSpreadsheetId() {
  const config = useRuntimeConfig();
  return config.spreadsheetId;
}

export async function styleWorkoutTable(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  totalRows: number,
  totalColumns: number = 10,
) {
  const sheetId = await getSheetId(sheets, spreadsheetId, sheetName);

  const sheetMetadata = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [sheetName],
    includeGridData: false,
  });

  const existingBandings = sheetMetadata.data.sheets?.[0]?.bandedRanges || [];
  const requests: any[] = [];

  existingBandings.forEach((banding) => {
    if (banding.bandedRangeId) {
      requests.push({
        deleteBanding: { bandedRangeId: banding.bandedRangeId },
      });
    }
  });

  requests.push({
    addBanding: {
      bandedRange: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: totalRows,
          startColumnIndex: 0,
          endColumnIndex: totalColumns,
        },
        rowProperties: {
          headerColor: { red: 0.13, green: 0.59, blue: 0.6 },
          firstBandColor: { red: 1, green: 1, blue: 1 },
          secondBandColor: { red: 0.95, green: 0.98, blue: 0.98 },
        },
      },
    },
  });

  requests.push({
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: totalColumns,
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: { red: 0.13, green: 0.59, blue: 0.6 },
          textFormat: {
            foregroundColor: { red: 1, green: 1, blue: 1 },
            bold: true,
            fontSize: 10,
          },
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
        },
      },
      fields:
        "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
    },
  });

  requests.push({
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 1,
        endRowIndex: totalRows,
        startColumnIndex: 0,
        endColumnIndex: totalColumns,
      },
      cell: {
        userEnteredFormat: {
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          textFormat: { fontSize: 10, fontFamily: "Roboto Mono" },
        },
      },
      fields:
        "userEnteredFormat(horizontalAlignment,verticalAlignment,textFormat)",
    },
  });

  requests.push({
    updateBorders: {
      range: {
        sheetId,
        startRowIndex: 0,
        endRowIndex: totalRows,
        startColumnIndex: 0,
        endColumnIndex: totalColumns,
      },
      top: {
        style: "SOLID",
        width: 1,
        color: { red: 0.8, green: 0.8, blue: 0.8 },
      },
      bottom: {
        style: "SOLID",
        width: 1,
        color: { red: 0.8, green: 0.8, blue: 0.8 },
      },
      left: {
        style: "SOLID",
        width: 1,
        color: { red: 0.8, green: 0.8, blue: 0.8 },
      },
      right: {
        style: "SOLID",
        width: 1,
        color: { red: 0.8, green: 0.8, blue: 0.8 },
      },
      innerHorizontal: {
        style: "SOLID",
        width: 1,
        color: { red: 0.9, green: 0.9, blue: 0.9 },
      },
      innerVertical: {
        style: "SOLID",
        width: 1,
        color: { red: 0.9, green: 0.9, blue: 0.9 },
      },
    },
  });

  requests.push({
    autoResizeDimensions: {
      dimensions: {
        sheetId,
        dimension: "COLUMNS",
        startIndex: 0,
        endIndex: totalColumns,
      },
    },
  });

  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests },
    });
  }
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
