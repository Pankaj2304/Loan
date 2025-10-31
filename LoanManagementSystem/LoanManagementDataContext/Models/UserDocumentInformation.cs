using System;
using System.Collections.Generic;

namespace LoanManagementDataContext.Models;

public partial class UserDocumentInformation
{
    public int Id { get; set; }

    public long UserId { get; set; }

    public long DocumentTypeId { get; set; }

    public string? DocumentName { get; set; }

    public string? DocumentDescription { get; set; }

    public long? Status { get; set; }

    public DateTime CreatedDate { get; set; }

    public long CreatedBy { get; set; }

    public DateTime? ApproveDate { get; set; }

    public long? ApproveBy { get; set; }
}
