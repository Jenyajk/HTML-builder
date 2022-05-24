const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'project-dist');
const folderPathStyle = path.join(__dirname, 'styles');
const folderAssets = path.join(__dirname, 'assets');
const folderAssetsCopy = path.join(__dirname, 'project-dist/assets');
const folderFontsCopy = path.join(folderAssetsCopy, 'fonts');
const folderImgCopy = path.join(folderAssetsCopy, 'img');
const folderSvgCopy = path.join(folderAssetsCopy, 'svg');
const pathTemplate = path.join(__dirname, 'template.html');
const pathIndex = path.join(folderPath, 'index.html');
const folderComponents = path.join(__dirname, 'components');


async function Create() {
  try {
    await promises.mkdir(folderPath, { recursive: true });
  } catch (err) {
    console.error( 'Папка не создана' + err);
  }
}

async function Delete() {
  try { 
    if(fs.access(folderPath, fs.F_OK, (err) => {
      if (err) {
        console.error('Нет папки' +  err);
      }
    })) {
      await promises.rm(folderPath, {recursive : true, focre : true});}
  } catch (err) {
    console.error( err);
  }
}
async function Style () {
  try {
    await promises.writeFile(path.join(folderPath, 'index.html'), '');
    await promises.writeFile(path.join(folderPath, 'style.css'), '');
    const output =  fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
    const input = fs.createReadStream(path.join(__dirname, 'template.html'));
    input.pipe(output);
    await promises.rm(folderAssetsCopy, { recursive: true, force: true });
    await promises.mkdir(folderAssetsCopy);
    await promises.rm(folderFontsCopy, { recursive: true, force: true });
    await promises.mkdir(folderFontsCopy);
    await promises.rm(folderImgCopy, { recursive: true, force: true });
    await promises.mkdir(folderImgCopy);
    await promises.rm(folderSvgCopy, { recursive: true, force: true });
    await promises.mkdir(folderSvgCopy);
    await promises.readdir(folderPathStyle)
      .then(files => {
        files.forEach(file => {
          let pop = path.extname(file);
          if (pop !== '.css'){
            const noCss = path.basename(file);
            const noCssPath = path.join(folderPathStyle, noCss);
            fs.unlink(noCssPath, (err) => {
              if (err) {
                console.error('Нет .css' +  err);
              }
            });
          }
          const output =  fs.createWriteStream(path.join(folderPath, 'style.css'));
          if (files.length === 1) {
            const input = fs.createReadStream(path.join(folderPathStyle, files[0]));
            input.pipe(output);}
          if (files.length === 2) {
            const input = fs.createReadStream(path.join(folderPathStyle, files[0]));
            const input1 = fs.createReadStream(path.join(folderPathStyle, files[1]));
            input.pipe(output);
            input1.pipe(output);}
          if (files.length === 3) {
            const input = fs.createReadStream(path.join(folderPathStyle, files[0]));
            const input1 = fs.createReadStream(path.join(folderPathStyle, files[1]));
            const input2 = fs.createReadStream(path.join(folderPathStyle, files[2]));
            input.pipe(output);
            input1.pipe(output);
            input2.pipe(output);}
          if (files.length === 4) {
            const input = fs.createReadStream(path.join(folderPathStyle, files[0]));
            const input1 = fs.createReadStream(path.join(folderPathStyle, files[1]));
            const input2 = fs.createReadStream(path.join(folderPathStyle, files[2]));
            const input3 = fs.createReadStream(path.join(folderPathStyle, files[3]));
            input.pipe(output);
            input1.pipe(output);
            input2.pipe(output);
            input3.pipe(output);}
        });
      }
      );
  } catch (err) {
    console.error( 'Стили не переданы' + err);
  }
}

async function copyFiles(output, input) {
  try {
    const files = await promises.readdir(output, { withFileTypes: true });
    for (let file of files) {
      if (file.isDirectory()){
        await copyFiles(path.join(output, file.name), path.join(input, file.name));
      } else if (file.isFile()) {
        fs.copyFile(path.join(output, file.name), path.join(input, file.name), (err) => {
          if (err) {
            console.log('Папка не скопировалась' + err);
          }
        });
      }
    }
  } catch (err) {
    console.log('Файлы не скопировались' + err);
  }

}

async function Page(){
  const components = [];
  try{
    const files = await promises.readdir(folderComponents, { withFileTypes: true });
    for (const file of files) {
      if (path.extname(path.join(folderComponents, file.name)) === '.html'){
        const fileContent = await promises.readFile(path.join(folderComponents, file.name), 'utf8');
        const name = file.name.split('.')[0];
        components.push({name: name, data :fileContent});
      }
    }
    let innerHTML = await promises.readFile(path.join(pathTemplate), 'utf8');
    components.forEach(elem => {
      let pos = innerHTML.indexOf('{{' + elem.name + '}}');
      if (pos > 0) {
        let innerHTML1 = innerHTML.slice(0, pos);
        let innerHTML2  = innerHTML.slice(pos + elem.name.length + 4);
        innerHTML = innerHTML1 + elem.data + innerHTML2;
      }
    });
    await promises.writeFile(pathIndex, innerHTML);
  } catch (err) {
    console.log('HTML не собран' + err);
  }
}

(async () => {
  await Create();
  await Delete();
  await Style();
  await copyFiles(folderAssets, folderAssetsCopy);
  await Page(pathTemplate, pathIndex, folderComponents);
})();


