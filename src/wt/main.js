import { Worker } from "worker_threads";
import os from "os";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numWorkers = os.cpus().length;
  const results = [];
  let completedWorkers = 0;

  for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker(resolve(__dirname, "worker.js"));

    worker.postMessage(10 + i);

    worker.on("message", (message) => {
      results[i] = message;
      completedWorkers++;

      if (completedWorkers === numWorkers) {
        console.log("All workers finished:", results);
      }
    });

    worker.on("error", (error) => {
      results[i] = { status: "error", data: null };
      completedWorkers++;

      if (completedWorkers === numWorkers) {
        console.log("All workers finished:", results);
      }
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }
};

await performCalculations();
