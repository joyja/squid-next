const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())

const schema = buildSchema(
    fs.readFileSync(path.resolve(process.cwd(), 'src/schema.graphql')).toString()
)

const context = {}

const rootValue = {
    info: 'Edge Container Management',
}

app.use(
    graphqlHTTP({
        schema,
        rootValue,
        context,
        graphiql: true
    })
)

app.listen(4000, async () => {
    try {
        console.log('server started on port 4000.')
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