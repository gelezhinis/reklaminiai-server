const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

// Laba diena

const deleteFile = (filesPathUrls) => {
  filesPathUrls.map(filePath => {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw (err);
      }
    });
  })
}

const loadData = (id) => {
  const dataList = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '../files/data.csv'))
      .pipe(
        parse({
          // comment: '#',
          columns: true,
        })
      )
      .on('data', (row) => {
        const extractedData = {
          EEID: row.EEID,
          Name: row.Name,
          Description: row.Description,
          Price1: row.Price1,
          Price2: row.Price2,
          Price3: row.Price3,
          Price4: row.Price4,
          Price5: row.Price5,
        };
        
        dataList.push(extractedData);
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        const dataById = dataList.find((d) => d.EEID === id);

        if (dataById) {
          // console.log(dataById);
          // If data is found, resolve the promise with the object
          const resultObject = {
            name: dataById.Name,
            price1: dataById.Price1,
            price2: dataById.Price2,
            price3: dataById.Price3,
            price4: dataById.Price4,
            price5: dataById.Price5,
            description: dataById.Description,
          };
          resolve(resultObject);
        } else {
          // If data is not found, reject the promise
          // reject(new Error(`Data not found for ID: ${id}`));
          console.log('Data not found!');
        }
      });
  });
};

module.exports = {
  deleteFile,
  loadData,
};
