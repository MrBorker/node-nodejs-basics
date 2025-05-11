import { readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  try {
    const folderPath = resolve(__dirname, "files");
    const files = await readdir(folderPath);
    console.log("Files in the folder:", files);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await list();
