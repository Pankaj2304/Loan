using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class ErrorLog
{
    public int Id { get; set; }

    public string ApiName { get; set; } = null!;

    public string? Logs { get; set; }

    public string? RequestBody { get; set; }

    public DateTime? CreatedDate { get; set; }
}
