using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserInformation
{
    public long Id { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public DateTime? Dob { get; set; }

    public string? SocialSecurityNumber { get; set; }

    public string? CitizenShip { get; set; }

    public string? MaritalStatus { get; set; }

    public string? HomePhone { get; set; }

    public string? Phone { get; set; }

    public string? WorkPhone { get; set; }

    public string? Ext { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? PasswordToken { get; set; }

    public long Status { get; set; }

    public bool IsLogedIn { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? LastLogin { get; set; }
}
