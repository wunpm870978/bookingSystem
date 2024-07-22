import { ReactElement } from 'react';

export const POSITION = {
  TOP: 'top',
  TOPLEFT: 'topLeft',
  TOPRIGHT: 'topRight',
  BOTTOM: 'bottom',
  BOTTOMLEFT: 'bottomLeft',
  BOTTOMRIGHT: 'bottomRight'
}

export const MESSAGE_TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error'
}

export const DURATION = 3000;

export interface CustomNotificationProps {
  position: string,
  messageType: string,
  message: string,
  duration: number,
  containerNode: HTMLElement,
  unmountFromRoot: () => void,
}