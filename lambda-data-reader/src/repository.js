module.exports = class {
  constructor(dbClient, dbName) {
    this.db = dbClient.db(dbName)
  }
  
  async getPeopleByState(state) {
    return await this.db.collection('people').find({'address.state': state}).toArray()
  }
}