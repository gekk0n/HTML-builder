const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    data.forEach(file => {
      fs.stat('03-files-in-folder\\secret-folder\\' +file, 
        (err, stat) => {
          if (err) throw err;
          if (stat.size !== 0) {
            let name = file.split('.').join(' ');
            console.log(`${name} ${stat.size / 1000} Kb`);
          }
        }
      );
    });
  }
);
