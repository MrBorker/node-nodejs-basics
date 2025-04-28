import { createReadStream } from "fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = resolve(__dirname, "files", "fileToRead.txt");
  const readableStream = createReadStream(filePath, { encoding: "utf-8" });

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on("end", () => {
    process.stdout.write("\n");
  });

  readableStream.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });
};

await read();
