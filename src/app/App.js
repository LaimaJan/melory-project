import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { FormProvider } from './context/AuthContext';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

function App() {
	return (
		// <FormProvider>
		<BrowserRouter>
			<Routes>
				{/* <Route path="/" element={<Home />} /> */}
				<Route path="/users/signup" element={<SignUp />} />
				<Route path="/users/signin" element={<SignIn />} />

				<Route path="*" element={<p>Theres's no page, go back!</p>} />
			</Routes>
		</BrowserRouter>
		// </FormProvider>
	);
}

export default App;
