import get from 'lodash/get';
import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import encryption from 'js-sha512';


export const passwordEncryption = (plaintext: string) => {
  const hashedFirstLayer = encryption.sha512(plaintext)
  const processedPlaintext = plaintext + hashedFirstLayer

  return encryption.sha512(processedPlaintext)
}

export const getDifference2 = (object: object, base: object) => {
  function changes(obj: object, baseObj: any) {
    return transform(obj, (result: any, value, key: string) => {
      if (!isEqual(value, baseObj[key])) {
        result[key] = (isArray(value) && isArray(baseObj[key])) ||
          !(isObject(value) && isObject(baseObj[key]))
          ? value
          : changes(value, baseObj[key]);
      }
    }, {});
  }

  return changes(object, base);
};
// export const getDifference = <T extends object>(object: T, base: T): Partial<T> => {
//   function changes(obj: T, base: T): Partial<T> {
//     return transform(obj, function (result: Partial<T>, value, key: keyof T) {
//       if (!isEqual(value, base[key])) {
//         // result[key] = (isArray(value) && isArray(base[key])) || !(isObject(value) && isObject(base[key]))
//         //   ? value
//         //   : changes(value, base[key]);
//         if (isArray(value) && isArray(base[key])) {
//           result[key] = value as T[keyof T];
//         } else if (
//           isObject(value) &&
//           isObject(base[key]) &&
//           value !== null &&
//           base[key] !== null
//         ) {
//           result[key] = changes(value, base[key]);
//         } else {
//           result[key] = value as T[keyof T];
//         }
//       }
//     });
//   }
//   return changes(object, base);
// };