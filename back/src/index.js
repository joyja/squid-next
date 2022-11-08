const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const resolvers = require('./resolvers')
const sqlite3 = require('sqlite3').verbose()
const { User } = require('./auth')

const desiredUserVersion = 1

const dbFilename = 'squid'
let db

const dir = './database'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
let fileExisted = false
// Create database
if (dbFilename === `:memory`) {
  db = new sqlite3.Database(`:memory`, (error) => {
    if (error) {
      throw error
    }
  })
} else {
  if (fs.existsSync(`${dir}/${dbFilename}.db`)) {
    fileExisted = false
  }
  db = new sqlite3.cached.Database(`${dir}/${dbFilename}.db`, (error) => {
    if (error) {
      throw error
    }
  })
}

const app = express()
app.use(cors())

const schema = buildSchema(
    fs.readFileSync(path.resolve(process.cwd(), 'src/schema.graphql')).toString()
)

const createContext = (req) => ({
    req,
    db
})

app.use(
    graphqlHTTP((request) => ({
        schema,
        rootValue: resolvers,
        context: createContext(request),
        graphiql: true
    }))
)

app.listen(4000, async () => {
    try {
        console.log('server started on port 4000.')
        if (
          dbFilename !== ':memory:' &&
          fileExisted &&
          userVersion !== desiredUserVersion
        ) {
          fs.copyFileSync(
            `${dir}/${dbFilename}.db`,
            `${dir}/${dbFilename}-backup-${new Date().toISOString()}.db`
          )
        }
        await User.initialize(db)
        await db.get(`PRAGMA user_version = ${desiredUserVersion}`)
    } catch (error) {
        console.log(error)
    }
})

process
    .on('uncaughtException', (err) => {
        console.error(err, 'Uncaught Exception thrown')
        process.exit(1)
    })
    .on('unhandleRejection', function (reason, p) {
        console.error(reason, 'Unhandled Rejection at Promise', p) // to see your exception details in the console
        // if you are on production, maybe you can send the exception details to your
        // email as well ?
    })