import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import './Auth.css';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const { signUp } = useFirebase();
	const navigate = useNavigate();

	// Funkcja sprawdzająca siłę hasła
	const isStrongPassword = (password) => {
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumbers = /\d/.test(password);
		const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		return (
			password.length >= 8 &&
			hasUpperCase &&
			hasLowerCase &&
			hasNumbers &&
			hasSpecial
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		// Sprawdzanie czy hasła są zgodne
		if (password !== confirmPassword) {
			setError('Hasła nie są identyczne');
			setLoading(false);
			return;
		}

		// Sprawdzanie siły hasła
		if (!isStrongPassword(password)) {
			setError(
				'Hasło musi mieć minimum 8 znaków i zawierać: wielką literę, małą literę, cyfrę oraz znak specjalny'
			);
			setLoading(false);
			return;
		}

		try {
			// Bez logowania adresu email do konsoli
			const response = await signUp(email, password);

			if (response.error) {
				setError(
					response.error.message || 'Błąd rejestracji. Spróbuj ponownie.'
				);
			} else {
				setMessage('Rejestracja zakończona! Możesz teraz się zalogować.');

				// Po udanej rejestracji przekieruj użytkownika na stronę logowania po 3 sekundach
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			}
		} catch (err) {
			console.error('Błąd podczas rejestracji');
			setError(
				'Wystąpił błąd podczas przetwarzania żądania. Spróbuj ponownie później.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2 className='auth-title'>Rejestracja</h2>
				<p className='auth-subtitle'>Dołącz do społeczności DropHub!</p>

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
							placeholder='Min. 8 znaków: wielka litera, mała litera, cyfra, znak specjalny'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='confirmPassword'>Potwierdź hasło</label>
						<input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder='Powtórz hasło'
						/>
					</div>

					<div className='form-action'>
						<button type='submit' className='auth-button' disabled={loading}>
							{loading ? 'Rejestracja...' : 'Zarejestruj się'}
						</button>
					</div>
				</form>

				<div className='auth-links'>
					<p>
						Masz już konto?{' '}
						<Link to='/login' className='auth-link'>
							Zaloguj się
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
