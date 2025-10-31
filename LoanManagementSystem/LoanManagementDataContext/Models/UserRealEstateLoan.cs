using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserRealEstateLoan
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long? RealEstateId { get; set; }

    public string? CreditorName { get; set; }

    public string? AccountNumber { get; set; }

    public decimal? MonthlyMortgagePayment { get; set; }

    public decimal? UnpaidBalance { get; set; }

    public string? Type { get; set; }

    public decimal? CreditLimit { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
