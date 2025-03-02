import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ResetPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		// Symulacja przetwarzania resetowania hasła
		try {
			// Czekamy 1.5s dla symulacji przetwarzania
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Symulacja sukcesu
			setMessage(
				'Wysłaliśmy instrukcje resetowania hasła na Twój adres email.'
			);
		} catch (err) {
			setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2 className='auth-title'>Reset hasła</h2>
				<p className='auth-subtitle'>
					Podaj swój adres email, aby zresetować hasło
				</p>

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

					<div className='form-action'>
						<button type='submit' className='auth-button' disabled={loading}>
							{loading ? 'Wysyłanie...' : 'Resetuj hasło'}
						</button>
					</div>
				</form>

				<div className='auth-links'>
					<p>
						<Link to='/login' className='auth-link'>
							Powrót do logowania
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
