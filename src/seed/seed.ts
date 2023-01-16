import { createClient } from '../components/generated/client';
import fetch from 'node-fetch';

const seed = async () => {
	const client = createClient({
		customFetch: fetch as any,
	});

	const user = await client.query({
		operationName: 'AccountByEmail',
		input: {
			email: 'eric@homecareintel.com',
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
			firstName: 'Eric',
			lastName: 'Odom',
			email: 'eric@homecareintel.com',
			roles: 'admin,user',
		},
	});
	console.log('seed:out', JSON.stringify(out));
};

seed();
