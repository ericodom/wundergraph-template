import * as React from 'react';
import { cookies } from 'next/headers';
import { createClientFromCookies } from '../../utils/createClientFromCookies';
import { NotLoggedIn } from '../../components/NotLoggedIn';
import AddPostForm from '../../components/AddForm';

export default async function Page() {
	let user;
	let client;
	let nextCookies: Array<{ name: string; value: string }>;

	try {
		if (!cookies().getAll()) throw new Error('no cookies found');
		if (cookies().get('user')) {
			nextCookies = cookies().getAll();
			client = createClientFromCookies(cookies().getAll());
			user = await client.fetchUser();
		}
	} catch (err) {
		console.log(`that's an error: `, err);
		throw new Error(err);
	}

	return (
		<main>
			<div className="relative flex flex-col items-center pt-4 pb-4 ">
				<div className="w-full max-w-xl px-4 rounded-2xl bg-blue-50 py-14">
					{user && nextCookies ? <AddPostForm /> : <NotLoggedIn />}
				</div>
			</div>
		</main>
	);
}
