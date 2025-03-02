// Import funkcji potrzebnych do inicjalizacji aplikacji Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Konfiguracja Firebase z wykorzystaniem zmiennych środowiskowych
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Inicjalizacja Firebase z obsługą błędów
let app, auth, db, storage;

try {
	// Inicjalizacja Firebase
	app = initializeApp(firebaseConfig);

	// Inicjalizacja usług Firebase
	auth = getAuth(app);
	db = getFirestore(app);
	storage = getStorage(app);

	console.log('Firebase zostało pomyślnie zainicjalizowane');
} catch (error) {
	console.error('Błąd inicjalizacji Firebase:', error);
	// W środowisku produkcyjnym można dodać kod do powiadomienia użytkownika o problemie
	// lub przekierowania do strony serwisowej
}

// Eksport usług Firebase potrzebnych w aplikacji
export { auth, db, storage };
export default app;
