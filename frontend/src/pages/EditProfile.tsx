import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useUpdateProfileMutation } from '../features/profile/profileApiSlice';
import { selectProfile } from '../features/profile/profileSlice';

interface ProfileForm {
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

const initialState: ProfileForm = {
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

const EditProfile: React.FC = () => {
	const navigate = useNavigate();
	const [profileData, setProfileData] = useState<ProfileForm>(initialState);
	const [updateProfile] = useUpdateProfileMutation();
	// const dispatch = useAppDispatch();
	const profile = useSelector(selectProfile);
	const [id, setId] = useState("");

	useEffect(() => {
		let cancel = false;
		if (!cancel && profile) {
			setProfileData({
				...profileData,
				email: {
					value: profile.email,
					error: profileData.email.error,
				},
				name: {
					value: profile.name,
					error: profileData.name.error,
				},
			});
			setId(profile.id);
		}

		return () => {
			cancel = true;
		};
	}, [profile, setProfileData, setId]);

	const errorMsgRef = useRef<React.LegacyRef<HTMLSpanElement> | undefined>();

	const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileData({
			...profileData,
			name: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileData({
			...profileData,
			email: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileData({
			...profileData,
			password: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileData({
			...profileData,
			confirmPassword: {
				value: e.target.value,
				error: null,
			},
		});
	};

	const validateData = (form: ProfileForm) => {
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (validateData(profileData)) {
				const { name, email, password } = profileData;
				const response = await updateProfile({ id: id, email: email.value, name: name.value, password: password.value });

				if (Object.keys(response).includes("error")) {
					console.log((response as any).error);
				}
			}
			setProfileData(initialState);

			navigate("/profile");
		} catch (error: any) {
			if (!error?.response) {
				setProfileData({
					...initialState,
					error: ["No Server Response"],
				});
			} else if (error.response?.status === 400) {
				setProfileData({
					...initialState,
					error: ["Invalid inputs"],
				});
			} else {
				setProfileData({
					...initialState,
					error: ["Failed to register user"],
				});
			}
		}
	};

	return (
		<div className="mx-auto max-w-7xl bg-white">
			<div className="lg:w-1/2 md:1/3 w-full mr-auto">
				<form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-xl font-medium leading-6 text-gray-900">Edit Profile</h3>
					</div>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="px-4 -space-y-px rounded-md shadow-sm">
						{
							<>
								{profileData.error.length !== 0 &&
									profileData.error.map((i, err) => {
										<span key={i} className={`${err ? "relative block text-red-500" : "hidden"} text-md mb-3 mx-2`}>
											{err}
										</span>;
									})}
							</>
						}
						<div>
							<label htmlFor="email-address" className="sr-only">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								required
								value={profileData.name.value}
								onChange={handleNameInput}
								className="relative block w-full md:w-[40em] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
								placeholder="Full Name"
							/>
							{profileData.name.error !== null && <span>{profileData.name.error}</span>}
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
								value={profileData.email.value}
								onChange={handleEmailInput}
								className="relative block w-full md:w-[40em] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
								placeholder="Email address"
							/>
							{profileData.name.error !== null && <span>{profileData.name.error}</span>}
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
								className="relative block w-full md:w-[40em] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
								placeholder="Password"
							/>
							{profileData.name.error !== null && <span>{profileData.name.error}</span>}
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
								className="relative block w-full md:w-[40em] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="Confirm Password"
							/>
							{profileData.name.error !== null && <span>{profileData.name.error}</span>}
						</div>
					</div>

					<div className="px-4">
						<button
							type="submit"
							className="group relative flex w-full md:w-[40em] justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
