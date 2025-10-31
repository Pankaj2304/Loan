using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class LoanOnRequestedProperty
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long LoanId { get; set; }

    public string CreditorName { get; set; } = null!;

    public string? LienType { get; set; }

    public decimal? MonthlyPayment { get; set; }

    public decimal? LoanAmount { get; set; }

    public decimal? CreditLimit { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
