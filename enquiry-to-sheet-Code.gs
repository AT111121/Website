/**
 * ENQUIRY → GOOGLE SHEET + EMAIL + AUTO-REPLY
 * Free. Runs inside your own Google account. No third-party service.
 *
 * WHAT IT DOES on every form submission:
 *   1. Adds a row to your Google Sheet (your lead database)
 *   2. Emails YOU the new enquiry
 *   3. Sends the prospect an instant auto-reply
 *
 * ── SETUP (one time, ~10 minutes) ──────────────────────────────
 * 1. Go to sheets.google.com → create a blank sheet → name it
 *    "Website Leads". Leave it empty (the script adds headers).
 * 2. In that sheet: Extensions → Apps Script. Delete any sample code.
 * 3. Paste THIS entire file in. Change NOTIFY_EMAIL below to your address.
 * 4. Click Deploy → New deployment → type: Web app.
 *      - Description: "Enquiry form"
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy → Authorize access → allow the permissions.
 * 5. Copy the "Web app URL" it gives you (ends in /exec).
 * 6. Open index.html → find SHEET_ENDPOINT → paste that URL between
 *    the quotes. Re-upload your site. Done.
 *
 * To update the script later, edit it then Deploy → Manage deployments
 * → edit (pencil) → New version → Deploy (keeps the same URL).
 * ───────────────────────────────────────────────────────────────
 */

const NOTIFY_EMAIL = "info@ankurtripathi.net"; // ← where YOU get notified

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
    const d = e.parameter; // form fields arrive here

    // add a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Company", "Need", "Details", "Budget"]);
      sheet.getRange("A1:G1").setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      d.name || "", d.email || "", d.company || "",
      d.need || "", d.details || "", d.budget || ""
    ]);

    // notify you
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "🟢 New website enquiry — " + (d.name || "Unknown"),
      body:
        "Name: " + (d.name || "-") +
        "\nEmail: " + (d.email || "-") +
        "\nCompany: " + (d.company || "-") +
        "\nNeeds: " + (d.need || "-") +
        "\nBudget: " + (d.budget || "-") +
        "\n\nDetails:\n" + (d.details || "-")
    });

    // auto-reply to the prospect
    if (d.email) {
      MailApp.sendEmail({
        to: d.email,
        subject: "Thanks for reaching out",
        body:
          "Hi " + (d.name || "there") + ",\n\n" +
          "Thanks for getting in touch — I've received your enquiry and will get " +
          "back to you within two business days.\n\n" +
          "In the meantime, feel free to connect with me on LinkedIn.\n\n" +
          "— Ankur Tripathi\nGrowth & Content Marketing"
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
