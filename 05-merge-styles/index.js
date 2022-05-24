const fs = require('fs');
const path = require('path');
const folderPathStyle = '05-merge-styles/styles';
const folderPath = '05-merge-styles/project-dist';
const test =[];


async function Merge(){
  try {
    fs.readdir(folderPathStyle, (err, files) => {
      if (err) {
        console.error(err);
      }
      files.forEach(file => {
        let pop = path.extname(file);
        if (pop === '.css'){
          test.push(file);
          test.flat();
          return test;

        }
      });
      const output = fs.createWriteStream(path.join(folderPath, 'bundle.css'));
      if (test.length === 1) {
        const input = fs.createReadStream(path.join(folderPathStyle, test[0]));
        input.pipe(output);}
      if (test.length === 2) {
        const input = fs.createReadStream(path.join(folderPathStyle, test[0]));
        const input1 = fs.createReadStream(path.join(folderPathStyle, test[1]));
        input.pipe(output);
        input1.pipe(output);}
      if (test.length === 3) {
        const input = fs.createReadStream(path.join(folderPathStyle, test[0]));
        const input1 = fs.createReadStream(path.join(folderPathStyle, test[1]));
        const input2 = fs.createReadStream(path.join(folderPathStyle, test[2]));
        input.pipe(output);
        input1.pipe(output);
        input2.pipe(output);}
      if (test.length === 4) {
        const input = fs.createReadStream(path.join(folderPathStyle, test[0]));
        const input1 = fs.createReadStream(path.join(folderPathStyle, test[1]));
        const input2 = fs.createReadStream(path.join(folderPathStyle, test[2]));
        const input3 = fs.createReadStream(path.join(folderPathStyle, test[3]));
        input.pipe(output);
        input1.pipe(output);
        input2.pipe(output);
        input3.pipe(output);}
    });


  } catch (err) {
    console.error( 'Файл не создан' + err);
  }
}

Merge();



