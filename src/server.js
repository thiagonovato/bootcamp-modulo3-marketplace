const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middleware()
    this.routes()
  }

  database() {
    // mongodb://usuario:senha@localhost:27017/nomedatabase
    // no docker, por padrão não tem user/senha
    // mongodb://gonode:lQ7LYPUcWyGTCiYG@cluster0-shard-00-00-jerve.mongodb.net:27017,cluster0-shard-00-01-jerve.mongodb.net:27017,cluster0-shard-00-02-jerve.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middleware() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
