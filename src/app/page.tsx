import * as React from 'react';
import { AccountByEmailResponse, GetPostsResponse } from '../generated/models';
import { cookies } from 'next/headers';
import { createClientFromCookies } from '../utils/createClientFromCookies';
import { PostTable } from '../components/PostTable';

export default async function Page() {
	let accountResults: AccountByEmailResponse;
	let postsResponse: GetPostsResponse;
	let user;

	try {
		if (!cookies().getAll()) throw new Error('no cookies found');
		//if (!cookies().get('user')) throw new Error('Not logged in');

		if (cookies().get('user')) {
			const client = createClientFromCookies(cookies().getAll());

			// fetch the user to get specific user data, like customer id, roles, etc, for the query
			user = await client.fetchUser();

			// ** FETCH OPTION #1: use the client.query method **
			postsResponse = await client.query({
				operationName: 'GetPosts',
			});

			// ** FETCH OPTION #2: use the web fetch method **
			const fetchAccount = await fetch(
				`http://localhost:9991/app/main/operations/AccountByEmail?email=${user.email}`,
			);

			if (!fetchAccount.ok) throw new Error(fetchAccount.statusText);
			accountResults = await fetchAccount.json();
		}
	} catch (err) {
		console.log(`that's an error: `, err);
		throw new Error(err);
	}

	return (
		<main>
			<div className="relative flex flex-col items-center pt-8 pb-4 ">
				<div className="w-full max-w-xl px-4 rounded-2xl bg-blue-50 py-14">
					{user && postsResponse?.data ? (
						<PostTable postResponse={postsResponse?.data.post} />
					) : (
						<p className="flex flex-col items-center">
							<span className="pl-1 font-mono font-bold text-amber-500">
								Not logged in
							</span>
						</p>
					)}
				</div>
			</div>
		</main>
	);
}
