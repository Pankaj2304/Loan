using LoanManagement.Models;
using LoanManagementDataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.DAL.IRepositories
{
    public interface IUserRepository
    {
        Task UserRegister(UserInformation model);
        Task<long> AddUpdateUser(UserInformation model);
        Task<bool> IsEmailExists(string email);
        Task<bool> DeleteUser(long UserId,long deletedBy);
        Task<UserModel> GetUserById(long UserId);
        Task<List<UserModel>> GetUserList(long take,long skip,string searchText);
        Task<UserInformation> UserLogin(LoginModel model);
        Task<bool> ChangePassword(PasswordModel model);
    }
}
