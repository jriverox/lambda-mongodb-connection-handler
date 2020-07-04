const yenv = require('yenv')
const QueueRepository = require('./sqs.repository')
const states = require('../states.json')

const env = yenv()

;(async () => {
  const repository = new QueueRepository(env.SQS.URL, env.SQS.REGION)
  console.log(states)
  for (const state of states) {
    const msgId = await repository.send({state: state})
    console.log(msgId)
  }
})()