import _ from "lodash";

const openBracket = '{';
const closedBracket = '}';

function converter(data, indent = 1) {
  let result = '';
  const entries = Object.entries(data);

  for (const [ key, value ] of entries) {
      if (!_.isPlainObject(value)) {
          result += `${_.repeat('  ', indent + 1)}${key}: ${value}\n`;
      }
      if (_.isPlainObject(value)){
          result += `${_.repeat('  ', indent + 1)}${key}: ${openBracket}\n${converter(value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
      }
  }
  return result;
}

function format(diff) {

  const iter = (diff, indent = 1) => {
    return _.reduce(
      diff,
      (acc, element) => {
    
        //new
        if (element.status === 'new' && !_.isPlainObject(element.value)) {
          acc += `${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;
        }
        if (element.status === 'new' && _.isPlainObject(element.value)) {
          acc += `${_.repeat('  ', indent)}+ ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
        }
    
        //deleted
        if (element.status === 'deleted' && !_.isPlainObject(element.value)) {
          acc += `${_.repeat('  ', indent)}- ${element.key}: ${element.value}\n`;
        }
        if (element.status === 'deleted' && _.isPlainObject(element.value)) {
          acc += `${_.repeat('  ', indent)}- ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
        }
    
        //changed
        if (element.status === 'changed' && !element.children) {
          if (_.isPlainObject(element.value)) {
            acc += `${_.repeat('  ', indent)}- ${element.key}: ${element.oldValue}\n`;  
            acc += `${_.repeat('  ', indent)}+ ${element.key}: ${openBracket}\n${converter(element.value, indent + 2)}${_.repeat('  ', indent + 1)}${closedBracket}\n`;
          }
          else if (_.isPlainObject(element.oldValue)) {
            acc += `${_.repeat('  ', indent)}- ${element.key}: ${openBracket}\n${converter(element.oldValue, indent + 2)}${_.repeat('  ', indent + 1)}${closedBracket}\n`;
            acc += `${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;  
          } else {
            acc += `${_.repeat('  ', indent)}- ${element.key}: ${element.oldValue}\n`;
            acc += `${_.repeat('  ', indent)}+ ${element.key}: ${element.value}\n`;  
          }
        }
        if (element.status === 'changed' && element.children) {
          acc += `${element.key}: ${iter(element.children)}${closedBracket}\n`;
        }
    
        //unchanged
        if (element.status === 'unchanged' && !element.children) {
          acc += `  ${_.repeat('  ', indent)}${element.key}: ${element.value}\n`;
        }
        if (element.status === 'unchanged' && element.children) {
          acc += `  ${_.repeat('  ', indent)}${element.key}: ${openBracket}\n${iter(element.children, indent + 2)}  ${_.repeat('  ', indent)}${closedBracket}\n`;
        }
    
        return acc;
      },
      ""
    );

  }

  const result = iter(diff, 1);

  return `${openBracket}\n${result}${closedBracket}`
}

export default format;
