#! /usr/bin/env node
const { startCLI } = require('./args')
const { getHeaderInfos } = require('./header')

startCLI()
setTimeout(getHeaderInfos, 500)
