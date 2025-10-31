using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class GiftForLoanSource
{
    public int Id { get; set; }

    public string Source { get; set; } = null!;
}
