import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Funkcja do rozpoznania kiedy dokument jest gotowy do renderowania
const whenDocumentReady = (callback) => {
	if (document.readyState !== 'loading') {
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

// Funkcja do rozpoczęcia renderowania React tylko wtedy, gdy wszystkie krytyczne zasoby są załadowane
whenDocumentReady(() => {
	// Preload logo images i innych kluczowych zasobów
	const preloadLogos = () => {
		const logoSizes = [192, 512];
		logoSizes.forEach((size) => {
			const imgPreload = new Image();
			imgPreload.src = `${process.env.PUBLIC_URL}/logo${size}.png`;
		});
	};

	// Załaduj asynchronicznie krytyczne zasoby
	preloadLogos();

	// Zainicjuj aplikację w procedurze requestIdleCallback, aby nie blokować głównego wątku
	window.requestIdleCallback =
		window.requestIdleCallback ||
		function (cb) {
			const start = Date.now();
			return setTimeout(function () {
				cb({
					didTimeout: false,
					timeRemaining: function () {
						return Math.max(0, 50 - (Date.now() - start));
					},
				});
			}, 1);
		};

	// Renderuj aplikację w requestIdleCallback dla lepszej wydajności
	window.requestIdleCallback(() => {
		const root = ReactDOM.createRoot(document.getElementById('root'));
		root.render(
			// Usunięcie StrictMode w produkcji, ponieważ powoduje podwójne renderowanie
			process.env.NODE_ENV === 'development' ? (
				<React.StrictMode>
					<App />
				</React.StrictMode>
			) : (
				<App />
			)
		);
	});
});
