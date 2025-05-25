import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGHxjCHHPy9LmD9ZJBUvLYV4QnWTtUfJ4",
  authDomain: "wereldkaart-kerk.firebaseapp.com",
  databaseURL: "https://wereldkaart-kerk-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "wereldkaart-kerk",
  storageBucket: "wereldkaart-kerk.appspot.com",
  messagingSenderId: "525722143021",
  appId: "1:525722143021:web:4b0d9b8f8f8f8f8f8f8f8f"
};

let database: Database;

try {
  console.log('Initializing Firebase with config:', {
    ...firebaseConfig,
    apiKey: '***' // Hide API key in logs
  });

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');

  // Initialize Realtime Database
  database = getDatabase(app);
  console.log('Database initialized');

  // Test database connection immediately
  const testRef = ref(database, 'test');
  console.log('Created test reference');
  
  onValue(testRef, (snapshot) => {
    console.log('Successfully connected to database');
  }, (error) => {
    console.error('Error connecting to database:', error);
  });

} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { database }; 