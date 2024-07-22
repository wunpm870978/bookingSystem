import CustomNotification from "./CustomNotification";
import {
  MESSAGE_TYPE,
  DURATION, POSITION,
  CustomNotificationProps,
} from "./constants";
import ReactDOM from 'react-dom/client';

export const noti = (
  messageType = MESSAGE_TYPE.INFO,
  message = '',
  options = {
    position: POSITION.TOP,
    duration: DURATION,
  },
) => {
  const containerNode: HTMLDivElement = document.createElement('div');
  const notiRoot = ReactDOM.createRoot(containerNode);

  const config: CustomNotificationProps = {
    messageType,
    message,
    position: options.position,
    duration: options.duration,
    containerNode,
    unmountFromRoot: notiRoot.unmount,
  }

  notiRoot.render(<CustomNotification {...config} />);
  document.body.appendChild(containerNode);
}