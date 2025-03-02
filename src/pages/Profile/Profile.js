import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import './Profile.css';

const Profile = () => {
	const {
		user,
		signOut,
		getProfile,
		updateProfile: updateUserProfile,
	} = useFirebase();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [profileData, setProfileData] = useState({});
	const [userName, setUserName] = useState('');
	const [website, setWebsite] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Pobieranie danych profilu użytkownika z Firestore
	useEffect(() => {
		if (user) {
			const fetchProfile = async () => {
				try {
					const { data, error } = await getProfile(user.uid);

					if (error) {
						console.error('Błąd pobierania profilu:', error);
						return;
					}

					if (data) {
						setProfileData(data);
						setUserName(data.userName || '');
						setWebsite(data.website || '');
					}
				} catch (err) {
					console.error('Nieoczekiwany błąd podczas pobierania profilu:', err);
				}
			};

			fetchProfile();
		}
	}, [user, getProfile]);

	// Funkcja obsługująca aktualizację profilu w Firestore
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			const result = await updateUserProfile(user.uid, {
				userName,
				website,
			});

			if (result.success) {
				setMessage('Profil zaktualizowany pomyślnie!');
			} else {
				setError(result.error || 'Nie udało się zaktualizować profilu');
			}
		} catch (err) {
			console.error('Nieoczekiwany błąd podczas aktualizacji profilu:', err);
			setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
		} finally {
			setLoading(false);
		}
	};

	// Funkcja obsługująca wylogowanie
	const handleLogout = async () => {
		try {
			const result = await signOut();
			if (result.success) {
				navigate('/login');
			} else {
				setError('Nie udało się wylogować. Spróbuj ponownie.');
			}
		} catch (error) {
			console.error('Błąd podczas wylogowywania:', error);
			setError('Wystąpił błąd podczas wylogowywania');
		}
	};

	// Jeśli nie ma użytkownika, pokazujemy komunikat o konieczności zalogowania
	if (!user) {
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
						<strong>Email:</strong> {user.email}
					</p>
					<p>
						<strong>ID użytkownika:</strong> {user.uid}
					</p>
				</div>

				<form onSubmit={handleUpdateProfile} className='profile-form'>
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
