import axios from "axios";
import { msalConfig } from "@/config/authConfig";

export default async function getToken() {
  const { data } = await axios.post(
    `https://login.microsoftonline.com/${msalConfig.auth.tenantId}/oauth2/v2.0/token`,
    {
      client_id: msalConfig.auth.clientId,
      scope: msalConfig.auth.appIdURI,
      client_secret: msalConfig.auth.clientSecret,
      grant_type: "client_credentials",
    }
  );

  return data;
}
