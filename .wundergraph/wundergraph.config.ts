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
	databaseURL: new EnvironmentVariable('DATABASE_URL'),
});

// Add PostgreSQL admin databases to API
const admin = introspect.postgresql({
	apiNamespace: 'admin',
	databaseURL: new EnvironmentVariable('ADMIN_DATABASE_URL'),
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
			providers: [
				authProviders.demo(),
				authProviders.openIdConnect({
					id: 'auth0',
					issuer: 'https://dev-5rd72w18.us.auth0.com',
					clientId: 'un7RrEtPepJgHclcuiaGjCutFrMmcSgG',
					clientSecret:
						'G9hSLrXyxZnnWrszYf-Pj2PCoDYojyXjlfXmvb3I-tmJxT9eGWBuMvi7EIDBdzlN',
				}),
			],
			authorizedRedirectUris: ['http://localhost:3000'],
		},
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
	},
});
