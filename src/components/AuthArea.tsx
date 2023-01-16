'use client';

import { useAuth, useUser } from '../generated/nextjs';

export const AuthArea = () => {
	const { login, logout } = useAuth();
	const user = useUser();

	console.log('user: ', user);

	return (
		<div className="flex flex-col self-center justify-center">
			<div className="flex justify-center gap-2 mt-4">
				{!user?.data ? (
					<button
						onClick={() => login('auth0')}
						className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
					>
						Login
					</button>
				) : null}
				{user?.data ? (
					<button
						onClick={() => logout({ logoutOpenidConnectProvider: true })}
						className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
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
