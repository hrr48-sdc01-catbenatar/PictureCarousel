// const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost/carousel';


// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
// .then(()=>{
//   console.log(`connection to database established`)
// }).catch(err=>{
//  throw err;
// })
// ;
// const db = mongoose.connection;



// module.exports = db;


const info = require('./environment.js');
const {Sequelize, DataTypes} = require('sequelize');
const user = info.user;
const password = info.password;
const host = info.host;
const port = info.port;
const database = info.database;
const fs = require('fs');

const data = require('./primaries.txt');
const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`);

//load and initialize pgp
const pgp = require('pg-promise')();
//checking connection
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//creating table


//convert and read data
////////////////////////////////use stream line.
fs.readFile('./DB/primaries.txt', (err, data) => {
  let convert = data.toString('utf-8');
  data = JSON.parse(convert);

  console.log(data);

  const product = sequelize.define('product', {
    product: DataTypes.INTEGER,
    imageName: DataTypes.STRING,
    color: DataTypes.STRING,
    url: DataTypes.ARRAY(DataTypes.STRING),
    alt: DataTypes.STRING
  });
  // console.log(data[0]["imageName"]);
  // console.log(typeof data[0]);
  // sequelize.bulkInsert('product', data);

  //connect to postgres
  const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
  const format = new pgp.helpers.ColumnSet(['product', 'imageName', 'color', 'url', 'alt'], {table: 'product'});
  const insert = pgp.helpers.insert(data, format);
  db.none(insert)
  .then(() => {
    console.log('Successfully added');
  })
  .catch(err => {
    console.error('Failed to load', err);
  });

})
