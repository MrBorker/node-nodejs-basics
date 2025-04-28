const parseArgs = () => {
  process.argv.forEach((arg, i) => {
    if (arg.startsWith("--")) {
      console.log(`${arg} is ${process.argv[i + 1]}`);
    }
  });
};

parseArgs();
