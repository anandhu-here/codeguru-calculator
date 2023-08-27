const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const { createUsersTable, createCalculatorTable } = require('./db/createTables');
const cors = require('cors');
const pool = require('./db/config')
const path = require('path');


createUsersTable()
createCalculatorTable()

console.log(__dirname)
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(cors())

app.use(bodyParser.json());

router(app, pool);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});


app.listen(3001, (req, res)=>{
    console.log('App running')
})


