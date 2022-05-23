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

async function Delete() {
  try {
    await promises.rm(folderPath, {recursive : true, focre : true});
  } catch (err) {
    console.error( err);
  }
}
async function Create() {
  try {
    await promises.mkdir(folderPath, { recursive: true });
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
                console.error(err);
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
    console.error( err);
  }
}

async function copyFiles(output, input) {
  const files = await promises.readdir(output, { withFileTypes: true });
  for (let file of files) {
    if (file.isDirectory()){
      await copyFiles(path.join(output, file.name), path.join(input, file.name));
    } else if (file.isFile()) {
      fs.copyFile(path.join(output, file.name), path.join(input, file.name), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}

async function bundleHTML(fileFrom, fileTo, folderPath){
  const components = [];
  try{
    const files = await promises.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (path.extname(path.join(folderPath, file.name)) === '.html'){
        const fileContent = await promises.readFile(path.join(folderPath, file.name), 'utf8');
        const name = file.name.split('.')[0];
        components.push({name: name, data :fileContent});
      }
    }
    let innerHTML = await promises.readFile(path.join(fileFrom), 'utf8');
    components.forEach(component => {
      let pos = innerHTML.indexOf('{{' + component.name + '}}');
      console.log(pos);
      if (pos > 0) {
        let htmlContentBefore = innerHTML.slice(0, pos);
        let htmlContentAfter  = innerHTML.slice(pos + component.name.length + 4);
        innerHTML = htmlContentBefore + component.data + htmlContentAfter;
      }
    });
    await promises.writeFile(fileTo, innerHTML);
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await Delete();
  await Create();
  await Style();
  await copyFiles(folderAssets, folderAssetsCopy);
  await bundleHTML(path.join(__dirname, 'template.html'), path.join(folderPath, 'index.html'), path.join(__dirname, 'components'));
})();


