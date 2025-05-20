import type { ICredentialType, INodeProperties, IAuthenticateGeneric, IHttpRequestHelper, ICredentialDataDecryptedObject } from 'n8n-workflow';
export declare class ETrustedOAuth2Api implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject): Promise<{
        sessionToken: string;
    }>;
    authenticate: IAuthenticateGeneric;
}
