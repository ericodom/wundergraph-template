import Link from 'next/link';

export default function Page() {
	return (
		<div className="relative flex flex-col items-center p-8 sm:p-12">
			<code className="pb-4 font-mono text-sky-500 dark:text-sky-400">
				<Link className="text-amber-500 hover:text-amber-700" href="/">
					{`< Back to Home`}
				</Link>
			</code>
			<div className="w-full max-w-xl px-20 rounded-2xl bg-blue-50 py-14">
				<div className="flex flex-col items-center max-w-sm mx-auto">
					<p className="mt-3 text-center text-black/80">
						<code className="font-mono font-medium text-sky-500 dark:text-sky-400">
							<Link
								className="text-amber-500 hover:text-amber-700"
								href="/posts"
							>
								Save Post
							</Link>
						</code>
					</p>
				</div>
			</div>
		</div>
	);
}
