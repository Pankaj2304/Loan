using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserAssestsAndLiablity
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public int? AssestsAndLiablitiesType { get; set; }

    public int? AccountType { get; set; }

    public string? FinancialInstitution { get; set; }

    public string? AccountNumber { get; set; }

    public decimal? UnpaidBalance { get; set; }

    public decimal? MonthlyPayment { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
