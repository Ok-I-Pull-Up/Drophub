import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import './Auth.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const { signIn } = useFirebase();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			console.log('Próba logowania dla:', email);

			// Logowanie przez Firebase
			const response = await signIn(email, password);

			if (response.error) {
				console.error('Błąd logowania:', response.error);
				setError(response.error.message || 'Błąd logowania');
			} else {
				console.log('Logowanie udane:', response.data.user.email);
				setMessage('Zalogowano pomyślnie!');
				// Przekieruj użytkownika na stronę główną po udanym logowaniu
				setTimeout(() => {
					navigate('/');
				}, 1500);
			}
		} catch (err) {
			console.error('Nieoczekiwany błąd podczas logowania:', err);
			setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2 className='auth-title'>Logowanie</h2>
				<p className='auth-subtitle'>Witaj ponownie w DropHub!</p>

				{error && <div className='auth-error'>{error}</div>}
				{message && <div className='auth-success'>{message}</div>}

				<form onSubmit={handleSubmit} className='auth-form'>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder='Twój adres email'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Hasło</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder='Twoje hasło'
						/>
					</div>

					<div className='form-action'>
						<button type='submit' className='auth-button' disabled={loading}>
							{loading ? 'Logowanie...' : 'Zaloguj się'}
						</button>
					</div>
				</form>

				<div className='auth-links'>
					<Link to='/reset-password' className='auth-link'>
						Zapomniałeś hasła?
					</Link>
					<p>
						Nie masz konta?{' '}
						<Link to='/register' className='auth-link'>
							Zarejestruj się
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
