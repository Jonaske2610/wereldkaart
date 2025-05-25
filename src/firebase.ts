import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGHxjCHHPy9LmD9ZJBUvLYV4QnWTtUfJ4",
  authDomain: "wereldkaart-kerk.firebaseapp.com",
  databaseURL: "https://wereldkaart-kerk-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wereldkaart-kerk",
  storageBucket: "wereldkaart-kerk.appspot.com",
  messagingSenderId: "525722143021",
  appId: "1:525722143021:web:4b0d9b8f8f8f8f8f8f8f8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Add connection monitoring
const connectedRef = ref(database, '.info/connected');
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    console.log('Connected to Firebase');
  } else {
    console.log('Not connected to Firebase');
  }
}); 