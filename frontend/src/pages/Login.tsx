import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { LockClosedIcon } from '@heroicons/react/20/solid';

import { useAppDispatch } from '../app/store';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';

const Login: React.FC = ({}) => {
	const userRef = useRef(null);
	const errRef = useRef(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useAppDispatch();

	// useEffect(()=> {
	// userRef.current.focus()
	// }, [])

	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const data = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...data, user: email }));
			setEmail("");
			setPassword("");
			navigate("/");
		} catch (error: any) {
			if (!error?.response) {
				setErrorMsg("No Server Response");
			} else if (error.response?.status === 400) {
				setErrorMsg("Missing username or password");
			} else if (error.response?.status === 401) {
				setErrorMsg("Unauthorized");
			} else {
				setErrorMsg("Login Failed");
			}
			// errRef.current.focus()
		}
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
						<h1 className="mt-6 text-center text-4xl font-bold">Fun Olympic</h1>
						<h2 className="mt-6 text-center text-xl tracking-tight text-gray-900">Sign in to your account</h2>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<span className={`${errorMsg ? "relative block text-red-500" : "hidden"} text-md mb-3 mx-2`}>{errorMsg}</span>
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									onChange={handleEmailInput}
									className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									onChange={handlePasswordInput}
									className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
									Forgot your password?
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
								</span>
								Sign in
							</button>
						</div>
						<div className=" text-center">
							<Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/register">
								Not registered? Sign up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
