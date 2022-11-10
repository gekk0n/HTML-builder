const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const copyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

async function copyDirectory () {
  await fsPromises.mkdir(copyPath, {recursive: true});
  await fsPromises.access(filesPath);
  fs.readdir(filesPath, 'utf-8', (err, file) => {
    if (err) throw err;
    file.forEach( (el) => {
      fs.copyFile(path.join(filesPath, el), path.join(copyPath, el), (err) => {
        if (err) throw err;
      });
    });
  });
}

async function updateFolder(files, filesCopy) {
  await fs.promises.rm(filesCopy, { recursive: true, force: true });
  copyDirectory(files, filesCopy);
}

updateFolder (filesPath, copyPath);