export const VERSION = '0.0.1';

export const SERVER_URL = process.env.NODE_ENV === "production"
  ? 'https://whaleapp-be83dda31276.herokuapp.com/'
  : 'http://127.0.0.1:8030';