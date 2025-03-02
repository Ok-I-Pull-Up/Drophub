import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Profile.css';

const Profile = () => {
	const { user, signOut } = useUser();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [userName, setUserName] = useState('');
	const [website, setWebsite] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Mockowane dane profilu (bez faktycznego pobierania z bazy danych)
	const mockEmail = user?.email || 'uzytkownik@example.com';
	const mockUserId = user?.id || 'mock-user-id';

	// Funkcja obsługująca aktualizację profilu (bez faktycznej aktualizacji w bazie danych)
	const updateProfile = (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		// Symulacja przetwarzania
		setTimeout(() => {
			setMessage('Profil zaktualizowany pomyślnie!');
			setLoading(false);
		}, 1000);
	};

	// Funkcja obsługująca wylogowanie
	const handleLogout = async () => {
		try {
			await signOut();
			navigate('/login');
		} catch (error) {
			console.error('Błąd podczas wylogowywania:', error);
		}
	};

	// Jeśli nie ma mock-użytkownika, pokazujemy komunikat o konieczności zalogowania
	if (!user && !mockUserId) {
		return (
			<div className='profile-container'>
				<div className='profile-card'>
					<h2>Musisz być zalogowany</h2>
					<p>Aby zobaczyć tę stronę, musisz się zalogować.</p>
					<button className='auth-button' onClick={() => navigate('/login')}>
						Przejdź do logowania
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='profile-container'>
			<div className='profile-header'>
				<h1>Twój profil</h1>
				<button className='logout-button' onClick={handleLogout}>
					Wyloguj
				</button>
			</div>

			{error && <div className='profile-error'>{error}</div>}
			{message && <div className='profile-success'>{message}</div>}

			<div className='profile-card'>
				<div className='profile-info'>
					<p>
						<strong>Email:</strong> {mockEmail}
					</p>
					<p>
						<strong>ID użytkownika:</strong> {mockUserId}
					</p>
				</div>

				<form onSubmit={updateProfile} className='profile-form'>
					<div className='form-group'>
						<label htmlFor='username'>Nazwa użytkownika</label>
						<input
							id='username'
							type='text'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder='Podaj swoją nazwę użytkownika'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='website'>Strona internetowa</label>
						<input
							id='website'
							type='url'
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							placeholder='https://example.com'
						/>
					</div>

					<div className='form-action'>
						<button type='submit' className='update-button' disabled={loading}>
							{loading ? 'Aktualizowanie...' : 'Aktualizuj profil'}
						</button>
					</div>
				</form>
			</div>

			<div className='dashboard-links'>
				<h2>Twoje aktywności</h2>
				<div className='dashboard-stats'>
					<div className='stat-card'>
						<h3>0</h3>
						<p>Ukończonych kursów</p>
					</div>
					<div className='stat-card'>
						<h3>0</h3>
						<p>Zapisanych artykułów</p>
					</div>
					<div className='stat-card'>
						<h3>0</h3>
						<p>Aktywnych airdropów</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
