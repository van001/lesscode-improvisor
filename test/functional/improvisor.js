const {  Print } = require('lesscode-fp')
const { Improvisor } = require('../../improvisor')

const msg = require('./msg2.json')
if (msg.improvise.workflows[0].input) msg.improvise.workflows[0].input.uuid = '' 

Improvisor(msg).then(Print).catch(Print)
