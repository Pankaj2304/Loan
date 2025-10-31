using LoanManagement.DAL.Utility;
using LoanManagementDataContext.Models;
using LoanManagementSystem.Common;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LoanManagementSystem.Models
{
    public static class JwtToken
    {
        public static TokenModel GenerateJSONWebToken(Admin ObjModel)
        {
            var authClaims = new[]
                 {
                    new Claim("Email", Crypto.EncryptString(ObjModel.Email)),
                     new Claim("UserId", Crypto.EncryptString(Convert.ToString(ObjModel.Id))),
                     new Claim("Apitoken", Crypto.EncryptString(Convert.ToString(ObjModel.PasswordToken))),
                     new Claim(ClaimTypes.Role, Convert.ToString(ObjModel.RoleId)),
                     new Claim(JwtRegisteredClaimNames.Jti, ObjModel.Email)
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.AppSettings("Key")));

            var token = new JwtSecurityToken(
                issuer: Config.AppSettings("Issuer"),
                audience: Config.AppSettings("Issuer"),
                expires: DateTime.Now.AddHours(12),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            TokenModel objTokenModel = new TokenModel()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpireTime = token.ValidTo
            };
            return objTokenModel;
        }

        public static TokenModel GenerateJSONWebTokenUser(UserInformation ObjModel)
        {
            var authClaims = new[]
                 {
                    new Claim("Email", Crypto.EncryptString(ObjModel.Email)),
                     new Claim("UserId", Crypto.EncryptString(Convert.ToString(ObjModel.Id))),
                     new Claim("Apitoken", Crypto.EncryptString(Convert.ToString(ObjModel.PasswordToken))),
                     //new Claim(ClaimTypes.Role, Convert.ToString(ObjModel.RoleId)),
                     new Claim(JwtRegisteredClaimNames.Jti, ObjModel.Email)
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.AppSettings("Key")));

            var token = new JwtSecurityToken(
                issuer: Config.AppSettings("Issuer"),
                audience: Config.AppSettings("Issuer"),
                expires: DateTime.Now.AddHours(12),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            TokenModel objTokenModel = new TokenModel()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpireTime = token.ValidTo
            };
            return objTokenModel;
        }
    }
}
