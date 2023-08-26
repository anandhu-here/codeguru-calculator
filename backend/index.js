const express = require('express');
const router = require('./routes/index');
const db = require('./models/index');
const bodyParser = require('body-parser');
const { createUsersTable, createCalculatorTable } = require('./db/createTables');
const cors = require('cors');

// createUsersTable()
// createCalculatorTable()

const app = express()
app.use(cors())

app.use(bodyParser.json());

router(app, db)


app.listen(3001, (req, res)=>{
    console.log('App running')
})


