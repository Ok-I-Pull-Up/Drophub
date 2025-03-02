import React, { createContext, useState, useEffect, useContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	doc,
	setDoc,
	getDoc,
	updateDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

// Tworzenie kontekstu Firebase
const FirebaseContext = createContext();

// Hook do łatwego dostępu do kontekstu Firebase
export function useFirebase() {
	return useContext(FirebaseContext);
}

// Provider do zarządzania stanem Firebase
export function FirebaseProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Nasłuchiwanie zmian stanu autoryzacji
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		// Czyszczenie subskrypcji
		return () => unsubscribe();
	}, []);

	// Funkcja do rejestracji
	const signUp = async (email, password) => {
		try {
			setLoading(true);
			setError(null);

			console.log('Rozpoczynam rejestrację dla:', email);

			// Tworzenie konta użytkownika
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Tworzenie dokumentu profilu użytkownika w Firestore
			await setDoc(doc(db, 'profiles', user.uid), {
				email: email,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});

			console.log('Użytkownik utworzony pomyślnie, id:', user.uid);

			return {
				data: { user },
				error: null,
				success: true,
			};
		} catch (error) {
			console.error('Registration error:', error);

			let errorMessage = 'Błąd rejestracji';

			// Tłumaczenie kodów błędów Firebase
			if (error.code === 'auth/email-already-in-use') {
				errorMessage = 'Ten adres email jest już zarejestrowany';
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Nieprawidłowy format adresu email';
			} else if (error.code === 'auth/weak-password') {
				errorMessage = 'Hasło nie spełnia wymagań bezpieczeństwa';
			} else if (error.code === 'auth/network-request-failed') {
				errorMessage = 'Problem z połączeniem sieciowym, spróbuj ponownie';
			}

			setError(errorMessage);
			return {
				data: null,
				error: {
					message: errorMessage,
					code: error.code,
				},
				success: false,
			};
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do logowania
	const signIn = async (email, password) => {
		try {
			setLoading(true);
			setError(null);

			console.log('Próba logowania dla:', email);

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			console.log('Zalogowano pomyślnie:', user.uid);

			return {
				data: { user },
				error: null,
				success: true,
			};
		} catch (error) {
			console.error('Login error:', error);

			let errorMessage = 'Błąd logowania';

			// Tłumaczenie kodów błędów Firebase
			if (
				error.code === 'auth/invalid-credential' ||
				error.code === 'auth/user-not-found' ||
				error.code === 'auth/wrong-password'
			) {
				errorMessage = 'Nieprawidłowy email lub hasło';
			} else if (error.code === 'auth/too-many-requests') {
				errorMessage =
					'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później';
			} else if (error.code === 'auth/network-request-failed') {
				errorMessage = 'Problem z połączeniem sieciowym, spróbuj ponownie';
			}

			setError(errorMessage);
			return {
				data: null,
				error: {
					message: errorMessage,
					code: error.code,
				},
				success: false,
			};
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do wylogowania
	const signOut = async () => {
		try {
			await firebaseSignOut(auth);
			console.log('Wylogowano pomyślnie');
			return { success: true };
		} catch (error) {
			console.error('Logout error:', error);
			return {
				success: false,
				error: error.message,
			};
		}
	};

	// Funkcja do resetowania hasła
	const resetPassword = async (email) => {
		try {
			setLoading(true);
			setError(null);

			await sendPasswordResetEmail(auth, email);

			console.log('Email resetujący hasło wysłany');
			return {
				success: true,
				message:
					'Link do resetowania hasła został wysłany na podany adres email',
			};
		} catch (error) {
			console.error('Password reset error:', error);

			let errorMessage = 'Błąd resetowania hasła';

			if (error.code === 'auth/user-not-found') {
				errorMessage = 'Nie znaleziono użytkownika z tym adresem email';
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Nieprawidłowy format adresu email';
			}

			setError(errorMessage);
			return {
				success: false,
				error: errorMessage,
			};
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do pobierania profilu użytkownika
	const getProfile = async (userId) => {
		try {
			if (!userId && user) userId = user.uid;
			if (!userId) return { error: 'Brak ID użytkownika' };

			const profileDoc = await getDoc(doc(db, 'profiles', userId));

			if (profileDoc.exists()) {
				return { data: profileDoc.data(), error: null };
			} else {
				return { data: null, error: 'Profil nie istnieje' };
			}
		} catch (error) {
			console.error('Profile fetch error:', error);
			return { data: null, error: error.message };
		}
	};

	// Funkcja do aktualizacji profilu użytkownika
	const updateProfile = async (userId, data) => {
		try {
			if (!userId && user) userId = user.uid;
			if (!userId) return { error: 'Brak ID użytkownika' };

			await updateDoc(doc(db, 'profiles', userId), {
				...data,
				updatedAt: serverTimestamp(),
			});

			return { success: true, error: null };
		} catch (error) {
			console.error('Profile update error:', error);
			return { success: false, error: error.message };
		}
	};

	// Wartości udostępniane przez kontekst
	const value = {
		user,
		loading,
		error,
		signUp,
		signIn,
		signOut,
		resetPassword,
		getProfile,
		updateProfile,
	};

	return (
		<FirebaseContext.Provider value={value}>
			{children}
		</FirebaseContext.Provider>
	);
}

export default FirebaseProvider;
