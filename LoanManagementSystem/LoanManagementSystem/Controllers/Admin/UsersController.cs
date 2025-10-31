using LoanManagement.DAL.IRepositories;
using LoanManagementDataContext.Models;
using LoanManagementSystem.Common;
using LoanManagementSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoanManagementSystem.Controllers.Admin
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserRepository _objIUserRepository;
        private IErrorLogs _objIErrorLogs;
        public UsersController(IUserRepository objIUserRepository, IErrorLogs objIErrorLogs)
        {
            _objIUserRepository = objIUserRepository;
            _objIErrorLogs = objIErrorLogs;
        }

        [HttpGet]
        [Route("api/user/get-user-list")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> GetUserList(int take,int skip,string searchText)
        {
            ResponseModel objResponseModel;
            try
            {
                var result = await _objIUserRepository.GetUserList(take,skip,searchText);
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
                    ApiName = "api/user/get-user-list",
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
        [Route("api/user/delete")]
        [ServiceFilter(typeof(AuthorizeActionFilter))]
        public async Task<IActionResult> DeleteUser(long userId)
        {
            ResponseModel objResponseModel;
            try
            {
                var userid = TokenClaims.Get("UserId", HttpContext);
                long Id = Convert.ToInt64(userid);
                var result = await _objIUserRepository.DeleteUser(userId,Id);
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
                    ApiName = "api/user/delete",
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
