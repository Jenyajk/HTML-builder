const fs = require('fs');
const process = require('process');

fs.writeFile('02-write-file/file.txt','a', (err) => {
  if (err) {
    console.error(err);
  }
});

process.stdin.on('data', data => fs.appendFile('02-write-file/file.txt', data , (err) => {
  if (err) {
    console.error(err);
  }

}));

process.on('exit', () => {
  console.log('Process exit event with code');
});

console.log('Write for me');
