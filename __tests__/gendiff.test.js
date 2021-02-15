import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff add to file', () => {
    const pathFileBefore = getFixturePath('file1.json');
    const pathFileAfter = getFixturePath('file2.json');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('+ verbose: true');
  });

test('gendiff remove from file', () => {
    const pathFileBefore = getFixturePath('file1.json');
    const pathFileAfter = getFixturePath('file2.json');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('- proxy: 123.234.53.22');
  });

test('gendiff change file', () => {
    const pathFileBefore = getFixturePath('file1.json');
    const pathFileAfter = getFixturePath('file2.json');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('- timeout: 50', '+ timeout: 20');
  });  