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

    [HttpGet]
    [Route("search/{fromStationId}/{toStationId}/{departure}/{arrival}")]
    public ActionResult<TripDto> GetRoute(int fromStationId, int toStationId, DateTimeOffset departure, DateTimeOffset arrival)
    {
        var routeDtos = GetTripDtos(trips
            .Where(x => x.FromStationId == fromStationId)
            .Where(y => y.ToStationId == toStationId))
            .Where(a => a.Departure.CompareTo(departure) > 0)
            .Where(b => b.Arrival.CompareTo(arrival) < 0)
            .FirstOrDefault();

        if ((fromStationId == toStationId) ||
            (departure.CompareTo(arrival) > 0))
        {
            return BadRequest();
        }

        if (routeDtos == null)
        {
            return NotFound();
        }

        return Ok(routeDtos);
    }


    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TripDto> CreateTrip([FromBody] CreateTripDto dto)
    {
        if (InvalidCreateTripDto(dto))
        {
            return BadRequest();
        }

        var createdTrip = new Trip
        {
            TrainId = dto.TrainId,
            FromStationId = dto.FromStationId,
            ToStationId = dto.ToStationId,
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
            FromStationId = createdTrip.FromStationId,
            ToStationId = createdTrip.ToStationId,
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

        if (InvalidCreateTripDto(dto))
        {
            return BadRequest();
        }

        trip.TrainId = dto.TrainId;
        trip.FromStationId = dto.FromStationId;
        trip.ToStationId = dto.ToStationId;
        trip.Departure = dto.Departure;
        trip.Arrival = dto.Arrival;
        trip.BasePrice = dto.BasePrice;

        dataContext.SaveChanges();

        var tripDto = new TripDto
        {
            Id = trip.Id,
            TrainId = trip.TrainId,
            FromStationId = trip.FromStationId,
            ToStationId = trip.ToStationId,
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

    private bool InvalidCreateTripDto(CreateTripDto dto)
    {
        bool isInvalid = false;
        var train = trains.FirstOrDefault(x => x.Id == dto.TrainId);
        var fromStation = stations.FirstOrDefault(x => x.Id == dto.FromStationId);
        var toStation = stations.FirstOrDefault(x => x.Id == dto.ToStationId);

        if (train == null ||
            fromStation == null ||
            toStation == null ||
            (dto.FromStationId == dto.ToStationId) ||
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
                FromStationId = x.FromStationId,
                ToStationId = x.ToStationId,
                Departure = x.Departure,
                Arrival = x.Arrival,
                BasePrice = x.BasePrice
            });
    }
}
