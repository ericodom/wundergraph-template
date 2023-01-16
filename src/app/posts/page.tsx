import * as React from 'react';
import { PostByIdResponse } from '../../components/generated/models';
import { delay } from '../../utils/delay';
import { createClient } from '../../components/generated/client';
import { cookies } from 'next/headers';

export default async function TestServerComponent() {
	let postResults: PostByIdResponse;
	let res;

	const nextCookies = cookies();

	// convert Next.js cookie arrary back to a cookie header string
	const userCookies = nextCookies
		.getAll()
		.map(cookie => `${cookie.name}=${cookie.value};`)
		.join(' ');

	try {
		const client = createClient({
			extraHeaders: {
				cookie: userCookies,
			},
		});

		const user = await client.fetchUser();

		// simulate a delay for the loading component to show
		await delay(2000);

		postResults = await client.query({
			operationName: 'PostById',
			input: {
				postId: 2,
			},
		});
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
