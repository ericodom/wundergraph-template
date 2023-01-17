'use client';

import { useAuth, useUser } from '../generated/nextjs';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const AuthArea = () => {
	const router = useRouter();
	const user = useUser();
	const { login, logout } = useAuth();
	const [, startTransition] = useTransition();

	const handleLogout = async () => {
		await logout({ logoutOpenidConnectProvider: true });
		startTransition(() => {
			// Refresh the current route and fetch new data from the server without
			// losing client-side browser or React state.
			router.push('/');
			router.refresh();
		});
	};

	return (
		<div className="flex flex-col self-center justify-center">
			<div className="flex justify-center gap-2 mt-4">
				{!user?.data ? (
					<button
						onClick={() => login('auth0', 'http://localhost:3000')}
						className="flex items-center justify-center w-full px-6 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
					>
						{user.isValidating ? 'Loading...' : 'Login'}
					</button>
				) : null}
				{user?.data ? (
					<button
						onClick={handleLogout}
						className="flex items-center justify-center w-full px-6 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
					>
						Logout
					</button>
				) : null}
			</div>
			<div className="max-w-3xl pt-8 text-center text-white">
				{JSON.stringify(user, null, 2)}
			</div>
		</div>
	);
};
