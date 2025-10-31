using LoanManagement.DAL.IRepositories;
using LoanManagement.DAL.Utility;
using LoanManagement.Models;
using LoanManagementDataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.DAL.Repositories
{
    public class ErrorLogs : IErrorLogs
    {
        private LoanManagementSystemContext _Context;
        public void Dispose()
        {
            _Context.Dispose();
        }
        public ErrorLogs(LoanManagementSystemContext DataContext)
        {
            _Context = DataContext;
        }
        public async Task<long> LogError(ErrorLog model)
        {
            try {
                await _Context.AddAsync(model);
                await _Context.SaveChangesAsync();
                long logId = model.Id;
                return logId;
            }
            catch (Exception cc)
            { 
            return 0;
                     
            }
            
        }

        
    }
}
