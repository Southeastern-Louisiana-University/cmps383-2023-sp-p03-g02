using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Features.Passengers
{
    public class Passenger
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset Birthday { get; set; }

    }
}
