import fs from "fs";
import path from "path";

export function readCSV() {
  const filePath = path.join(process.cwd(), "public", "WEB Data.csv");
  const fileData = fs.readFileSync(filePath, "utf8");

  const lines = fileData.split("\n").map(line => line.trim());

  // Auto-detect delimiter from the header row
  const headerLine = lines[0];

  let delimiter = ","; // default
  if (headerLine.includes("\t")) delimiter = "\t";
  else if (headerLine.includes(";")) delimiter = ";";
  else if (headerLine.includes("|")) delimiter = "|";

  const headers = headerLine.split(delimiter);

  const rows = lines.slice(1).map(line => {
    const values = line.split(delimiter);
    const obj: any = {};

    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    return obj;
  });

  return rows;
}