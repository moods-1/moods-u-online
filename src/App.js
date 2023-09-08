import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Auth, Cart, Home, Details, Layout, ErrorPage, Checkout } from './pages';
import EnrolledCourses from './pages/EnrolledCourses/EnrolledCourses';
import Courses from './pages/Courses/Courses';
import Contact from './pages/Contact/Contact';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/details/:id' element={<Details />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/checkout' element={<Checkout/>} />
					<Route path='/enrolled-courses' element={<EnrolledCourses />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/contact' element={<Contact/> } />
				</Route>
				<Route path='/auth' element={<Auth />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
