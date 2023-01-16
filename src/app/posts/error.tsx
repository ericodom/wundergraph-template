'use client';

import Link from 'next/link';

export default function Error({ error }): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center pt-16">
			<p className="text-2xl font-bold text-white">
				{error ? error.message : `That's an error 😞`}
			</p>
			<p className="pt-2 text-sm text-white">
				Back to{' '}
				<Link className="text-amber-500" href="/">
					home
				</Link>{' '}
			</p>
		</div>
	);
}
