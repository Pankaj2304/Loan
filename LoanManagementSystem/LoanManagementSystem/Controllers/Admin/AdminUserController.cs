using LoanManagement.DAL.IRepositories;
using LoanManagement.DAL.Utility;
using LoanManagement.Models;
using LoanManagementDataContext.Models;
using LoanManagementSystem.Common;
using LoanManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;

namespace LoanManagementSystem.Controllers.Admin
{

    [ApiController]
    public class AdminUserController : ControllerBase
    {
        private IAdminRepository _objIAdminRepository;
        private IErrorLogs _objIErrorLogs;
        public AdminUserController(IAdminRepository objIAdminRepository, IErrorLogs objIErrorLogs)
        {
            _objIAdminRepository = objIAdminRepository;
            _objIErrorLogs = objIErrorLogs;
        }
        [HttpPost]
        [Route("api/admin/AddAdminUser")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> AddAdminUser([FromBody] AdminModel objModel)
        {
            ResponseModel objResponseModel;
            var userid = TokenClaims.Get("UserId", HttpContext);
            try
            {
                //Check Email Id is already exists or not
                objModel.CreatedBy = Convert.ToInt64(userid);
                var isEmailAvailable = await _objIAdminRepository.IsEmailExists(objModel.Email);
                if (isEmailAvailable)
                {
                    objResponseModel = new ResponseModel()
                    {
                        Status = 0,
                        Message = "Email Id is already available"
                    };
                    return Ok(objResponseModel);
                }
                await _objIAdminRepository.addAdmin(objModel);
                objResponseModel = new ResponseModel()
                {
                    Status = 200,
                    Message = "User added successfully"
                };

            }
            catch (Exception cc)
            {
                ErrorLog objLog = new ErrorLog()
                {
                    ApiName = "api/admin/AddAdminUser",
                    Logs = cc.Message,
                    CreatedDate = DateTime.Now,
                };
                var data = await _objIErrorLogs.LogError(objLog);
                objResponseModel = new ResponseModel()
                {
                    Status = 500,
                    Message = "Internal server error: Error Code " + data
                };
            }
            return Ok(objResponseModel);
        }

        [HttpPost]
        [Route("api/admin/login")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginModel objModel)
        {
            ResponseModel objResponseModel;
            try
            {
                var isUserAvailable = await _objIAdminRepository.AdminLogin(objModel);
                if (isUserAvailable != null && objModel.Password == Crypto.DecryptPassowrd(isUserAvailable.Password, new Guid(isUserAvailable.PasswordToken)))
                {
                    var token = JwtToken.GenerateJSONWebToken(isUserAvailable);
                    var data = new
                    {
                        token = token,
                        Name = isUserAvailable.FirstName + " " + isUserAvailable.LastName
                    };
                    objResponseModel = new ResponseModel()
                    {
                        Status = 200,
                        Message = "",
                        Data = data
                    };
                    return Ok(objResponseModel);
                }
                else
                {
                    objResponseModel = new ResponseModel()
                    {
                        Status = 401,
                        Message = "Invalid Username/login"
                    };
                    return Ok(objResponseModel);
                }
            }
            catch (Exception cc)
            {
                ErrorLog objLog = new ErrorLog()
                {
                    ApiName = "api/admin/AddAdminUser",
                    Logs = cc.Message,
                    CreatedDate = DateTime.Now,
                };
                var data = await _objIErrorLogs.LogError(objLog);
                objResponseModel = new ResponseModel()
                {
                    Status = 500,
                    Message = "Internal server error: Error Code " + data
                };
            }
            return Ok(objResponseModel);
        }

        [HttpPost]
        [Route("api/admin/changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordModel objModel)
        {
            ResponseModel objResponseModel;
            try
            {
                var result = await _objIAdminRepository.ChangePassword(objModel);
                objResponseModel = new ResponseModel()
                {
                    Status = 200,
                    Message = "Password Changed Successfully",
                    Data = ""
                };
                return Ok(objResponseModel);

            }
            catch (Exception cc)
            {
                ErrorLog objLog = new ErrorLog()
                {
                    ApiName = "api/admin/changepassword",
                    Logs = cc.Message,
                    CreatedDate = DateTime.Now,
                };
                var data = await _objIErrorLogs.LogError(objLog);
                objResponseModel = new ResponseModel()
                {
                    Status = 500,
                    Message = "Internal server error: Error Code " + data
                };
            }
            return Ok(objResponseModel);
        }

        [HttpDelete]
        [Route("api/admin/delete")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> DeleteAdminUser(long userId)
        {
            ResponseModel objResponseModel;
            try
            {
                var userid = TokenClaims.Get("UserId", HttpContext);
                long Id = Convert.ToInt64(userid);
                var result = await _objIAdminRepository.DeleteUser(userId);
                objResponseModel = new ResponseModel()
                {
                    Status = 200,
                    Message = "User deleted Successfully",
                    Data = result
                };
                return Ok(objResponseModel);

            }
            catch (Exception cc)
            {
                ErrorLog objLog = new ErrorLog()
                {
                    ApiName = "api/admin/delete",
                    Logs = cc.Message,
                    CreatedDate = DateTime.Now,
                };
                var data = await _objIErrorLogs.LogError(objLog);
                objResponseModel = new ResponseModel()
                {
                    Status = 500,
                    Message = "Internal server error: Error Code " + data
                };
            }
            return Ok(objResponseModel);
        }

        [HttpGet]
        [Route("api/admin/get-admin-user-list")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> GetUserList(int take, int skip, string searchText)
        {
            ResponseModel objResponseModel;
            try
            {
                var result = await _objIAdminRepository.GetAdminUserList(take, skip, searchText);
                objResponseModel = new ResponseModel()
                {
                    Status = 200,
                    Message = "",
                    Data = result
                };
                return Ok(objResponseModel);

            }
            catch (Exception cc)
            {
                ErrorLog objLog = new ErrorLog()
                {
                    ApiName = "api/admin/get-admin-user-list",
                    Logs = cc.Message,
                    CreatedDate = DateTime.Now,
                };
                var data = await _objIErrorLogs.LogError(objLog);
                objResponseModel = new ResponseModel()
                {
                    Status = 500,
                    Message = "Internal server error: Error Code " + data
                };
            }
            return Ok(objResponseModel);
        }
    }
}
