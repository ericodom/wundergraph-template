import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import type { HooksConfig } from './generated/wundergraph.hooks';
import type { InternalClient } from './generated/wundergraph.internal.client';
import { UserRole } from './generated/client';

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
	hooks: {
		authentication: {
			mutatingPostAuthentication: async ({ user, internalClient }) => {
				if (!user.email) {
					return {
						user: {
							...user,
						},
						roles: ['user'],
						status: 'ok',
					};
				}

				const adminUser = await internalClient.queries.AccountByEmail({
					input: { email: user.email },
				});

				const roles = (adminUser?.data?.account?.roles?.split(
					',',
				) as UserRole[]) || ['user'];

				return {
					user: {
						...user,
						userId: adminUser?.data?.account.id.toString(),
						roles: roles,
					},
					status: 'ok',
					redirect: true,
					redirectUrl: '/posts',
				};
			},
		},
		queries: {},
		mutations: {},
	},
	graphqlServers: [],
}));
