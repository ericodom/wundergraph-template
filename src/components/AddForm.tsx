'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from '../generated/nextjs';
import { useMutation, withWunderGraph } from '..//generated/nextjs';
import dayjs from 'dayjs';

type Inputs = {
	title: string;
	content: string;
};

function AddPostForm() {
	const user = useUser();
	const { data, error, trigger } = useMutation({
		operationName: 'CreatePost',
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const savePost: SubmitHandler<Inputs> = async event => {
		await trigger({
			title: event.title,
			content: event.content,
			authorId: +user?.data?.userId,
			updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		});
	};

	return (
		<form
			onSubmit={handleSubmit(savePost)}
			className="flex flex-col items-center gap-4 mx-auto"
		>
			<div className="w-[300px]">
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Title
				</label>
				<div className="mt-1">
					<input
						type="text"
						{...register('title')}
						className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
			</div>
			<div className="flex flex-col items-center mx-auto">
				<div className="w-[300px]">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Post Content
					</label>
					<div className="mt-1">
						<input
							type="text"
							{...register('content')}
							className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
			</div>
			<div className="mt-8 sm:mt-4 sm:flex-none">
				<code className="pb-4 pr-8 font-mono text-sky-500 dark:text-sky-400">
					<Link className="text-amber-500 hover:text-amber-700" href="/">
						{`Cancel`}
					</Link>
				</code>

				<button
					type="submit"
					className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
				>
					Add post
				</button>
			</div>
		</form>
	);
}

export default withWunderGraph(AddPostForm);
