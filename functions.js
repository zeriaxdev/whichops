import inquirer from "inquirer";
import jsdom from "jsdom";
import got from "got";
import chalk from "chalk";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

const { JSDOM } = jsdom;

const reject = chalk.redBright("✘ ");
const warn = chalk.yellowBright("! ");
const accept = chalk.greenBright("✓ ");

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const urls = [
  "github.com",
  "youtube.com",
  "twitter.com",
  "reddit.com",
  "ikea.com",
  "npmjs.com",
  "reactjs.org",
  "angularjs.org",
  "vuejs.org",
];
const randomURL = urls[Math.floor(Math.random() * urls.length)];

async function welcome() {
  console.log(`
  Thank you for using ${chalk.bold(gradient.vice("cli-library"))}!
  ---------------------------
  Type in a website domain or a page, and
  ${chalk.bold(gradient.fruit("JSDOM"))} will check for any ${gradient.cristal(
    "frameworks"
  )}!
    `);
}

const ask = () =>
  inquirer
    .prompt({
      name: "detector",
      message: "What do you want me to scrape?",
      type: "input",
      default: `${randomURL}`,
    })
    .then((answer) => {
      fetchURL(answer.detector);
    });

const fetchURL = (url) => {
  const spinner = createSpinner(chalk.black("Fetching the site..."), {
    color: "blue",
  }).start();

  const urlBold = chalk.bold(url);

  got(
    !url.startsWith("https://" || "http://")
      ? "https://" + url
      : url.startsWith("http://")
      ? url.replace("http://", "https://")
      : url
  )
    .then((response) => {
      const dom = new JSDOM(response.body);
      const window = dom.window;
      const document = dom.window.document;

      spinner.stop();

      if (
        !!window.React ||
        !!document.querySelector(
          "[data-reactroot], [data-reactid], [data-react-helmet], [data-react-scrolllock]"
        ) ||
        !!document.querySelector(".ReactModalPortal") ||
        !!document.querySelector("#react-root")
      ) {
        console.log(
          `${accept + urlBold} is using ${chalk.blueBright.bold("React")}!`
        );
      } else if (
        !!window.angular ||
        !!window.getAllAngularRootElements ||
        !!document.querySelector(
          ".ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]"
        ) ||
        !!document.querySelector(
          'script[src*="angular.js"], script[src*="angular.min.js"]'
        ) ||
        !!document.querySelector(
          'script[src*="angular.js"], script[src*="angular.min.js"]'
        )
      ) {
        console.log(
          `${accept + urlBold} is using ${chalk.red.bold("Angular.js")}!`
        );
      } else if (!!window.Backbone) {
        console.log(
          `${accept + urlBold} is using ${chalk.blue.bold("Backbone.js")}!`
        );
      } else if (!!window.Ember) {
        console.log(
          `${accept + urlBold} is using ${chalk.redBright.bold("Ember.js")}!`
        );
      } else if (!!window.Vue) {
        console.log(
          `${accept + urlBold} is using ${chalk.greenBright.bold("Vue.js")}!`
        );
      } else if (!!window.Meteor) {
        console.log(
          `${accept + urlBold} is using ${chalk.blueBright.bold(
            "Meteor"
          )}.${chalk.redBright.bold("js")}!`
        );
      } else if (!!window.Zepto) {
        console.log(
          `${accept + urlBold} is using ${chalk.blueBright.bold("Zepto.js")}!`
        );
      } else if (
        !!window.jQuery ||
        document.head.querySelectorAll("script").forEach((elem) => {
          if (elem.innerHTML.includes("jQuery")) {
            return true;
          } else {
            return false;
          }
        })
      ) {
        console.log(`${accept + urlBold} is using jQuery!`);
      } else if (
        document.head.innerHTML.includes(
          '<meta name="generator" content="WordPress'
        )
      ) {
        console.log(
          `${accept + urlBold} is using ${chalk.blueBright.bold(
            "Word"
          )}${chalk.whiteBright.bold("Press")}!`
        );
      } else {
        console.log(
          `${warn}I can't detect any framework used in ${urlBold}...`
        );
      }
    })
    .catch((err) => {
      if (err.name === "RequestError") {
        spinner.stop();

        console.error(`${reject + urlBold} is not a valid website!`);
      } else {
        console.error(`${reject}Something went wrong...`);
      }
    });
};

export { welcome, ask, fetchURL };
