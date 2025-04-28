import { createWriteStream } from "fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = resolve(__dirname, "files", "fileToWrite.txt");
  const writableStream = createWriteStream(filePath, { encoding: "utf-8" });

  process.stdin.pipe(writableStream);

  process.stdin.on("error", (error) => {
    console.error(`Error reading from stdin: ${error.message}`);
  });

  writableStream.on("error", (error) => {
    console.error(`Error writing to file: ${error.message}`);
  });

  writableStream.on("finish", () => {
    console.log("Data has been written to file.");
  });
};

await write();
