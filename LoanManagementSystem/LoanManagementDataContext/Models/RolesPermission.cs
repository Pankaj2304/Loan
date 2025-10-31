using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class RolesPermission
{
    public int Id { get; set; }

    public long? RoleId { get; set; }

    public string? PermissionName { get; set; }

    public bool? Read { get; set; }

    public bool? Create { get; set; }

    public bool? Edit { get; set; }

    public bool? Delete { get; set; }
}
