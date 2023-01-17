// Code generated by wunderctl. DO NOT EDIT.

export interface AccountByEmailInput {
	email: string;
}

export interface AccountByIdInput {
	accountId?: number;
}

export interface CreateAccountInput {
	email: string;
	firstName: string;
	lastName: string;
	roles: string;
}

export interface PostByIdInput {
	postId?: number;
}

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface GraphQLError {
	message: string;
	path?: ReadonlyArray<string | number>;
}

export interface InternalAccountByEmailInput {
	email: string;
}

export interface InternalAccountByIdInput {
	accountId?: number;
}

export interface InternalCreateAccountInput {
	email: string;
	firstName: string;
	lastName: string;
	roles: string;
}

export interface InternalPostByIdInput {
	postId?: number;
}

export interface InjectedAccountByEmailInput {
	email: string;
}

export interface InjectedAccountByIdInput {
	accountId?: number;
}

export interface InjectedCreateAccountInput {
	email: string;
	firstName: string;
	lastName: string;
	roles: string;
}

export interface InjectedPostByIdInput {
	postId?: number;
}

export interface AccountByEmailResponse {
	data?: AccountByEmailResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AccountByIdResponse {
	data?: AccountByIdResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface CreateAccountResponse {
	data?: CreateAccountResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface GetPostsResponse {
	data?: GetPostsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface PostByIdResponse {
	data?: PostByIdResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface DragonsResponse {
	data?: DragonsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AccountByEmailResponseData {
	account?: {
		id: number;
		first_name?: string;
		last_name?: string;
		email: string;
		roles?: string;
	};
}

export interface AccountByIdResponseData {
	account?: {
		id: number;
		first_name?: string;
		last_name?: string;
		email: string;
		roles?: string;
	};
}

export interface CreateAccountResponseData {
	db_createOneAccount?: {
		id: number;
	};
}

export interface GetPostsResponseData {
	post: {
		id: number;
		title: string;
		content?: string;
	}[];
}

export interface PostByIdResponseData {
	post?: {
		id: number;
		title: string;
		content?: string;
	};
}

export interface DragonsResponseData {
	spacex_dragons?: {
		name?: string;
		active?: boolean;
	}[];
}
