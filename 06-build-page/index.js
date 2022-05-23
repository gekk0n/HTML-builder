const fs = require('fs');
const path = require('path');
const projectDir = path.join(__dirname, 'project-dist');

fs.mkdir(projectDir, (err) => {
  if (err) throw err;
  fs.copyFile('06-build-page\\template.html', `${projectDir}\\template.html`, (err) => {
    if (err) throw err;
    fs.rename(`${projectDir}\\template.html`, `${projectDir}\\index.html`, () =>{});
  });
});
