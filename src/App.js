import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
// Importowanie tylko krytycznych komponentów bezpośrednio
// Pozostałe komponenty będą ładowane z opóźnieniem
import { FirebaseProvider } from './context/FirebaseContext';
import './App.css';

// Lazy loading dla komponentów niekrytycznych
const Features = lazy(() => import('./components/Features'));
const Blog = lazy(() => import('./components/Blog'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Footer = lazy(() => import('./components/Footer'));
const Education = lazy(() => import('./pages/Education/Education'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const ResetPassword = lazy(() => import('./components/Auth/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

// Lazy loading dla komponentów bloga
const BlogPage = lazy(() => import('./pages/Blog/Blog'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));

// Prosty komponent ładowania
const Loading = () => <div className='loading-spinner'>Ładowanie...</div>;

function App() {
	return (
		<FirebaseProvider>
			<HelmetProvider>
				<Router>
					<div className='App'>
						<Header />
						<Suspense fallback={<Loading />}>
							<Routes>
								<Route
									path='/'
									element={
										<>
											<Hero />
											<Suspense fallback={<Loading />}>
												<Features />
												<Blog />
												<Newsletter />
											</Suspense>
										</>
									}
								/>
								<Route path='/edukacja' element={<Education />} />

								{/* Ścieżki bloga */}
								<Route path='/blog' element={<BlogPage />} />
								<Route path='/blog/:slug' element={<BlogPost />} />

								{/* Ścieżki autoryzacji */}
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/reset-password' element={<ResetPassword />} />

								{/* Zabezpieczone ścieżki wymagające uwierzytelnienia */}
								<Route
									path='/profil'
									element={
										<PrivateRoute>
											<Profile />
										</PrivateRoute>
									}
								/>
							</Routes>
							<Footer />
						</Suspense>
					</div>
				</Router>
			</HelmetProvider>
		</FirebaseProvider>
	);
}

export default App;
