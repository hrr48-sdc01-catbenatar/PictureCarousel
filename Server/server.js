const express = require('express');
const app = express();
const Image = require('../DB/image.js')
const bodyParser = require('body-parser')
app.use(express.json());
const path = require('path');
const babelPolyFill = require('@babel/polyfill');

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (req, res) => {
  res.end('Baby Steps!')
})

app.get('/products', function(req, res) {
  Image.find({}, function(err, result) {
    if (err) {
    throw err;
  } else {
    res.send(result);
  }
  })
});

app.get('/products/:product/', function(req, res) {
  var productParam = req.params.product;
  var colorParam = req.params.color;
  Image.find({
      product: productParam
}, function(err, result) {
    if (err) {
    throw err;
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result);
  }
  });

});


////////////////////////////////////////////////////
app.post('/products/', function(req, res) {
  var product = req.body.product;
  var imageName = req.body.imageName;
  var color = req.body.color;
  var url = req.body.url;
  var alt = req.body.alt;

  Image.create({product, imageName, color, url, alt}, function(err, result) {
    if (err) {
    throw err;
    } else {
      res.send(result);
    }
  })
});

app.put('/products/:product/', function (req, res) {
  var productParam = req.params.product;
  var product = req.body.product;
  var imageName = req.body.imageName;
  var color = req.body.color;
  var url = req.body.url;
  var alt = req.body.alt;

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
      Image.create({product, imageName, color, url, alt}, function(err, result) {
        if (err) {
        throw err;
        } else {
          res.send(result);
        }
      })
    }
  });
})

app.delete('/products/:product/', function (req, res) {
  var productParam = req.params.product;

  Image.deleteOne({product: productParam}, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.send('Got a DELETE request at /products/:product/');
    }
  });
})


module.exports = app;


