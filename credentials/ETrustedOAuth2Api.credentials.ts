import type { ICredentialType, INodeProperties, IAuthenticateGeneric, IHttpRequestHelper, ICredentialDataDecryptedObject } from 'n8n-workflow';

export class ETrustedOAuth2Api implements ICredentialType {
	name = 'eTrustedComOAuth2Api';
	//extends = ['oAuth2Api'];
	displayName = 'ETrusted.com OAuth2 API';

	documentationUrl = 'https://developers.etrusted.com/reference/authentication-2';

	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
		}
	];

		async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
			const { access_token } = (await this.helpers.httpRequest({
				method: 'POST',
			url: 'https://login.etrusted.com/oauth/token',
			body: new URLSearchParams({
				client_id: credentials.clientId.toString(),
				client_secret: credentials.clientSecret.toString(),
				audience: 'https://api.etrusted.com',
				grant_type: 'client_credentials',
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})) as { access_token: string };
		return { sessionToken: access_token };
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.sessionToken}}',
			},
		},
	};
}
