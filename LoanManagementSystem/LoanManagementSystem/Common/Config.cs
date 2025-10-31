namespace LoanManagementSystem.Common
{
    public static class Config
    {
        public static string AppSettings(string key)
        {
            var valaue = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")[key];
            return valaue;
        }
    }
}
