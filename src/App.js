import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Education from './pages/Education/Education';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './pages/Profile/Profile';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
	return (
		<UserProvider>
			<Router>
				<div className='App'>
					<Header />
					<Routes>
						<Route
							path='/'
							element={
								<>
									<Hero />
									<Features />
									<Blog />
									<Newsletter />
								</>
							}
						/>
						<Route path='/edukacja' element={<Education />} />

						{/* Ścieżki autoryzacji (tylko front-end) */}
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/reset-password' element={<ResetPassword />} />

						{/* Strona profilu (bez sprawdzania logowania) */}
						<Route path='/profil' element={<Profile />} />
					</Routes>
					<Footer />
				</div>
			</Router>
		</UserProvider>
	);
}

export default App;
