import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGHxjCHHPy9LmD9ZJBUvLYV4QnWTtUfJ4",
  authDomain: "wereldkaart-kerk.firebaseapp.com",
  databaseURL: "https://wereldkaart-kerk-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wereldkaart-kerk",
  storageBucket: "wereldkaart-kerk.appspot.com",
  messagingSenderId: "525722143021",
  appId: "1:525722143021:web:b8d9b8f8f8f8f8f8f8f8f8"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); 