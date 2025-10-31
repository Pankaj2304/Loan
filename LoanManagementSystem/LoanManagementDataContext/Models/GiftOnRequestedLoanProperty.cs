using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class GiftOnRequestedLoanProperty
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long LoanId { get; set; }

    public string AssetType { get; set; } = null!;

    public string? Deposited { get; set; }

    public int? Source { get; set; }

    public decimal? MarketValue { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
