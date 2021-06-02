import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getAbsoluteFilePath(filePath) {
  const cwdPath = process.cwd();
  const absolutePath = path.resolve(cwdPath, filePath);
  return absolutePath;
}
function getFileContent(absolutePath) {
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return fileContent;
}

function parseToObject(filePath1, filePath2) {
  if (path.extname(filePath1) === '.json') {
    const file1Content = getFileContent(getAbsoluteFilePath(filePath1));
    const file2Content = getFileContent(getAbsoluteFilePath(filePath2));
    const objFile1 = JSON.parse(file1Content);
    const objFile2 = JSON.parse(file2Content);
    return { objFile1, objFile2 };
  }
  if (path.extname(filePath1) === '.yml') {
    const file1Content = getFileContent(getAbsoluteFilePath(filePath1));
    const file2Content = getFileContent(getAbsoluteFilePath(filePath2));
    const objFile1 = yaml.load(file1Content);
    const objFile2 = yaml.load(file2Content);
    return { objFile1, objFile2 };
  }
}

export default parseToObject;
