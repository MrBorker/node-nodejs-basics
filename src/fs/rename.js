import { rename as renameFunction } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stat } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  try {
    const source = resolve(__dirname, "files", "wrongFilename.txt");
    const destination = resolve(__dirname, "files", "properFilename.md");

    try {
      await stat(destination);
      throw new Error(`Destination folder already exists: ${destination}`);
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    await renameFunction(source, destination);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
