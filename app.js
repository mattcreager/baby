var express = require('express')
var exphbs = require('express-handlebars')
var moment = require('moment')
var app = express()
var hbs = exphbs.create({ defaultLayout: 'main' })
var BABY_NAME = process.env.BABY_NAME
var BABY_DUE = process.env.BABY_DUE
var TOTAL_DAYS_PREG = 280

var momentDue = moment(new Date(BABY_DUE))
var momentToday = moment().startOf('day')

var daysUntilBoom = TOTAL_DAYS_PREG + Math.round(moment.duration(momentToday - momentDue).asDays())

var babyPercent = Math.round(daysUntilBoom / TOTAL_DAYS_PREG * 100)

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home', {
    babyPercent: babyPercent,
    surname: BABY_NAME
  })
})

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
