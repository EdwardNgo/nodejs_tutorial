const newsRouter = require('./news')
const siteRouter = require('./site')
const tutorialRouter = require('./tutorial')
const authRouter = require('./auth')

function route(app) {
  app.use('/news', newsRouter)
  app.use('/', siteRouter)
  app.use('/api/tutorials',tutorialRouter)
  app.use('/api/auth',authRouter)
}

module.exports = route
