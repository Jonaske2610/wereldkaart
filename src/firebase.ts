import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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