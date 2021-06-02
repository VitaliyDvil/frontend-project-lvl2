import _ from 'lodash';
import parseToObject from './parsers.js';
import format from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

function makeDiff(prev, curr) {
  const keys = _.union(_.keys(prev), _.keys(curr));

  const diff = _.reduce(
    keys,
    (acc, key) => {
      const prevVal = prev[key];
      const currVal = curr[key];

      // new//
      if (_.has(curr, key) && !_.has(prev, key)) {
        const info = { key, status: 'new', value: currVal };
        return [...acc, info];
      }

      // deleted//
      if (_.has(prev, key) && !_.has(curr, key)) {
        const info = { key, status: 'deleted', value: prevVal };
        return [...acc, info];
      }

      // unchanged//
      if (_.isPlainObject(prevVal) && _.isPlainObject(currVal)) {
        const info = { key, status: 'unchanged', children: makeDiff(prevVal, currVal) };
        return [...acc, info];
      }
      if (prevVal === currVal) {
        const info = { key, status: 'unchanged', value: currVal };
        return [...acc, info];
      }

      // changed//
      const info = {
        key,
        status: 'changed',
        value: currVal,
        oldValue: prevVal,
      };
      return [...acc, info];
    },
    [],
  );

  return diff.sort(function (a, b) {
    const keyA = a.key;
    const keyB = b.key;
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  },
);
}

function gendiff(filePath1, filePath2, outputFormat = 'stylish') {
  const { objFile1, objFile2 } = parseToObject(filePath1, filePath2);
  const diff = makeDiff(objFile1, objFile2);

  switch (outputFormat) {
    case ('plain'):
      return plain(diff);
    case ('json'):
      return json(diff);
    default:
      return format(diff);
  }
}

export default gendiff;
