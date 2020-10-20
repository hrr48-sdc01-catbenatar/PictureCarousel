const faker = require('faker');
const fs = require('fs');

(function generateData(number, batch) {
  console.time('timer');
  const clothes = ['hoodies', 'shirts', 'dress', 'shoes', 'pants', 'jacket'];
  const randClothesIndex = Math.floor(Math.random() * clothes.length);
  const keyword = clothes[randClothesIndex];
  const pictureLength = Math.ceil(Math.random() * 7);
  let pictures = [];
  let counter = 0;
  let data = '';

  for (let j = 0; j < pictureLength; j++) {
    pictures.push(`"https://loremflickr.com/320/240/${keyword}"`);
  }

  for (var i = 0; i < number; i++ ) {
    let record = {
      product: i,
      imageName: faker.commerce.productDescription(),
      color: faker.commerce.color().split(' ').join('-'),
      url: pictures,
      alt: faker.image.abstract()
    };
    record = JSON.stringify(record) + ',';
    //edge cases of starting and ending values
    if (i === 0) {
      record = '[' + record;
    }
    if (i === number -1) {
      let len = record.length;
      record = record.slice(0, len - 1) + ']';
    }

    data += record;
    counter++;

    if (counter % batch === 0) {
      try {
        fs.appendFileSync('./DB/primaries.txt', data);
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
      fs.appendFileSync('./DB/primaries.txt', data);
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

