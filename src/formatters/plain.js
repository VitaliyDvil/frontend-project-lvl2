import _ from "lodash";

function setBrackets(element) {
  return typeof element === 'string' ? `'${element}'` : element;
}

function plain(diff, parentKeys = []) {
  const result = _.reduce(
    diff,
    (acc, element) => {

      //new
      if (element.status === 'new' && !_.isPlainObject(element.value)) {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was added with value: ${setBrackets(element.value)}\n`;
      }
      if (element.status === 'new' && _.isPlainObject(element.value)) {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was added with value: [complex value]\n`;
      }
  
      //deleted
      if (element.status === 'deleted') {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was removed\n`;
      }
  
      //changed
      if (element.status === 'changed' && !element.children) {
        if (_.isPlainObject(element.value)) {
          acc += `Property '${parentKeys.concat(element.key).join('.')}' was updated. From ${setBrackets(element.oldValue)} to [complex value]\n`;
        }
        else if (_.isPlainObject(element.oldValue)) {
          acc += `Property '${parentKeys.concat(element.key).join('.')}' was updated. From [complex value] to ${setBrackets(element.value)}\n`;
        } else {
          acc += `Property '${parentKeys.concat(element.key).join('.')}' was updated. From ${setBrackets(element.oldValue)} to ${setBrackets(element.value)}\n`;
        }
      }
      if (element.status === 'changed' && element.children) {
        acc += `${plain(element.children, parentKeys.concat(element.key))}`;
      }
  
      //unchanged
      if (element.status === 'unchanged' && element.children) {
        acc += `${plain(element.children, parentKeys.concat(element.key))}`;
      }
      return acc;
    },
    ''
  );
  return result;
}
  
export default plain;
