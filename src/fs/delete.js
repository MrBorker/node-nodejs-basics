import { unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  try {
    const filePath = resolve(__dirname, "files", "fileToRemove.txt");
    await unlink(filePath);
    console.log("File deleted successfully!");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await remove();
