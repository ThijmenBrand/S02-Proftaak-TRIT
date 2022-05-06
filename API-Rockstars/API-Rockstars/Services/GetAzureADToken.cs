namespace API_Rockstars.Services
{
    public class GetAzureADToken
    {
        static HttpClient _httpClient = new HttpClient();

        static async Task<string> RequestApiToken()
        {
            var appSettings = System.Configuration.ConfigurationManager.AppSettings;
            

            HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"https://login.microsoftonline.com/{appSettings["tenant"]}/oauth2/v2.0/token", { "test": test, });

        }
    }
}
