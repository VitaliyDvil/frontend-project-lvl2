import _ from 'lodash';

const openBracket = '{';
const closedBracket = '}';

function converter(data, indent = 1) {
  const entries = Object.entries(data);
  return _.reduce(
    entries,
    (acc, [key, value]) => {
      if (!_.isPlainObject(value)) {
        return `${acc}${_.repeat('  ', indent + 1)}${key}: ${value}\n`;
      }
      if (_.isPlainObject(value)) {
        return `${acc}${_.repeat('  ', indent + 1)}${key}: ${openBracket}\n${converter(value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
      }
      return acc;
    },
    '',
  );
}

function format(diff) {
  const iter = (diffFile, indent = 1) => _.reduce(
    diffFile,
    (acc, element) => {
      //  new//
      if (element.status === 'new') {
        if (!_.isPlainObject(element.value)) {
          return `${acc}${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;
        }
        return `${acc}${_.repeat('  ', indent)}+ ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
      }
      //  deleted//
      if (element.status === 'deleted') {
        if (!_.isPlainObject(element.value)) {
          return `${acc}${_.repeat('  ', indent)}- ${element.key}: ${element.value}\n`;
        }
        return `${acc}${_.repeat('  ', indent)}- ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
      }
      // changed//
      if (element.status === 'changed' && !element.children) {
        if (_.isPlainObject(element.value)) {
          return `${acc}${_.repeat('  ', indent)}- ${element.key}: ${element.oldValue}\n${_.repeat('  ', indent)}+ ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}${_.repeat('  ', indent + 1)}${closedBracket}\n`;
        }
        if (_.isPlainObject(element.oldValue)) {
          return `${acc}${_.repeat('  ', indent)}- ${element.key}: ${openBracket}\n${converter(element.oldValue, indent + 2)}${_.repeat('  ', indent + 1)}${closedBracket}\n${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;
        }
        return `${acc}${_.repeat('  ', indent)}- ${element.key}: ${element.oldValue}\n${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;
      }
      if (element.status === 'changed' && element.children) {
        return `${acc}${element.key}: ${iter(element.children)}${closedBracket}\n`;
      }
      // unchanged//
      if (element.status === 'unchanged') {
        if (!element.children) {
          return `${acc}  ${_.repeat('  ', indent)}${element.key}: ${element.value}\n`;
        }
        return `${acc}  ${_.repeat('  ', indent)}${element.key}: ${openBracket}\n${iter(element.children, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
      }
      return acc;
    },
    '',
  );

  const result = iter(diff, 1);

  return `${openBracket}\n${result}${closedBracket}`;
}

export default format;
