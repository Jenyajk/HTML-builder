const fs = require('fs');
const process = require('process');
const file = '02-write-file/file.txt';

fs.writeFile(file,'', (err) => {
  if (err) {
    console.error(err);
  }
  process.stdout.write('Write for me\n');
});

process.stdin.on('data', data => fs.appendFile(file, data , (err) => {
  if (err) {
    console.error(err);
  }

}));

process.on('SIGINT', () => {
  process.stdout.write('Bye');
  process.exit();
});

