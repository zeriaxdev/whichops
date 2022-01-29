import { Command } from "commander";
import gradient from "gradient-string";
import { ask, welcome, fetchURL } from "./functions.js";

const program = new Command();
const version = "1.0.1";

program
  .name("cli-library")
  .description(
    "CLI tool to detect JavaScript frameworks/libraries that the website is using."
  )
  .version(
    `${gradient.vice(program.name())} is v${version}`,
    "-v, --version",
    "version of the module"
  );

program.option("-u, --url <url>", "input url for a quick fetch");

program.parse(process.argv);
const options = program.opts();

if (options.url) {
  fetchURL(
    !options.url.startsWith("https://" || "http://")
      ? "https://" + options.url
      : options.url.startsWith("http://")
      ? options.url.replace("http://", "https://")
      : options.url
  );
} else {
  await welcome();
  ask();
}
