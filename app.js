var express = require('express')
var exphbs = require('express-handlebars')
var moment = require('moment')
var app = express()
var hbs = exphbs.create({ defaultLayout: 'main' })
var TOTAL_DAYS_PREG = 280
var due_date = 'Oct 20, 2016'

var m = moment(new Date(due_date))

var today = moment().startOf('day')

var days = TOTAL_DAYS_PREG + Math.round(moment.duration(today - m).asDays())

var percent_pop = Math.round(days / TOTAL_DAYS_PREG * 100)

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home', { percent_pop: percent_pop })
})

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
