// Require needed packages
let cors = require('cors')
let express = require('express')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX (fetch, ajax, axios) call)

// Routes
app.use('/auth', require('./controllers/auth'))

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
