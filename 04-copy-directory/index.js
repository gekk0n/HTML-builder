const fs = require('fs');
const path = require('path');
const copyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

fs.mkdir(copyPath,
  {
    recursive: true,
  },
  (err) => {if (err) throw err;});

fs.readdir(filesPath, 'utf-8', (err, file) => {
  if (err) throw err;
  file.forEach( (el) => {
    fs.copyFile(path.join(filesPath, el), path.join(copyPath, el), (err) => {
      if (err) throw err;
    });
  });
});
