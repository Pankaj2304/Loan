using LoanManagement.Models;
using LoanManagementDataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.DAL.IRepositories
{
    public interface IAdminRepository
    {
        Task addAdmin(AdminModel model);
        Task<bool> IsEmailExists(string email);
        Task<Admin> AdminLogin(LoginModel objModel);
        Task<bool> ChangePassword(PasswordModel model);
        Task<bool> DeleteUser(long UserId);
        Task<List<AdminModel>> GetAdminUserList(long take, long skip, string searchText);
    }
}
