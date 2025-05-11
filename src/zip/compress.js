import { createReadStream, createWriteStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const filePath = resolve(__dirname, "files", "fileToCompress.txt");
  const archivePath = resolve(__dirname, "files", "archive.gz");

  const readableStream = createReadStream(filePath);
  const writableStream = createWriteStream(archivePath);
  const gzipStream = createGzip();

  readableStream
    .pipe(gzipStream)
    .pipe(writableStream)
    .on("finish", () => {
      console.log("File has been compressed successfully.");
    });

  readableStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });

  writableStream.on("error", (error) => {
    console.error(`Error writing compressed file: ${error.message}`);
  });

  gzipStream.on("error", (error) => {
    console.error(`Error during compression: ${error.message}`);
  });
};

await compress();
