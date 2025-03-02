import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa';

const RelatedPosts = ({ posts }) => {
	if (!posts || posts.length === 0) return null;

	return (
		<div className='related-posts'>
			<h3 className='related-posts-title'>Powiązane artykuły</h3>
			<div className='related-posts-grid'>
				{posts.map((post) => (
					<div className='related-post-card' key={post.id}>
						<Link to={`/blog/${post.slug}`} className='related-post-image-link'>
							<img
								src={post.featuredImage || post.image}
								alt={post.title}
								className='related-post-image'
							/>
						</Link>
						<div className='related-post-content'>
							<div className='related-post-date'>
								<FaCalendar />
								{post.date}
							</div>
							<h4 className='related-post-title'>
								<Link to={`/blog/${post.slug}`}>{post.title}</Link>
							</h4>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RelatedPosts;
