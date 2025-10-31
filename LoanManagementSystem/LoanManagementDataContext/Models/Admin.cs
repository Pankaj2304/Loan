using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Mobile { get; set; }

    public string? Username { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string PasswordToken { get; set; } = null!;

    public int RoleId { get; set; }

    public DateTime CreatedDate { get; set; }

    public long CreatedBy { get; set; }
}
