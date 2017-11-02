const Sequelize = require('sequelize')

// const sequelize = new Sequelize(
//   'testsequelize',
//   'testsequelize',
//   'testsequelize',
//   {
//     dialect: 'sqlite',
//     host: 'localhost',
//     storage: './testsequelize.sqlite'
//   }
// )
const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'username',
  process.env.DB_PASS || 'password',
  {
    dialect: 'mssql',
    host: 'localhost'
  }
)

// Create a wide table
const columns = 130 // failure point 125-130
const myCol = {}
for (let i = 0; i < columns; i++) {
  myCol['column' + i] = {
    type: Sequelize.STRING
  }
}
const Test = sequelize.define('test', myCol)

// Based on usage described at http://docs.sequelizejs.com/manual/installation/getting-started.html#your-first-model
Test.sync({force: true}).then(() => {
  // Table created
  return Test.create({
    column0: 'John',
    column1: 'Hancock'
  })
})
