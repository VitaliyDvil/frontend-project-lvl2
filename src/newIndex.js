import _ from 'lodash';
import parseToObject from './parsers.js';

function gendiff(filePath1, filePath2) {
    const { objFile1, objFile2 } = parseToObject(filePath1, filePath2);
    const diff = makeDiff(objFile1, objFile2);

    return format(diff);
}

function makeDiff(old, curr) {
    //map filter reduce forEach
    const oldKeys = _.keys(old);
    const currKeys = _.keys(curr);

    const keys = _.union(oldKeys, currKeys);
    const diff = _.reduce(keys, (acc, key) => {
        // check if key value is "changed" or "unchanged"
        if (_.has(old, key) && _.has(curr, key)) {
            const oldVal = old[key];
            const currVal = curr[key];
            if (_.isPlainObject(oldVal) && _.isPlainObject(currVal)) {
                const innerDiff = makeDiff(oldVal, currVal);
                acc.push({key, status: "unchanged", children: innerDiff})
            }
            if (oldVal === currVal) {
                acc.push({key, status: "unchanged", value: currVal})
            } else {
                acc.push({key, status: "changed", value: currVal, oldValue: oldVal})
            }
        }

        return acc;

    }, []);

    return diff;
}

function format(diff) {
    console.log(diff)
}

export default gendiff;
