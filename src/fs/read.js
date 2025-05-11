import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = resolve(__dirname, "files", "fileToRead.txt");
    const contents = await readFile(filePath, { encoding: "utf8" });
    console.log(contents);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
