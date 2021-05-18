const {  Print } = require('lesscode-fp')
const { Improvisor } = require('../../improvisor')

const msg = require('./msg.json')
msg.improvise.workflows[0].input.uuid = '' + Date.now()
Improvisor(msg).then(Print).catch(Print)
