const fs = require('fs');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist\\bundle.css');

fs.writeFile(bundlePath, '', (err) => {
  if (err) throw err;
});
fs.readdir(stylesPath, 
  {encoding: 'utf-8',
    withFileTypes: true,
  },
  (err, file) => {
    if (err) throw err;
    file.forEach(el => {
      if (el.isFile() && path.extname(`${stylesPath}\\${el.name}`) === '.css') {
        fs.readFile(`${stylesPath}\\${el.name}`, 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(bundlePath, data, () =>{});
        });
      }
      
    });
    // file.forEach(() => {
    //   fs.stat(stylesPath, (err, stats) => {
    //     if (err) throw err;
    //     console.log(stats);
    //   });
    // });
  });
