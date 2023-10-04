import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import {
	Auth,
	Cart,
	Home,
	Details,
	Layout,
	ErrorPage,
	Checkout,
	Success,
	Orders,
} from './pages';
import EnrolledCourses from './pages/EnrolledCourses/EnrolledCourses';
import Courses from './pages/Courses/Courses';
import Contact from './pages/Contact/Contact';
import PaymentUpdateFailure from './pages/Checkout/PaymentUpdateFailure';
// import { Mixpanel } from './components/Mixpanel';

function App() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Mixpanel.track('Moods-U Online app accessed.', {
	// 	action: 'Moods-U Online app accessed.',
	// });

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/details/:id' element={<Details />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/enrolled-courses' element={<EnrolledCourses />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/success' element={<Success />} />
					<Route path='/failure' element={<PaymentUpdateFailure />} />
				</Route>
				<Route path='/auth' element={<Auth />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
