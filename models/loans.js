import * as fs from "fs";
import path from "path";

const filePath = path.resolve("./data/loans.json");

const loans = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
    console.log(JSON.parse(data));
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

// console.log("loans",loans())

export default loans();
