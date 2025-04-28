import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = resolve(__dirname, "files", "fileToCalculateHashFor.txt");

  const hash = createHash("sha256");
  const fileStream = createReadStream(filePath);

  await pipeline(fileStream, hash);

  console.log(hash.digest("hex"));
};

await calculateHash();
