import React, { createContext, useState, useContext } from 'react';

// Tworzenie kontekstu użytkownika (tylko do celów UI)
const UserContext = createContext();

// Hook do łatwego dostępu do kontekstu
export function useUser() {
	return useContext(UserContext);
}

// Provider zarządzający stanem UI
export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Symulacja logowania (tylko do celów UI)
	const signIn = async (email, password) => {
		try {
			setLoading(true);
			setError(null);

			// Symulacja opóźnienia przetwarzania
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Zapisanie podstawowych danych użytkownika
			const mockUser = {
				id: 'mock-user-id',
				email: email,
				created_at: new Date().toISOString(),
			};

			setUser(mockUser);
			return { user: mockUser };
		} catch (error) {
			return { error: { message: 'Błąd logowania' } };
		} finally {
			setLoading(false);
		}
	};

	// Symulacja rejestracji (tylko do celów UI)
	const signUp = async (email, password) => {
		try {
			setLoading(true);
			setError(null);

			// Symulacja opóźnienia przetwarzania
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Symulacja udanej rejestracji
			return {
				success: true,
				data: {
					user: {
						id: 'mock-user-id',
						email,
					},
				},
			};
		} catch (error) {
			return { error: { message: 'Błąd rejestracji' } };
		} finally {
			setLoading(false);
		}
	};

	// Symulacja wylogowania (tylko do celów UI)
	const signOut = async () => {
		setUser(null);
		return { error: null };
	};

	// Wartości dostarczane przez kontekst
	const value = {
		user,
		loading,
		error,
		signIn,
		signUp,
		signOut,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
