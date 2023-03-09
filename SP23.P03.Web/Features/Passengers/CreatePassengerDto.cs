namespace SP23.P03.Web.Features.Passengers
{
    public class CreatePassengerDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset Birthday { get; set; }

    }
}
