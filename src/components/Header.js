import React, {
	useState,
	useEffect,
	memo,
	lazy,
	Suspense,
	useCallback,
	useMemo,
	useRef,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord, FaUser, FaSignOutAlt, FaCube } from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';
import OptimizedImage from './OptimizedImage';

// Zoptymalizowany Logo component
const Logo = memo(() => {
	// Podstawowy tekst logo z podziałem na kolory
	const logoText = useMemo(
		() => (
			<h1 style={{ display: 'inline-block', margin: 0, fontSize: '1.2rem' }}>
				Drop<span>Hub</span>
			</h1>
		),
		[]
	);

	return (
		<Link
			to='/'
			className='logo'
			style={{ display: 'flex', alignItems: 'center' }}>
			<FaCube className='logo-icon' />
			{logoText}
		</Link>
	);
});

// Zoptymalizowane NavigationLinks jako osobny komponent
const NavigationLinks = memo(({ closeMenu }) => (
	<>
		<li>
			<Link to='/' onClick={closeMenu}>
				Strona główna
			</Link>
		</li>
		<li>
			<Link to='/airdropy' onClick={closeMenu}>
				Airdropy
			</Link>
		</li>
		<li>
			<Link to='/edukacja' onClick={closeMenu}>
				Edukacja
			</Link>
		</li>
		<li>
			<Link to='/blog' onClick={closeMenu}>
				Blog
			</Link>
		</li>
		<li>
			<Link to='/o-nas' onClick={closeMenu}>
				O nas
			</Link>
		</li>
	</>
));

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(() => window.scrollY > 50);
	const { user, signOut } = useFirebase();
	const navigate = useNavigate();
	const headerRef = useRef(null);

	// Lazy initialization dla event listenera z requestAnimationFrame dla lepszej wydajności
	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setScrolled(window.scrollY > 50);
					ticking = false;
				});
				ticking = true;
			}
		};

		// Użycie passive listener dla lepszej wydajności
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Funkcja zamykająca menu po kliknięciu
	const closeMenu = useCallback(() => {
		setMobileMenuOpen(false);
	}, []);

	// Funkcja obsługująca wylogowanie
	const handleLogout = useCallback(async () => {
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
	}, [signOut, navigate, closeMenu]);

	// Memo dla headerContent aby zapobiec niepotrzebnym renderom
	const headerContent = useMemo(
		() => (
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
		),
		[mobileMenuOpen, user, closeMenu, handleLogout]
	);

	return (
		<header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className='container'>{headerContent}</div>
		</header>
	);
};

export default memo(Header);
