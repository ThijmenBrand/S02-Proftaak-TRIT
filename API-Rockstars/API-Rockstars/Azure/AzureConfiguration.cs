using Azure.Identity;
using Microsoft.Graph;

namespace API_Rockstars.Azure;

public class AzureConfiguration
{
    private readonly IConfiguration _configuration;
    private string clientId;
    private string tenantId;
    private string clientSecret;
    public GraphServiceClient GraphApi { get; set; }

    public AzureConfiguration(IConfiguration configuration)
    {
        _configuration = configuration;
        clientId = _configuration.GetValue<string>("ClientId");
        tenantId = _configuration.GetValue<string>("TenantId");
        clientSecret = _configuration.GetValue<string>("ClientSecret");

        var clientSecrectCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);

        GraphApi = new GraphServiceClient(clientSecrectCredential);
    }
}