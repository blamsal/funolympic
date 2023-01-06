import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Layout } from './components/Layout';
import { Navbar } from './components/Navbars';
import RequireAuth from './features/auth/RequireAuth';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Video from './pages/Video';

export function Fallback() {
	return <p>Performing initial data "load"</p>;
}

export const navigation = [{ name: "Home", href: "/", current: true }];

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
			<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
        
				<Route element={<RequireAuth />}>
					<Route element={<Navbar navigation={navigation} />}>
						<Route index element={<Home />} />
						<Route path="profile" element={<Profile />} />
						<Route path="profile/edit" element={<EditProfile />} />
						<Route path="stream/:id" element={<Video />} />
					</Route>
				</Route>
			</Route>
		</>,
	),
);

function App() {
//   console.log(process.env.REACT_APP_API_URL);

	return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export default App;
