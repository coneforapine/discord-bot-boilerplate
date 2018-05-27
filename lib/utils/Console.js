const chalk = require("chalk");
const moment = require("moment");
/**
 * Credit: AnIdiotsGuide / guidebot for this basic console utility
 */
module.exports = class Console {

    log(content, type = "log") {
        const timestamp = `[${moment().format("DD-MM-YYYY HH:mm:ss")}]:`;
        switch (type) {
          case "log": {
            return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
          }
          case "warn": {
            return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
          }
          case "error": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
          }
          case "debug": {
            return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
          }
          case "cmd": {
            return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
          }
          case "ready": {
            return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
          }
          default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
        }
    }

    warn(content) {
        return this.log(...content, "warn");
    }

    error(content) {
        return this.log(...content, "error");
    }

    debug(content) {
        return this.log(...content, "debug");
    }

    cmd(content) {
        return this.log(...content, "cmd");
    }
    
    ready(content) {
        return this.log(...content, "ready");
    }

};
