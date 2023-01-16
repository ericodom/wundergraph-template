import * as React from 'react';
import { PostByIdResponse } from '../../generated/models';
import { delay } from '../../utils/delay';
import { createClient } from '../../generated/client';
import { cookies } from 'next/headers';
import { convertNextCookieToString } from '../../utils/convertNextCookieToString';

export default async function TestServerComponent() {
	let postResults: PostByIdResponse;

	try {
		const client = createClient({
			extraHeaders: {
				cookie: convertNextCookieToString(cookies()),
			},
		});

		// fetch the user to get specific user data, like customer id, roles, etc, for the query
		const user = await client.fetchUser();

		// ** OPTION #1: use the client.query method **
		// postResults = await client.query({
		// 	operationName: 'PostById',
		// 	input: {
		// 		postId: 2,
		// 	},
		// });

		// ** OPTION #2: use the web fetch method **
		const fetchPost = await fetch(
			`http://localhost:9991/app/main/operations/PostById?postId=2`,
		);

		if (!fetchPost.ok) throw new Error(fetchPost.statusText);
		postResults = await fetchPost.json();
	} catch (err) {
		console.log(`that's an error: `, err);
	}

	return (
		<div className="relative flex flex-col items-center p-8 sm:p-12">
			<div className="w-full max-w-xl px-20 rounded-2xl bg-blue-50 py-14">
				<div className="flex flex-col items-center max-w-sm mx-auto">
					<p className="mt-3 mb-8 text-center text-black/80">
						This is the result of your{' '}
						<code className="font-mono font-bold text-amber-500">
							AccountById
						</code>{' '}
						operation.
					</p>
					<p className="flex justify-center pt-4">
						Post:
						<span className="pl-1 text-amber-500">
							{postResults?.data?.post?.title}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
