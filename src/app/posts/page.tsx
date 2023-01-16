import * as React from 'react';
import {
	AccountByEmailResponse,
	PostByIdResponse,
} from '../../generated/models';
import { createClient } from '../../generated/client';
import { cookies } from 'next/headers';
import { convertNextCookieToString } from '../../utils/convertNextCookieToString';
import Link from 'next/link';

export default async function TestServerComponent() {
	let postResults: PostByIdResponse;
	let accountResults: AccountByEmailResponse;
	let user;

	try {
		if (!cookies().getAll()) throw new Error('no cookies found');
		//if (!cookies().get('user')) throw new Error('Not logged in');

		if (cookies().get('user')) {
			const client = createClient({
				extraHeaders: {
					cookie: convertNextCookieToString(cookies().getAll()),
				},
			});

			// fetch the user to get specific user data, like customer id, roles, etc, for the query
			user = await client.fetchUser();

			// ** FETCH OPTION #1: use the client.query method **
			postResults = await client.query({
				operationName: 'PostById',
				input: {
					postId: 2,
				},
			});

			// ** FETCH OPTION #2: use the web fetch method **
			const fetchAccount = await fetch(
				`http://localhost:9991/app/main/operations/AccountByEmail?email=${user.email}`,
			);

			if (!fetchAccount.ok) throw new Error(fetchAccount.statusText);
			accountResults = await fetchAccount.json();

			console.log('accountResults: ', accountResults);
		}
	} catch (err) {
		console.log(`that's an error: `, err);
		throw new Error(err);
	}

	return (
		<div className="relative flex flex-col items-center p-8 sm:p-12">
			<div className="w-full max-w-xl px-20 rounded-2xl bg-blue-50 py-14">
				{user ? (
					<div className="flex flex-col items-center max-w-sm mx-auto">
						<p className="mt-3 text-center text-black/80">
							This is the result of{' '}
							<code className="font-mono font-bold text-amber-500">
								AccountByEmail:
							</code>{' '}
						</p>

						<p className="flex justify-center pt-1">
							Account:{' '}
							<span className="pl-1 text-amber-500">
								{`${accountResults?.data?.account?.first_name} ${accountResults?.data?.account?.last_name} `}
							</span>
						</p>

						<p className="mt-12 text-center text-black/80">
							This is the result of{' '}
							<code className="font-mono font-bold text-amber-500">
								PostById:
							</code>
						</p>

						<p className="flex justify-center pt-1">
							Post:
							<span className="pl-1 text-amber-500">
								{postResults?.data?.post?.title}
							</span>
						</p>
					</div>
				) : (
					<p className="flex flex-col items-center">
						<span className="pl-1 font-mono font-bold text-amber-500">
							Not logged in
						</span>
						<span className="pt-2">
							<Link className="text-blue-500" href="/">
								back to home
							</Link>
						</span>
					</p>
				)}
			</div>
		</div>
	);
}
