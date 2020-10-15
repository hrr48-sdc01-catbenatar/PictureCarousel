# Carousel
Image Carousel

# Welcome to the image carousel.

In order to get setup run the following scripts:

1) Install Dependencies: npm install

2) Seeding Script:
  - open mongo instance in terminal: mongo
  - choose database: use carousel
  - clear collection: db.images.remove({})
  - in a seperate terminal: npm run dbSetup

3) Server Start Script: npm start

4) Webpack Script: npm run build

5) Carousel should be rendered to DOM


Testing Script: npm test

## Updates with CRUD:
1. GET '/products' return all the pictures
2. GET '/products/:product/' retuns pictures of a product specified by :product.
3. POST '/products/' creates a picture to be added into the database
4. PUT '/products/:product/' edits specified product, or creates a new data if such product does not exists.
5. DELETE '/products/:product/'deletes pictures of a product specified in :product.

