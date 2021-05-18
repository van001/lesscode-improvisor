const { $, $M, lreverse, lmap, lhead } = require('lesscode-fp')
const Executors = require('./executors')

// Error Handler
const Error = msg => async err =>  { Workflows(lreverse(msg.error.workflows))({ res: [], data: err }); throw { StatusCode: err.statusCode, err : JSON.stringify(err) }}

// Result handler
const Result = msg => async data => Workflows(lreverse(msg.result.workflows))({ res: [], data: data.res })

// Wrap each executor into Executor Monad
const Executor = workflow => async data => Executors[workflow.executor.type](workflow)(data)

// Workflow handler - execute workflow one after another, feeding output of one as inout to another.
const Workflows = workflows => async data => $M(...lmap(Executor)(workflows))(data)

//Reverse the list so that you can execute from right to left
const Improvise = async msg => $M(Result(msg), Workflows(lreverse(msg.improvise.workflows)))({ res: [], data: lhead(msg.improvise.workflows).input })
    .catch(Error(msg))

module.exports = { Improvise }

