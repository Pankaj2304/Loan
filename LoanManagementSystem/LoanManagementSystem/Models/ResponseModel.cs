namespace LoanManagementSystem.Models
{
    public class ResponseModel
    {
        public int Status { get; set; }
        public string? Message { get; set; }
        public dynamic Data { get; set; }
    }
    public class ResponseModels<T>
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
