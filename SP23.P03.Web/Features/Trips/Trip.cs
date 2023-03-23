using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Features.Trips;

public class Trip
{
    public int Id { get; set; }
    public int TrainId { get; set; }
    public required Train Train { get; set; }
    public int FromStationId { get; set; }
    public required TrainStation FromStation { get; set; }
    public int ToStationId { get; set; }
    public required TrainStation ToStation { get; set; }
    public DateTimeOffset Departure { get; set; }
    public DateTimeOffset Arrival { get; set; }
    public int BasePrice { get; set; }
}
