const fs = require('fs');
const process = require('process');
const file = '02-write-file/file.txt';

fs.writeFile(file,'', (err) => {
  if (err) {
    console.error(err);
  }
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
console.log('Write for me');
