using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserIncomeAndEmploymentInformation
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? IncomeType { get; set; }

    public string? BusinessName { get; set; }

    public string? Position { get; set; }

    public string? OtherSources { get; set; }

    public string? Phone { get; set; }

    public string? Street { get; set; }

    public string? Unit { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public string? Country { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public bool? IsOwner { get; set; }

    public decimal? OwnerShipPercentage { get; set; }

    public decimal? BaseIncome { get; set; }

    public decimal? Overtime { get; set; }

    public decimal? Bonus { get; set; }

    public decimal? Commission { get; set; }

    public decimal? MilitaryEntitlement { get; set; }

    public decimal? Other { get; set; }

    public decimal? MonthlyIncome { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
