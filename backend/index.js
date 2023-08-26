const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const { createUsersTable, createCalculatorTable } = require('./db/createTables');
const cors = require('cors');
const pool = require('./db/config')

// createUsersTable()
// createCalculatorTable()

const app = express()
app.use(cors())

app.use(bodyParser.json());

router(app, pool)


app.listen(3001, (req, res)=>{
    console.log('App running')
})


