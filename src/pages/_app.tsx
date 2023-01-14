import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main className="flex dark:bg-slate-800 min-h-screen justify-center">
				<Component {...pageProps} />
			</main>
		</>
	);
}

export default MyApp;
