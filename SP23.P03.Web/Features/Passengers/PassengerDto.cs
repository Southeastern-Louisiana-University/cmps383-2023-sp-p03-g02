namespace SP23.P03.Web.Features.Passengers
{
    public class PassengerDto
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset Birthday { get; set; }
        public int Age { get; set; }
        public string AgeGroup { get; set; } = string.Empty;
    }
}
