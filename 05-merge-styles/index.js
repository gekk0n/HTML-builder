const fs = require('fs');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundlePath, '', (err) => {
  if (err) throw err;
});
fs.readdir(stylesPath, { withFileTypes: true },
  (err, file) => {
    if (err) throw err;
    file.forEach(el => {
      if (el.isFile() && path.extname(path.join(stylesPath, `${el.name}`)) === '.css') {
        fs.readFile(path.join(stylesPath, `${el.name}`), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(bundlePath, data, () =>{});
        });
      }
    });
  });
