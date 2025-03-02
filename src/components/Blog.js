import React, { useEffect } from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Blog = () => {
	useEffect(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll('.blog-card');

			elements.forEach((element) => {
				const position = element.getBoundingClientRect();

				if (position.top < window.innerHeight - 150) {
					element.classList.add('active');
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Uruchomienie przy załadowaniu

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const blogPosts = [
		{
			image: '/images/blog/blog-image-1.jpg',
			category: 'Edukacja',
			title: 'Kryptowaluty dla początkujących - od czego zacząć?',
			description:
				'Kompletny przewodnik dla osób stawiających pierwsze kroki w świecie kryptowalut i technologii blockchain.',
			date: '15.02.2023',
			readTime: '10 min czytania',
			slug: 'kryptowaluty-dla-poczatkujacych',
		},
		{
			image: '/images/blog/blog-image-2.jpg',
			category: 'Airdropy',
			title: 'Top 10 airdropów, na które warto czekać w 2023 roku',
			description:
				'Przegląd najbardziej obiecujących airdropów nadchodzących w tym roku i jak się do nich przygotować.',
			date: '27.01.2023',
			readTime: '8 min czytania',
			slug: 'top-10-airdropow-2023',
		},
		{
			image: '/images/blog/blog-image-3.jpg',
			category: 'Analiza',
			title:
				'Analiza techniczna Bitcoin - co nas czeka w najbliższych miesiącach?',
			description:
				'Szczegółowa analiza wykresów i prognoza cenowa dla Bitcoina na nadchodzące miesiące.',
			date: '03.02.2023',
			readTime: '12 min czytania',
			slug: 'analiza-techniczna-bitcoin',
		},
	];

	return (
		<section className='blog' id='blog'>
			<div className='container'>
				<h2 className='section-title'>
					Nasze <span>artykuły</span>
				</h2>
				<div className='blog-grid'>
					{blogPosts.map((post, index) => (
						<div className='blog-card fade-in' key={index}>
							<Link to={`/blog/${post.slug}`}>
								<img src={post.image} alt={post.title} className='blog-image' />
							</Link>
							<div className='blog-content'>
								<Link
									to={`/blog?category=${post.category.toLowerCase()}`}
									className='blog-category'>
									{post.category}
								</Link>
								<h3 className='blog-title'>
									<Link to={`/blog/${post.slug}`}>{post.title}</Link>
								</h3>
								<p className='blog-description'>{post.description}</p>
								<div className='blog-meta'>
									<span>
										<FaCalendar /> {post.date}
									</span>
									<span>
										<FaClock /> {post.readTime}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='cta-container'>
					<Link to='/blog' className='btn-primary'>
						Zobacz wszystkie artykuły
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Blog;
