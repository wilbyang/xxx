import { create } from 'apisauce';
import config from '../config';
import firebase from 'firebase';
export const api = create({
  baseURL: config.apiBaseURL,
  timeout: 10000
});
export const fb = firebase.initializeApp(config.firebaseConfig);
