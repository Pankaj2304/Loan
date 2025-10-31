using LoanManagement.DAL.IRepositories;
using LoanManagement.DAL.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace LoanManagement.IOC
{
    public class DependencyContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IErrorLogs, ErrorLogs>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}