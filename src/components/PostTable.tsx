import Link from 'next/link';

export const PostTable = postData => {
	const posts = postData?.postResponse;

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Posts</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the posts in the database.
					</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<Link href="/add">
						<button
							type="button"
							className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
						>
							Add post
						</button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
										>
											ID
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Title
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Content
										</th>
										<th
											scope="col"
											className="relative py-3.5 pl-3 pr-4 sm:pr-6"
										>
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{posts?.map(post => (
										<tr key={post.id}>
											<td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
												{post.id}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{post.title}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{post.content}
											</td>
											<td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
												<a
													href="#"
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit<span className="sr-only">, {post.id}</span>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
