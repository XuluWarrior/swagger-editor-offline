#! /usr/bin/env node
const electron = require('electron');
const proc = require('child_process');


const mainPath = require.resolve("../main.js");
// spawn Electron
const child = proc.spawnSync(electron, [mainPath]);