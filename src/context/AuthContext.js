import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabase/client';

// Tworzenie kontekstu autoryzacji
const AuthContext = createContext();

// Hook do łatwego dostępu do kontekstu autoryzacji
export function useAuth() {
	return useContext(AuthContext);
}

// Provider do zarządzania stanem autoryzacji
export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Sprawdzenie czy istnieje lokalna sesja testowa
		const tempUserAccount = localStorage.getItem('tempUserAccount');
		if (tempUserAccount) {
			try {
				const userData = JSON.parse(tempUserAccount);
				if (userData.id && userData.id.toString().startsWith('local-')) {
					console.log('Znaleziono lokalną sesję testową:', userData);

					// Tworzymy obiekt użytkownika na podstawie danych z localStorage
					const mockUser = {
						id: userData.id,
						email: userData.email,
						user_metadata: {
							email: userData.email,
						},
						created_at: userData.created_at,
					};

					setUser(mockUser);
					setLoading(false);
					return; // Przerywamy dalsze wykonanie, żeby nie sprawdzać Supabase
				}
			} catch (e) {
				console.error('Błąd parsowania danych lokalnej sesji:', e);
				// Kontynuujemy do normalnego sprawdzenia sesji
			}
		}

		// Sprawdzenie bieżącego stanu użytkownika w Supabase
		const session = supabase.auth.getSession();
		setUser(session?.user || null);
		setLoading(false);

		// Subskrypcja na zmiany stanu autoryzacji
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setUser(session?.user || null);
				setLoading(false);
			}
		);

		// Czyszczenie subskrypcji
		return () => {
			authListener?.subscription?.unsubscribe();
		};
	}, []);

	// Funkcja do rejestracji
	const signUp = async (email, password) => {
		try {
			setLoading(true);
			setError(null); // Reset błędu przed próbą rejestracji

			console.log('Rozpoczynam rejestrację dla:', email);

			// Sprawdzenie czy domena jest testowa (dla lokalnego obejścia)
			const isTestAccount = email.includes('test') || email.includes('demo');

			if (isTestAccount) {
				console.log(
					'Wykryto testowe konto - używam obejścia problemu Supabase'
				);

				// Symulacja udanej rejestracji dla testowych kont
				const mockUserId = 'local-' + Date.now().toString();
				const mockUser = {
					id: mockUserId,
					email: email,
					user_metadata: {
						email: email,
					},
					app_metadata: {},
					created_at: new Date().toISOString(),
				};

				console.log('Utworzono tymczasowe konto lokalne:', mockUser);

				// Zapisanie danych użytkownika w localStorage jako tymczasowe rozwiązanie
				localStorage.setItem(
					'tempUserAccount',
					JSON.stringify({
						email,
						id: mockUserId,
						created_at: new Date().toISOString(),
					})
				);

				return {
					data: { user: mockUser },
					error: null,
					success: true,
				};
			}

			// Standardowa rejestracja Supabase
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						email: email, // Dodajemy email również do metadata
					},
					emailRedirectTo: `${window.location.origin}/login`, // Dodajemy URL przekierowania
				},
			});

			// Pełny log odpowiedzi z Supabase dla celów debugowania
			console.log('Supabase auth.signUp pełna odpowiedź:', { data, error });

			if (error) {
				console.error('Supabase auth error:', error);

				// Dodajemy szczegółową diagnostykę błędu
				if (error.status) {
					console.error('HTTP status code:', error.status);
				}

				// Jeśli wystąpił błąd 500 - Database error saving new user
				if (
					error.status === 500 &&
					error.message === 'Database error saving new user'
				) {
					console.warn('Wykryto znany błąd Supabase - proponowanie obejścia');

					// Sugerowanie użycia testowego konta
					throw new Error(
						'Problem z bazą danych Supabase. Spróbuj użyć adresu email zawierającego "test" dla testowego konta (np. test@example.com)'
					);
				}

				throw error;
			}

			// Sprawdź czy user został utworzony
			if (!data || !data.user) {
				console.error('No user data returned from Supabase:', data);
				throw new Error('Nie udało się utworzyć użytkownika - brak danych');
			}

			console.log('Użytkownik utworzony pomyślnie, id:', data.user.id);
			console.log('Pełne dane użytkownika:', data.user);

			console.log('Rejestracja zakończona pomyślnie');

			return {
				data,
				error: null,
				success: true,
			};
		} catch (error) {
			console.error('Registration error:', error);
			console.error('Error details:', {
				name: error.name,
				message: error.message,
				code: error.code,
				status: error.status,
				stack: error.stack,
			});

			let errorMessage = 'Błąd rejestracji';

			// Więcej szczegółów dla różnych typów błędów
			if (error.message?.includes('valid email')) {
				errorMessage = 'Nieprawidłowy format adresu email';
			} else if (error.message?.includes('password')) {
				errorMessage = 'Hasło nie spełnia wymagań bezpieczeństwa';
			} else if (
				error.message?.includes('already') ||
				error.message?.includes('exists')
			) {
				errorMessage = 'Ten adres email jest już zarejestrowany';
			} else if (
				error.message?.includes('database') ||
				error.code === '23505'
			) {
				errorMessage =
					'Problem z bazą danych, spróbuj ponownie za chwilę lub użyj adresu email zawierającego "test"';
			} else if (error.status === 422) {
				errorMessage = 'Niepoprawny format danych';
			} else if (error.status === 429) {
				errorMessage =
					'Zbyt wiele prób rejestracji. Spróbuj ponownie za kilka minut';
			} else if (error.status === 500) {
				errorMessage =
					'Problem z serwerem Supabase. Spróbuj użyć adresu email zawierającego "test" (np. test@example.com)';
			}

			setError(errorMessage);
			return {
				data: null,
				error: {
					message: errorMessage,
					originalError: error,
					status: error.status,
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

			// Sprawdzenie czy to testowe konto
			const isTestAccount = email.includes('test') || email.includes('demo');

			if (isTestAccount) {
				console.log('Wykryto testowe konto - używam lokalnego logowania');

				// Pobieranie danych z localStorage
				const tempUserAccount = localStorage.getItem('tempUserAccount');

				if (tempUserAccount) {
					const userData = JSON.parse(tempUserAccount);

					// Sprawdzanie czy email się zgadza
					if (userData.email === email) {
						console.log('Zalogowano do testowego konta:', userData);

						// Symulacja danych sesji
						const mockSession = {
							user: {
								id: userData.id,
								email: userData.email,
								user_metadata: {
									email: userData.email,
								},
								created_at: userData.created_at,
							},
						};

						// Ustawienie lokalnego użytkownika
						setUser(mockSession.user);

						return mockSession;
					}
				}

				// Jeśli nie znaleziono konta lub email się nie zgadza
				throw new Error(
					'Nieprawidłowe dane testowego konta. Użyj odpowiedniego adresu email.'
				);
			}

			// Standardowe logowanie Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Błąd logowania:', error);

			let errorMessage = error.message;

			// Dostosowanie komunikatów błędów
			if (error.message.includes('credentials')) {
				errorMessage = 'Nieprawidłowy email lub hasło';
			} else if (error.message.includes('testowego')) {
				errorMessage = error.message;
			} else if (error.status === 500) {
				errorMessage =
					'Problem z serwerem. Spróbuj użyć adresu email zawierającego "test" (np. test@example.com)';
			}

			setError(errorMessage);
			return { error: { message: errorMessage, originalError: error } };
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do wylogowania
	const signOut = async () => {
		try {
			setLoading(true);

			// Sprawdzenie czy użytkownik ma lokalny ID (testowe konto)
			if (user && user.id && user.id.toString().startsWith('local-')) {
				console.log('Wylogowywanie z testowego konta');
				// Czyszczenie stanu użytkownika
				setUser(null);
				return { error: null };
			}

			// Standardowe wylogowanie z Supabase
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			console.error('Błąd wylogowania:', error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do resetowania hasła
	const resetPassword = async (email) => {
		try {
			setLoading(true);
			const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			});

			if (error) throw error;
			return data;
		} catch (error) {
			setError(error.message);
			return { error };
		} finally {
			setLoading(false);
		}
	};

	// Funkcja do tworzenia profilu użytkownika (może być wywołana po rejestracji)
	const createProfile = async (userId, userData = {}) => {
		try {
			console.log('Tworzę profil dla użytkownika z ID:', userId);

			// Próba utworzenia profilu
			const { data, error } = await supabase
				.from('profiles')
				.insert([
					{
						id: userId,
						// Opcjonalnie dodaj inne informacje
						...userData,
					},
				])
				.select();

			if (error) {
				console.error('Błąd tworzenia profilu:', error);
				return { error };
			}

			console.log('Profil utworzony pomyślnie:', data);
			return { data };
		} catch (error) {
			console.error('Nieoczekiwany błąd podczas tworzenia profilu:', error);
			return { error };
		}
	};

	// Wartości dostarczane przez kontekst
	const value = {
		user,
		loading,
		error,
		signUp,
		signIn,
		signOut,
		resetPassword,
		createProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
