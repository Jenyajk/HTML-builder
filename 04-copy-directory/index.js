const fs = require('fs/promises');
const path = require('path');
const folderPath = '04-copy-directory/files';
const folderPathCopy = '04-copy-directory/files-copy';

async function copyDir() {
  await fs.rm(folderPathCopy, { recursive: true, force: true });
  await fs.mkdir(folderPathCopy);
  await fs.readdir(folderPath)
    .then(files => {
      files.forEach(file => fs.copyFile(path.join(folderPath, file), path.join(folderPathCopy, file)));
    });
}

copyDir();