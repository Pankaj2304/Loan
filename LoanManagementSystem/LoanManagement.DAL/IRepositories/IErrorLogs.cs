using LoanManagementDataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.DAL.IRepositories
{
    public interface IErrorLogs
    {
        Task<long> LogError(ErrorLog model);
    }
}
