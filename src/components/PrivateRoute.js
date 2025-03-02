import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
import './PrivateRoute.css';

/**
 * Komponent zabezpieczający ścieżki wymagające uwierzytelnienia
 * Jeśli użytkownik nie jest zalogowany, zostanie przekierowany do strony logowania
 */
const PrivateRoute = ({ children }) => {
	const { user, loading } = useFirebase();

	// Podczas ładowania stanu użytkownika pokazujemy prosty loader
	if (loading) {
		return (
			<div className='loading-container'>
				<div className='loading-spinner'></div>
				<p>Ładowanie...</p>
			</div>
		);
	}

	// Przekierowanie do logowania, jeśli użytkownik nie jest zalogowany
	if (!user) {
		return <Navigate to='/login' replace />;
	}

	// Jeśli użytkownik jest zalogowany, renderujemy komponenty dzieci
	return children;
};

export default PrivateRoute;
