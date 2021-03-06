# whichops

`whichops` is a CLI tool to inspect a website and output the results. The program searches for `elements` that might contain something about the framework.

## Installation and usage

You need to install it globally, and then just run it!

```none
$ npm i -g whichops
$ whichops

  Thank you for using whichops!
  ---------------------------
  Type in a website domain or a page, and
  JSDOM will check for any frameworks!
    
? What do you want me to scrape? (npmjs.com)
⠙ Fetching the site...
✓ npmjs.com is using React!
```

For more help, try:

```none
$ whichops -h

Usage: whichops [options]

CLI tool to detect JavaScript frameworks/libraries that the website is using.

Options:
  -v, --version    version of the module
  -u, --url <url>  input url for a quick fetch
  -h, --help       display help for command
```
