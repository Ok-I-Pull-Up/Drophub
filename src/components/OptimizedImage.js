import React, { useState, useEffect, memo } from 'react';
import { Blurhash } from 'react-blurhash';

const OptimizedImage = memo(
	({
		src,
		alt,
		className,
		width,
		height,
		blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
		priority = false,
		loading = 'lazy',
		onClick,
		style = {},
	}) => {
		const [imageLoaded, setImageLoaded] = useState(false);
		const [imgElement, setImgElement] = useState(null);

		// Sprawdź czy mamy zoptymalizowane wersje obrazu
		const baseSrc = src || '';
		const webpSrc = baseSrc.replace(/\.(png|jpe?g)$/, '.webp');
		const optimizedSrc = baseSrc.includes('/optimized/')
			? baseSrc
			: baseSrc.replace(
					/\/(?!.*\/)([^/]+)\.(png|jpe?g)$/,
					'/optimized/$1.webp'
			  );

		useEffect(() => {
			if (priority) {
				// Jeśli obraz ma wysoki priorytet, preload
				const preloadLink = document.createElement('link');
				preloadLink.rel = 'preload';
				preloadLink.as = 'image';
				preloadLink.href = optimizedSrc || webpSrc || baseSrc;
				preloadLink.type = 'image/webp';
				document.head.appendChild(preloadLink);

				return () => {
					document.head.removeChild(preloadLink);
				};
			}
		}, [baseSrc, optimizedSrc, webpSrc, priority]);

		useEffect(() => {
			// IntersectionObserver do lazy loading
			if (!priority && imgElement && 'IntersectionObserver' in window) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								// Nie ustawiamy src od razu - najpierw w <picture>
								observer.unobserve(entry.target);
							}
						});
					},
					{
						rootMargin: '200px 0px', // Preload gdy obraz jest 200px od viewportu
						threshold: 0.01,
					}
				);

				observer.observe(imgElement);
				return () => {
					if (imgElement) observer.unobserve(imgElement);
				};
			}
		}, [imgElement, baseSrc, priority]);

		const handleImageLoad = () => {
			setImageLoaded(true);
		};

		const combinedStyle = {
			...style,
			display: imageLoaded ? 'block' : 'none',
		};

		return (
			<div
				className={`optimized-image-container ${className || ''}`}
				style={{ position: 'relative', width, height }}>
				{!imageLoaded && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}>
						<Blurhash
							hash={blurhash}
							width='100%'
							height='100%'
							resolutionX={32}
							resolutionY={32}
							punch={1}
						/>
					</div>
				)}

				{/* Używamy znacznika <picture> dla lepszego wsparcia formatów */}
				<picture>
					{/* Najpierw próbujemy załadować wersję WebP */}
					<source srcSet={optimizedSrc || webpSrc} type='image/webp' />
					{/* Fallback do oryginalnego formatu */}
					<img
						ref={setImgElement}
						src={baseSrc}
						alt={alt}
						width={width}
						height={height}
						loading={loading}
						fetchpriority={priority ? 'high' : 'auto'}
						onLoad={handleImageLoad}
						onClick={onClick}
						style={combinedStyle}
						decoding={priority ? 'sync' : 'async'}
					/>
				</picture>
			</div>
		);
	}
);

export default OptimizedImage;
