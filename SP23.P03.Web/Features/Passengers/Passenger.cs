using SP23.P03.Web.Features.Authorization;
using System.ComponentModel.DataAnnotations.Schema;

namespace SP23.P03.Web.Features.Passengers
{
    public class Passenger
    {
        public const int MaxChildAge = 13;
        public const int MinSeniorAge = 65;
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public required virtual User Owner { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset Birthday { get; set; }

        [NotMapped]
        public int Age => DateTimeOffset.Now.Year - Birthday.Year;
        [NotMapped]
        public string AgeGroup
        {
            get
            {
                var age = Age;
                return age <= MaxChildAge ? "Child" : age >= MinSeniorAge ? "Senior" : "Adult";
            }
        }
    }
}
