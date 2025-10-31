# 💰 Loan Management System

A full-stack **Loan Management System** built using **.NET 8**, **Entity Framework Core**, and **MS SQL Server**, following a clean **N-tier architecture**.  
This system helps manage loan applications, approvals, repayments, and related operations efficiently.

---

## 🚀 Project Structure

```
Loan/
│
├── UI/                     # Frontend user interface
│   └── (HTML, CSS, JS files)
│
├── LoanManagement/         # Backend API (ASP.NET Core 8)
│   ├── LoanManagement.API/         # API layer
│   ├── LoanManagement.Business/    # Business logic layer
│   ├── LoanManagement.Data/        # Data access layer
│   ├── LoanManagement.Core/        # Entities and DTOs
│   └── LoanManagement.Tests/       # Unit test projects (if any)
│
└── README.md
```

---

## 🧠 Key Features

- 🏦 Manage loans, customers, and repayment schedules  
- 🔐 Role-based authentication and authorization (optional / extendable)  
- 🗃️ CRUD operations using **Entity Framework Core**  
- 🧩 Clean **N-Tier architecture** separation  
- 💾 Database integration with **Microsoft SQL Server**  
- 🌐 RESTful API design for frontend integration  

---

## ⚙️ Technologies Used

| Layer | Technology |
|-------|-------------|
| **Frontend (UI)** | HTML, CSS, JavaScript |
| **Backend** | ASP.NET Core 8 Web API |
| **Architecture** | N-Tier |
| **ORM** | Entity Framework Core |
| **Database** | Microsoft SQL Server |
| **Language** | C# (.NET 8) |

---

## 🏗️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Pankaj2304/Loan.git
cd Loan
```

### 2. Database Configuration
- Open the `appsettings.json` file in `LoanManagement.API` project.
- Update the **connection string** with your SQL Server credentials:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=LoanManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### 3. Apply Migrations and Create Database
Run the following commands in the **Package Manager Console**:
```bash
cd LoanManagement/LoanManagement.API
dotnet ef database update
```

> 💡 Ensure you have **Entity Framework Core Tools** installed:  
> `dotnet tool install --global dotnet-ef`

### 4. Run the Application
```bash
dotnet run
```

The API should now be running on:  
**https://localhost:5001** or **http://localhost:5000**

---

## 🧩 UI Integration
- The **UI project** (in the `UI/` folder) connects to the backend API.
- You can serve it using a simple static file server or integrate it into a Blazor / Razor UI as needed.

---

## 📂 Example API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/loans` | GET | Get all loans |
| `/api/loans/{id}` | GET | Get loan by ID |
| `/api/loans` | POST | Create new loan |
| `/api/loans/{id}` | PUT | Update existing loan |
| `/api/loans/{id}` | DELETE | Delete loan |

---

## 🧱 Architecture Overview

```
+---------------------------+
|        UI (Client)        |
+------------+--------------+
             |
             ▼
+---------------------------+
|     API Layer (.NET 8)    |
|  Controllers, Endpoints   |
+------------+--------------+
             |
             ▼
+---------------------------+
| Business Logic Layer      |
| Services, Validation      |
+------------+--------------+
             |
             ▼
+---------------------------+
| Data Access Layer         |
| EF Core Repositories      |
+------------+--------------+
             |
             ▼
+---------------------------+
| Database (SQL Server)     |
+---------------------------+
```

---

## 👨‍💻 Contributors

- **Pankaj** – Developer & Maintainer  
- **Tech Stack:** .NET 8 | EF Core | MSSQL | C#

---

## 📜 License

This project is licensed under the **MIT License** – you’re free to use and modify it with attribution.

---

### ⭐ If you find this project useful, don’t forget to give it a star on GitHub!
