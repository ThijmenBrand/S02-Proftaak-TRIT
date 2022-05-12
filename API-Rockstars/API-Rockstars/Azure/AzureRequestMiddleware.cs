using Microsoft.Identity.Client;
using Newtonsoft.Json.Linq;

namespace API_Rockstars.Azure
{
    public class AzureRequestMiddleware<T>
    {
        private static AuthenticationConfig config;

        private static IConfidentialClientApplication app;

        private static string[] scopes;

        private AuthenticationResult result = null;

        public AzureRequestMiddleware()
        {
            config = AuthenticationConfig.ReadFromJsonFile("appsettings.json");
            app = ConfidentialClientApplicationBuilder.Create(config.ClientId)
                                            .WithClientSecret(config.ClientSecret)
                                            .WithAuthority(new Uri(config.Authority))
                                            .Build();
            scopes = new string[] { $"{config.ApiUrl}.default" };

        }

        public async Task<List<T>> sendAzureRequest(string requestURL)
        {
            try
            {
                result = await app.AcquireTokenForClient(scopes)
                    .ExecuteAsync();
            }
            catch (MsalServiceException ex)
            {
                throw new Exception(ex.ToString());
            }

            if (result != null)
            {
                var httpClient = new HttpClient();
                var apiCaller = new ProtectedApiCallHelper(httpClient);
                var APIResult = await apiCaller.SendWebApiCall($"{config.ApiUrl}{requestURL}", result.AccessToken);
                System.Diagnostics.Debug.WriteLine(APIResult);
                JArray ResArray = (JArray)APIResult["value"];
                return ResArray.ToObject<IList<T>>().ToList();
            }
            return null;
        }
    }
}