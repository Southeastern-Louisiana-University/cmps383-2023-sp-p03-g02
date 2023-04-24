using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.TrainRoutes;
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
    public required DateTimeOffset Departure { get; set; }
    public required DateTimeOffset Arrival { get; set; }
    public int CoachPrice { get; set; } = 0;
    public int FirstClassPrice { get; set; } = 0;
    public int RoomletPrice { get; set; } = 0;
    public int SleeperPrice { get; set; } = 0;
    public ICollection<BoardingPass> BoardingPasses { get; set; } = new List<BoardingPass>();
}

public static class TripExtensions
{

    public static void CalculatePricing(this Trip trip, TrainRoute trainRoute)
    {
        var isOnWeekend = trip.Departure.DayOfWeek >= DayOfWeek.Thursday && trip.Departure.DayOfWeek <= DayOfWeek.Sunday;
        var thanksgiving = new DateTimeOffset(trip.Departure.Year, 11, 1, 0, 0, 0, TimeZoneInfo.Local.BaseUtcOffset);
        thanksgiving = thanksgiving.AddDays((thanksgiving.DayOfWeek <= DayOfWeek.Thursday ? 25 : 32) - (int)thanksgiving.DayOfWeek);
        var isOnThanksgivingWeekend = thanksgiving <= trip.Departure && trip.Departure < thanksgiving.AddDays(3);
        double priceMultiplier = 1.1; // Markup
        if (isOnWeekend) priceMultiplier *= 1.2; // Weekend price increase
        if (isOnThanksgivingWeekend) priceMultiplier *= 4/3; // Thanksgiving weekend price increase
        trip.CoachPrice = (int)(trainRoute.CoachPrice * priceMultiplier);
        trip.FirstClassPrice = (int)(trainRoute.FirstClassPrice * priceMultiplier);
        trip.RoomletPrice = (int)(trainRoute.RoomletPrice * priceMultiplier);
        trip.SleeperPrice = (int)(trainRoute.SleeperPrice * priceMultiplier);
    }
    public static int GetCoachCapacity(this Trip trip, DbSet<Trip> trips) => GetRemainingCapacityForTravelClass(trip, trips, TravelClass.Coach);
    public static int GetFirstClassCapacity(this Trip trip, DbSet<Trip> trips) => GetRemainingCapacityForTravelClass(trip, trips, TravelClass.FirstClass);
    public static int GetRoomletCapacity(this Trip trip, DbSet<Trip> trips) => GetRemainingCapacityForTravelClass(trip, trips, TravelClass.Roomlet);
    public static int GetSleeperCapacity(this Trip trip, DbSet<Trip> trips) => GetRemainingCapacityForTravelClass(trip, trips, TravelClass.Sleeper);
    public static int GetRemainingCapacityForTravelClass(this Trip trip, DbSet<Trip> trips, TravelClass travelClass)
    {
        trips.Entry(trip)
             .Reference(x => x.Train)
             .Load();

        var takenCapacity = trips.Entry(trip)
            .Collection(x => x.BoardingPasses)
            .Query()
            .Where(x => x.TravelClass == travelClass)
            .Include(x => x.Passengers)
            .AsEnumerable()
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
    /// <summary>
    /// Only use this if <paramref name="trip"/>.BoardingPasses.Passengers is loaded.
    /// </summary>
    /// <param name="trip"></param>
    /// <param name="travelClass"></param>
    /// <returns>The number of passengers in <paramref name="travelClass"/></returns>
    public static int CountPassengers(this Trip trip, TravelClass travelClass) => trip.BoardingPasses.Where(x => x.TravelClass == travelClass).Aggregate(0, (count, x) => count + x.Passengers.Count);
    public static int GetRemainingCapacity(this Trip trip, DbSet<Trip> trips)
    {
        trips.Entry(trip)
             .Reference(x => x.Train)
             .Load();

        return trip.Train.TotalCapacity - trips.Entry(trip)
                                               .Collection(x => x.BoardingPasses)
                                               .Query()
                                               .Include(x => x.Passengers)
                                               .AsEnumerable()
                                               .Aggregate(0, (count, x) => count + x.Passengers.Count);
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