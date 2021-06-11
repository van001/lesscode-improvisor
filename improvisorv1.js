const { $, $M, lreverse, lmap, lhead, } = require('lesscode-fp')
const Executors = require('./executors')

// Error Handler
const Error = msg => async err => {
    if (err.response.status == undefined || err.response.status <= 500) {
        Workflows(lreverse(msg.error.workflows))({ res: [], data: JSON.stringify({ status: err.response.status, msg: err.response.statusText, data: err.response.data }) }); return { StatusCode: 200 }
    }
    else {
        throw { StatusCode: err.response.status || 503, err: JSON.stringify({ status: err.response.status, msg: err.response.statusText, data: err.response.data }) }
    }
}

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

