using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LoanManagementDataContext.Models;

public partial class LoanManagementSystemContext : DbContext
{
    public LoanManagementSystemContext()
    {
    }

    public LoanManagementSystemContext(DbContextOptions<LoanManagementSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<AssestsAndLiablitiesAccountType> AssestsAndLiablitiesAccountTypes { get; set; }

    public virtual DbSet<AssestsAndLiablitiesType> AssestsAndLiablitiesTypes { get; set; }

    public virtual DbSet<DocumentType> DocumentTypes { get; set; }

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<GiftForLoanSource> GiftForLoanSources { get; set; }

    public virtual DbSet<GiftOnRequestedLoanProperty> GiftOnRequestedLoanProperties { get; set; }

    public virtual DbSet<LoanOnRequestedProperty> LoanOnRequestedProperties { get; set; }

    public virtual DbSet<LoanType> LoanTypes { get; set; }

    public virtual DbSet<OtherIncomeType> OtherIncomeTypes { get; set; }

    public virtual DbSet<RealEstatePropertyStatus> RealEstatePropertyStatuses { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolesPermission> RolesPermissions { get; set; }

    public virtual DbSet<UserAddressInformation> UserAddressInformations { get; set; }

    public virtual DbSet<UserAssestsAndLiablity> UserAssestsAndLiablities { get; set; }

    public virtual DbSet<UserDocumentInformation> UserDocumentInformations { get; set; }

    public virtual DbSet<UserDocumentStatus> UserDocumentStatuses { get; set; }

    public virtual DbSet<UserIncomeAndEmploymentInformation> UserIncomeAndEmploymentInformations { get; set; }

    public virtual DbSet<UserInformation> UserInformations { get; set; }

    public virtual DbSet<UserLoanRequest> UserLoanRequests { get; set; }

    public virtual DbSet<UserRealEstateInformation> UserRealEstateInformations { get; set; }

    public virtual DbSet<UserRealEstateLoan> UserRealEstateLoans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(LocalDb)\\MSSQLLocalDB;Database=LoanManagementSystem;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Admin__3214EC27CA5F06C6");

            entity.ToTable("Admin");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Mobile)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.PasswordToken)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<AssestsAndLiablitiesAccountType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AssestsA__3214EC272C3F3FCF");

