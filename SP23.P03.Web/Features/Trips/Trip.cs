using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.BoardingPasses;
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
    public int CoachPrice { get; set; }
    public int FirstClassPrice { get; set; }
    public int RoomletPrice { get; set; }
    public int SleeperPrice { get; set; }
    public ICollection<BoardingPass> BoardingPasses { get; set; } = new List<BoardingPass>();
}

public static class TripExtensions
{
    public static int GetRemainingCapacity(this Trip trip, DbSet<Trip> trips, TravelClass travelClass)
    {
        trips.Entry(trip)
             .Reference(x => x.Train)
             .Load();

        var takenCapacity = trips.Entry(trip)
            .Collection(x => x.BoardingPasses)
            .Query()
            .Where(x => x.TravelClass == travelClass)
            .Aggregate(0, (count, x) => count + x.Passengers.Count);

        var train = trip.Train;
        return travelClass switch
        {
            TravelClass.Coach => trip.Train.CoachCapacity - takenCapacity,
            TravelClass.FirstClass => trip.Train.FirstClassCapacity - takenCapacity,
            TravelClass.Roomlet => trip.Train.RoomletCapacity - takenCapacity,
            TravelClass.Sleeper => trip.Train.SleeperCapacity - takenCapacity,
            _ => 0,
        };
    }
    public static int GetPrice(this Trip trip, TravelClass travelClass)
    {
        return travelClass switch
        {
            TravelClass.Coach => trip.CoachPrice,
            TravelClass.FirstClass => trip.FirstClassPrice,
            TravelClass.Roomlet => trip.RoomletPrice,
            TravelClass.Sleeper => trip.SleeperPrice,
            _ => 0,
        };
    }
}