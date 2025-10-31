using LoanManagement.DAL.IRepositories;
using LoanManagement.DAL.Utility;
using LoanManagement.Models;
using LoanManagementDataContext.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.DAL.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private LoanManagementSystemContext _Context;
        public void Dispose()
        {
            _Context.Dispose();
        }
        public AdminRepository(LoanManagementSystemContext DataContext)
        {
            _Context = DataContext;
        }
        public async Task addAdmin(AdminModel model)
        {
            try
            {
                Admin objAmin = new Admin()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    CreatedBy = model.CreatedBy,
                    CreatedDate = DateTime.Now,
                    Email = model.Email,
                    Mobile = model.Mobile,
                    Password = model.Password,
                    PasswordToken = Guid.NewGuid().ToString(),
                    RoleId = model.RoleId,
                    Username = model.Email
                };

                if (objAmin.Password != null && objAmin.Password != "")
                {
                    objAmin.Password = Crypto.EncryptPassword(objAmin.Password, new Guid(objAmin.PasswordToken));
                }
                await _Context.AddAsync(objAmin);
                await _Context.SaveChangesAsync();
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        public async Task<Admin> AdminLogin(LoginModel objModel)
        {
            try
            {
                var adminData = _Context.Admins.FirstOrDefault(x => x.Email == objModel.Username);
                return adminData;
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        public async Task<bool> ChangePassword(PasswordModel model)
        {
            try
            {
                var data = _Context.Admins.FirstOrDefault(x => x.Id == model.Id);
                if (model.Password != null && model.Password != "")
                {
                    data.PasswordToken = Guid.NewGuid().ToString();
                    data.Password = Crypto.EncryptPassword(model.Password, new Guid(data.PasswordToken));
                }
                return true;
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        public async Task<bool> IsEmailExists(string email)
        {
            try
            {
                var adminData = _Context.Admins.FirstOrDefault(x => x.Email == email);
                if (adminData == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        public async Task<bool> DeleteUser(long UserId)
        {
            try
            {
                if (UserId > 0)
                {
                    var userInfo = await _Context.Admins.FirstOrDefaultAsync(x => x.Id == UserId);
                    _Context.Remove(userInfo);
                    _Context.SaveChanges();
                }

            }
            catch (Exception cc)
            {
                throw cc;
            }
            return true;
        }

        public async Task<List<AdminModel>> GetAdminUserList(long take, long skip, string searchText)
        {
            try
            {
                var userList = await(from userInfo in _Context.Admins
                                     select new AdminModel()
                                     {
                                       FirstName=userInfo.FirstName,
                                       LastName=userInfo.LastName,
                                       Mobile=userInfo.Mobile,
                                       Email=userInfo.Email,
                                       RoleId=userInfo.RoleId,
                                       CreatedBy=userInfo.CreatedBy,
                                     }).ToListAsync();
                return userList;
            }
            catch (Exception cc)
            {
                throw cc;
            }
            return null;
        }
    }
}
