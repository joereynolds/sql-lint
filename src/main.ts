#!/usr/bin/env node

import * as program from "commander";
import * as process from "process";

const version = "0.0.2";

function increaseVerbosity(v: any, total: any) {
    return total + 1;
}

program
    .version(version)
    .option("-f, --file <path>", "The .sql file to lint")
    .option("-q, --query <string>", "The query to lint")
    .parse(process.argv);

console.log("working");
