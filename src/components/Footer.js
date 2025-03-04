import React from 'react';
import { Link } from 'react-router-dom';
import {
	FaCube,
	FaDiscord,
	FaTwitter,
	FaTelegram,
	FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<footer>
			<div className='container'>
				<div className='footer-content'>
					<div>
						<Link to='/' className='footer-logo'>
							<FaCube className='logo-icon' />
							Drop<span>Hub</span>
						</Link>
						<p className='footer-description'>
							Polska społeczność kryptowalutowa, dzieląca się wiedzą,
							doświadczeniami i możliwościami w świecie blockchain.
						</p>
						<div className='footer-social'>
							<a
								href='https://discord.gg/Awx7TMy6UZ'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Dołącz do nas na Discordzie'>
								<FaDiscord />
								<span className='sr-only'>Discord</span>
							</a>
							<a href='/' aria-label='Odwiedź nasz profil na Twitterze'>
								<FaTwitter />
								<span className='sr-only'>Twitter</span>
							</a>
							<a href='/' aria-label='Dołącz do naszej grupy na Telegramie'>
								<FaTelegram />
								<span className='sr-only'>Telegram</span>
							</a>
							<a href='/' aria-label='Odwiedź nasz kanał YouTube'>
								<FaYoutube />
								<span className='sr-only'>YouTube</span>
							</a>
						</div>
					</div>

					<div>
						<h3 className='footer-heading'>Nawigacja</h3>
						<ul className='footer-links'>
							<li>
								<Link to='/'>Strona główna</Link>
							</li>
							<li>
								<a href='#features'>O nas</a>
							</li>
							<li>
								<a href='#blog'>Blog</a>
							</li>
							<li>
								<a href='#newsletter'>Newsletter</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='footer-heading'>Zasoby</h3>
						<ul className='footer-links'>
							<li>
								<Link to='/edukacja'>Edukacja</Link>
							</li>
							<li>
								<a href='/'>Airdropy</a>
							</li>
							<li>
								<a href='/'>Analizy</a>
							</li>
							<li>
								<a href='/'>Bezpieczeństwo</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='footer-heading'>Kontakt</h3>
						<ul className='footer-links'>
							<li>
								<a
									href='https://discord.gg/Awx7TMy6UZ'
									target='_blank'
									rel='noopener noreferrer'>
									Discord
								</a>
							</li>
							<li>
								<a href='/'>Twitter</a>
							</li>
							<li>
								<a href='/'>Email</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='footer-bottom'>
					<p>
						&copy; {new Date().getFullYear()} DropHub. Wszelkie prawa
						zastrzeżone.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
