const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'calculator-db.cskrza2seurw.us-east-1.rds.amazonaws.com',
  database: "postgres",
  password: 'calculator123',
  port: 5432, // Default PostgreSQL port
  force_ssl:0
});

module.exports = pool;

// const mongoose = require('mongoose')

// const url = `mongodb+srv://anandhusathee:mongoBird@cluster0.oz5c8dj.mongodb.net/?retryWrites=true&w=majority`

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to the database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. n${err}`);
//     })