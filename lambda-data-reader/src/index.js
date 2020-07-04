'use strict'
const yenv = require('yenv')
const dbConnector = require('./db-connector')
const Repository = require('./repository')
const env = yenv()

let cachedDbClient



module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('event: ', event)
  cachedDbClient = await dbConnector.connect(env.MONGO.URI, cachedDbClient, {poolSize: env.MONGO.POOL_SIZE, useNewUrlParser: true, useUnifiedTopology: true})
  //const db = cachedDbClient.db('m201')
  const repository = new Repository(cachedDbClient, 'm201')
  for (const record of event.Records) {
    const body = JSON.parse(record.body)
    const state = body.state
    console.log(state)
    const people = await repository.getPeopleByState(state)
    // if (people && people.length > 0) {
    //   people.forEach(p => {
    //     console.log(p.first_name)

    //   })
    // }
  }
  return {OK: true, statusCode:200}
}

// const event = require('../lambda-event-sample.json')
// const context = {callbackWaitsForEmptyEventLoop: true}
// handler(event, context).then(res => console.log(res))

//module.exports = handler