using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class RealEstatePropertyStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;
}
