// import _ from 'lodash';
// import parseToObject from './parsers.js';

// function gendiff(filePath1, filePath2) {
//     const { objFile1, objFile2 } = parseToObject(filePath1, filePath2);

//     /*function getDeepObjectKeys(obj) {
//         let keys = [];
//         for (const key in obj) {
//             keys.push(key);
//             if (typeof obj[key] === 'object') {
//                 const subkeys = getDeepObjectKeys(obj[key]);
//                 keys = keys.concat(subkeys);
//             }
//         }
//         return keys;
//     }*/
    
//     const file1Keys = Object.keys(objFile1);
//     const file2Keys = Object.keys(objFile2);

//     const resultArr = [];
        
//     for (const key1 of file1Keys) {
//         for (const key2 of file2Keys) {
//             if (key1 === key2 && objFile1[key1] === objFile2[key2]) {
//                 resultArr.push({key: key1, status: 'unchanged', value: objFile1[key1]});
//             }
//             if (key1 === key2 && objFile1[key1] !== objFile2[key2]) {
//                 resultArr.push({key: key2, status: 'changed', value: objFile2[key2], oldValue: objFile1[key1]});
//             }
//         }
//     }
//     for (const key1 of file1Keys) {
//         if (!_.includes(file2Keys, key1)) {
//             resultArr.push({key: key1, status: 'deleted', value: objFile1[key1]});
//         }
//     }
//     for (const key2 of file2Keys) {
//         if (!_.includes(file1Keys, key2)) {
//             resultArr.push({key: key2, status: 'new', value: objFile2[key2]});

//         }
//     }
//     resultArr.sort(function(a,b) {
//         let keyA = a.key;
//         let keyB = b.key;
//         if (keyA < keyB) {
//             return -1;
//         } 
//         if (keyA > keyB) {
//             return 1;
//         }
//         return 0;
//       });
// console.log(resultArr);
//         let result = '{\n';
    
//         for (const { key, status, value, oldValue } of resultArr) {
//             if (status === 'new') {
//                 result += `  + ${key}: ${value}\n`;
//             }
//             if (status === 'deleted') {
//                 result += `  - ${key}: ${value}\n`;
//             }
//             if (status === 'unchanged') {
//                 result += `    ${key}: ${value}\n`;
//             }
//             if (status === 'changed') {
//                 result += `  - ${key}: ${oldValue}\n`;
//                 result += `  + ${key}: ${value}\n`;
//             }
//         }
//         result += `}`;

//         return result;
//     }

//     export default gendiff;
