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

export type MessageType = 'info' | 'warning' | 'success' | 'error';
export type MessagePosition = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
export interface NotiOptions {
  position?: MessagePosition,
  duration?: number
}

export interface CustomNotificationProps {
  position: MessagePosition,
  messageType: MessageType,
  message: string,
  duration: number,
  containerNode: HTMLElement,
  notiRoot: any,
}