import fs from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  try {
    const filePath = resolve(__dirname, "files", "fresh.txt");
    const content = "I am fresh and young";
    await fs.writeFile(filePath, content, { flag: "wx" });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await create();
