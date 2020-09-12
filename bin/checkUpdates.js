#!/usr/bin/env node

/**
 *  bin/checkUpdates.js
 */

/*************
 * * IMPORTS *
 *************/

const childProcess = require("child_process")
const os = require("os")

const chalk = require('chalk');

/***************
 * * CONSTANTS *
 ***************/

const log = console.log;

// Text Styles
const info = chalk.bgGreen.black;
const err = chalk.bgRed.black;

/***************
 * * FUNCTIONS *
 ***************/

/**
 * Check for outdated node modules
 */

log(info("\n Checking for Outdated Node Modules \n"));

[
  // TODO: Check yarn.lock exists else run `npm outdated`
  { command: "yarn outdated & echo." },

  { command: "npx -q npm-check-updates --packageFile package.json & echo." },

  { command: "npx -q updates & echo." }
]
  .filter(({ onlyPlatforms }) => !onlyPlatforms || onlyPlatforms.includes(os.platform()))
  .forEach(commandAndOptions => {
    const { command, onlyPlatform: _, ...options } = commandAndOptions
    try {
      childProcess.execSync(command, {
        stdio: "inherit",
        ...options,
      })
    } catch (error) {
      log(err(" ERROR ") + error)
      // process.exit(error.status)
    }
  })

log(info(" DONE \n"))

/* EOF */
