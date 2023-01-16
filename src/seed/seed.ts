import { createClient } from '../components/generated/client';
import fetch from 'node-fetch';

const seed = async () => {
	const client = createClient({
		customFetch: fetch as any,
	});

	// ** UPDATE THIS EMAIL TO YOUR OWN **
	const adminEmail = 'ericodom37@gmail.com';

	const user = await client.query({
		operationName: 'AccountByEmail',
		input: {
			email: adminEmail,
		},
	});

	// first check if the user exists
	if (user?.data.account?.id) {
		return;
	}

	// if not, create the user
	const out = await client.mutate({
		operationName: 'CreateAccount',
		input: {
			firstName: 'Admin',
			lastName: 'User',
			email: adminEmail,
			roles: 'admin,user',
		},
	});
	console.log('seed:out', JSON.stringify(out));
};

seed();
