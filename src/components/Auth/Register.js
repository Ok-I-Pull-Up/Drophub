import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Auth.css';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const { signUp } = useUser();
	const navigate = useNavigate();

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
		if (password.length < 8) {
			setError('Hasło musi mieć minimum 8 znaków');
			setLoading(false);
			return;
		}

		try {
			console.log('Rozpoczynam proces rejestracji...');
			const response = await signUp(email, password);
			console.log('Otrzymana odpowiedź z signUp:', response);

			if (response.error) {
				setError(response.error.message || 'Błąd rejestracji. Spróbuj ponownie.');
			} else {
				setMessage('Rejestracja zakończona! Możesz teraz się zalogować.');

				// Po udanej rejestracji przekieruj użytkownika na stronę logowania po 3 sekundach
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			}
		} catch (err) {
			console.error('Nieoczekiwany błąd podczas rejestracji:', err);
			setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
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
							placeholder='Minimum 8 znaków'
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
