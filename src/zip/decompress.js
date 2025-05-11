import { createReadStream, createWriteStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createUnzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const archivePath = resolve(__dirname, "files", "archive.gz");
  const outputPath = resolve(__dirname, "files", "fileToCompress.txt");

  const readableStream = createReadStream(archivePath);
  const writableStream = createWriteStream(outputPath);
  const unzipStream = createUnzip();

  readableStream
    .pipe(unzipStream)
    .pipe(writableStream)
    .on("finish", () => {
      console.log("File has been decompressed successfully.");
    });

  readableStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });

  writableStream.on("error", (error) => {
    console.error(`Error writing compressed file: ${error.message}`);
  });

  unzipStream.on("error", (error) => {
    console.error(`Error during decompression: ${error.message}`);
  });
};

await decompress();
