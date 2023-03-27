using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Features.Trips
{
    public class TripDto
    {
        public int Id { get; set; }
        public required TrainDto Train { get; set; }
        public required TrainStationDto FromStation { get; set; }
        public required TrainStationDto ToStation { get; set; }
        public DateTimeOffset Departure { get; set; }
        public DateTimeOffset Arrival { get; set; }
        public int CoachPrice { get; set; }
        public int FirstClassPrice { get; set; }
        public int RoomletPrice { get; set; }
        public int SleeperPrice { get; set; }
    }

    public class TripWithCapacityDto
    {
        public int Id { get; set; }
        public required TrainDto Train { get; set; }
        public required TrainStationDto FromStation { get; set; }
        public required TrainStationDto ToStation { get; set; }
        public DateTimeOffset Departure { get; set; }
        public DateTimeOffset Arrival { get; set; }
        public int CoachPrice { get; set; }
        public int FirstClassPrice { get; set; }
        public int RoomletPrice { get; set; }
        public int SleeperPrice { get; set; }
        public int CoachCapacity { get; set; }
        public int FirstClassCapacity { get; set; }
        public int RoomletCapacity { get; set; }
        public int SleeperCapacity { get; set; }
    }

    public class CreateTripDto
    {
        public int TrainId { get; set; }
        public int FromStationId { get; set; }
        public int ToStationId { get; set; }
        public DateTimeOffset Departure { get; set; }
        public DateTimeOffset Arrival { get; set; }
        public int CoachPrice { get; set; }
        public int FirstClassPrice { get; set; }
        public int RoomletPrice { get; set; }
        public int SleeperPrice { get; set; }
    }
}