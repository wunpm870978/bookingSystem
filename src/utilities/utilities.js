import Loadable from 'react-loadable';
import Loading from 'components/Loading/Loading';
import get from 'lodash/get';
import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import { message } from 'antd';
import i18n from "i18next";
import encryption from 'js-sha512';

export function noti(type, content) {
  const [messageApi] = message.useMessage();
  return messageApi.open({
    type,
    content: i18n.t(content),
  });
}

export function getLoadableComponent(
  loader,
  loading = Loading,
  isPreload = false
) {
  const loadableComponent = Loadable({
    loader,
    loading,
    // delay: 300, // 0.3 seconds
    timeout: 1000 * 3, // 3 seconds
  });
  if (isPreload) {
    setTimeout(() => {
      loadableComponent.preload();
    }, get(isPreload, 'timeout', 0));
  }
  return loadableComponent;
}

export const passwordEncryption = (plaintext) => {
  const hashedFirstLayer = encryption.sha512(plaintext)
  const processedPlaintext = plaintext + hashedFirstLayer

  return encryption.sha512(processedPlaintext)
}

export const getDifference = (object, base) => {
  function changes(object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = (isArray(value) && isArray(base[key])) ||
          !(isObject(value) && isObject(base[key]))
          ? value
          : changes(value, base[key]);
      }
    });
  }
  return changes(object, base);
};