using LoanManagement.DAL.Utility;
using LoanManagementSystem.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace LoanManagementSystem.Common
{
    public class AuthorizeActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token == null)
            {
                ResponseModel ResponseData = new ResponseModel();
                ResponseData.Status = 401;
                ResponseData.Message = "Invalid token";
                context.Result = new BadRequestObjectResult(ResponseData);
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Config.AppSettings("Key"));
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Convert.ToString(jwtToken.Claims.First(x => x.Type == "UserId").Value);

                await next();
            }
            catch
            {
                // return null if validation fails
                ResponseModel ResponseData = new ResponseModel();
                ResponseData.Status = 401;
                ResponseData.Message = "Invalid token";
                context.Result = new BadRequestObjectResult(ResponseData);
            }
        }
    }
}
