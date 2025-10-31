using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class AssestsAndLiablitiesAccountType
{
    public int Id { get; set; }

    public long TypeId { get; set; }

    public string AccountTypes { get; set; } = null!;
}
