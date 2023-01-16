'use client';

import Link from 'next/link';

export default function Error(): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center pt-16">
			<p className="text-2xl font-bold text-white">That's an error 😞</p>
			<p className="pt-2 text-sm text-white">
				Go back to{' '}
				<Link className="text-amber-500" href="/">
					home
				</Link>{' '}
				and try logging in...
			</p>
		</div>
	);
}
