import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaSearch, FaCalendar, FaClock, FaFilter } from 'react-icons/fa';
import BlogList from './BlogList';
import blogData from './blogData';
import './Blog.css';

const Blog = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('wszystkie');
	const [filteredPosts, setFilteredPosts] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

	// Pobierz parametry URL przy pierwszym renderowaniu
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const categoryParam = params.get('category');
		const queryParam = params.get('q');

		if (categoryParam) {
			setSelectedCategory(categoryParam);
		}

		if (queryParam) {
			setSearchTerm(queryParam);
		}
	}, [location.search]);

	// Filtrowanie postów na podstawie wyszukiwania i kategorii
	useEffect(() => {
		let posts = [...blogData];

		if (searchTerm) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			posts = posts.filter(
				(post) =>
					post.title.toLowerCase().includes(lowerSearchTerm) ||
					post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
					post.content.toLowerCase().includes(lowerSearchTerm) ||
					(post.keywords &&
						post.keywords.some((keyword) =>
							keyword.toLowerCase().includes(lowerSearchTerm)
						))
			);
		}

		if (selectedCategory !== 'wszystkie') {
			posts = posts.filter(
				(post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
			);
		}

		setFilteredPosts(posts);
	}, [searchTerm, selectedCategory, blogData]);

	// Pobieranie unikalnych kategorii z blogData
	const categories = [
		'wszystkie',
		...new Set(blogData.map((post) => post.category.toLowerCase())),
	];

	// Obsługa zmiany kategorii
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		const params = new URLSearchParams(location.search);

		if (category === 'wszystkie') {
			params.delete('category');
		} else {
			params.set('category', category);
		}

		// Zachowaj parametr wyszukiwania, jeśli istnieje
		if (searchTerm) {
			params.set('q', searchTerm);
		}

		navigate({
			pathname: location.pathname,
			search: params.toString(),
		});
	};

	// Obsługa wyszukiwania z efektem debounce
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		// Debounce efekt dla aktualizacji URL
		const timeoutId = setTimeout(() => {
			const params = new URLSearchParams(location.search);

			if (value) {
				params.set('q', value);
			} else {
				params.delete('q');
			}

			// Zachowaj kategorię, jeśli istnieje
			if (selectedCategory !== 'wszystkie') {
				params.set('category', selectedCategory);
			}

			navigate({
				pathname: location.pathname,
				search: params.toString(),
			});
		}, 500);

		return () => clearTimeout(timeoutId);
	};

	// Resetowanie filtrów
	const resetFilters = () => {
		setSearchTerm('');
		setSelectedCategory('wszystkie');
		navigate('/blog');
	};

	return (
		<div className='blog-page'>
			<Helmet>
				<title>Blog o kryptowalutach i airdropach - DropHub</title>
				<meta
					name='description'
					content='Najnowsze artykuły o kryptowalutach, airdropach, blockchain i najlepszych strategiach inwestycyjnych. Bądź na bieżąco z rynkiem crypto.'
				/>
			</Helmet>

			<div className='container'>
				<header className='blog-page-header'>
					<h1 className='blog-page-title'>
						Blog o <span>kryptowalutach</span> i airdropach
					</h1>
					<p className='blog-page-subtitle'>
						Najnowsze artykuły, poradniki i analizy ze świata kryptowalut,
						blockchain i airdropów. Bądź na bieżąco z najnowszymi trendami.
					</p>
				</header>

				<div className='blog-filters'>
					<div className='blog-search'>
						<span className='search-icon'>
							<FaSearch />
						</span>
						<input
							type='text'
							placeholder='Szukaj artykułów...'
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>

					<div className='blog-categories'>
						<div className='category-label'>
							<FaFilter />
							<span>Kategorie:</span>
						</div>
						<div className='category-tags'>
							{categories.map((category, index) => (
								<button
									key={index}
									className={`category-tag ${
										selectedCategory === category ? 'active' : ''
									}`}
									onClick={() => handleCategoryChange(category)}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</button>
							))}
						</div>
					</div>
				</div>

				{filteredPosts.length > 0 ? (
					<BlogList posts={filteredPosts} />
				) : (
					<div className='no-posts-found'>
						<h2>Nie znaleziono artykułów</h2>
						<p>
							Spróbuj zmienić kryteria wyszukiwania lub wybrać inną kategorię.
						</p>
						<button onClick={resetFilters} className='reset-search-btn'>
							Resetuj filtry
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Blog;
