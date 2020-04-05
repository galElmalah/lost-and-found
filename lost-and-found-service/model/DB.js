

const db = [{
  id:0,
  name:'example 1',
  description: 'some red keys',
  position: [31.781234199999997, 34.7]
},
{
  id:1,
  name:'example 2',
  description: 'some red keys',
  position: [31.8, 34.6899093]
},{
  id:2,
  name:'example 3',
  description: 'some red keys',
  position: [31.7, 34.6899093]
}
,{
  id:3,
  name:'example 4',
  description: 'some red keys',
  position: [31.9, 34.6899093]
}]

module.exports = class DB {

  static async getById(id) {
    return db.find(entry => entry.id === id)
  }

  static async getAll() {
    return db
  }

  static async add(item) {
    db.push({...item,id:db.length+1})
    return db.length
  }

  static async connect({port,user,password}) {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(`DB connected on port ${port}`)
        res()
      }, 1000);
    })
  }

}

