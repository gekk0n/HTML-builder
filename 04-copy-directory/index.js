const fs = require('fs');
const path = require('path');
const copyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

fs.mkdir(copyPath, (err) => {if (err) throw err;});

fs.readdir(filesPath, 'utf-8', (err, file) => {
  if (err) throw err;
  file.forEach( (el) => {
    fs.copyFile(path.join(__dirname, `files\\${el}`), path.join(__dirname, `files-copy\\${el}`), (err) => {
      if (err) throw err;
    });
  });
});
