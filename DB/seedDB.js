const faker = require('faker');
const fs = require('fs');

(function generateData(number, batch) {
  console.time('timer');
  const clothes = ['hoodies', 'shirts', 'dress', 'shoes', 'pants', 'jacket'];
  let counter = 0;
  let data = '';

  for (var i = 0; i < number; i++ ) {
    const randClothesIndex = Math.floor(Math.random() * clothes.length);
    const keyword = clothes[randClothesIndex];
    const picture_length = Math.ceil(Math.random() * 7);
    const headers = 'product, image_name, color, url, category, picture_length, alt';

    let record = `${i}|"${faker.commerce.productDescription()}"|"${faker.commerce.color().split(' ').join('-')}"|"https://loremflickr.com/320/240/"|"${keyword}"|${picture_length}|"${faker.image.abstract()}"`;

    // record = '\n' + record;
    //edge cases of starting and ending values
    // if (i === 0) {
    //   record = headers + record;
    // }
    if (i !== 0) {
      record = '\n' + record;
    }
    // if (i === number -1) {
    //   let len = record.length;
    //   record = record.slice(0, len - 1) + ']';
    // }

    data += record;
    counter++;

    if (counter % batch === 0) {
      try {
        fs.appendFileSync('./DB/primaries.csv', data);
        // console.log('adding: ', i);
      } catch (err) {
        console.log('error', i);
        throw err;
      }
      counter = 0;
      data = '';
    }
  }

  if (counter !== 0) {
    try {
      fs.appendFileSync('./DB/primaries.csv', data);
      // console.log('adding last batch: ');
    } catch (err) {
      console.log('error last batch', i);
      throw err;
    }
    counter = 0;
    data = '';
  }

  console.log('FINISHED!!');
  console.timeEnd('timer');
})(10000000, 30000);

