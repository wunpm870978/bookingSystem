import CustomNotification from "./CustomNotification";
import {
  MessagePosition,
  DURATION,
  CustomNotificationProps,
  MessageType,
  NotiOptions,
} from "./constants";
import ReactDOM from 'react-dom/client';

export const noti = (
  messageType: MessageType,
  message: string = '',
  options?: NotiOptions,
) => {
  const containerNode: HTMLDivElement = document.createElement('div');
  const notiRoot = ReactDOM.createRoot(containerNode);

  const defaultOptions: NotiOptions = {
    position: 'top',
    duration: DURATION,
  };

  const { position, duration } = { ...defaultOptions, ...options };
  const config: CustomNotificationProps = {
    messageType,
    message,
    position: position as MessagePosition,
    duration: duration as number,
    containerNode,
    notiRoot,
  }

  notiRoot.render(<CustomNotification {...config} />);
  document.body.appendChild(containerNode);
}