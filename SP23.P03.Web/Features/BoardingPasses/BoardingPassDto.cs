using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassDto
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public required TripDto Trip { get; set; }
    public ICollection<PassengerDto> Passengers { get; set; } = new List<PassengerDto>();
}
