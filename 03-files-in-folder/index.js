const path = require('path');
const fs = require('fs');
const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath,
  'utf-8',
  (err, data) => {
    if (err) throw err;
    data.forEach(file => {
      fs.stat(path.join(secretPath, file),
        (err, stat) => {
          if (err) throw err;
          if (stat.isFile()) {
            let name = file.split('.').join(' ');
            console.log(`${name} ${stat.size / 1000} Kb`);
          }
        }
      );
    });
  }
);
