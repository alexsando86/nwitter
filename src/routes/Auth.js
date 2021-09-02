import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");
	const auth = getAuth();

	const toggleAccount = () => setNewAccount((prev) => !prev);

	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event;
		let provider;
		if (name === "google") {
			provider = new firebaseInstance.GoogleAuthProvider();
		} else if (name === "github") {
			provider = new firebaseInstance.GithubAuthProvider();
		}
		const data = await signInWithPopup(authService, provider);
		console.log(data);
	};

	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				//  create newAccount
				data = await createUserWithEmailAndPassword(authService, email, password);
			} else {
				// log in
				data = await signInWithEmailAndPassword(authService, email, password);
			}
			console.log(data);
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
				<input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
				<input type="submit" value={newAccount ? "Create Account" : "Log In"} />
			</form>
			<span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
			{error}
			<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
