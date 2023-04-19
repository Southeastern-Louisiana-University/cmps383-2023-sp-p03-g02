using SP23.P03.Web.Features.TrainStations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SP23.P03.Web.Features.TrainRoutes
{
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
        public int CoachPrice => (int)(DistanceMiles * 50);
        public int FirstClassPrice => (int)(DistanceMiles * 100);
        public int RoomletPrice => (int)(DistanceMiles * 200);
        public int SleeperPrice => (int)(DistanceMiles * 300);
    }
}
