const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema, execute, subscribe } = require('graphql')
const cors = require('cors')
const fs = require('fs')
const https = require('https')
const path = require('path')
const resolvers = require('./resolvers')
const sqlite3 = require('sqlite3').verbose()
const { User } = require('./auth')
const LXD = require('./lxd')
const { PubSub } = require('graphql-subscriptions')
const ws = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws');

const pubsub = new PubSub()
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

//Initialize default profiles in LXD
let lxd 

const schema = buildSchema(
    fs.readFileSync(path.resolve(process.cwd(), 'src/schema.graphql')).toString()
)

const createContext = (req) => ({
    req,
    db,
    lxd
})

app.use(
    graphqlHTTP((request) => ({
        schema,
        rootValue: resolvers,
        context: createContext(request),
        graphiql: {
          headerEditorEnabled: true,
        }
    }))
)

const server = app.listen(4000, async () => {
    try {
      lxd = new LXD(pubsub)
      await lxd.init()
      //populate cloudInitComplete object, to be used for creation status
      const containers = await lxd.instances.list()
      const cloudInitComplete = {}
      containers.forEach((container) => {
        cloudInitComplete[container.name] = true
      })
      const path = '/subscriptions'
      const wsServer = new ws.Server({
          server,
          path
      });

      useServer(
          {
              schema,
              execute,
              subscribe,
              onConnect: (ctx) => {
                  console.log('Connect');
              },
              onSubscribe: (ctx, msg) => {
                  console.log('Subscribe');
              },
              onNext: (ctx, msg, args, result) => {
                  console.debug('Next');
              },
              onError: (ctx, msg, errors) => {
                  console.error('Error');
              },
              onComplete: (ctx, msg) => {
                  console.log('Complete');
              },
          },
          wsServer
      );
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