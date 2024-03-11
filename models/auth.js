import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/staffs.json");

async function users() {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

export default users;
