using SP23.P03.Web.Features.TrainStations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SP23.P03.Web.Features.TrainRoutes;

public class TrainRoute
{
    public double DistanceMiles { get; set; } = 50;
    public double EstimatedMinutes => DistanceMiles * 2.5; // This could be an actual property in the database but I don't have the time for that
    public double GeographyMultiplier { get; set; } = 1;
    public int StationAId { get; set; }
    public required TrainStation StationA { get; set; }
    public int StationBId { get; set; }
    public required TrainStation StationB { get; set; }
    [NotMapped]
    public TrainStation[] Stations => new TrainStation[] { StationA, StationB };
    public int CoachPrice => (int)(DistanceMiles * GeographyMultiplier * 50);
    public int FirstClassPrice => (int)(DistanceMiles * GeographyMultiplier * 100);
    public int RoomletPrice => (int)(DistanceMiles * GeographyMultiplier * 200);
    public int SleeperPrice => (int)(DistanceMiles * GeographyMultiplier * 300);
}

public static class TrainRouteExtensions
{
    public static TrainRoute GetTrainRoute(this IEnumerable<TrainRoute> trainRoutes, TrainStation fromStation, TrainStation toStation) =>
        trainRoutes.Where(x => (x.StationA == fromStation && x.StationB == toStation) || (x.StationB == fromStation && x.StationA == toStation)).First();
    public static TrainRoute? GetTrainRouteOrDefault(this IEnumerable<TrainRoute> trainRoutes, TrainStation fromStation, TrainStation toStation) =>
        trainRoutes.Where(x => (x.StationA == fromStation && x.StationB == toStation) || (x.StationB == fromStation && x.StationA == toStation)).FirstOrDefault();
}