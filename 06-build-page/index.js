const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const projectFolder = path.join(__dirname, 'project-dist');
const templatefile = path.join(__dirname, 'template.html');
const assetsFolder = path.join(__dirname, 'assets');
const distAssetsFolder = path.join(__dirname, 'project-dist', 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const re = /{{.{0,}}}/gm;

async function createFolders () {
  await fsPromises.mkdir(projectFolder, { recursive: true});
  fs.cp(assetsFolder, distAssetsFolder, {recursive: true}, (err) => {
    if (err) throw err;
  });
}

async function createHtml () {
  await fsPromises.copyFile(templatefile, path.join(projectFolder, 'template.html'));
  await fsPromises.rename(path.join(projectFolder, 'template.html'), path.join(projectFolder, 'index.html'));
  
  async function readIndex () {
    await fsPromises.access(path.join(projectFolder, 'index.html'));
    fs.readFile(path.join(projectFolder, 'index.html'), 'utf8', (err, data) => {
      if (err) throw err;
      let indexContent = data.toString();
      let templateTags = indexContent.match(re);
      templateTags.forEach(async tag => {
        let currentTag = tag.replace(/[^a-z]/gi, '');
        await fsPromises.access(path.join(componentsFolder, `${currentTag}.html`));
        fs.readFile(path.join(componentsFolder, `${currentTag}.html`), {withFileTypes: true}, (err, data) => {
          if (err) throw err;
          let content = data.toString();
          indexContent = indexContent.replace(`{{${currentTag}}}`, content);
          fs.writeFile(path.join(projectFolder, 'index.html'), indexContent, (err) => {
            if (err) throw err;
          });
        });
      });
    });
  }
  await readIndex ();
}



async function copyStyles () {
  fs.writeFile(path.join(projectFolder, 'style.css'), '', (err) => {
    if (err) throw err;
  });
  fs.readdir(stylesFolder, {
    withFileTypes: true
  },
  (err, file) => {
    if (err) throw err;
    file.forEach(el => {
      if (el.isFile() && path.extname(path.join(stylesFolder, `${el.name}`)) === '.css') {
        fs.readFile(path.join(stylesFolder, `${el.name}`), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(projectFolder, 'style.css'), data, () => {});
        });
      }
    });
  });
}

async function buildPage() {
  await createFolders();
  await createHtml();
  await copyStyles();
}

buildPage();




