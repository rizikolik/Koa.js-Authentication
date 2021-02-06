const Koa = require('koa')
const session = require('koa-session')
const passport = require('koa-passport')
const bodyParser = require('koa-bodyparser')
const { dbConnect } = require('./database')
// eslint-disable-next-line no-unused-vars
const path = require('path')
const logger = require('./utils/logger')
const morgan = require('koa-morgan')
const config = require('../config')

// Modules that will be used by App //

const UserModule = require('./models/User')
// startup

const app = new Koa()
app.use(session(app))
// body parser
app.use(bodyParser())
const dbURI = config.selectedENV.mongoUrl
app.use(morgan('combined', { stream: logger.stream })) // Combine morgan's console logs with winston logs






app.use(passport.initialize())

app.use(UserModule.router.routes())
app.use(UserModule.router.allowedMethods())

// error logger With Morgan+Winston
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const locals = {}
  locals.message = err.response.message
  locals.error = err.app.env === 'development' ? err : {}

  // add this line to include winston logging
  logger.error(
    `${err.response.status || 500} - ${err.response.message} - ${err.originalUrl} - ${
      err.req.method
    } `
  )
})

dbConnect(`${dbURI}`)
  .then(
    app.listen(process.env.PORT || 5000, process.env.IP, function () {
      console.log(`SERVER IS RUNNİNG AT ${process.env.PORT || 5000}`)
    })
  )
  .catch((err) => {
    console.log(err, 'connection error of mongoDB')
  })
