using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Authorization;
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
    public IQueryable<TripDto> GetAllTrips()
    {
        return GetTripDtos(trips);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<TripDto> GetTripById(int id)
    {
        var tripDtos = GetTripDtos(trips.Where(x => x.Id == id)).FirstOrDefault();
        if (tripDtos == null)
        {
            return NotFound();
        }

        return Ok(tripDtos);
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TripDto> CreateTrip([FromBody] CreateTripDto dto)
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
            BasePrice = dto.BasePrice
        };

        trips.Add(createdTrip);
        dataContext.SaveChanges();

        var tripDto = new TripDto
        {
            Id = createdTrip.Id,
            TrainId = createdTrip.TrainId,
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
            BasePrice = createdTrip.BasePrice
        };

        return CreatedAtAction(nameof(GetTripById), new { id = tripDto.Id }, tripDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TripDto> UpdateTrip([FromBody] CreateTripDto dto, [FromRoute] int id)
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
        trip.BasePrice = dto.BasePrice;

        dataContext.SaveChanges();

        var tripDto = new TripDto
        {
            Id = trip.Id,
            TrainId = trip.TrainId,
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
            BasePrice = trip.BasePrice,
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

        if (dto.FromStationId == dto.ToStationId ||
            dto.Arrival.CompareTo(dto.Departure) <= 0 ||
            dto.BasePrice < 0) 
        {
            isInvalid = true;
        }

        return isInvalid;
    }

    private static IQueryable<TripDto> GetTripDtos(IQueryable<Trip> trips)
    {
        return trips
            .Select(x => new TripDto
            {
                Id = x.Id,
                TrainId = x.TrainId,
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
                BasePrice = x.BasePrice
            });
    }
}
