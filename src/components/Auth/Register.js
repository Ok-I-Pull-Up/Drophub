import React, { useState, useEffect } from 'react';
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
	const [passwordRequirements, setPasswordRequirements] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
	});

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

	// Aktualizacja statusu wymagań dotyczących hasła
	useEffect(() => {
		setPasswordRequirements({
			length: password.length >= 8,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /\d/.test(password),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		});
	}, [password]);

	// Obliczanie siły hasła (0-100%)
	const calculatePasswordStrength = () => {
		let strength = 0;
		const requirements = Object.values(passwordRequirements);
		const fulfilledRequirements = requirements.filter(Boolean).length;
		strength = (fulfilledRequirements / requirements.length) * 100;
		return strength;
	};

	// Określenie koloru wskaźnika siły hasła
	const getStrengthColor = (strength) => {
		if (strength < 40) return '#ef4444'; // Czerwony
		if (strength < 70) return '#f59e0b'; // Pomarańczowy
		return '#22c55e'; // Zielony
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
			setError('Hasło musi spełniać wszystkie wymagania wymienione poniżej');
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

	const strength = calculatePasswordStrength();
	const strengthColor = getStrengthColor(strength);

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
							placeholder='Wprowadź silne hasło'
						/>

						{/* Wskaźnik siły hasła */}
						{password.length > 0 && (
							<div className='password-strength-container'>
								<div className='password-strength-label'>
									Siła hasła:
									<span style={{ marginLeft: '8px', color: strengthColor }}>
										{strength < 40
											? 'Słabe'
											: strength < 70
											? 'Średnie'
											: 'Silne'}
									</span>
								</div>
								<div className='password-strength-bar'>
									<div
										className='password-strength-progress'
										style={{
											width: `${strength}%`,
											backgroundColor: strengthColor,
										}}></div>
								</div>

								{/* Box z wymaganiami hasła */}
								<div className='password-requirements-box'>
									<h4>Hasło musi zawierać:</h4>
									<ul className='password-requirements-list'>
										<li
											className={
												passwordRequirements.length ? 'fulfilled' : ''
											}>
											<span className='requirement-icon'>
												{passwordRequirements.length ? '✓' : '○'}
											</span>
											Minimum 8 znaków
										</li>
										<li
											className={
												passwordRequirements.uppercase ? 'fulfilled' : ''
											}>
											<span className='requirement-icon'>
												{passwordRequirements.uppercase ? '✓' : '○'}
											</span>
											Przynajmniej jedną wielką literę (A-Z)
										</li>
										<li
											className={
												passwordRequirements.lowercase ? 'fulfilled' : ''
											}>
											<span className='requirement-icon'>
												{passwordRequirements.lowercase ? '✓' : '○'}
											</span>
											Przynajmniej jedną małą literę (a-z)
										</li>
										<li
											className={
												passwordRequirements.number ? 'fulfilled' : ''
											}>
											<span className='requirement-icon'>
												{passwordRequirements.number ? '✓' : '○'}
											</span>
											Przynajmniej jedną cyfrę (0-9)
										</li>
										<li
											className={
												passwordRequirements.special ? 'fulfilled' : ''
											}>
											<span className='requirement-icon'>
												{passwordRequirements.special ? '✓' : '○'}
											</span>
											Przynajmniej jeden znak specjalny (!@#$%^&*(),.?":{}
											|&lt;&gt;)
										</li>
									</ul>
								</div>
							</div>
						)}
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
