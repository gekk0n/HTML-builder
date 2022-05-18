const path = require('path');
const fs = require('fs');
const {stdin, stdout, exit} = process;

fs.writeFile(
  path.join(__dirname, 'lyrics.txt'), '', err => {
    if (err) throw err;
  }
);
stdout.write('Ведите текст любимой песни:\n');

stdin.on('data', data => {
  let str = data.toString().trim();
  if (str === 'exit') {
    exit();
  }
  if (fs.existsSync(path.join(__dirname, 'lyrics.txt'))) {
    fs.appendFile(
      path.join(__dirname, 'lyrics.txt'), data, err => {
        if (err) throw err;
      }
    );
  }
  
});

process.on('exit', () => stdout.write('Спасибо! Вы поёте великолепно!'));
// process.on('SIGNIT', () => stdout.write('Спасибо! Вы поёте великолепно!'));
process.on('SIGINT', () => process.exit());
