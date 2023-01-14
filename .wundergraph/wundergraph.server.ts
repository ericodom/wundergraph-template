import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import type { HooksConfig } from './generated/wundergraph.hooks';
import type { InternalClient } from './generated/wundergraph.internal.client';

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
	hooks: {
		authentication: {
			mutatingPostAuthentication: async ({ user }) => {
				return {
					user: {
						...user,
						roles: ['admin'],
					},
					status: 'ok',
				};
			},
		},
		queries: {},
		mutations: {},
	},
	graphqlServers: [],
}));
