module.exports = class {
  constructor(db) {
    this.db = db
  }

  async getPeopleByState(state) {
    return await this.db.collection('people').find({'address.state': state}).toArray()
  }
}