const path = require('path');
const fs = require('fs');
const {stdin, stdout, exit} = process;
const filePath = path.join(__dirname, 'lyrics.txt');
fs.writeFile(
  filePath, '', err => {
    if (err) throw err;
  }
);
stdout.write('Ведите текст любимой песни:\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  }
  if (fs.existsSync(filePath)) {
    fs.appendFile(filePath, data, err => {
      if (err) throw err;
    });
  }
});

process.on('exit', () => stdout.write('Спасибо! Вы поёте великолепно!'));
process.on('SIGINT', () => process.exit());
