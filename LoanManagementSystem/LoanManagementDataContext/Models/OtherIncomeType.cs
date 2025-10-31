using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class OtherIncomeType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;
}
