const ver = {
    "1": require('./improvisorv1')
}

const Improvisor = async msg => ver[msg.version].Improvise(msg)
module.exports = { Improvisor }





