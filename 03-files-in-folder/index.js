const fs = require('fs');
const path = require('path');
const folderPath = '03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
  }
  else {
    files.forEach(file => {
      const way = path.normalize(path.join(folderPath, file));
      fs.stat(way,  (err, stats) => {
        let pop = path.extname(file);
        if (stats.size !== 0) {
          console.log(path.basename(file,pop) +' - ' + pop + ' - ' + stats.size + ' bytes');
        }
      });
    });
  }
});





