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

// const data = require('./primaries.csv');
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

// //creating table
// const product = sequelize.define('product', {
//   product: DataTypes.INTEGER,
//   image_name: DataTypes.STRING,
//   color: DataTypes.STRING,
//   url: DataTypes.STRING,
//   category: DataTypes.STRING,
//   picture_length: DataTypes.INTEGER,
//   alt: DataTypes.STRING
// });

//convert and read data

// fileStream = fs.createReadStream (__dirname + '/primaries.csv');
// // fileStream.on('data', function(chunk) {
// //   console.log(chunk);
// // });

// fileStream.on('data', function(chunk){
//   // let data

//   // while( (data = fileStream.read() ) != null ) {
//   //   let convert = data.toString('utf-8');
//   //   data = JSON.parse(convert);
//   //   // console.log('converted data', data);
//   // }

//   //connect to postgres
//   const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
//   const format = new pgp.helpers.ColumnSet(['product', 'image_name', 'color', 'url', 'alt'], {table: 'product'});
//   const insert = pgp.helpers.insert(chunk, format);
//   db.none(insert)
//   .then(() => {
//     console.log('Successfully added');
//   })
//   .catch(err => {
//     console.error('Failed to load', err);
//   });
// });

// fileStream.on('end', function(){
//   console.log('Filestream ended!')
// });


// fs.readFile('./DB/primaries.csv', (err, data) => {
//   // let convert = data.toString('utf-8');
//   // data = JSON.parse(convert);
//   // console.log('converted data', data);

//   //connect to postgres
//   const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
//   const format = new pgp.helpers.ColumnSet(['product', 'image_name', 'color', 'url', 'category', 'picture_length','alt'], {table: 'product'});
//   const insert = pgp.helpers.insert(data, format);
//   db.none(insert)
//   .then(() => {
//     console.log('Successfully added');
//   })
//   .catch(err => {
//     console.error('Failed to load', err);
//   });
// })

///////////////////////////////////////
//Cassandra
// CREATE TABLE product (
//   product INT,
//   image_name TEXT,
//   color TEXT,
//   url TEXT,
//   category TEXT,
//   picture_length INT,
//   alt TEXT,
//   PRIMARY KEY (category, product)
// )
//SEED

// COPY products_by_id * FROM 'C:\Users\Taeksu Kim\Desktop\hackReactor\course\SDC\image_carousel\DB\primaries.csv' WITH DELIMITER = '|' AND HEADER=FALSE;

// CREATE TABLE product_by_id (
//   product INT,
//   image_name TEXT,
//   color TEXT,
//   url TEXT,
//   category TEXT,
//   picture_length INT,
//   alt TEXT,
//   PRIMARY KEY (product)
// )