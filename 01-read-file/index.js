const fs = require('fs');
const path = require('path');
const way = path.normalize(path.join(__dirname + '/text.txt'));
const stream = fs.createReadStream(way, 'utf-8');
 
stream.on('data',chunk => console.log(chunk));

// stream.on('error', function(err){
//   if(err.code == 'ENOENT'){
//     console.log('Файл не найден');
//   }else{
//     console.error(err);
//   }
// });

