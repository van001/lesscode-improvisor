const { HttpPOST, ExtractData, $M, lappend, Hint } = require('lesscode-fp')
const { S3Put } = require('./aws')
const Result = data => async output => ({ res: lappend(data.res)([output]), data: output })

module.exports = {
    // structure { res , data}
    'http-post': workflow => async data => $M(Result(data), ExtractData, HttpPOST({ data: data.data }), Hint(`${JSON.stringify(data)}`))(workflow.executor.url),
    's3-put': workflow => async data => $M(Result(data), S3Put({ Bucket: workflow.executor.Bucket, Key: workflow.executor.Key }))(JSON.stringify(data.data))
}
