import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import gendiff from '../src/index.js';

// Tests default output for json format//

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff add to file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('+ follow: false');
});

test('gendiff add complex value to file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch
  + ('+ group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }');
});

test('gendiff remove from file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- setting2: 200');
});

test('gendiff remove complex value from file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }');
});

test('gendiff change file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- setting3: true', '+ setting3: null');
});

test('gendiff change complex value file default output', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch
  + ('group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }');
});

//  Tests default output for yml format//

const filenameYml = fileURLToPath(import.meta.url);
const dirnameYml = dirname(filenameYml);
const getFixturePathYml = (filenameYml) => path.join(dirnameYml, '..', '__fixtures__', filenameYml);

test('gendiff add to file default output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('+ follow: false');
});

test('gendiff add a complex value to file default output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch
  + ('+ group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }');
});

test('gendiff remove from file default output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- setting2: 200');
});

test('gendiff remove a complex value from file default output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }');
});

test('gendiff change file default output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch('- setting3: true', '+ setting3: null');
});

test('gendiff change a complex value file default output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter);
  expect(gendiff(pathFileBefore, pathFileAfter)).toMatch
  + ('group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }');
});

//  Tests plain output for json format//

test('gendiff add to file plain output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.follow\' was added with value: false');
});

test('gendiff add a complex value to file plain output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting5\' was added with value: [complex value]');
});

test('gendiff remove from file plain output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting2\' was removed');
});

test('gendiff change file plain output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'');
});

test('gendiff change a complex value file plain output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'group1.nest\' was updated. From [complex value] to \'str\'');
});

//  Tests plain output for yml format//

test('gendiff add to file plain output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.follow\' was added with value: false');
});

test('gendiff add a complex value to file plain output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting5\' was added with value: [complex value]');
});

test('gendiff remove from file plain output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting2\' was removed');
});

test('gendiff change file plain output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'');
});

test('gendiff change a complex value file plain output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'plain');
  expect(gendiff(pathFileBefore, pathFileAfter, 'plain')).toMatch('Property \'group1.nest\' was updated. From [complex value] to \'str\'');
});

// Tests json output for json format//

test('gendiff add to file json output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"follow","status":"new","value":false');
});

test('gendiff remove from file json output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"group2","status":"deleted","value":{"abc":12345,"deep":{"id":45}}');
});

test('gendiff change file json output for json format', () => {
  const pathFileBefore = getFixturePath('file1.json');
  const pathFileAfter = getFixturePath('file2.json');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"setting3","status":"changed","value":null,"oldValue":true');
});

// Tests json output for yml format//

test('gendiff add to file json output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"follow","status":"new","value":false');
});

test('gendiff remove from file json output for yml format', () => {
  const pathFileBefore = getFixturePathYml('file3.yml');
  const pathFileAfter = getFixturePathYml('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"group2","status":"deleted","value":{"abc":12345,"deep":{"id":45}}');
});

test('gendiff change file json output for yml format', () => {
  const pathFileBefore = getFixturePath('file3.yml');
  const pathFileAfter = getFixturePath('file4.yml');
  // const gendiffResult = gendiff(pathFileBefore, pathFileAfter, 'json');
  expect(gendiff(pathFileBefore, pathFileAfter, 'json')).toMatch('"key":"setting3","status":"changed","value":null,"oldValue":true');
});
