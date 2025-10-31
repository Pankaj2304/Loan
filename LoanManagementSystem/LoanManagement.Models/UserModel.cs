using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "First name is required")]
        public string? FirstName { get; set; }

        public string? MiddleName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
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
        [Required(ErrorMessage = "Email is required")]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }
        public long Status { get; set; }

        public bool IsLogedIn { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? LastLogin { get; set; }
        public string Password { get; set; }
    }
}
