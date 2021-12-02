const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

db.connect()

//Static file
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// HTTP Logger
app.use(morgan('combined'))

//Template engine
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'))
// app.set("views",path.join(__dirname,'resources/views'))

//Route init
route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
