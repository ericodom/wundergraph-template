import Link from 'next/link';

export default async function TestServerComponent() {
	return (
		<code className="pt-8 font-mono text-xl text-sky-500 dark:text-sky-400">
			<Link className="text-amber-500 hover:text-amber-700" href="/posts/add">
				Add Post
			</Link>
		</code>
	);
}
