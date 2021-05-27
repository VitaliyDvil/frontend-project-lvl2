import _ from "lodash";

function plain(diff, parentKeys = []) {
  const result = _.reduce(
    diff,
    (acc, element) => {

      //new
      if (element.status === 'new' && !_.isPlainObject(element.value)) {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was added with value: '${element.value}'\n`;
      }
      if (element.status === 'new' && _.isPlainObject(element.value)) {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was added with value: [complex value]\n`;
      }
  
      //deleted
      if (element.status === 'deleted') {
        acc += `Property '${parentKeys.concat(element.key).join('.')}' was removed\n`;
      }
  
      //changed
      if (element.status === 'changed' && !_.isPlainObject(element.value)) {
        if (_.isPlainObject(element.oldValue)) {
          acc += `Property '${parentKeys.concat(element.key).join('.')}' was updated. From [complex value] to '${element.value}'\n`;
        } else {
          acc += `Property '${parentKeys.concat(element.key).join('.')}' was updated. From '${element.oldValue}' to '${element.value}'\n`;
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
