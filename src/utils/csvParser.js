import { Readable } from "stream";
import csv from "csv-parser";

export const parseCSV = async (buffer) => {
  const results = [];
  return new Promise((resolve, reject) => {
    const stream = bufferToStream(buffer);
    stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