            entity.ToTable("AssestsAndLiablitiesAccountType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountTypes).HasMaxLength(1000);
            entity.Property(e => e.TypeId).HasColumnName("TypeID");
        });

        modelBuilder.Entity<AssestsAndLiablitiesType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AssestsA__3214EC27BCA49B9A");

            entity.ToTable("AssestsAndLiablitiesType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Types).HasMaxLength(500);
        });

        modelBuilder.Entity<DocumentType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Document__3214EC270157EC1C");

            entity.ToTable("DocumentType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DocumentType1)
                .HasMaxLength(500)
                .HasColumnName("DocumentType");
        });

        modelBuilder.Entity<ErrorLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ErrorLog__3214EC2793DECD7B");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ApiName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<GiftForLoanSource>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GiftForL__3214EC27D328AF6F");

            entity.ToTable("GiftForLoanSource");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Source).HasMaxLength(1000);
        });

        modelBuilder.Entity<GiftOnRequestedLoanProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.GiftOnRequestedLoanProperty");

            entity.ToTable("GiftOnRequestedLoanProperty");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AssetType)
                .HasMaxLength(500)
                .HasColumnName("Asset Type");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Deposited).HasMaxLength(500);
            entity.Property(e => e.MarketValue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<LoanOnRequestedProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.LoanOnRequestedProperty");

            entity.ToTable("LoanOnRequestedProperty");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CreditLimit)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("CreditLimit ");
            entity.Property(e => e.CreditorName).HasMaxLength(500);
            entity.Property(e => e.LienType).HasMaxLength(500);
            entity.Property(e => e.LoanAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MonthlyPayment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<LoanType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LoanType__3214EC27832D7088");

            entity.ToTable("LoanType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.LaonType).HasMaxLength(500);
            entity.Property(e => e.MaxLoanAmount).HasMaxLength(500);
            entity.Property(e => e.MaxRoi)
                .HasColumnType("decimal(10, 3)")
                .HasColumnName("MaxROI");
            entity.Property(e => e.MinLoanAmount).HasMaxLength(500);
            entity.Property(e => e.MinRoi)
                .HasColumnType("decimal(10, 3)")
                .HasColumnName("MinROI");
        });

        modelBuilder.Entity<OtherIncomeType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OtherInc__3214EC2725D652A2");

            entity.ToTable("OtherIncomeType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Type).HasMaxLength(500);
        });

        modelBuilder.Entity<RealEstatePropertyStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RealEsta__3214EC2764216492");

            entity.ToTable("RealEstatePropertyStatus");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Status).HasMaxLength(1000);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC277D1B31BD");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Role1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Role");
        });

        modelBuilder.Entity<RolesPermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RolesPer__3214EC27642636F3");

            entity.ToTable("RolesPermission");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.PermissionName)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserAddressInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserAddressInformation");

            entity.ToTable("UserAddressInformation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AddressType).HasMaxLength(200);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.HousingType).HasMaxLength(100);
            entity.Property(e => e.RentAmount).HasMaxLength(20);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.Street).HasMaxLength(500);
            entity.Property(e => e.TimeOnAddress).HasMaxLength(200);
            entity.Property(e => e.Unit).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Zip).HasMaxLength(20);
        });

        modelBuilder.Entity<UserAssestsAndLiablity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserAssestsAndLiablities");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountNumber).HasMaxLength(300);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FinancialInstitution).HasMaxLength(500);
            entity.Property(e => e.MonthlyPayment).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.UnpaidBalance).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<UserDocumentInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserDocu__3214EC272913B807");

            entity.ToTable("UserDocumentInformation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ApproveDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DocumentName).HasMaxLength(500);
        });

        modelBuilder.Entity<UserDocumentStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserDocu__3214EC274DD75853");

            entity.ToTable("UserDocumentStatus");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserIncomeAndEmploymentInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserIncomeAndEmploymentInformation");

            entity.ToTable("UserIncomeAndEmploymentInformation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BaseIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Bonus).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BusinessName).HasMaxLength(500);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.Commission).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.IncomeType).HasMaxLength(400);
            entity.Property(e => e.MilitaryEntitlement).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MonthlyIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Other).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OtherSources).HasMaxLength(300);
            entity.Property(e => e.Overtime).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OwnerShipPercentage).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Position).HasMaxLength(500);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.Street).HasMaxLength(500);
            entity.Property(e => e.Unit).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Zip).HasMaxLength(20);
        });

        modelBuilder.Entity<UserInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserInformation");

            entity.ToTable("UserInformation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CitizenShip).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.Ext).HasMaxLength(20);
            entity.Property(e => e.FirstName).HasMaxLength(200);
            entity.Property(e => e.HomePhone).HasMaxLength(20);
            entity.Property(e => e.LastLogin).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(200);
            entity.Property(e => e.MaritalStatus).HasMaxLength(100);
            entity.Property(e => e.MiddleName).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(200);
            entity.Property(e => e.PasswordToken).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.SocialSecurityNumber).HasMaxLength(400);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserName).HasMaxLength(500);
            entity.Property(e => e.WorkPhone).HasMaxLength(20);
        });

        modelBuilder.Entity<UserLoanRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserLoanRequest");

            entity.ToTable("UserLoanRequest");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FhasecondaryResidence)
                .HasMaxLength(500)
                .HasColumnName("FHASecondaryResidence");
            entity.Property(e => e.LoanAmount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("LoanAmount ");
            entity.Property(e => e.LoanPurpose).HasMaxLength(500);
            entity.Property(e => e.LoanStatus).HasMaxLength(500);
            entity.Property(e => e.MonthlyRentalIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.NetMonthlyRentalIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Occupancy).HasMaxLength(500);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.Street).HasMaxLength(500);
            entity.Property(e => e.Unit).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Zip).HasMaxLength(20);
        });

        modelBuilder.Entity<UserRealEstateInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserRealEstateInformation");

            entity.ToTable("UserRealEstateInformation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.IntendedOccupancy).HasMaxLength(300);
            entity.Property(e => e.MonthlyMortgagePayment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MonthlyRentalIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PropertyType).HasMaxLength(500);
            entity.Property(e => e.ProvertyValue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.Status).HasMaxLength(500);
            entity.Property(e => e.Street).HasMaxLength(500);
            entity.Property(e => e.Unit).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Zip).HasMaxLength(20);
        });

        modelBuilder.Entity<UserRealEstateLoan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.UserRealEstateLoan");

            entity.ToTable("UserRealEstateLoan");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountNumber).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CreditLimit).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreditorName).HasMaxLength(500);
            entity.Property(e => e.MonthlyMortgagePayment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Type).HasMaxLength(500);
            entity.Property(e => e.UnpaidBalance).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
