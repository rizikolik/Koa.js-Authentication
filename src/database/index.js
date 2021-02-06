const Mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()

// Connect to database
const dbConnect = async url => {
  await Mongoose.connect(url, {

    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true

  })
  Mongoose.connection.on('error', err => {
    if (err) {
      // Sometimes writing the error line can be helpful
      console.log(
        'CANT CONNECT TO THE DATABASE:Mongoose Connect Error at Database Index file:',
        err
      )
      throw err
    }
  })
}

module.exports = {
  dbConnect
}
