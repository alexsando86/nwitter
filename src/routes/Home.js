import Nweets from "components/Nweets";
import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
	const { getFirestore, collection, addDoc, onSnapshot } = dbService;

	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		onSnapshot(collection(getFirestore(), "nweet"), (snapshot) => {
			const newArray = snapshot.docs.map((document) => ({
				id: document.id,
				...document.data(),
			}));
			setNweets(newArray);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await addDoc(collection(getFirestore(), "nweet"), {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setNweet("");
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNweet(value);
	};
	return (
		<>
			<form onSubmit={onSubmit}>
				<input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweets key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</>
	);
};

export default Home;
