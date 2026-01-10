# BodyLog - Minimalist Gym & Weight Tracker

This repository contains a web application designed to track gym workouts and body weight progress. It is built with Nuxt 3 and uses Google Sheets as a backend database, ensuring you have full control and ownership of your data.

---

### Features

- **Brutalist Design**: A focused, high-contrast interface designed for clarity and speed.
- **Gym Logging**: Track exercises, sets, reps, and weights. The system automatically fetches your previous week's data for progressive overload.
- **Bulk Tracker**: Weekly weight logging with automatic calculation of gained weight.
- **Google Sheets Integration**: All data is saved instantly to a private Google Sheet. The application handles table formatting and styling automatically.
- **Mobile Responsive**: Fully optimized for mobile use with a custom navigation menu.
- **Secure Access**: Simple password-based authentication to protect your logs.

### Setup Instructions

Follow these steps to configure this project for your own use.

#### Step 1: Get the Code

- **Fork** or **Clone** this repository to your local machine.

#### Step 2: Configure Google Cloud & Service Account

You need a Service Account to allow the application to read and write to your Google Sheet.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a **New Project**.
2.  Within the project, enable the **Google Sheets API**.
3.  Create a **Service Account**:
    - Navigate to `APIs & Services` > `Credentials`.
    - Click `Create Credentials` > `Service account`.
    - Give it a name (e.g., `bodylog-writer`), then click `Create and Continue`.
4.  Generate a **JSON Key** for the Service Account:
    - Click on the newly created Service Account.
    - Go to the `Keys` tab > `Add Key` > `Create new key`.
    - Choose the **JSON** format and click `Create`. A `.json` file will be downloaded. **Keep this file safe; its contents are secret.**

#### Step 3: Configure Google Sheets

1.  Create a **new Google Sheet**.
2.  **Share** your Sheet:
    - Open the `.json` file you downloaded in Step 2, and copy the `client_email` address inside.
    - In your Google Sheet, click `Share`, paste the email address, and grant it **Editor** access.
3.  Get the **Spreadsheet ID**:
    - It is found in the URL: `https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit...`
4.  **Important**: Leave the sheet empty. The application will automatically create the necessary tabs (`GYM-SENIN`, `BULK`, etc.) and headers upon the first save.

#### Step 4: Environment Variables

Create a `.env` file in the root of your project and add the following variables. If deploying to Vercel, add these to your Project Settings > Environment Variables.

```env
# Your chosen password to access the app
NUXT_APP_PASSWORD=your_secure_password

# The ID obtained in Step 3
NUXT_SPREADSHEET_ID=your_spreadsheet_id

# Details from the JSON file obtained in Step 2
NUXT_GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=your_project_id
NUXT_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=your_service_account_email
NUXT_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> **Note:** When pasting the Private Key into Vercel or a `.env` file, ensure the entire key string is included.

#### Step 5: Run Locally

1.  Install dependencies:
    ```bash
    bun install
    ```
2.  Start the development server:
    ```bash
    bun run dev
    ```
3.  Open `http://localhost:3000` in your browser.

### Deployment

This application is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  In the Vercel deployment settings, ensure the **Environment Variables** (from Step 4) are correctly added.
4.  Deploy.

### Customizing the Program

To change the workout routine (exercises, days, focus):

1.  Open `app/components/GymWorkoutForm.vue`.
2.  Locate the `programTemplates` object.
3.  Modify the exercises, set counts, or day names to match your specific training plan. The application will automatically adapt the Google Sheet columns to match your new structure.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
