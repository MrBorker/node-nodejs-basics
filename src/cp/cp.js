import { spawn } from "child_process";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const child = spawn(
    "node",
    [resolve(__dirname, "files", "script.js"), ...args],
    {
      stdio: ["pipe", "pipe", "pipe"],
    }
  );

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.stderr.pipe(process.stderr);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2", "dog", "cat"]);
