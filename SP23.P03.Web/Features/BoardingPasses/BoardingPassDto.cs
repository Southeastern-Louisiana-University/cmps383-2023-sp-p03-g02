using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassDto
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public string TravelClass { get; set; } = string.Empty;
    public ICollection<TripDto> Trips { get; set; } = new List<TripDto>();
    public ICollection<PassengerDto> Passengers { get; set; } = new List<PassengerDto>();
}
