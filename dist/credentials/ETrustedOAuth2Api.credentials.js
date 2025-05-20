"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETrustedOAuth2Api = void 0;
class ETrustedOAuth2Api {
    constructor() {
        this.name = 'eTrustedComOAuth2Api';
        this.displayName = 'ETrusted.com OAuth2 API';
        this.documentationUrl = 'https://developers.etrusted.com/reference/authentication-2';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.sessionToken}}',
                },
            },
        };
    }
    async preAuthentication(credentials) {
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
        }));
        return { sessionToken: access_token };
    }
}
exports.ETrustedOAuth2Api = ETrustedOAuth2Api;
//# sourceMappingURL=ETrustedOAuth2Api.credentials.js.map