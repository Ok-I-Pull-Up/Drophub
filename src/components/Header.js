import React, { useState, useEffect, memo, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';

// Przeniesienie ikony do inline SVG dla szybszego ładowania
// Unikamy importu ikony z pakietu, który może spowolnić ładowanie
const LogoIcon = () => (
	<svg
		viewBox='0 0 512 512'
		fill='currentColor'
		className='logo-icon'
		aria-hidden='true'
		style={{ color: '#7928ca', marginRight: '0.7rem', fontSize: '1.7rem' }}>
		<path d='M234.5 5.7c13.9 5 24.1 14.7 29.5 28.3 3.9 9.5 3.9 25.1.1 34.9-5.4 13.6-15.3 22.6-29.6 27.4-4.1 1.3-8.3 1.7-17.5 1.7-11.6 0-12.6-.1-19.5-3.3-12.4-5.7-20.7-14.4-25.7-27.1-1.8-4.3-2.2-7.5-2.2-17.4 0-10.5.3-12.9 2.7-18.4 7.9-18.4 24.1-29 44.7-29.2 6.7-.1 10.8.5 17.5 3.1zm-18.7 9.3c-11.9 2.5-22.7 12.6-26.3 24.9-1.8 6-1.9 17.6-.1 23.1 5.2 16.1 20.2 26.5 37.1 25.7 8.8-.4 15.1-3.1 21.3-9.2 13.2-12.8 15.2-32.3 4.7-47.4-8.6-12.5-23.1-19.5-36.7-17.1z'></path>
		<path d='M415.8 71.8c9.9 3.5 19.6 12.9 23.9 23.4 2.7 6.5 2.8 7.6 2.8 20.8s-.1 14.3-2.8 20.8c-3.9 9.3-12.9 18.8-21.8 22.7-7.7 3.5-20.4 4.4-29.4 2.1-15.8-4-27.4-15.3-31.2-30.6-2.8-10.9-1.2-25.3 3.7-34.6 7.6-14.5 22.5-24.1 38-24.5 5.1-.2 11.2.6 16.8 1.9zm-16.4 9.6c-13.9 3.5-24.7 15.5-26.6 29.5-2.3 17.1 8.8 33.8 25.3 38.1 3.9 1 6.6 1.2 12.4.6 8.3-.8 14.2-3.5 20.1-9.4 15.1-15.1 13.2-40.6-4-53.2-8.2-6-18.6-8.3-27.2-5.6z'></path>
		<path d='M93.2 208.2c11.1 3.8 20.5 12.4 24.8 22.7 2.7 6.5 2.8 7.6 2.8 20.8 0 12.9-.1 14.4-2.7 20.5-3.7 9-13.4 18.8-21.6 22.2-6.9 2.9-8.2 3.1-18.5 3.1s-11.6-.2-18.5-3.1c-8.5-3.5-18.1-13.4-21.9-22.5-2.4-5.8-2.6-7.4-2.6-20.2 0-13.2.1-14.3 2.8-20.8 3.8-9.3 12.6-18.6 21.9-22.9 7.7-3.6 26.5-3.5 33.5.2zm-19.8 9.2c-20.6 5.8-31.1 28.2-22.9 48.3 5 12.2 15.4 20.2 29.1 22.2 19 2.8 37.3-11.9 40.1-32.2 2.2-16.2-9-33.2-24.8-37.7-5.9-1.7-15.7-1.9-21.5-.6z'></path>
		<path d='M251.9 208c5.7 1.9 13.5 7.4 16.8 12 7.4 10.3 9.4 16.6 9.7 30 .2 11.8.1 12.4-2.9 19-4.5 9.8-12.7 17.5-22.8 21.4-7.3 2.8-22.9 3.1-30.9.5-17.8-5.7-28.2-18.1-30.6-36.5-2.1-16.1 5.1-32.3 18.3-41.3 4-2.7 11.2-5.7 15.5-6.4 4.8-.9 22.5.1 26.9 1.3zm-19.1 9.6c-16.8 4.5-26.9 22-23.2 40.1 3.6 17.4 19.9 28.8 37.3 26 7.9-1.3 14.4-4.8 20.2-11 7.1-7.7 9.9-15.6 9.3-26.3-.5-9.8-2.5-14.8-8.7-21.8-8.2-9.3-22.2-12.7-34.9-7z'></path>
		<path d='M415.5 208c11.7 3.9 21.9 14.4 25.5 26.3 2 6.8 2 21.6 0 28.4-5.9 19.5-24.2 31.9-44.5 30.3-14.6-1.2-26.7-9-33.2-21.5-3.5-6.8-3.8-8.1-3.8-18.7 0-10.3.3-12.2 2.7-18 8-18.6 28.2-31 53.3-26.8zm-14.1 9.9c-16.1 4.2-26.7 20.3-24.9 37.8 2.2 21.1 21.7 35.2 42.2 30.6 12.3-2.8 21.6-11.8 25.2-24.5 1.3-4.6 1.3-15.9.1-21-2.5-9.6-11.3-19.5-20.5-22.9-5.8-2.2-16.4-2.2-22.1 0zM93.7 349.1c10.7 4.2 17.7 10.2 22.5 19.2 3.1 5.9 3.3 7 3.3 17.5 0 10.3-.2 11.6-3.1 17.4-8.8 17.6-28.5 26.8-47.4 22-16.3-4.1-29.3-18.5-31.5-34.6-.9-6.3-.7-16.1.3-21.5 3.6-17.8 18.6-31 37.2-32.9 6.1-.6 12.7.3 18.7 2.9zm-17.8 9.3c-10.8 2.2-20.7 10.9-24.4 21.3-2.4 6.8-1.5 19.3 1.9 26.3 4.2 8.9 14.6 16.5 24.8 18.1 20.9 3.4 40.8-15.2 38.6-36.1-1.7-16.7-14.5-29.4-31.1-31-2.1-.2-6.4.1-9.8.4z'></path>
		<path d='M254.6 349.2c19.4 7.4 30.1 28.6 25.4 49.8-2.7 11.9-10.7 22.1-21.5 27.3-6.1 3-7.6 3.2-18.7 3.2-10.7 0-12.7-.3-18-2.7-17.9-8-27.3-27.6-22.7-47.1 2.2-9.4 11.8-21.6 20.3-26 10.4-5.3 24.5-7.1 35.2-4.5zm-19.4 8.8c-9.8 2.2-18.2 9.6-22.3 19.5-9.9 23.9 11.9 49.3 37.2 43.2 17.5-4.2 28.2-21.8 24.3-39.5-3.8-17.4-22.4-28.6-39.2-23.2z'></path>
		<path d='M415.2 349.4c12.3 5 20.9 14.7 24.1 27.4 1.8 7.4 1.4 19.9-.9 27.3-5.5 17.3-20.8 28.4-39.4 28.4-14.5 0-26.2-5.8-34.6-17.2-5.9-8.1-7.9-14.7-7.9-26.4 0-8.5.4-11.2 2.6-16.6 4.3-10.7 12.8-19.4 23.3-23.9 7.3-3.2 8.8-3.4 18.2-3.4 7.2 0 11.5.5 14.6 1.4zm-15.8 9.1c-17.1 3.2-28.7 20.3-25.4 37.5 1.4 7.5 4.1 12.4 9.9 18.2 12.1 12.1 31.1 12.6 43.8 1.1 21.7-19.7 9.7-54.5-19.7-57.4-2.3-.3-5.8-.1-8.6.6z'></path>
	</svg>
);

// Zastosowanie React.memo dla komponentu Logo
const Logo = memo(() => (
	<Link to='/' className='logo' id='main-logo'>
		<LogoIcon />
		Drop<span>HuB</span>
	</Link>
));

// Wyekstrahowanie komponentów menu dla poprawy wydajności
const NavigationLinks = memo(({ closeMenu }) => (
	<>
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
	</>
));

// Memoizacja całego komponentu Header
const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { user, signOut } = useFirebase();
	const navigate = useNavigate();

	// Lazy initialization dla event listenera
	useEffect(() => {
		// Ustawienie atrybutów dla lepszego LCP
		document.querySelector('.logo svg').setAttribute('fetchpriority', 'high');

		// Debounced scroll handler dla lepszej wydajności
		let scrollTimer;
		const handleScroll = () => {
			if (scrollTimer) return;
			scrollTimer = setTimeout(() => {
				setScrolled(window.scrollY > 50);
				scrollTimer = null;
			}, 10);
		};

		// Użycie passive listener dla lepszej wydajności
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (scrollTimer) clearTimeout(scrollTimer);
		};
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
					<Logo />

					<div
						className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<nav className={mobileMenuOpen ? 'active' : ''}>
						<ul>
							<NavigationLinks closeMenu={closeMenu} />

							{/* Wyświetlanie linków logowania tylko w widoku mobilnym */}
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
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default memo(Header);
