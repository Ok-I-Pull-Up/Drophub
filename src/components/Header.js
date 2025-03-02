import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCube, FaDiscord, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { user, signOut } = useFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Funkcja zamykająca menu po kliknięciu
	const closeMenu = () => {
		setMobileMenuOpen(false);
	};

	// Funkcja obsługująca wylogowanie
	const handleLogout = async () => {
		try {
			const result = await signOut();
			if (result.success) {
				navigate('/login');
				closeMenu(); // Zamykamy menu po wylogowaniu
			} else {
				console.error('Błąd podczas wylogowywania:', result.error);
			}
		} catch (error) {
			console.error('Błąd podczas wylogowywania:', error);
		}
	};

	return (
		<header className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className='container'>
				<div className='header-content'>
					<Link to='/' className='logo'>
						<FaCube className='logo-icon' />
						Drop<span>Hub</span>
					</Link>

					<div
						className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<nav className={mobileMenuOpen ? 'active' : ''}>
						<ul>
							<li>
								<Link to='/' onClick={closeMenu}>
									Strona główna
								</Link>
							</li>
							<li>
								<a href='#features' onClick={closeMenu}>
									O nas
								</a>
							</li>
							<li>
								<Link to='/edukacja' onClick={closeMenu}>
									Edukacja
								</Link>
							</li>
							<li>
								<a href='#blog' onClick={closeMenu}>
									Blog
								</a>
							</li>

							{/* Wyświetlanie linków logowania/rejestracji tylko w widoku mobilnym */}
							<li className='mobile-auth'>
								{user ? (
									<>
										<Link
											to='/profil'
											className='auth-nav-btn'
											onClick={closeMenu}>
											<FaUser /> Mój profil
										</Link>
										<button
											className='auth-nav-btn logout-btn'
											onClick={handleLogout}>
											<FaSignOutAlt /> Wyloguj
										</button>
									</>
								) : (
									<>
										<Link to='/login' className='login-btn' onClick={closeMenu}>
											Logowanie
										</Link>
									</>
								)}
							</li>

							{!user && (
								<li className='mobile-auth'>
									<Link
										to='/register'
										className='auth-nav-btn'
										onClick={closeMenu}>
										Rejestracja
									</Link>
								</li>
							)}

							<li>
								<a
									href='https://discord.gg/Awx7TMy6UZ'
									className='join-btn'
									target='_blank'
									rel='noopener noreferrer'
									onClick={closeMenu}>
									<FaDiscord /> Dołącz do nas
								</a>
							</li>
						</ul>
					</nav>

					<div className='header-actions'>
						<a
							href='https://discord.gg/Awx7TMy6UZ'
							className='join-btn'
							target='_blank'
							rel='noopener noreferrer'>
							<FaDiscord /> Dołącz do nas
						</a>

						{user ? (
							<div className='auth-buttons'>
								<Link to='/profil' className='auth-btn'>
									<FaUser /> Mój profil
								</Link>
								<button className='auth-btn logout-btn' onClick={handleLogout}>
									<FaSignOutAlt /> Wyloguj
								</button>
							</div>
						) : (
							<div className='auth-buttons'>
								<Link to='/login' className='login-btn'>
									Logowanie
								</Link>
								<Link to='/register' className='register-btn'>
									Rejestracja
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
