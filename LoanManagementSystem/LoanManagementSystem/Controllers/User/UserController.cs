using LoanManagement.DAL.IRepositories;
using LoanManagement.DAL.Utility;
using LoanManagement.Models;
using LoanManagementDataContext.Models;
using LoanManagementSystem.Common;
using LoanManagementSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoanManagementSystem.Controllers.User
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _objIUserRepository;
        private IErrorLogs _objIErrorLogs;
        public UserController(IUserRepository objIUserRepository, IErrorLogs objIErrorLogs)
        {
            _objIUserRepository = objIUserRepository;
            _objIErrorLogs = objIErrorLogs;
        }

        [HttpPost]
        [Route("api/user/register")]
       // [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel objModel)
        {
            ResponseModel objResponseModel;
            try
            {
                //Check Email Id is already exists or not
                objModel.CreatedBy = 0;
                var isEmailAvailable = await _objIUserRepository.IsEmailExists(objModel.Email);
                if (isEmailAvailable)
                {
                    objResponseModel = new ResponseModel()
                    {
                        Status = 0,
                        Message = "Email Id is already available"
                    };
                    return Ok(objResponseModel);
                }
                UserInformation userModel = new UserInformation()
                {
                    CitizenShip=objModel.CitizenShip,
                    CreatedBy=objModel.CreatedBy,
                    CreatedDate=DateTime.UtcNow,
                    Dob=objModel.Dob,
                    Email=objModel.Email,
                    Ext= objModel.Ext,
                    FirstName= objModel.FirstName,
                    HomePhone  =objModel.HomePhone,
                    LastName= objModel.LastName,
                    MiddleName= objModel.MiddleName,
                    MaritalStatus=objModel.MaritalStatus,
                    WorkPhone=objModel.WorkPhone,
                    Password=objModel.Password,
                    Phone=objModel.Phone,
                    Status=1,
                    SocialSecurityNumber= objModel.SocialSecurityNumber
                   
                };
                await _objIUserRepository.UserRegister(userModel);
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
                    ApiName = "api/user/register",
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
        [Route("api/user/login")]
        public async Task<IActionResult> UserLogin([FromBody] LoginModel objModel)
        {
            ResponseModel objResponseModel;
            try
            {
                var isUserAvailable = await _objIUserRepository.UserLogin(objModel);
                if (isUserAvailable != null && objModel.Password == Crypto.DecryptPassowrd(isUserAvailable.Password, new Guid(isUserAvailable.PasswordToken)))
                {
                    var token = JwtToken.GenerateJSONWebTokenUser(isUserAvailable);
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
                    ApiName = "api/user/login",
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
        [Route("api/user/changepassword")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordModel objModel)
        {
            ResponseModel objResponseModel;
            var userid = TokenClaims.Get("UserId", HttpContext);
            objModel.Id = Convert.ToInt64(userid);
            try
            {
                var result = await _objIUserRepository.ChangePassword(objModel);
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
                    ApiName = "api/user/changepassword",
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
        [Route("api/user/get")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> GetUser()
        {
            ResponseModel objResponseModel;
            var userid = TokenClaims.Get("UserId", HttpContext);
            var Id = Convert.ToInt64(userid);
            try
            {
                var result = await _objIUserRepository.GetUserById(Id);
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
                    ApiName = "api/user/get",
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
