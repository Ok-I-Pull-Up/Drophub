import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
	FaCalendar,
	FaClock,
	FaTag,
	FaArrowLeft,
	FaArrowRight,
	FaShare,
	FaFacebookF,
	FaTwitter,
	FaLinkedinIn,
	FaLink,
} from 'react-icons/fa';
import blogData from './blogData';
import RelatedPosts from './RelatedPosts';

const BlogPost = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [relatedPosts, setRelatedPosts] = useState([]);
	const [shareOpen, setShareOpen] = useState(false);

	useEffect(() => {
		// Znajdź aktualny post na podstawie slug
		const currentPost = blogData.find((post) => post.slug === slug);

		if (currentPost) {
			setPost(currentPost);

			// Znajdź powiązane posty o tej samej kategorii (max 3)
			const related = blogData
				.filter((p) => p.slug !== slug && p.category === currentPost.category)
				.slice(0, 3);

			setRelatedPosts(related);

			// Przewiń stronę na górę
			window.scrollTo(0, 0);
		} else {
			// Przekieruj do strony 404 lub listy blogów, jeśli post nie istnieje
			navigate('/blog');
		}
	}, [slug, navigate]);

	const copyLinkToClipboard = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url).catch((err) => {
			console.error('Nie udało się skopiować linku: ', err);
		});
		// Pokaż komunikat o sukcesie
		alert('Link skopiowany do schowka!');
	};

	// Obsługa kliknięcia na tag
	const handleTagClick = (tag) => {
		navigate(`/blog?q=${encodeURIComponent(tag)}`);
	};

	if (!post) {
		return <div className='loading'>Ładowanie artykułu...</div>;
	}

	// Znajdź indeksy dla poprzedniego i następnego posta
	const currentIndex = blogData.findIndex((p) => p.slug === slug);
	const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
	const nextPost =
		currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

	return (
		<article className='blog-post-container'>
			<Helmet>
				<title>{post.title} | Blog DropHub</title>
				<meta name='description' content={post.excerpt} />
				<meta
					name='keywords'
					content={`kryptowaluty, airdropy, ${post.category.toLowerCase()}, ${post.keywords.join(
						', '
					)}`}
				/>
				<meta property='og:title' content={post.title} />
				<meta property='og:description' content={post.excerpt} />
				<meta property='og:type' content='article' />
				<meta
					property='og:url'
					content={`https://drophub.pl/blog/${post.slug}`}
				/>
				<meta property='og:image' content={post.image} />
				<link rel='canonical' href={`https://drophub.pl/blog/${post.slug}`} />
			</Helmet>

			<div className='container'>
				<div className='blog-post-header'>
					<Link to='/blog' className='blog-back-btn'>
						<FaArrowLeft /> Powrót do bloga
					</Link>

					<div className='blog-post-meta'>
						<span className='blog-post-category'>
							<FaTag />
							<Link to={`/blog?category=${post.category.toLowerCase()}`}>
								{post.category}
							</Link>
						</span>
						<span className='blog-post-date'>
							<FaCalendar />
							{post.date}
						</span>
						<span className='blog-post-time'>
							<FaClock />
							{post.readTime}
						</span>
					</div>

					<h1 className='blog-post-title'>{post.title}</h1>

					<p className='blog-post-excerpt'>{post.excerpt}</p>

					<div className='blog-post-author'>
						<img
							src={post.author.avatar}
							alt={post.author.name}
							className='author-avatar'
							width='50'
							height='50'
						/>
						<div className='author-info'>
							<span className='author-name'>{post.author.name}</span>
							<span className='author-role'>{post.author.role}</span>
						</div>
					</div>
				</div>

				<div className='blog-post-featured-image'>
					<img src={post.image} alt={post.title} width='1200' height='630' />
				</div>

				<div className='blog-post-content'>
					<div className='share-container'>
						<button
							className='share-button'
							onClick={() => setShareOpen(!shareOpen)}
							aria-label='Udostępnij artykuł'>
							<FaShare />
							<span>Udostępnij</span>
						</button>

						{shareOpen && (
							<div className='share-options'>
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
										window.location.href
									)}`}
									target='_blank'
									rel='noopener noreferrer'
									aria-label='Udostępnij na Facebooku'
									className='share-option facebook'>
									<FaFacebookF />
								</a>
								<a
									href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
										window.location.href
									)}&text=${encodeURIComponent(post.title)}`}
									target='_blank'
									rel='noopener noreferrer'
									aria-label='Udostępnij na Twitterze'
									className='share-option twitter'>
									<FaTwitter />
								</a>
								<a
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
										window.location.href
									)}&title=${encodeURIComponent(
										post.title
									)}&summary=${encodeURIComponent(post.excerpt)}`}
									target='_blank'
									rel='noopener noreferrer'
									aria-label='Udostępnij na LinkedIn'
									className='share-option linkedin'>
									<FaLinkedinIn />
								</a>
								<button
									onClick={copyLinkToClipboard}
									aria-label='Kopiuj link'
									className='share-option copy-link'>
									<FaLink />
								</button>
							</div>
						)}
					</div>

					<div
						className='post-content'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className='blog-post-tags'>
						<h3>Tagi:</h3>
						<div className='tag-list'>
							{post.keywords.map((tag, index) => (
								<button
									key={index}
									onClick={() => handleTagClick(tag)}
									className='post-tag'>
									{tag}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className='blog-post-navigation'>
					{prevPost && (
						<Link to={`/blog/${prevPost.slug}`} className='nav-prev'>
							<FaArrowLeft />
							<div>
								<span>Poprzedni artykuł</span>
								<h4>{prevPost.title}</h4>
							</div>
						</Link>
					)}

					{nextPost && (
						<Link to={`/blog/${nextPost.slug}`} className='nav-next'>
							<div>
								<span>Następny artykuł</span>
								<h4>{nextPost.title}</h4>
							</div>
							<FaArrowRight />
						</Link>
					)}
				</div>

				{relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
			</div>
		</article>
	);
};

export default BlogPost;
