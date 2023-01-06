import React, {
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { LockClosedIcon } from '@heroicons/react/24/outline';

import { useRegisterMutation } from '../features/auth/authApiSlice';

interface RegistrationForm {
	name: {
		value: string;
		error: string | null;
	};
	email: {
		value: string;
		error: string | null;
	};
	password: {
		value: string;
		error: string | null;
	};
	confirmPassword: {
		value: string;
		error: string | null;
	};
	error: Array<string>;
}

const initialState: RegistrationForm = {
	name: {
		value: "",
		error: null,
	},
	email: {
		value: "",
		error: null,
	},
	password: {
		value: "",
		error: null,
	},
	confirmPassword: {
		value: "",
		error: null,
	},
	error: [],
};

const Register: React.FC = ({}) => {
	const [registrationData, setRegistrationData] = useState<RegistrationForm>(initialState);
	const errorMsgRef = useRef<React.LegacyRef<HTMLSpanElement> | undefined>();

	const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationData({
			...registrationData,
			name: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationData({
			...registrationData,
			email: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationData({
			...registrationData,
			password: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationData({
			...registrationData,
			confirmPassword: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const validateData = (form: RegistrationForm) => {
		const { name, email, password, confirmPassword } = form;
		if (name.value === "") {
			name.error = "Name is required";
			return false;
		}
		if (email.value === "") {
			email.error = "Email is required";
			return false;
		}
		if (password.value === "") {
			password.error = "Password is required";
			return false;
		}
		if (confirmPassword.value === "") {
			confirmPassword.error = "Confirm Password is required";
			return false;
		}
		if (password.value !== confirmPassword.value) {
			confirmPassword.error = "Confirm Password does not match";
			return false;
		}
		return true;
	};

	const navigate = useNavigate();

	const [registerUser] = useRegisterMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (validateData(registrationData)) {
				const { name, email, password } = registrationData;
				const response = await registerUser({ email: email.value, name: name.value, password: password.value });
				
				if (Object.keys(response).includes("error")){
					console.log((response as any).error);
				}
			}
			setRegistrationData(initialState);
			navigate("/");
		} catch (error: any) {
			if (!error?.response) {
				setRegistrationData({
					...initialState,
					error: ["No Server Response"],
				});
			} else if (error.response?.status === 400) {
				setRegistrationData({
					...initialState,
					error: ["Invalid inputs"],
				});
			} else {
				setRegistrationData({
					...initialState,
					error: ["Failed to register user"],
				});
			}
		}
	};

	return (
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
						<h2 className="mt-6 text-center text-xl tracking-tight text-gray-900">Sign Up an account</h2>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							{
								<>
									{registrationData.error.length !== 0 &&
										registrationData.error.map((i, err) => {
											<span key={i} className={`${err ? "relative block text-red-500" : "hidden"} text-md mb-3 mx-2`}>
												{err}
											</span>;
										})}
								</>
							}
							<div>
								<label htmlFor="email-address" className="sr-only">
									Ful Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									onChange={handleNameInput}
									className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
									placeholder="Full Name"
								/>
								{registrationData.name.error !== null && <span>{registrationData.name.error}</span>}
							</div>
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
								{registrationData.name.error !== null && <span>{registrationData.name.error}</span>}
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
									className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
									placeholder="Password"
								/>
								{registrationData.name.error !== null && <span>{registrationData.name.error}</span>}
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Confirm Password
								</label>
								<input
									id="password_confirmation"
									name="password_confirmation"
									type="password"
									autoComplete="current-password"
									required
									onChange={handleConfirmPasswordInput}
									className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Confirm Password"
								/>
								{registrationData.name.error !== null && <span>{registrationData.name.error}</span>}
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
								Sign up
							</button>
						</div>
						<div className=" text-center">
							<Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/login">
								Already registered? Sign in
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
