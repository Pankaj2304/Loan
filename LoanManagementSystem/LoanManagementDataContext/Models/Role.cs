using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class Role
{
    public int Id { get; set; }

    public string? Role1 { get; set; }

    public DateTime CreatedDate { get; set; }

    public long CreatedBy { get; set; }
}
