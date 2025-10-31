using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserAddressInformation
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? AddressType { get; set; }

    public string? Street { get; set; }

    public string? Unit { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public string? Country { get; set; }

    public string? TimeOnAddress { get; set; }

    public string? HousingType { get; set; }

    public string? RentAmount { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public bool? Active { get; set; }
}
