using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanManagement.Models
{
    public class AdminModel
    {
        [Required(ErrorMessage ="First Name is required")]
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Mobile No. is required")]
        public string? Mobile { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "RoleId is required")]
        public int RoleId { get; set; }

        public long CreatedBy { get; set; }
    }
}
