import Loadable from 'react-loadable';
import Loading from 'components/Loading/Loading';
import _ from 'lodash';
import { message } from 'antd';
import i18n from "i18next";

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
        }, _.get(isPreload, 'timeout', 0));
    }
    return loadableComponent;
}