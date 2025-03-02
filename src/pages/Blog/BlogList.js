import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const BlogList = ({ posts }) => {
	return (
		<div className='blog-list'>
			{posts.map((post) => (
				<div className='blog-card' key={post.id}>
					<Link to={`/blog/${post.slug}`} className='blog-card-image-link'>
						<img
							src={post.featuredImage || post.image}
							alt={post.title}
							className='blog-card-image'
						/>
					</Link>
					<div className='blog-card-content'>
						<div className='blog-card-meta'>
							<span className='blog-card-category'>
								<Link to={`/blog?category=${post.category.toLowerCase()}`}>
									{post.category}
								</Link>
							</span>
							<span className='blog-card-date'>
								<FaCalendar />
								{post.date}
							</span>
							<span className='blog-card-time'>
								<FaClock />
								{post.readTime}
							</span>
						</div>
						<h2 className='blog-card-title'>
							<Link to={`/blog/${post.slug}`}>{post.title}</Link>
						</h2>
						<p className='blog-card-excerpt'>{post.excerpt}</p>
						<Link to={`/blog/${post.slug}`} className='blog-card-more'>
							Czytaj więcej <FaArrowRight className='button-icon' />
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default BlogList;
