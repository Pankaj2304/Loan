using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserLoanRequest
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public decimal LoanAmount { get; set; }

    public string? LoanPurpose { get; set; }

    public string? Occupancy { get; set; }

    public string? FhasecondaryResidence { get; set; }

    public bool? MixedUseProperty { get; set; }

    public bool? ManufacturedHome { get; set; }

    public string? Street { get; set; }

    public string? Unit { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public string? Country { get; set; }

    public decimal? MonthlyRentalIncome { get; set; }

    public decimal? NetMonthlyRentalIncome { get; set; }

    public string? LoanStatus { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
