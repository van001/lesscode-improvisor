const { Wait, Print, lfold, $M } = require('lesscode-fp')
let AWS = require('aws-sdk')
let S3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-west-2' });
const S3Put = config => async data => S3.putObject({ ...config, Body: data }).promise()

module.exports = { S3Put }

