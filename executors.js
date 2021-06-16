const { HttpPOST, ExtractData, $M, lappend, Print } = require('lesscode-fp')
const { S3Put } = require('./aws')
const Result = data => async output => ({ res: lappend(data.res)([output]), data: output })

module.exports = {
    // structure { res , data}
    'logger' : workflow => async data => $M(Result(data),Print)(JSON.stringify({ type : 'info', ...data.res[data.res.length-1]})),
    'http-post': workflow => async data => $M(Result(data), ExtractData, HttpPOST({ data: data.data }), Print)(workflow.executor.url),
    's3-put': workflow => async data => $M(Result(data), S3Put({ Bucket: workflow.executor.Bucket, Key: workflow.executor.Key }))(JSON.stringify(data.data))
}
