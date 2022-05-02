import { PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import TokenCredentialAuthenticationProvider from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

export const msalConfig = {
  auth: {
    clientId: "d0b1fd93-02ac-44ce-94cc-6ed26b112ce1",
    tenantId: "05f5fe5a-578e-4926-abff-35a344a96729",
    appIdURI: "api://d0b1fd93-02ac-44ce-94cc-6ed26b112ce1",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "fbc1976a-d0f7-4542-8d10-f28d446009c4",
    redirectUri: process.env.VUE_APP_REDIRECT_URL,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Calendars.ReadWrite", "Calendars.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphApplicationEndpoint: "https://graph.microsoft.com/v1.0",
};

export const msalInstance = new PublicClientApplication(msalConfig);
