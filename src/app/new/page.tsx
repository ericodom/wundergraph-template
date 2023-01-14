import * as React from 'react';
import { AccountByIdResponse } from '../../components/generated/models';
import { delay } from '../../utils/delay';

export default async function New() {
	let data;
	let res;

	// ** New version of WG will soon allow functions to be called directly from the client, instead of just web fetch
	try {
		// simulate a delay
		await delay(2000);

		res = await fetch(
			`http://localhost:9991/app/main/operations/AccountById?accountId=1`,
		);

		if (!res.ok) throw new Error(res.statusText);
		let json = await res.json();

		data = json.data as AccountByIdResponse;
	} catch (err) {
		console.log(err);
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
						Account:
						{data?.account?.email}
					</p>
				</div>
			</div>
		</div>
	);
}
