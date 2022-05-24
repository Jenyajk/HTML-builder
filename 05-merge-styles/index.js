const fs = require('fs');
const path = require('path');
const folderPathStyle = '05-merge-styles/styles';
const folderPath = '05-merge-styles/project-dist';

fs.readdir(folderPathStyle, (err, files) => {
  if (err) {
    console.error(err);
  }
  files.forEach(file => {
    let pop = path.extname(file);
    if (pop !== '.css'){
      const noCss = path.basename(file);
      const noCssPath = path.join(folderPathStyle, noCss);
      fs.unlink(noCssPath, (err) => {
        if (err) {
          console.error('CDCSCDD' + err);
        }
      });
    }
  });
  const output = fs.createWriteStream(path.join(folderPath, 'bundle.css'));
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

