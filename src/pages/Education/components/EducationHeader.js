import React from 'react';
import { FaGraduationCap, FaBookOpen, FaLaptop } from 'react-icons/fa';

const EducationHeader = () => {
	return (
		<section className='education-header'>
			<div className='container'>
				<div className='education-header-content'>
					<div className='education-header-text'>
						<h1 className='education-title'>
							Centrum <span>Edukacji</span> Kryptowalutowej
						</h1>
						<p className='education-description'>
							Rozwijaj swoją wiedzę o kryptowalutach i technologii blockchain
							dzięki naszym darmowym kursom, materiałom i poradnikom.
							Niezależnie od poziomu zaawansowania, znajdziesz tu coś dla
							siebie.
						</p>
						<div className='education-stats'>
							<div className='stat-item'>
								<div className='stat-icon'>
									<FaGraduationCap />
								</div>
								<div className='stat-info'>
									<h3>20+</h3>
									<p>Kursów</p>
								</div>
							</div>
							<div className='stat-item'>
								<div className='stat-icon'>
									<FaBookOpen />
								</div>
								<div className='stat-info'>
									<h3>50+</h3>
									<p>Artykułów</p>
								</div>
							</div>
							<div className='stat-item'>
								<div className='stat-icon'>
									<FaLaptop />
								</div>
								<div className='stat-info'>
									<h3>10k+</h3>
									<p>Studentów</p>
								</div>
							</div>
						</div>
					</div>
					<div className='education-header-image'>
						<div className='education-image-container'>
							<a
								href='http://www.freepik.com'
								target='_blank'
								rel='noopener noreferrer'>
								<img
									src='/images/education.jpg'
									alt='Centrum edukacji kryptowalutowej'
									class='education-image'
								/>
							</a>

							<div className='image-overlay'></div>
						</div>
					</div>
				</div>
			</div>
			<div className='blob education-blob-1'></div>
			<div className='blob education-blob-2'></div>
		</section>
	);
};

export default EducationHeader;
