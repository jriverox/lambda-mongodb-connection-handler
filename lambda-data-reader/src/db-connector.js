const MongoClient = require('mongodb').MongoClient

module.exports.connect = async (uri, cachedClient, options) => {
  if (cachedClient) {
    console.log('=> using cached database instance')
    return Promise.resolve(cachedClient)
  }

  cachedClient = await MongoClient.connect(uri, options)
  console.log('=> new database instance')
  return cachedClient
}