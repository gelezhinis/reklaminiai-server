const fs = require('fs');

const deleteFile = (filesPathUrls) => {
  filesPathUrls.map(filePath => {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw (err);
      }
    });
  })
}

exports.deleteFile = deleteFile;