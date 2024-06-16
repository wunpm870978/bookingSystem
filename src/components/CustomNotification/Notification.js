import CustomNotification from "./CustomNotification";
import { MESSAGE_TYPE, DURATION, POSITION } from "./constants";
import ReactDOM from 'react-dom/client';

export const noti = (
  messageType = MESSAGE_TYPE.INFO,
  message = '',
  options = {
    position: POSITION.TOP,
    duration: DURATION,
  },
) => {
  const containerNode = document.createElement('div');
  const notiRoot = ReactDOM.createRoot(containerNode);

  const config = {
    messageType,
    message,
    position: options.position,
    duration: options.duration,
    notiRoot,
    containerNode,
  }
  notiRoot.render(<CustomNotification {...config} />);
  document.body.appendChild(containerNode);
}