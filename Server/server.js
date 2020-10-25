const express = require('express');
const app = express();
// const Image = require('../DB/image.js')
const bodyParser = require('body-parser')
app.use(express.json());
const path = require('path');
// const babelPolyFill = require('@babel/polyfill');

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (req, res) => {
  res.end('Baby Steps!')
})

// mongoose
// app.get('/products', function(req, res) {
//   Image.find({}, function(err, result) {
//     if (err) {
//     throw err;
//   } else {
//     res.send(result);
//   }
//   })
// });

// app.get('/products/:product/', function(req, res) {
//   var productParam = req.params.product;
//   var colorParam = req.params.color;
//   Image.find({
//       product: productParam
// }, function(err, result) {
//     if (err) {
//     throw err;
//   } else {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.send(result);
//   }
//   });

// });

//new addition

// //post request: creates a new data
// app.post('/products/', function(req, res) {
//   let product = req.body.product;
//   let image_name = req.body.image_name;
//   let color = req.body.color;
//   let url = req.body.url;
//   let alt = req.body.alt;

//   Image.create({product, image_name, color, url, alt}, function(err, result) {
//     if (err) {
//     throw err;
//     } else {
//       res.send(result);
//     }
//   })
// });

// //put request: updates existing, or creates a new data if the data doesn't exist yet
// app.put('/products/:product/', function (req, res) {
//   let productParam = req.params.product;
//   let product = req.body.product;
//   let image_name = req.body.image_name;
//   let color = req.body.color;
//   let url = req.body.url;
//   let alt = req.body.alt;

//   Image.find({product: productParam}, function(err, result) {
//     if (result) {
//       Image.updateOne({product: productParam}, req.body, function(err, result) {
//         if (err) {
//           throw err;
//         } else {
//           res.send(result);
//         }
//       });
//     } else {
//       Image.create({product, image_name, color, url, alt}, function(err, result) {
//         if (err) {
//         throw err;
//         } else {
//           res.send(result);
//         }
//       })
//     }
//   });
// })

// //delete request: deletes a  data
// app.delete('/products/:product/', function (req, res) {
//   let productParam = req.params.product;

//   Image.deleteOne({product: productParam}, function(err, result) {
//     if (err) {
//       throw err;
//     } else {
//       res.send('Got a DELETE request at /products/:product/');
//     }
//   });
// })

////////////////////////////////////////////////////////////////
//cassandra

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'sdc'});
client.connect((err, result) => {
  console.log('index: cassandra connected');
});

const getAllByProduct = 'SELECT * FROM sdc.product WHERE product = ? ALLOW FILTERING';
const getLastProduct = 'SELECT * FROM sdc.product_by_id LIMIT 1 ALLOW FILTERING';
const postByProduct = 'INSERT INTO sdc.product (product, image_name, color, url, category, picture_length, alt) VALUES = ? ALLOW FILTERING';

app.get('/products/:product/', function(req, res) {
  let productParam = Number(req.params.product);
  console.log('server');
  client.execute(getAllByProduct, [productParam], {hints : ['int']}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result.rows);
    }
  });
});

//post request: creates a new data
app.post('/products/', function(req, res) {
  let image_name = req.body.image_name;
  let color = req.body.color;
  let url = req.body.url;
  let category = req.body.category;
  let picture_length = req.body.picture_length;
  let alt = req.body.alt;
  let product;
  //get the last id
  client.execute(getLastProduct, [], {hints : ['int']}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      product = result.rows + 1;
      if (result.rows.length === 0) {
        product = 0;
      }
      let productParam = [product, image_name, color, url, category, picture_length, alt]
      res.send({id: product});
      // client.execute(postByProduct, [productParam], {hints : ['int']}, (err, result) => {
      //   if (err) {
      //     res.status(404).send({msg: err});
      //   } else {
      //     res.status(200).send(result);
      //   }
      // });
    }
  });
});

//put request: updates existing, or creates a new data if the data doesn't exist yet
app.put('/products/:product/', function (req, res) {
  let productParam = req.params.product;
  let product = req.body.product;
  let image_name = req.body.image_name;
  let color = req.body.color;
  let url = req.body.url;
  let alt = req.body.alt;

  Image.find({product: productParam}, function(err, result) {
    if (result) {
      Image.updateOne({product: productParam}, req.body, function(err, result) {
        if (err) {
          throw err;
        } else {
          res.send(result);
        }
      });
    } else {
      Image.create({product, image_name, color, url, alt}, function(err, result) {
        if (err) {
        throw err;
        } else {
          res.send(result);
        }
      })
    }
  });
});

//delete request: deletes a  data
app.delete('/products/:product/', function (req, res) {
  let productParam = req.params.product;

  Image.deleteOne({product: productParam}, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.send('Got a DELETE request at /products/:product/');
    }
  });
})

module.exports = app;


