import fs from "fs";
import { Parser } from "json2csv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { calculateRuleScore } from "../services/scoringService.js";
import { getAIIntent } from "../services/aiService.js";

export const scoreLeads = async (req, res) => {
  
  try {
    console.log("Scoring leadsss...");

     const leadsPath = path.join(__dirname, "../data/leads.json");
    const offersPath = path.join(__dirname, "../data/offers.json");
    const resultsPath = path.join(__dirname, "../data/results.json");

       const { offerId } = req.params;
    if (offerId === undefined) {
      return res.status(400).json({ message: "offerId is required" });
    }

    const leads = JSON.parse(fs.readFileSync(leadsPath, "utf-8"));

    const rawOffers = JSON.parse(fs.readFileSync(offersPath, "utf-8"));

    let offers = [];
    if (Array.isArray(rawOffers)) {
      rawOffers.forEach((group) => {
        if (group && typeof group === "object") {
          Object.keys(group).forEach((key) => {
            if (!isNaN(key)) {
              offers.push({ id: Number(key) + 1, ...group[key] });
            }
          });
        }
      });
    }

    const selectedOffer = offers.find((o) =>{
      return o.id == offerId
       
      });

    if (!selectedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const results = [];
    for (const lead of leads) {
      const rule_score = calculateRuleScore(lead, selectedOffer);
      const ai = await getAIIntent(lead, selectedOffer);
      const final_score = rule_score + ai.ai_points;

      results.push({
        ...lead,
        intent: ai.intent,
        score: final_score,
        reasoning: ai.reasoning,
      });
    }

    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    res.json({
      message: "Scoring completed successfully",
      offerId,
      offerName: selectedOffer.name,
      totalLeads: results.length,
      results,
    });
  } catch (error) {
    console.error("Error scoring leads:", error);
    res.status(500).json({ message: "Error scoring leads" });
  }
};

export const getScoreLeads = async (req, res) => {
  try {
    const resultsPath = path.join(__dirname, "../data/results.json");

    if (!fs.existsSync(resultsPath)) {
      return res.status(404).json({
        success: false,
        message: "results.json not found",
      });
    }

    const fileContent = fs.readFileSync(resultsPath, "utf-8").trim();

    if (!fileContent) {
      return res.status(400).json({
        success: false,
        message: "results is empty",
      });
    }

    const rawOffers = JSON.parse(fileContent);

    if (!Array.isArray(rawOffers) || rawOffers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "results.json contains no data",
      });
    }

    res.status(200).json({
      success: true,
      data: rawOffers,
    });
  } catch (error) {
    console.error("Error reading results.json:", error);
    res.status(500).json({
      success: false,
      message: "Failed to read results.json",
      error: error.message,
    });
  }
};

export const exportScoreLeads = async (req, res) => {
  try {
    console.log("Exporting scored leads to CSV...");

    const resultsPath = path.join(__dirname, "../data/results.json");

    if (!fs.existsSync(resultsPath)) {
      return res.status(404).json({ message: "results.json not found" });
    }

    const fileContent = fs.readFileSync(resultsPath, "utf-8").trim();

    if (!fileContent) {
      return res.status(400).json({ message: "result is empty" });
    }

    const results = JSON.parse(fileContent);

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({ message: "No data available to export" });
    }

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(results);

    res.header("Content-Type", "text/csv");
    res.attachment("results.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).json({ message: "Error exporting CSV", error: error.message });
  }
};