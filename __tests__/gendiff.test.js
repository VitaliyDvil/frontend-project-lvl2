import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Tests for json format//

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

  //Tests for yml format//

const __filenameYml = fileURLToPath(import.meta.url);
const __dirnameYml = dirname(__filenameYml);
const getFixturePathYml = (filenameYml) => path.join(__dirnameYml, '..', '__fixtures__', filenameYml);

test('gendiff add to file', () => {
    const pathFileBefore = getFixturePathYml('file3.yml');
    const pathFileAfter = getFixturePathYml('file4.yml');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('+ verbose: true');
  });

test('gendiff remove from file', () => {
    const pathFileBefore = getFixturePathYml('file3.yml');
    const pathFileAfter = getFixturePathYml('file4.yml');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('- proxy: 123.234.53.22');
  });

test('gendiff change file', () => {
    const pathFileBefore = getFixturePathYml('file3.yml');
    const pathFileAfter = getFixturePathYml('file4.yml');
    const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
    expect(gendiffResult).toMatch('- timeout: 50', '+ timeout: 20');
  }); 