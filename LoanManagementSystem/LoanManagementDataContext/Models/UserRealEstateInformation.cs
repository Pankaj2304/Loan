using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserRealEstateInformation
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? PropertyType { get; set; }

    public decimal? ProvertyValue { get; set; }

    public string? Status { get; set; }

    public string? IntendedOccupancy { get; set; }

    public decimal? MonthlyMortgagePayment { get; set; }

    public decimal? MonthlyRentalIncome { get; set; }

    public bool? IsLoan { get; set; }

    public string? Street { get; set; }

    public string? Unit { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public string? Country { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
