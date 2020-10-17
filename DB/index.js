const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/carousel';


mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
  console.log(`connection to database established`)
}).catch(err=>{
 throw err;
})
;
const db = mongoose.connection;



module.exports = db;


const {Client} = require('pg');
console.log('first');
const {user} = require('./environment.js');
const {password} = require('./environment.js');
const {host} = require('./environment.js');
const {port} = require('./environment.js');
const {database} = require('./environment.js');
console.log('second');

const client = new Client({
  user: user,
  password: password,
  host: host,
  port: port,
  database: database
});


// client.connect()
// .then(() => {
//   console.log('success');
// })