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
    public class UserRepository : IUserRepository
    {
        private LoanManagementSystemContext _Context;

        public UserRepository(LoanManagementSystemContext DataContext)
        {
            _Context = DataContext;
        }
        public async Task<long> AddUpdateUser(UserInformation model)
        {
            try
            {
                model.Status = 1;
                if (model.Id > 0)
                {
                    var userInfo = await _Context.UserInformations.FirstOrDefaultAsync(x => x.Id == model.Id);
                    if (userInfo != null)
                    {
                        userInfo.FirstName = model.FirstName;
                        userInfo.LastName = model.LastName;
                        userInfo.Email = model.Email;
                        userInfo.Ext = model.Ext;
                        userInfo.CitizenShip = model.CitizenShip;
                        userInfo.Phone = model.Phone;
                        userInfo.WorkPhone = model.WorkPhone;
                        userInfo.HomePhone = model.HomePhone;
                        userInfo.Dob = model.Dob;
                        userInfo.MaritalStatus = model.MaritalStatus;
                        userInfo.MiddleName = model.MiddleName;
                        userInfo.Status = model.Status;
                        userInfo.SocialSecurityNumber = model.SocialSecurityNumber;
                        userInfo.UpdatedBy = model.UpdatedBy;
                        userInfo.UpdatedDate = DateTime.UtcNow;
                        await _Context.SaveChangesAsync();

                    }
                }
                else
                {
                    await _Context.AddAsync(model);
                    await _Context.SaveChangesAsync();
                }
            }
            catch (Exception cc)
            {
                throw cc;
            }

            return model.Id;
        }

        public async Task<bool> DeleteUser(long UserId,long deletedBy)
        {
            try
            {
                if (UserId > 0)
                {
                    var userInfo = await _Context.UserInformations.FirstOrDefaultAsync(x => x.Id == UserId);
                    if (userInfo != null)
                    {
                        userInfo.Status = 2;
                        userInfo.UpdatedBy = deletedBy;
                        userInfo.UpdatedDate = DateTime.UtcNow;
                        await _Context.SaveChangesAsync();

                    }
                }

            }
            catch (Exception cc)
            {
                throw cc;
            }
            return true;
        }

        public async Task<UserModel> GetUserById(long UserId)
        {
            try
            {
                if (UserId > 0)
                {
                    var userInfo = await _Context.UserInformations.FirstOrDefaultAsync(x => x.Id == UserId);
                    if (userInfo != null)
                    {
                        UserModel objUser = new UserModel()
                        {
                            CitizenShip = userInfo.CitizenShip,
                            Status = userInfo.Status,
                            CreatedBy = userInfo.CreatedBy,
                            CreatedDate = userInfo.CreatedDate,
                            Dob = userInfo.Dob,
                            Email = userInfo.Email,
                            Ext = userInfo.Ext,
                            FirstName = userInfo.FirstName,
                            LastName = userInfo.LastName,
                            HomePhone = userInfo.HomePhone,
                            Id = userInfo.Id,
                            IsLogedIn = userInfo.IsLogedIn,
                            LastLogin = userInfo.LastLogin,
                            MaritalStatus = userInfo.MaritalStatus,
                            MiddleName = userInfo.MiddleName,
                            Phone = userInfo.Phone,
                            SocialSecurityNumber = userInfo.SocialSecurityNumber,
                            WorkPhone = userInfo.WorkPhone,

                        };
                        return objUser;

                    }
                }

            }
            catch (Exception cc)
            {
                throw cc;
            }
            return null;
        }

        public async Task<List<UserModel>> GetUserList(long take, long skip, string searchText)
        {
            try {
                var userList = await (from userInfo in _Context.UserInformations
                               select  new UserModel()
                               {
                                   CitizenShip = userInfo.CitizenShip,
                                   Status = userInfo.Status,
                                   CreatedBy = userInfo.CreatedBy,
                                   CreatedDate = userInfo.CreatedDate,
                                   Dob = userInfo.Dob,
                                   Email = userInfo.Email,
                                   Ext = userInfo.Ext,
                                   FirstName = userInfo.FirstName,
                                   LastName = userInfo.LastName,
                                   HomePhone = userInfo.HomePhone,
                                   Id = userInfo.Id,
                                   IsLogedIn = userInfo.IsLogedIn,
                                   LastLogin = userInfo.LastLogin,
                                   MaritalStatus = userInfo.MaritalStatus,
                                   MiddleName = userInfo.MiddleName,
                                   Phone = userInfo.Phone,
                                   SocialSecurityNumber = userInfo.SocialSecurityNumber,
                                   WorkPhone = userInfo.WorkPhone
                               }).ToListAsync();
                return userList;
            }
            catch (Exception cc)
            {
                throw cc;
            }
            return null;
        }

        public async Task<bool> IsEmailExists(string email)
        {
            try
            {
                var userInfo = await _Context.UserInformations.FirstOrDefaultAsync(x => x.Email == email);
                if (userInfo == null)
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

        public async Task UserRegister(UserInformation model)
        {
            try {
                if (model.Password != null && model.Password != "")
                {
                    model.PasswordToken = Guid.NewGuid().ToString();
                    model.Password = Crypto.EncryptPassword(model.Password, new Guid(model.PasswordToken));
                }
                await _Context.AddAsync(model);
                await _Context.SaveChangesAsync();
            }
            catch(Exception cc) {
                throw cc;
            }
        }

        public void Dispose()
        {
            _Context.Dispose();
        }

        public async Task<UserInformation> UserLogin(LoginModel model)
        {
            try
            {
                var data = _Context.UserInformations.FirstOrDefault(x => x.Email == model.Username);
                return data;
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
                var data = _Context.UserInformations.FirstOrDefault(x => x.Id==model.Id);
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
    }
}
