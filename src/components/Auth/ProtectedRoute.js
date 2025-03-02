import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Komponent do ochrony tras przed dostępem dla niezalogowanych użytkowników
const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	// Podczas ładowania stanu autoryzacji pokazujemy prosty loader
	if (loading) {
		return (
			<div className='auth-loading'>
				<div className='spinner'></div>
				<p>Ładowanie...</p>
			</div>
		);
	}

	// Jeśli użytkownik nie jest zalogowany, przekieruj do strony logowania
	if (!user) {
		return <Navigate to='/login' />;
	}

	// Jeśli użytkownik jest zalogowany, renderuj podany komponent
	return children;
};

export default ProtectedRoute;
