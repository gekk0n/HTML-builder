const fs = require('fs');
const path = require('path');

if (!path.join(__dirname, 'files-copy')){
  fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {if (err) throw err;});
}

fs.readdir(path.join(__dirname, 'files'), 'utf-8', (err, file) => {
  if (err) throw err;
  file.forEach( (el) => {
    fs.copyFile(path.join(__dirname, `files\\${el}`), path.join(__dirname, `files-copy\\${el}`), (err) => {
      if (err) throw err;
    });
  });
});
