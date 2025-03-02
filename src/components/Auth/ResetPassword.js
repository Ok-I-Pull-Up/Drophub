import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import './Auth.css';

const ResetPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const { resetPassword } = useFirebase();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			console.log('Wysyłanie żądania resetowania hasła dla:', email);

			const result = await resetPassword(email);

			if (result.success) {
				setMessage(
					result.message ||
						'Wysłaliśmy instrukcje resetowania hasła na Twój adres email.'
				);
			} else {
				setError(
					result.error || 'Nie udało się zresetować hasła. Spróbuj ponownie.'
				);
			}
		} catch (err) {
			console.error('Nieoczekiwany błąd podczas resetowania hasła:', err);
			setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
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
