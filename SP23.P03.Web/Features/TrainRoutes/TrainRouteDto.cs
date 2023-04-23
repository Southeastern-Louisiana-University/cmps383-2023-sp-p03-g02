using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Features.TrainRoutes;

public class TrainRouteDto
{
    public double DistanceMiles { get; set; }
    public double EstimatedMinutes { get; set; }
    public double GeographyMultiplier { get; set; }
    public required TrainStationDto StationA { get; set; }
    public required TrainStationDto StationB { get; set; }
    public int CoachPrice { get; set; }
    public int FirstClassPrice { get; set; }
    public int RoomletPrice { get; set; }
    public int SleeperPrice { get; set; }
}
