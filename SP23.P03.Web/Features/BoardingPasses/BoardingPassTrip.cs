using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassTrip
{
    public int BoardingPassId { get; set; }
    public required BoardingPass BoardingPass { get; set; }
    public int TripId { get; set; }
    public required Trip Trip { get; set; }
}
