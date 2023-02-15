import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/AuthContext';
import { MemoryProvider } from './context/CreateMemoryContext';

import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import MyPage from './pages/MyPage/MyPage';
import CreateMemory from './pages/CreateMemory/CreateMemory';
import SingleMemory from './pages/SingleMemory/SingleMemory';
import EditMemory from './pages/EditMemory/EditMemory';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<FormProvider>
			<MemoryProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/users/signup" element={<SignUp />} />
						<Route path="/users/signin" element={<SignIn />} />
						<Route element={<PrivateRoute />}>
							<Route path="/users/MyPage" element={<MyPage />} />
						</Route>
						<Route path="/users/CreateMemory" element={<CreateMemory />} />
						<Route path="/users/SingleMemory/:id" element={<SingleMemory />} />
						<Route path="/users/EditMemory/:id" element={<EditMemory />} />

						<Route path="*" element={<p>Theres's no page, go back!</p>} />
					</Routes>
				</BrowserRouter>
			</MemoryProvider>
		</FormProvider>
	);
}

export default App;
