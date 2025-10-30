import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { parseCSV } from "../utils/csvParser.js";

export const uploadLeads = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No CSV file uploaded" });
    }

    const leads = await parseCSV(req.file.buffer);

    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ message: "CSV is empty or invalid" });
    }

    const requiredFields = [
      "name",
      "role",
      "company",
      "industry",
      "location",
      "linkedin_bio",
    ];

    const invalidRows = leads.filter((lead, index) => {
      return !requiredFields.every(
        (field) => lead[field] && lead[field].toString().trim() !== ""
      );
    });

    if (invalidRows.length > 0) {
      return res.status(400).json({
        message: "CSV contains rows with missing fields",
        invalidRowsCount: invalidRows.length,
        exampleInvalidRow: invalidRows[0],
      });
    }
     const filePath = path.join(__dirname, "../data/leads.json");
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

    res.json({
      message: "Leads uploaded successfully!",
      totalLeads: leads.length,
    });
  } catch (err) {
    console.error("Error uploading leads:", err);
    res.status(500).json({
      message: "Error parsing or saving CSV",
      error: err.message,
    });
  }
};
