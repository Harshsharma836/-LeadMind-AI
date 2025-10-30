import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const saveOffer = (req, res) => {
  try {
    const offer = req.body;
      const filePath = path.join(__dirname, "../data/offers.json");


      const newOffer = { id: 1, ...offer };
      const offers = [newOffer];

      fs.writeFileSync(filePath, JSON.stringify(offers, null, 2));

    res.json({
      message: "Offer saved successfully (previous offers removed)!",
      offer: newOffer,
      totalOffers: newOffer.length,
    });
  } catch (error) {
    console.error("Error saving offer:", error);
    res.status(500).json({ message: "Error saving offer" });
  }
};