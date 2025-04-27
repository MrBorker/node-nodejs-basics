import { cp } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stat } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const source = resolve(__dirname, "files");
    const destination = resolve(__dirname, "files_copy");

    try {
      await stat(destination);
      throw new Error(`Destination folder already exists: ${destination}`);
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    await cp(source, destination, { recursive: true });
    console.log("Folder copied successfully!");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();
