import _ from 'lodash';

function setBrackets(element) {
  return typeof element === 'string' ? `'${element}'` : element;
}

function plain(diff) {
  const iter = (diffFile, parentKeys = []) => _.reduce(
    diffFile,
    (acc, element) => {
      //  new
      if (element.status === 'new') {
        if (!_.isPlainObject(element.value)) {
          return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was added with value: ${setBrackets(element.value)}\n`;
        }
        return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was added with value: [complex value]\n`;
      }
      //  deleted
      if (element.status === 'deleted') {
        return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was removed\n`;
      }
      //  changed
      if (element.status === 'changed' && !element.children) {
        if (_.isPlainObject(element.value)) {
          return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was updated. From ${setBrackets(element.oldValue)} to [complex value]\n`;
        }
        if (_.isPlainObject(element.oldValue)) {
          return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was updated. From [complex value] to ${setBrackets(element.value)}\n`;
        }
        return `${acc}Property '${parentKeys.concat(element.key).join('.')}' was updated. From ${setBrackets(element.oldValue)} to ${setBrackets(element.value)}\n`;
      }
      if (element.status === 'changed' && element.children) {
        return `${acc}${iter(element.children, parentKeys.concat(element.key))}`;
      }
      //  unchanged
      if (element.status === 'unchanged' && element.children) {
        return `${acc}${iter(element.children, parentKeys.concat(element.key))}`;
      }
      return acc;
    },
    '',
  );
  const result = iter(diff);
  return result.substring(0, result.length - 1);
}

export default plain;

const arr = [];
arr.push(123);
