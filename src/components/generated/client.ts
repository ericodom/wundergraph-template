import {
	Client,
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
} from "@wundergraph/sdk/client";
import type {
	AdminAccountByIdResponse,
	AdminAccountByIdInput,
	AdminAccountByIdResponseData,
	AccountByIdResponse,
	AccountByIdInput,
	AccountByIdResponseData,
	ConsumerByIdResponse,
	ConsumerByIdInput,
	ConsumerByIdResponseData,
	ConsumersResponse,
	ConsumersResponseData,
	DragonsResponse,
	DragonsResponseData,
} from "./models";

export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export type UploadConfig = UploadRequestOptions<never>;

export enum AuthProviderId {
	"github" = "github",
	"auth0" = "auth0",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export const defaultClientConfig: ClientConfig = {
	applicationHash: "12be97ec",
	baseURL: "http://localhost:9991",
	sdkVersion: "0.130.2",
};

export const operationMetadata: OperationMetadata = {
	AdminAccountById: {
		requiresAuthentication: false,
	},
	AccountById: {
		requiresAuthentication: false,
	},
	ConsumerById: {
		requiresAuthentication: false,
	},
	Consumers: {
		requiresAuthentication: false,
	},
	Dragons: {
		requiresAuthentication: false,
	},
};

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Data extends Operations["queries"][OperationName]["data"] = Operations["queries"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Data>(options);
	}
	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Data extends Operations["mutations"][OperationName]["data"] = Operations["mutations"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Data>(options);
	}
	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Data extends Operations["subscriptions"][OperationName]["data"] = Operations["subscriptions"][OperationName]["data"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb: SubscriptionEventHandler<Data>
	) {
		return super.subscribe(options, cb);
	}
	public async uploadFiles(config: UploadConfig) {
		return super.uploadFiles(config);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends User = User<UserRole>>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
	});
};

export type Queries = {
	AdminAccountById: {
		input: AdminAccountByIdInput;
		data: AdminAccountByIdResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	AccountById: {
		input: AccountByIdInput;
		data: AccountByIdResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	ConsumerById: {
		input: ConsumerByIdInput;
		data: ConsumerByIdResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	Consumers: {
		input?: undefined;
		data: ConsumersResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
};

export type Mutations = {};

export type Subscriptions = {};

export type LiveQueries = {
	AdminAccountById: {
		input: AdminAccountByIdInput;
		data: AdminAccountByIdResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	AccountById: {
		input: AccountByIdInput;
		data: AccountByIdResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	ConsumerById: {
		input: ConsumerByIdInput;
		data: ConsumerByIdResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	Consumers: {
		input?: undefined;
		data: ConsumersResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export interface Operations
	extends OperationsDefinition<Queries, Mutations, Subscriptions, UserRole, keyof typeof AuthProviderId> {}
