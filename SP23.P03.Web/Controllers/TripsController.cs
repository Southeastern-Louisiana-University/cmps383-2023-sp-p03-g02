using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Controllers;

[Route("api/trips")]
[ApiController]

public class TripsController : ControllerBase
{
    private readonly DbSet<Trip> trips;
    private readonly DbSet<Train> trains;
    private readonly DbSet<TrainStation> stations;
    private readonly DataContext dataContext;

    public TripsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        trips = dataContext.Set<Trip>();
        trains = dataContext.Set<Train>();
        stations = dataContext.Set<TrainStation>();
    }

    [HttpGet]
    public IQueryable<TripWithCapacityDto> GetAllTrips()
    {
        return GetTripDtos(trips);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<TripWithCapacityDto> GetTripById(int id)
    {
        var tripDtos = GetTripDtos(trips.Where(x => x.Id == id)).FirstOrDefault();
        if (tripDtos == null)
        {
            return NotFound();
        }

        return Ok(tripDtos);
    }

    [HttpGet]
    [Route("search/{fromStationId}/{toStationId}/{departure}/{arrival}/{travelClass}")]
    public ActionResult<IEnumerable<IEnumerable<TripWithCapacityDto>>> GetRoute(int fromStationId, int toStationId,
                                                                    DateTimeOffset departure, DateTimeOffset arrival,
                                                                    string travelClass)
    {
        if (!(Enum.TryParse(travelClass, true, out TravelClass travelClassEnum) && Enum.IsDefined(travelClassEnum)))
        {
            return BadRequest("Invalid travel class.");
        }

        var routes = GenerateRoutes(trips, fromStationId, toStationId, departure, arrival)
                     ?.Where(x => x.All(t => t.GetRemainingCapacityForTravelClass(trips, travelClassEnum) > 0));

        if (routes == null)
        {
            return NotFound("There were no valid routes.");
        }

        var routeDtos = routes.Select(r => r.Select(x => new TripWithCapacityDto
        {
            Id = x.Id,
            Train = new TrainDto
            {
                Id = x.Train.Id,
                Name = x.Train.Name,
                Status = x.Train.Status,
                CoachCapacity = x.Train.CoachCapacity,
                FirstClassCapacity = x.Train.FirstClassCapacity,
                RoomletCapacity = x.Train.RoomletCapacity,
                SleeperCapacity = x.Train.SleeperCapacity,
            },
            FromStation = new TrainStationDto
            {
                Id = x.FromStation.Id,
                Name = x.FromStation.Name,
                Address = x.FromStation.Address,
                ManagerId = x.FromStation.ManagerId,
            },
            ToStation = new TrainStationDto
            {
                Id = x.ToStation.Id,
                Name = x.ToStation.Name,
                Address = x.ToStation.Address,
                ManagerId = x.ToStation.ManagerId,
            },
            Departure = x.Departure,
            Arrival = x.Arrival,
            CoachPrice = x.CoachPrice,
            FirstClassPrice = x.FirstClassPrice,
            RoomletPrice = x.RoomletPrice,
            SleeperPrice = x.SleeperPrice,
            CoachCapacity = x.GetCoachCapacity(trips),
            FirstClassCapacity = x.GetFirstClassCapacity(trips),
            RoomletCapacity = x.GetRoomletCapacity(trips),
            SleeperCapacity = x.GetSleeperCapacity(trips),
        }));

        return Ok(routeDtos);
    }


    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TripWithCapacityDto> CreateTrip([FromBody] CreateTripDto dto)
    {
        var train = trains.FirstOrDefault(x => x.Id == dto.TrainId);
        var fromStation = stations.FirstOrDefault(x => x.Id == dto.FromStationId);
        var toStation = stations.FirstOrDefault(x => x.Id == dto.ToStationId);

        if (InvalidCreateTripDto(dto)
            || train == null
            || fromStation == null
            || toStation == null)
        {
            return BadRequest();
        }

        var createdTrip = new Trip
        {
            Train = train,
            FromStation = fromStation,
            ToStation = toStation,
            Departure = dto.Departure,
            Arrival = dto.Arrival,
            CoachPrice = dto.CoachPrice,
            FirstClassPrice = dto.FirstClassPrice,
            RoomletPrice = dto.RoomletPrice,
            SleeperPrice = dto.SleeperPrice,
        };

        trips.Add(createdTrip);
        dataContext.SaveChanges();

        var tripDto = new TripWithCapacityDto
        {
            Id = createdTrip.Id,
            Train = new TrainDto
            {
                Id = createdTrip.Train.Id,
                Name = createdTrip.Train.Name,
                Status = createdTrip.Train.Status,
                CoachCapacity = createdTrip.Train.CoachCapacity,
                FirstClassCapacity = createdTrip.Train.FirstClassCapacity,
                RoomletCapacity = createdTrip.Train.RoomletCapacity,
                SleeperCapacity = createdTrip.Train.SleeperCapacity,
            },
            FromStation = new TrainStationDto
            {
                Id = createdTrip.FromStation.Id,
                Name = createdTrip.FromStation.Name,
                Address = createdTrip.FromStation.Address,
                ManagerId = createdTrip.FromStation.ManagerId,
            },
            ToStation = new TrainStationDto
            {
                Id = createdTrip.ToStation.Id,
                Name = createdTrip.ToStation.Name,
                Address = createdTrip.ToStation.Address,
                ManagerId = createdTrip.ToStation.ManagerId,
            },
            Departure = createdTrip.Departure,
            Arrival = createdTrip.Arrival,
            CoachPrice = createdTrip.CoachPrice,
            FirstClassPrice = createdTrip.FirstClassPrice,
            RoomletPrice = createdTrip.RoomletPrice,
            SleeperPrice = createdTrip.SleeperPrice,
            CoachCapacity = createdTrip.GetCoachCapacity(trips),
            FirstClassCapacity = createdTrip.GetFirstClassCapacity(trips),
            RoomletCapacity = createdTrip.GetRoomletCapacity(trips),
            SleeperCapacity = createdTrip.GetSleeperCapacity(trips),
        };

        return CreatedAtAction(nameof(GetTripById), new { id = tripDto.Id }, tripDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TripWithCapacityDto> UpdateTrip([FromBody] CreateTripDto dto, [FromRoute] int id)
    {
        var trip = trips.FirstOrDefault(x => x.Id == id);

        if (trip == null)
        {
            return NotFound();
        }

        var train = trains.FirstOrDefault(x => x.Id == dto.TrainId);
        var fromStation = stations.FirstOrDefault(x => x.Id == dto.FromStationId);
        var toStation = stations.FirstOrDefault(x => x.Id == dto.ToStationId);

        if (InvalidCreateTripDto(dto)
            || train == null
            || fromStation == null
            || toStation == null)
        {
            return BadRequest();
        }

        trip.Train = train;
        trip.FromStation = fromStation;
        trip.ToStation = toStation;
        trip.Departure = dto.Departure;
        trip.Arrival = dto.Arrival;
        trip.CoachPrice = dto.CoachPrice;
        trip.FirstClassPrice = dto.FirstClassPrice;
        trip.RoomletPrice = dto.RoomletPrice;
        trip.SleeperPrice = dto.SleeperPrice;

        dataContext.SaveChanges();

        var tripDto = new TripWithCapacityDto
        {
            Id = trip.Id,
            Train = new TrainDto
            {
                Id = trip.Train.Id,
                Name = trip.Train.Name,
                Status = trip.Train.Status,
                CoachCapacity = trip.Train.CoachCapacity,
                FirstClassCapacity = trip.Train.FirstClassCapacity,
                RoomletCapacity = trip.Train.RoomletCapacity,
                SleeperCapacity = trip.Train.SleeperCapacity,
            },
            FromStation = new TrainStationDto
            {
                Id = trip.FromStation.Id,
                Name = trip.FromStation.Name,
                Address = trip.FromStation.Address,
                ManagerId = trip.FromStation.ManagerId,
            },
            ToStation = new TrainStationDto
            {
                Id = trip.ToStation.Id,
                Name = trip.ToStation.Name,
                Address = trip.ToStation.Address,
                ManagerId = trip.ToStation.ManagerId,
            },
            Departure = trip.Departure,
            Arrival = trip.Arrival,
            CoachPrice = trip.CoachPrice,
            FirstClassPrice = trip.FirstClassPrice,
            RoomletPrice = trip.RoomletPrice,
            SleeperPrice = trip.SleeperPrice,
            CoachCapacity = trip.GetCoachCapacity(trips),
            FirstClassCapacity = trip.GetFirstClassCapacity(trips),
            RoomletCapacity = trip.GetRoomletCapacity(trips),
            SleeperCapacity = trip.GetSleeperCapacity(trips),
        };

        return Ok(tripDto);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult DeleteTrip([FromRoute] int id)
    {
        var trip = trips.FirstOrDefault(x => x.Id == id);

        if (trip == null)
        {
            return NotFound();
        }

        trips.Remove(trip);
        dataContext.SaveChanges();

        return Ok();
    }

    private static bool InvalidCreateTripDto(CreateTripDto dto)
    {
        bool isInvalid = false;

        if (dto.FromStationId == dto.ToStationId
            || dto.Arrival.CompareTo(dto.Departure) <= 0
            || dto.CoachPrice < 0
            || dto.FirstClassPrice < 0
            || dto.RoomletPrice < 0
            || dto.SleeperPrice < 0) 
        {
            isInvalid = true;
        }

        return isInvalid;
    }

    private static IQueryable<TripWithCapacityDto> GetTripDtos(IQueryable<Trip> tripsQuery)
    {
        return tripsQuery
            .Include(x => x.BoardingPasses)
            .ThenInclude(x => x.Passengers)
            .Select(x => new TripWithCapacityDto
            {
                Id = x.Id,
                Train = new TrainDto
                {
                    Id = x.Train.Id,
                    Name = x.Train.Name,
                    Status = x.Train.Status,
                    CoachCapacity = x.Train.CoachCapacity,
                    FirstClassCapacity = x.Train.FirstClassCapacity,
                    RoomletCapacity = x.Train.RoomletCapacity,
                    SleeperCapacity = x.Train.SleeperCapacity,
                },
                FromStation = new TrainStationDto
                {
                    Id = x.FromStation.Id,
                    Name = x.FromStation.Name,
                    Address = x.FromStation.Address,
                    ManagerId = x.FromStation.ManagerId,
                },
                ToStation = new TrainStationDto
                {
                    Id = x.ToStation.Id,
                    Name = x.ToStation.Name,
                    Address = x.ToStation.Address,
                    ManagerId = x.ToStation.ManagerId,
                },
                Departure = x.Departure,
                Arrival = x.Arrival,
                CoachPrice = x.CoachPrice,
                FirstClassPrice = x.FirstClassPrice,
                RoomletPrice = x.RoomletPrice,
                SleeperPrice = x.SleeperPrice,
                CoachCapacity = x.Train.CoachCapacity - x.CountPassengers(TravelClass.Coach),
                FirstClassCapacity = x.Train.FirstClassCapacity - x.CountPassengers(TravelClass.FirstClass),
                RoomletCapacity = x.Train.RoomletCapacity - x.CountPassengers(TravelClass.Roomlet),
                SleeperCapacity = x.Train.SleeperCapacity - x.CountPassengers(TravelClass.Sleeper),
            });
    }

    private static List<List<Trip>>? GenerateRoutes(IQueryable<Trip> trips, int fromStationId, int toStationId,
                                                            DateTimeOffset departure, DateTimeOffset arrival)
    {
        var possibleTrips = trips.Include(x => x.FromStation)
                                 .Include(x => x.ToStation)
                                 .Where(x => x.FromStationId == fromStationId
                                 && x.Departure.CompareTo(departure) >= 0
                                 && x.Arrival.CompareTo(arrival) <= 0)
                                 .ToList();

        if (!possibleTrips.Any())
        {
            // No valid trips, give up
            return null;
        }

        var routes = new List<List<Trip>>();

        // Check each trip to see if we can make it to the destination
        foreach ( var trip in possibleTrips )
        {
            List<List<Trip>>? generatedRoutes;
            if(trip.ToStationId == toStationId)
            {
                // We made it to the destination with this trip!
                routes.Add(new List<Trip>() { trip });
            }
            else if((generatedRoutes = GenerateRoutes(trips, trip.ToStationId, toStationId, trip.Arrival, arrival)) != null) {
                // We couldn't make it to the destination with this trip, but there were future trips that could!
                foreach (var generatedRoute in generatedRoutes)
                {
                    // Prepend the current trip
                    generatedRoute.Insert(0, trip);
                    routes.Add(generatedRoute);
                }
            }
        }

        if(!routes.Any())
        {
            // There are no valid routes.
            return null;
        }

        // There was at least one valid route!
        return routes;
    }
}
