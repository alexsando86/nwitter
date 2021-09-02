import React, { useState } from "react";
import { dbService } from "fbase";

const Nweets = ({ nweetObj, isOwner }) => {
	const { getFirestore, doc, deleteDoc, setDoc } = dbService;
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNeet] = useState(nweetObj.text);

	console.log(newNweet);
	const onDeleteClick = async () => {
		const ok = window.confirm("삭제 하시겠습니까?");
		console.log(ok);
		if (ok) {
			console.log(nweetObj.id);
			const data = await deleteDoc(doc(getFirestore(), `nweet/${nweetObj.id}`));
		}
	};

	const toggleEditing = () => {
		setEditing((prev) => !prev);
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewNeet(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log(nweetObj.id, newNweet);
		await setDoc(doc(getFirestore(), `nweet/${nweetObj.id}`), {
			text: newNweet,
		});
		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input value={newNweet} required onChange={onChange} />
						<input type="submit" value="Update Nweet" />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Nweet</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweets;
