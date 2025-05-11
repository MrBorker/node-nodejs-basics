import { Transform } from "stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString();
      const reversed = input.split("").reverse().join("");
      this.push(reversed);
      callback();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  process.stdin.on("error", (error) => {
    console.error(`Error reading from stdin: ${error.message}`);
  });

  reverseStream.on("error", (error) => {
    console.error(`Error during transform: ${error.message}`);
  });
};

await transform();
