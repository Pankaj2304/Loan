using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class LoanType
{
    public int Id { get; set; }

    public string LaonType { get; set; } = null!;

    public string? LaonDescription { get; set; }

    public string? MinLoanAmount { get; set; }

    public string? MaxLoanAmount { get; set; }

    public decimal? MinRoi { get; set; }

    public decimal? MaxRoi { get; set; }

    public int? MinMonths { get; set; }

    public int? MaxMonths { get; set; }
}
