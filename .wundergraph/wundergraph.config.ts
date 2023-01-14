import {
	authProviders,
	configureWunderGraphApplication,
	cors,
	EnvironmentVariable,
	introspect,
	templates,
} from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

// Add GraphQL APIs to API
const spaceX = introspect.graphql({
	apiNamespace: 'spacex',
	url: 'https://spacex-api.fly.dev/graphql/',
});

// Add PostgreSQL databases to API
const db = introspect.postgresql({
	apiNamespace: 'db',
	databaseURL:
		'postgresql://hci_user:N0v299pe!@hci-v6-sandbox.cvwcpfnur8ep.us-east-1.rds.amazonaws.com/hci-next',
});

// Add PostgreSQL admin databases to API
const admin = introspect.postgresql({
	apiNamespace: 'admin',
	databaseURL:
		'postgresql://hci_user:N0v299pe!@hci-v6-sandbox.cvwcpfnur8ep.us-east-1.rds.amazonaws.com/hci-admin',
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [spaceX, admin, db],
	server,
	operations,
	codeGenerators: [
		{
			templates: [...templates.typescript.all],
		},
		{
			templates: [new NextJsTemplate()],
			path: '../src/components/generated',
		},
	],
	cors: {
		...cors.allowAll,
		allowedOrigins:
			process.env.NODE_ENV === 'production'
				? ['http://localhost:3000']
				: ['http://localhost:3000'],
	},
	authentication: {
		cookieBased: {
			providers: [authProviders.demo()],
			authorizedRedirectUris: ['http://localhost:3000'],
			secureCookieHashKey: new EnvironmentVariable(
				'WUNDERGRAPH_SECURE_COOKIE_HASH_KEY',
			), // must be of length 32
			secureCookieBlockKey: new EnvironmentVariable(
				'WUNDERGRAPH_SECURE_COOKIE_BLOCK_KEY',
			), // must be of length 32
			csrfTokenSecret: new EnvironmentVariable('WUNDERGRAPH_CSRF_TOKEN_SECRET'), // must be of length 11
		},
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
	},
});
